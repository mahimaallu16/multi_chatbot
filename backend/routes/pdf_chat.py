from flask import Blueprint, request, jsonify, session
from flask_socketio import emit, join_room, leave_room
from services.langchain_pdf import pdf_service, pdf_answer_streaming
import os
import tempfile
import uuid

pdf_chat = Blueprint('pdf_chat', __name__)

# --- In-memory context store (per session) ---
SESSION_CONTEXT = {}

def get_session_id():
    # Use Flask session or fallback to a generated UUID
    sid = session.get('sid')
    if not sid:
        sid = str(uuid.uuid4())
        session['sid'] = sid
    return sid

# --- WebSocket Streaming Endpoint ---
def register_socketio(socketio):
    @socketio.on('pdf_chat_message')
    def handle_pdf_chat_message(data):
        sid = data.get('session_id') or request.sid
        file_hashes = data.get('file_hashes')
        question = data.get('question')
        if not file_hashes or not question:
            emit('pdf_chat_stream', {'error': 'File(s) and question required', 'is_complete': True})
            return

        # Retrieve context for follow-up
        context = SESSION_CONTEXT.get(sid, "")

        def stream_callback(partial, is_complete):
            emit('pdf_chat_stream', {'content': partial, 'is_complete': is_complete})

        # Use the context in your service (you may need to adapt your service to accept context)
        pdf_answer_streaming(file_hashes, question, stream_callback, context=context)

        # Update context for follow-up
        SESSION_CONTEXT[sid] = question

# --- REST Endpoints ---

@pdf_chat.route('/api/pdf/upload', methods=['POST'])
def upload_pdfs():
    try:
        if 'files' not in request.files:
            return jsonify({'error': 'No files uploaded'}), 400
        files = request.files.getlist('files')
        if not files or all(file.filename == '' for file in files):
            return jsonify({'error': 'No valid files selected'}), 400
        temp_files = []
        file_info = []
        for file in files:
            if file.filename and file.filename.lower().endswith('.pdf'):
                temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
                file.save(temp_file.name)
                temp_files.append(temp_file.name)
                file_info.append({
                    'original_name': file.filename,
                    'temp_path': temp_file.name,
                    'size': os.path.getsize(temp_file.name)
                })
        if not temp_files:
            return jsonify({'error': 'No valid PDF files found'}), 400
        file_paths = [info['temp_path'] for info in file_info]
        process_result = pdf_service.process_documents(file_paths)
        if process_result['success']:
            return jsonify({
                'success': True,
                'files': [
                    {
                        'file_hash': file_data['file_hash'],
                        'file_name': file_data['file_name'],
                        'size': file_data['size'],
                        'total_pages': file_data['total_pages'],
                    }
                    for file_data in process_result.get('files', [])
                ],
                'message': f"Successfully processed {process_result['files_processed']} PDF file(s)."
            })
        else:
            return jsonify({'error': process_result['error']}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        for info in file_info:
            try:
                os.unlink(info['temp_path'])
            except Exception:
                pass

@pdf_chat.route('/api/pdf/summary/<file_hash>', methods=['GET'])
def get_document_summary(file_hash):
    try:
        summary = pdf_service.get_document_summary(file_hash)
        if 'error' in summary:
            return jsonify({'error': summary['error']}), 404
        return jsonify(summary)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@pdf_chat.route('/api/pdf/compare', methods=['POST'])
def compare_documents():
    try:
        data = request.get_json()
        if not data or 'file_hash1' not in data or 'file_hash2' not in data:
            return jsonify({'error': 'Two file hashes are required'}), 400
        comparison = pdf_service.compare_documents(data['file_hash1'], data['file_hash2'])
        if 'error' in comparison:
            return jsonify({'error': comparison['error']}), 404
        return jsonify(comparison)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@pdf_chat.route('/api/pdf/translate/<file_hash>', methods=['POST'])
def translate_document(file_hash):
    try:
        data = request.get_json() or {}
        target_language = data.get('target_language', 'es')
        translation = pdf_service.translate_document(file_hash, target_language)
        if 'error' in translation:
            return jsonify({'error': translation['error']}), 404
        return jsonify(translation)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@pdf_chat.route('/api/pdf/extract/<file_hash>', methods=['POST'])
def extract_content(file_hash):
    try:
        data = request.get_json()
        if not data or 'query' not in data:
            return jsonify({'error': 'Query is required'}), 400
        extracted = pdf_service.extract_specific_content(file_hash, data['query'])
        if 'error' in extracted:
            return jsonify({'error': extracted['error']}), 404
        return jsonify(extracted)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@pdf_chat.route('/api/pdf/tables/<file_hash>', methods=['GET'])
def get_document_tables(file_hash):
    try:
        if file_hash not in pdf_service.document_cache:
            return jsonify({'error': 'Document not found'}), 404
        tables = pdf_service.document_cache[file_hash].get('tables', [])
        return jsonify({
            'file_hash': file_hash,
            'file_name': pdf_service.document_cache[file_hash]['file_name'],
            'tables': tables,
            'count': len(tables)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@pdf_chat.route('/api/pdf/forms/<file_hash>', methods=['GET'])
def get_document_forms(file_hash):
    try:
        if file_hash not in pdf_service.document_cache:
            return jsonify({'error': 'Document not found'}), 404
        forms = pdf_service.document_cache[file_hash].get('forms', [])
        return jsonify({
            'file_hash': file_hash,
            'file_name': pdf_service.document_cache[file_hash]['file_name'],
            'forms': forms,
            'count': len(forms)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@pdf_chat.route('/api/pdf/entities/<file_hash>', methods=['GET'])
def get_document_entities(file_hash):
    try:
        if file_hash not in pdf_service.document_cache:
            return jsonify({'error': 'Document not found'}), 404
        chunks = pdf_service.vector_store.get_document_by_hash(file_hash)
        if not chunks:
            return jsonify({'error': 'Document content not found'}), 404
        from utils.file_parser import pdf_parser
        full_text = " ".join([chunk['document'] for chunk in chunks])
        entities = pdf_parser.extract_named_entities(full_text)
        return jsonify({
            'file_hash': file_hash,
            'file_name': pdf_service.document_cache[file_hash]['file_name'],
            'entities': entities
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@pdf_chat.route('/api/pdf/search', methods=['POST'])
def search_documents():
    try:
        data = request.get_json()
        if not data or 'query' not in data:
            return jsonify({'error': 'Search query is required'}), 400
        query = data['query']
        file_hashes = data.get('file_hashes', None)
        answer_result = pdf_service._handle_semantic_search(query, file_hashes)
        return jsonify({
            'query': query,
            'response': answer_result['answer'],
            'sources': answer_result['sources'],
            'confidence': answer_result['confidence'],
            'results_count': answer_result.get('search_results_count', 0)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@pdf_chat.route('/api/pdf/summarize', methods=['POST'])
def summarize_documents():
    try:
        data = request.get_json()
        if not data or 'file_hashes' not in data:
            return jsonify({'error': 'File hashes are required'}), 400
        summary_type = data.get('summary_type', 'executive')
        summaries = []
        for file_hash in data['file_hashes']:
            if file_hash in pdf_service.document_cache:
                summary = pdf_service.get_document_summary(file_hash)
                if 'error' not in summary:
                    summaries.append({
                        'file_hash': file_hash,
                        'file_name': summary['file_name'],
                        'summary': summary['summary'],
                        'summary_type': summary_type
                    })
        return jsonify({
            'summaries': summaries,
            'count': len(summaries)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@pdf_chat.route('/api/pdf/clear', methods=['POST'])
def clear_documents():
    try:
        data = request.get_json() or {}
        file_hashes = data.get('file_hashes', None)
        success = pdf_service.clear_documents(file_hashes)
        if success:
            return jsonify({
                'success': True,
                'message': 'Documents cleared successfully'
            })
        else:
            return jsonify({'error': 'Failed to clear documents'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@pdf_chat.route('/api/pdf/info/<file_hash>', methods=['GET'])
def get_pdf_info(file_hash):
    """Get metadata (pages, title, author, etc.) for a PDF by file_hash"""
    try:
        if file_hash not in pdf_service.document_cache:
            return jsonify({'error': 'Document not found'}), 404
        doc_info = pdf_service.document_cache[file_hash]
        # Try to get more metadata from parser if available
        from utils.file_parser import pdf_parser
        meta = pdf_parser.get_metadata_by_hash(file_hash)
        info = {
            'file_hash': file_hash,
            'file_name': doc_info['file_name'],
            'total_pages': doc_info['total_pages'],
            'text_length': doc_info['text_length'],
            'analysis': doc_info['analysis'],
            'tables_count': len(doc_info.get('tables', [])),
            'images_count': len(doc_info.get('images', [])),
            'forms_count': len(doc_info.get('forms', [])),
            'annotations_count': len(doc_info.get('annotations', [])),
            'metadata': meta or {}
        }
        return jsonify(info)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@pdf_chat.route('/api/pdf/page/<file_hash>/<int:page_num>', methods=['GET'])
def get_pdf_page(file_hash, page_num):
    """Get content of a specific page (text, images, tables)"""
    try:
        from utils.file_parser import pdf_parser
        page_content = pdf_parser.get_page_content_by_hash(file_hash, page_num)
        if not page_content:
            return jsonify({'error': 'Page not found or no content'}), 404
        return jsonify(page_content)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@pdf_chat.route('/api/pdf/download/<file_hash>/<format>', methods=['GET'])
def download_pdf_content(file_hash, format):
    """Download answer/summary in PDF/TXT/JSON"""
    try:
        from utils.file_parser import pdf_parser
        # format: pdf, txt, json
        content = pdf_parser.export_content_by_hash(file_hash, format)
        if not content:
            return jsonify({'error': 'Export failed or not found'}), 404
        # Return as file download
        from flask import send_file
        import io
        filename = f"{file_hash}_export.{format}"
        if format == 'pdf':
            return send_file(io.BytesIO(content), mimetype='application/pdf', as_attachment=True, download_name=filename)
        elif format == 'txt':
            return send_file(io.BytesIO(content.encode('utf-8')), mimetype='text/plain', as_attachment=True, download_name=filename)
        elif format == 'json':
            return send_file(io.BytesIO(content.encode('utf-8')), mimetype='application/json', as_attachment=True, download_name=filename)
        else:
            return jsonify({'error': 'Unsupported format'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@pdf_chat.route('/api/pdf/images/<file_hash>', methods=['GET'])
def get_pdf_images(file_hash):
    """Extract images from a PDF by file_hash"""
    try:
        if file_hash not in pdf_service.document_cache:
            return jsonify({'error': 'Document not found'}), 404
        doc_info = pdf_service.document_cache[file_hash]
        images = doc_info.get('images', [])
        return jsonify({
            'file_hash': file_hash,
            'file_name': doc_info['file_name'],
            'images': images,
            'count': len(images)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@pdf_chat.route('/api/pdf/query', methods=['POST'])
def query_pdf():
    """Ask question(s) over one or more PDFs, with context/memory, RAG, and streaming support."""
    try:
        data = request.get_json()
        question = data.get('question')
        file_hashes = data.get('file_hashes', None)
        session_id = data.get('session_id') or get_session_id()
        if not question:
            return jsonify({'error': 'Question is required'}), 400
        # Retrieve context for follow-up
        context = SESSION_CONTEXT.get(session_id, "")
        # Use context in answer_question if supported
        answer_result = pdf_service.answer_question(question, file_hashes)
        # Update context for follow-up
        SESSION_CONTEXT[session_id] = question
        return jsonify({
            'answer': answer_result.get('answer'),
            'sources': answer_result.get('sources'),
            'confidence': answer_result.get('confidence'),
            'session_id': session_id
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# --- Optional: Voice endpoints (stubs) ---
@pdf_chat.route('/api/pdf/voice/query', methods=['POST'])
def voice_query():
    try:
        return jsonify({
            'message': 'Voice query feature is coming soon!',
            'status': 'not_implemented'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@pdf_chat.route('/api/pdf/voice/response', methods=['POST'])
def voice_response():
    try:
        data = request.get_json()
        if not data or 'text' not in data:
            return jsonify({'error': 'Text is required'}), 400
        return jsonify({
            'message': 'Voice response feature is coming soon!',
            'status': 'not_implemented',
            'text_length': len(data['text'])
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500
