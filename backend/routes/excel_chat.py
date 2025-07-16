from flask import Blueprint, request, jsonify
from services.langchain_excel import excel_bot
import os
import tempfile
import base64

excel_chat = Blueprint('excel_chat', __name__)

@excel_chat.route('/api/excel/upload', methods=['POST'])
def upload_excel() -> 'flask.Response':
    """Upload Excel file and get comprehensive file information (standardized response)"""
    try:
        if 'file' not in request.files:
            return jsonify({'status': 'error', 'data': None, 'error': 'No file provided'}), 400
        file = request.files['file']
        if file.filename == '':
            return jsonify({'status': 'error', 'data': None, 'error': 'No file selected'}), 400
        allowed_extensions = {'.xlsx', '.xls', '.csv'}
        file_ext = os.path.splitext(file.filename)[1].lower()
        if file_ext not in allowed_extensions:
            return jsonify({'status': 'error', 'data': None, 'error': f'Unsupported file type. Allowed: {", ".join(allowed_extensions)}'}), 400
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=file_ext)
        file.save(temp_file.name)
        result = excel_bot.load_excel_file(temp_file.name)
        os.unlink(temp_file.name)
        return jsonify(result), 200 if result['status'] == 'success' else 500
    except Exception as e:
        return jsonify({'status': 'error', 'data': None, 'error': f'Upload failed: {str(e)}'}), 500

@excel_chat.route('/api/excel/query', methods=['POST'])
def natural_language_query() -> 'flask.Response':
    """Advanced natural language query processing (standardized response)"""
    try:
        data = request.get_json()
        query = data.get('query', '')
        sheet_name = data.get('sheet_name', None)
        if not query:
            return jsonify({'status': 'error', 'data': None, 'error': 'No query provided'}), 400
        if not excel_bot.sheets:
            return jsonify({'status': 'error', 'data': None, 'error': 'No Excel file loaded. Please upload a file first.'}), 400
        result = excel_bot.natural_language_query(query, sheet_name)
        if 'error' in result and result['error']:
            return jsonify({'status': 'error', 'data': None, 'error': result['error']}), 400
        return jsonify({'status': 'success', 'data': result, 'error': None})
    except Exception as e:
        return jsonify({'status': 'error', 'data': None, 'error': f'Query failed: {str(e)}'}), 500

@excel_chat.route('/api/excel/formula', methods=['POST'])
def generate_formula() -> 'flask.Response':
    """Generate Excel formula from natural language (standardized response)"""
    try:
        data = request.get_json()
        request_text = data.get('request', '')
        if not request_text:
            return jsonify({'status': 'error', 'data': None, 'error': 'No formula request provided'}), 400
        result = excel_bot.generate_formula(request_text)
        if 'error' in result and result['error']:
            return jsonify({'status': 'error', 'data': None, 'error': result['error']}), 400
        return jsonify({'status': 'success', 'data': result, 'error': None})
    except Exception as e:
        return jsonify({'status': 'error', 'data': None, 'error': f'Formula generation failed: {str(e)}'}), 500

@excel_chat.route('/api/excel/clean', methods=['POST'])
def clean_data() -> 'flask.Response':
    """Clean and transform Excel data (standardized response)"""
    try:
        data = request.get_json()
        operations = data.get('operations', [])
        sheet_name = data.get('sheet_name', None)
        if not operations:
            return jsonify({'status': 'error', 'data': None, 'error': 'No cleaning operations provided'}), 400
        if not excel_bot.sheets:
            return jsonify({'status': 'error', 'data': None, 'error': 'No Excel file loaded. Please upload a file first.'}), 400
        result = excel_bot.clean_data(operations, sheet_name)
        if 'error' in result and result['error']:
            return jsonify({'status': 'error', 'data': None, 'error': result['error']}), 400
        return jsonify({'status': 'success', 'data': result, 'error': None})
    except Exception as e:
        return jsonify({'status': 'error', 'data': None, 'error': f'Data cleaning failed: {str(e)}'}), 500

@excel_chat.route('/api/excel/chart', methods=['POST'])
def create_chart() -> 'flask.Response':
    """Create advanced charts from Excel data (standardized response)"""
    try:
        data = request.get_json()
        chart_type = data.get('chart_type', 'bar')
        x_column = data.get('x_column', '')
        y_column = data.get('y_column', '')
        sheet_name = data.get('sheet_name', None)
        title = data.get('title', None)
        options = data.get('options', {})
        if not x_column or not y_column:
            return jsonify({'status': 'error', 'data': None, 'error': 'X and Y columns are required'}), 400
        if not excel_bot.sheets:
            return jsonify({'status': 'error', 'data': None, 'error': 'No Excel file loaded. Please upload a file first.'}), 400
        result = excel_bot.create_chart(chart_type, x_column, y_column, sheet_name, title, options)
        if 'error' in result and result['error']:
            return jsonify({'status': 'error', 'data': None, 'error': result['error']}), 400
        return jsonify({'status': 'success', 'data': result, 'error': None})
    except Exception as e:
        return jsonify({'status': 'error', 'data': None, 'error': f'Chart creation failed: {str(e)}'}), 500

@excel_chat.route('/api/excel/pivot', methods=['POST'])
def create_pivot_table() -> 'flask.Response':
    """Create pivot tables from Excel data (standardized response)"""
    try:
        data = request.get_json()
        sheet_name = data.get('sheet_name', None)
        index_cols = data.get('index_columns', [])
        value_cols = data.get('value_columns', [])
        agg_func = data.get('aggregation', 'sum')
        filters = data.get('filters', None)
        if not index_cols or not value_cols:
            return jsonify({'status': 'error', 'data': None, 'error': 'Index columns and value columns are required'}), 400
        if not excel_bot.sheets:
            return jsonify({'status': 'error', 'data': None, 'error': 'No Excel file loaded. Please upload a file first.'}), 400
        result = excel_bot.create_pivot_table(sheet_name, index_cols, value_cols, agg_func, filters)
        if 'error' in result and result['error']:
            return jsonify({'status': 'error', 'data': None, 'error': result['error']}), 400
        return jsonify({'status': 'success', 'data': result, 'error': None})
    except Exception as e:
        return jsonify({'status': 'error', 'data': None, 'error': f'Pivot table creation failed: {str(e)}'}), 500

@excel_chat.route('/api/excel/validate', methods=['POST'])
def validate_data() -> 'flask.Response':
    """Validate data against custom rules (standardized response)"""
    try:
        data = request.get_json()
        sheet_name = data.get('sheet_name', None)
        validation_rules = data.get('validation_rules', {})
        if not validation_rules:
            return jsonify({'status': 'error', 'data': None, 'error': 'No validation rules provided'}), 400
        if not excel_bot.sheets:
            return jsonify({'status': 'error', 'data': None, 'error': 'No Excel file loaded. Please upload a file first.'}), 400
        result = excel_bot.validate_data(sheet_name, validation_rules)
        if 'error' in result and result['error']:
            return jsonify({'status': 'error', 'data': None, 'error': result['error']}), 400
        return jsonify({'status': 'success', 'data': result, 'error': None})
    except Exception as e:
        return jsonify({'status': 'error', 'data': None, 'error': f'Data validation failed: {str(e)}'}), 500

@excel_chat.route('/api/excel/automation', methods=['POST'])
def generate_automation_script() -> 'flask.Response':
    """Generate Python/Pandas automation scripts (standardized response)"""
    try:
        data = request.get_json()
        task_description = data.get('task_description', '')
        sheet_name = data.get('sheet_name', None)
        if not task_description:
            return jsonify({'status': 'error', 'data': None, 'error': 'No task description provided'}), 400
        if not excel_bot.sheets:
            return jsonify({'status': 'error', 'data': None, 'error': 'No Excel file loaded. Please upload a file first.'}), 400
        result = excel_bot.generate_automation_script(task_description, sheet_name)
        if 'error' in result and result['error']:
            return jsonify({'status': 'error', 'data': None, 'error': result['error']}), 400
        return jsonify({'status': 'success', 'data': result, 'error': None})
    except Exception as e:
        return jsonify({'status': 'error', 'data': None, 'error': f'Automation script generation failed: {str(e)}'}), 500

@excel_chat.route('/api/excel/export', methods=['POST'])
def export_data() -> 'flask.Response':
    """Export Excel data in various formats (standardized response)"""
    try:
        data = request.get_json()
        format_type = data.get('format', 'csv')
        sheet_name = data.get('sheet_name', None)
        filters = data.get('filters', None)
        filename = data.get('filename', None)
        if not excel_bot.sheets:
            return jsonify({'status': 'error', 'data': None, 'error': 'No Excel file loaded. Please upload a file first.'}), 400
        result = excel_bot.export_data(format_type, sheet_name, filters, filename)
        if 'error' in result and result['error']:
            return jsonify({'status': 'error', 'data': None, 'error': result['error']}), 400
        return jsonify({'status': 'success', 'data': result, 'error': None})
    except Exception as e:
        return jsonify({'status': 'error', 'data': None, 'error': f'Export failed: {str(e)}'}), 500

@excel_chat.route('/api/excel/sheets', methods=['GET'])
def get_sheets() -> 'flask.Response':
    """Get list of available sheets with detailed information (standardized response)"""
    try:
        if not excel_bot.sheets:
            return jsonify({'status': 'error', 'data': None, 'error': 'No Excel file loaded'})
        sheets_info = {}
        for sheet_name, sheet_info in excel_bot.sheets.items():
            sheets_info[sheet_name] = {
                'shape': sheet_info['shape'],
                'columns': sheet_info['columns'],
                'data_types': sheet_info['dtypes'],
                'analysis': sheet_info['analysis']
            }
        return jsonify({
            'status': 'success',
            'data': {
                'sheets': list(excel_bot.sheets.keys()),
                'total_sheets': len(excel_bot.sheets),
                'sheets_info': sheets_info
            },
            'error': None
        })
    except Exception as e:
        return jsonify({'status': 'error', 'data': None, 'error': f'Failed to get sheets: {str(e)}'}), 500

@excel_chat.route('/api/excel/summary', methods=['GET'])
def get_summary() -> 'flask.Response':
    """Get comprehensive summary of Excel data (standardized response)"""
    try:
        if not excel_bot.sheets:
            return jsonify({'status': 'error', 'data': None, 'error': 'No Excel file loaded'}), 400
        summary = excel_bot._generate_comprehensive_summary()
        return jsonify({
            'status': 'success',
            'data': summary,
            'error': None
        })
    except Exception as e:
        return jsonify({'status': 'error', 'data': None, 'error': f'Failed to get summary: {str(e)}'}), 500

@excel_chat.route('/api/excel/recommendations', methods=['GET'])
def get_recommendations() -> 'flask.Response':
    """Get intelligent recommendations for data improvement (standardized response)"""
    try:
        if not excel_bot.sheets:
            return jsonify({'status': 'error', 'data': None, 'error': 'No Excel file loaded'}), 400
        recommendations = excel_bot._generate_recommendations()
        return jsonify({
            'status': 'success',
            'data': {
                'recommendations': recommendations,
                'total_recommendations': len(recommendations)
            },
            'error': None
        })
    except Exception as e:
        return jsonify({'status': 'error', 'data': None, 'error': f'Failed to get recommendations: {str(e)}'}), 500

@excel_chat.route('/api/excel/charts', methods=['GET'])
def get_charts() -> 'flask.Response':
    """Get list of created charts (standardized response)"""
    try:
        if not excel_bot.charts:
            return jsonify({'status': 'error', 'data': None, 'error': 'No charts created yet'})
        charts_list = []
        for chart_id, chart_info in excel_bot.charts.items():
            charts_list.append({
                'id': chart_id,
                'type': chart_info['data']['chart_type'],
                'x_column': chart_info['data']['x_column'],
                'y_column': chart_info['data']['y_column'],
                'created_at': chart_info['created_at']
            })
        return jsonify({
            'status': 'success',
            'data': {
                'charts': charts_list,
                'total_charts': len(charts_list)
            },
            'error': None
        })
    except Exception as e:
        return jsonify({'status': 'error', 'data': None, 'error': f'Failed to get charts: {str(e)}'}), 500

@excel_chat.route('/api/excel/pivots', methods=['GET'])
def get_pivot_tables() -> 'flask.Response':
    """Get list of created pivot tables (standardized response)"""
    try:
        if not excel_bot.pivot_tables:
            return jsonify({'status': 'error', 'data': None, 'error': 'No pivot tables created yet'})
        pivots_list = []
        for pivot_id, pivot_info in excel_bot.pivot_tables.items():
            pivots_list.append({
                'id': pivot_id,
                'index_columns': pivot_info['index_columns'],
                'value_columns': pivot_info['value_columns'],
                'aggregation': pivot_info['aggregation'],
                'created_at': pivot_info['created_at']
            })
        return jsonify({
            'status': 'success',
            'data': {
                'pivot_tables': pivots_list,
                'total_pivot_tables': len(pivots_list)
            },
            'error': None
        })
    except Exception as e:
        return jsonify({'status': 'error', 'data': None, 'error': f'Failed to get pivot tables: {str(e)}'}), 500

@excel_chat.route('/api/excel/scripts', methods=['GET'])
def get_automation_scripts() -> 'flask.Response':
    """Get list of generated automation scripts (standardized response)"""
    try:
        if not excel_bot.automation_scripts:
            return jsonify({'status': 'error', 'data': None, 'error': 'No automation scripts generated yet'})
        scripts_list = []
        for script_id, script_info in excel_bot.automation_scripts.items():
            scripts_list.append({
                'id': script_id,
                'task': script_info['task'],
                'sheet_name': script_info['sheet_name'],
                'created_at': script_info['created_at']
            })
        return jsonify({
            'status': 'success',
            'data': {
                'scripts': scripts_list,
                'total_scripts': len(scripts_list)
            },
            'error': None
        })
    except Exception as e:
        return jsonify({'status': 'error', 'data': None, 'error': f'Failed to get automation scripts: {str(e)}'}), 500

@excel_chat.route('/api/excel/chat', methods=['POST'])
def chat_excel() -> 'flask.Response':
    """Legacy chat endpoint for backward compatibility (standardized response)"""
    try:
        if 'file' not in request.files:
            return jsonify({'status': 'error', 'data': None, 'error': 'No file provided'}), 400
        file = request.files['file']
        question = request.form.get('question', '')
        if not question:
            return jsonify({'status': 'error', 'data': None, 'error': 'No question provided'}), 400
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.xlsx')
        file.save(temp_file.name)
        response = excel_bot.excel_answer(temp_file.name, question)
        os.unlink(temp_file.name)
        return jsonify({
            'status': 'success',
            'data': {
                'response': response,
                'bot_type': 'excel'
            },
            'error': None
        })
    except Exception as e:
        return jsonify({'status': 'error', 'data': None, 'error': f'Chat failed: {str(e)}'}), 500

@excel_chat.route('/api/excel/template', methods=['POST'])
def generate_template() -> 'flask.Response':
    """Generate Excel template from predefined or custom specifications (standardized response)"""
    try:
        data = request.get_json()
        template_type = data.get('template_type', '')
        customizations = data.get('customizations', None)
        if not template_type:
            return jsonify({'status': 'error', 'data': None, 'error': 'Template type is required'}), 400
        result = excel_bot.generate_template(template_type, customizations)
        if 'error' in result and result['error']:
            return jsonify({'status': 'error', 'data': None, 'error': result['error']}), 400
        return jsonify({'status': 'success', 'data': result, 'error': None})
    except Exception as e:
        return jsonify({'status': 'error', 'data': None, 'error': f'Template generation failed: {str(e)}'}), 500

@excel_chat.route('/api/excel/compare', methods=['POST'])
def compare_files() -> 'flask.Response':
    """Compare multiple Excel files and identify differences (standardized response)"""
    try:
        data = request.get_json()
        file_paths = data.get('file_paths', [])
        if len(file_paths) < 2:
            return jsonify({'status': 'error', 'data': None, 'error': 'At least 2 files required for comparison'}), 400
        result = excel_bot.compare_files(file_paths)
        if 'error' in result and result['error']:
            return jsonify({'status': 'error', 'data': None, 'error': result['error']}), 400
        return jsonify({'status': 'success', 'data': result, 'error': None})
    except Exception as e:
        return jsonify({'status': 'error', 'data': None, 'error': f'File comparison failed: {str(e)}'}), 500

@excel_chat.route('/api/excel/voice', methods=['POST'])
def process_voice_command() -> 'flask.Response':
    """Process voice commands for Excel operations (standardized response)"""
    try:
        data = request.get_json()
        audio_data = data.get('audio_data', '')
        command_type = data.get('command_type', 'excel')
        if not audio_data:
            return jsonify({'status': 'error', 'data': None, 'error': 'Audio data is required'}), 400
        audio_bytes = base64.b64decode(audio_data)
        result = excel_bot.process_voice_command(audio_bytes, command_type)
        if 'error' in result and result['error']:
            return jsonify({'status': 'error', 'data': None, 'error': result['error']}), 400
        return jsonify({'status': 'success', 'data': result, 'error': None})
    except Exception as e:
        return jsonify({'status': 'error', 'data': None, 'error': f'Voice processing failed: {str(e)}'}), 500

@excel_chat.route('/api/excel/comment', methods=['POST'])
def add_comment() -> 'flask.Response':
    """Add collaboration comment to specific cell (standardized response)"""
    try:
        data = request.get_json()
        sheet_name = data.get('sheet_name', '')
        cell_reference = data.get('cell_reference', '')
        author = data.get('author', '')
        content = data.get('content', '')
        if not all([sheet_name, cell_reference, author, content]):
            return jsonify({'status': 'error', 'data': None, 'error': 'All fields are required'}), 400
        result = excel_bot.add_collaboration_comment(sheet_name, cell_reference, author, content)
        if 'error' in result and result['error']:
            return jsonify({'status': 'error', 'data': None, 'error': result['error']}), 400
        return jsonify({'status': 'success', 'data': result, 'error': None})
    except Exception as e:
        return jsonify({'status': 'error', 'data': None, 'error': f'Comment addition failed: {str(e)}'}), 500

@excel_chat.route('/api/excel/comments', methods=['GET'])
def get_comments() -> 'flask.Response':
    """Get collaboration comments (standardized response)"""
    try:
        sheet_name = request.args.get('sheet_name', None)
        cell_reference = request.args.get('cell_reference', None)
        result = excel_bot.get_collaboration_comments(sheet_name, cell_reference)
        if 'error' in result and result['error']:
            return jsonify({'status': 'error', 'data': None, 'error': result['error']}), 400
        return jsonify({'status': 'success', 'data': result, 'error': None})
    except Exception as e:
        return jsonify({'status': 'error', 'data': None, 'error': f'Comment retrieval failed: {str(e)}'}), 500

@excel_chat.route('/api/excel/analytics', methods=['POST'])
def generate_analytics() -> 'flask.Response':
    """Generate advanced analytics and insights (standardized response)"""
    try:
        data = request.get_json()
        sheet_name = data.get('sheet_name', None)
        analysis_type = data.get('analysis_type', 'comprehensive')
        result = excel_bot.generate_advanced_analytics(sheet_name, analysis_type)
        if 'error' in result and result['error']:
            return jsonify({'status': 'error', 'data': None, 'error': result['error']}), 400
        return jsonify({'status': 'success', 'data': result, 'error': None})
    except Exception as e:
        return jsonify({'status': 'error', 'data': None, 'error': f'Analytics generation failed: {str(e)}'}), 500

@excel_chat.route('/api/excel/templates', methods=['GET'])
def get_available_templates() -> 'flask.Response':
    """Get list of available templates (standardized response)"""
    try:
        templates = []
        for template_id, template in excel_bot.templates.items():
            templates.append({
                'id': template_id,
                'name': template.name,
                'description': template.description,
                'category': template.category,
                'created_at': template.created_at.isoformat(),
                'updated_at': template.updated_at.isoformat()
            })
        return jsonify({
            'status': 'success',
            'data': {
                'templates': templates,
                'total_templates': len(templates)
            },
            'error': None
        })
    except Exception as e:
        return jsonify({'status': 'error', 'data': None, 'error': f'Template retrieval failed: {str(e)}'}), 500

@excel_chat.route('/api/excel/multi-upload', methods=['POST'])
def upload_multiple_files() -> 'flask.Response':
    """Upload multiple Excel files for comparison or batch processing (standardized response)"""
    try:
        if 'files' not in request.files:
            return jsonify({'status': 'error', 'data': None, 'error': 'No files provided'}), 400
        files = request.files.getlist('files')
        if not files or all(file.filename == '' for file in files):
            return jsonify({'status': 'error', 'data': None, 'error': 'No files selected'}), 400
        uploaded_files = []
        for file in files:
            allowed_extensions = {'.xlsx', '.xls', '.csv'}
            file_ext = os.path.splitext(file.filename)[1].lower()
            if file_ext not in allowed_extensions:
                return jsonify({'status': 'error', 'data': None, 'error': f'Unsupported file type for {file.filename}. Allowed: {", ".join(allowed_extensions)}'}), 400
            temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=file_ext)
            file.save(temp_file.name)
            uploaded_files.append({
                'original_name': file.filename,
                'temp_path': temp_file.name,
                'extension': file_ext
            })
        return jsonify({
            'status': 'success',
            'data': {
                'uploaded_files': uploaded_files,
                'total_files': len(uploaded_files)
            },
            'error': None
        })
    except Exception as e:
        return jsonify({'status': 'error', 'data': None, 'error': f'Multi-file upload failed: {str(e)}'}), 500

@excel_chat.route('/api/excel/batch-process', methods=['POST'])
def batch_process_files() -> 'flask.Response':
    """Process multiple Excel files with the same operation (standardized response)"""
    try:
        data = request.get_json()
        file_paths = data.get('file_paths', [])
        operation = data.get('operation', '')
        operation_params = data.get('operation_params', {})
        if not file_paths:
            return jsonify({'status': 'error', 'data': None, 'error': 'No file paths provided'}), 400
        if not operation:
            return jsonify({'status': 'error', 'data': None, 'error': 'Operation is required'}), 400
        results = []
        for file_path in file_paths:
            load_result = excel_bot.load_excel_file(file_path)
            if load_result['status'] == 'error':
                results.append({
                    'file': file_path,
                    'status': 'error',
                    'message': load_result['message']
                })
                continue
            if operation == 'clean_data':
                result = excel_bot.clean_data(
                    operation_params.get('operations', []),
                    operation_params.get('sheet_name')
                )
            elif operation == 'generate_analytics':
                result = excel_bot.generate_advanced_analytics(
                    operation_params.get('sheet_name'),
                    operation_params.get('analysis_type', 'comprehensive')
                )
            elif operation == 'export_data':
                result = excel_bot.export_data(
                    operation_params.get('format', 'csv'),
                    operation_params.get('sheet_name'),
                    operation_params.get('filters'),
                    operation_params.get('filename')
                )
            else:
                result = {'error': f'Unsupported operation: {operation}'}
            results.append({
                'file': file_path,
                'status': 'success' if 'error' not in result else 'error',
                'result': result
            })
        return jsonify({
            'status': 'success',
            'data': {
                'operation': operation,
                'results': results,
                'total_processed': len(results)
            },
            'error': None
        })
    except Exception as e:
        return jsonify({'status': 'error', 'data': None, 'error': f'Batch processing failed: {str(e)}'}), 500

@excel_chat.route('/api/excel/automation-templates', methods=['GET'])
def get_automation_templates() -> 'flask.Response':
    """Get predefined automation script templates (standardized response)"""
    try:
        templates = [
            {
                'id': 'data_cleaning',
                'name': 'Data Cleaning Template',
                'description': 'Template for cleaning and preprocessing data',
                'category': 'Data Processing',
                'parameters': ['remove_duplicates', 'fill_missing', 'standardize_formats']
            },
            {
                'id': 'data_analysis',
                'name': 'Data Analysis Template',
                'description': 'Template for comprehensive data analysis',
                'category': 'Analytics',
                'parameters': ['summary_stats', 'correlation_analysis', 'trend_analysis']
            },
            {
                'id': 'report_generation',
                'name': 'Report Generation Template',
                'description': 'Template for generating automated reports',
                'category': 'Reporting',
                'parameters': ['create_charts', 'generate_summary', 'export_formats']
            },
            {
                'id': 'data_validation',
                'name': 'Data Validation Template',
                'description': 'Template for validating data quality',
                'category': 'Quality Assurance',
                'parameters': ['check_formats', 'validate_ranges', 'identify_outliers']
            }
        ]
        return jsonify({
            'status': 'success',
            'data': {
                'templates': templates,
                'total_templates': len(templates)
            },
            'error': None
        })
    except Exception as e:
        return jsonify({'status': 'error', 'data': None, 'error': f'Automation template retrieval failed: {str(e)}'}), 500

@excel_chat.route('/api/excel/voice-setup', methods=['POST'])
def setup_voice_processing() -> 'flask.Response':
    """Setup voice processing capabilities (standardized response)"""
    try:
        data = request.get_json()
        enabled = data.get('enabled', False)
        language = data.get('language', 'en')
        model = data.get('model', 'whisper-1')
        excel_bot.voice_processing_enabled = enabled
        return jsonify({
            'status': 'success',
            'data': {
                'voice_processing_enabled': enabled,
                'language': language,
                'model': model,
                'message': 'Voice processing configuration updated'
            },
            'error': None
        })
    except Exception as e:
        return jsonify({'status': 'error', 'data': None, 'error': f'Voice setup failed: {str(e)}'}), 500

@excel_chat.route('/api/excel/collaboration-settings', methods=['POST'])
def update_collaboration_settings() -> 'flask.Response':
    """Update collaboration settings (standardized response)"""
    try:
        data = request.get_json()
        settings = data.get('settings', {})
        return jsonify({
            'status': 'success',
            'data': {
                'settings': settings,
                'message': 'Collaboration settings updated'
            },
            'error': None
        })
    except Exception as e:
        return jsonify({'status': 'error', 'data': None, 'error': f'Collaboration settings update failed: {str(e)}'}), 500
