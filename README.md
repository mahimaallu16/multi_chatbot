# Amura-Multi-Chatbot Application

A full-stack, enterprise-ready chatbot platform supporting advanced document analysis, real-time chat, and multiple bot types (General, PDF, QA, Excel, Notebook). Built with a modern React frontend and a powerful Python/Flask backend, this application enables users to chat with documents, analyze data, and leverage AI for a variety of use cases.

---

## 🚀 Features

### General

- Real-time chat with multiple bot types (General, PDF, QA, Excel, Notebook)
- Modern, responsive UI with Material-UI and TailwindCSS
- File upload and context-aware chat
- Suggested questions and onboarding
- Multi-bot navigation sidebar

### PDF & Document Analysis

- Multi-PDF upload and processing
- Advanced text, table, image, and metadata extraction
- OCR for scanned documents (EasyOCR, Tesseract)
- Table and form field extraction
- Annotation and comment extraction
- Semantic and cross-document search
- Source attribution and confidence scoring
- Document comparison, translation, and summarization

### Data & Notebook Bots

- Excel file analysis and table queries
- Jupyter Notebook interaction (code, markdown, outputs)
- QA bot for natural language question answering

### AI & NLP

- Google Gemini & PaLM integration
- SpaCy, Transformers, and advanced NLP models
- Named entity recognition, key phrase extraction, and content classification

### Performance & Security

- Real-time streaming responses (WebSocket)
- Local document processing, no data retention
- Secure API endpoints, privacy compliance
- Multi-threaded, scalable backend

---

## 🛠️ Architecture

- **Frontend:** React, Material-UI, TailwindCSS, Socket.IO, Axios
- **Backend:** Python, Flask, Flask-SocketIO, ChromaDB, PyMuPDF, EasyOCR, Tesseract, SpaCy, Transformers
- **Database:** ChromaDB (vector search)
- **AI Models:** Google Gemini, PaLM, Transformers

---

## 📦 Directory Structure

```
├── backend/
│   ├── app.py                # Main Flask app
│   ├── requirements.txt      # Backend dependencies
│   ├── routes/               # API endpoints (pdf_chat.py, excel_chat.py, etc.)
│   ├── services/             # Service logic
│   ├── models/               # Data models
│   └── ...
├── frontend/
│   ├── package.json          # Frontend dependencies
│   ├── src/
│   │   ├── pages/            # Main pages (HomePage, PDFBot, ExcelBot, etc.)
│   │   ├── components/       # Reusable UI components
│   │   ├── services/         # API/socket services
│   │   └── ...
│   └── ...
└── README.md                # This file
```

---

## ⚡ Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- Tesseract OCR (for OCR features)
- Google AI API keys (Gemini, PaLM)

### Backend Setup

```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate
pip install -r requirements.txt

# Set environment variables
set GOOGLE_GEMINI_API_KEY=your_gemini_api_key
set GOOGLE_PALM_API_KEY=your_palm_api_key

# Run the backend
python app.py
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

---

## 🧩 Main Components

### Frontend

- **pages/**: HomePage, PDFBot, ExcelBot, QABot, NotebookBot, LandingPage, PremiumFeatures, Analytics, Settings
- **components/**: Sidebar, TopNavBar, ChatInput, ChatMessage, BotCard, FileUploader, Footer, Navbar
- **services/api.js**: Handles API and WebSocket communication

### Backend

- **routes/**: pdf_chat.py, excel_chat.py, qa_chat.py, general_bot.py, notebook_llm.py
- **services/**: Business logic for document and chat processing
- **models/**: Data models for documents, users, etc.

---

## 🔗 API Overview

### Core Endpoints

- `POST /api/chat/pdf` - Chat with PDF (file upload + question)
- `POST /api/pdf/upload` - Upload PDF files
- `GET /api/pdf/stats` - Collection statistics
- `GET /api/pdf/summary/<file_hash>` - Document summary
- `POST /api/pdf/compare` - Compare two documents
- `POST /api/pdf/translate/<file_hash>` - Translate document
- `POST /api/pdf/extract/<file_hash>` - Extract content
- `GET /api/pdf/tables/<file_hash>` - Extract tables
- `GET /api/pdf/forms/<file_hash>` - Extract form fields
- `GET /api/pdf/entities/<file_hash>` - Named entities
- `POST /api/pdf/search` - Semantic/cross-document search
- `POST /api/pdf/summarize` - Summarize multiple documents
- `POST /api/pdf/clear` - Clear collection

### Voice (Coming Soon)

- `POST /api/pdf/voice/query` - Voice queries
- `POST /api/pdf/voice/response` - Text-to-speech

---

## 💡 Usage Examples

- Upload PDFs, Excel, or Notebooks and chat with them
- Ask questions like:
  - "What are the key findings in this report?"
  - "Compare these two contracts."
  - "Extract all tables from the document."
  - "Translate this summary to Spanish."
- Use the sidebar to switch between bot types
- View source references and confidence scores in answers

---

## 🧪 Testing

### Backend

- Run unit tests (example):
  ```bash
  pytest
  ```

### Frontend

- Run tests:
  ```bash
  npm test
  ```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🆘 Support

- Create an issue on GitHub
- Check the troubleshooting section in backend/Readme.md
- Contact the development team
