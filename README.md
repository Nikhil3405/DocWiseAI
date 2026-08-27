# DocWiseAI — AI-Powered Personal Document Intelligence Platform

**DocWiseAI** is an AI-powered personal document intelligence platform that transforms static documents into an interactive knowledge base. Upload PDFs, Word documents, or images, instantly extract structured information, and ask natural language questions using Retrieval-Augmented Generation (RAG).


## ✨ Features

* 📄 **Smart Document Upload**

  * PDF, DOCX, PNG, JPG support
  * Secure cloud storage
  * Drag & drop uploads

* 🤖 **AI-Powered Document Processing**

  * OCR for scanned documents
  * AI-generated summaries
  * Automatic metadata extraction
  * Intelligent document classification
  * Tag generation

* 💬 **AI Chat**

  * Ask questions in natural language
  * Chat across all documents
  * Chat with a specific document
  * Context-aware responses using RAG
  * Source citations

* 🔍 **Semantic Search**

  * Vector embeddings
  * Similarity search with Qdrant
  * Fast document retrieval

* 📂 **Document Management**

  * Document preview
  * Download original files
  * Favorites
  * Delete documents
  * Processing status tracking

* 📊 **Interactive Dashboard**

  * Document statistics
  * Recent uploads
  * Real-time processing updates
  * Quick actions

* 🔐 **Authentication**

  * Secure authentication using Supabase Auth
  * Protected routes
  * User-specific document isolation

---

# 🏗 Architecture

```
                Next.js Frontend
                       │
                       ▼
                 FastAPI Backend
                       │
       ┌───────────────┼────────────────┐
       ▼               ▼                ▼
 Supabase Storage   PostgreSQL      Groq LLM
       │               │
       ▼               ▼
 OCR & Processing   Document Metadata
       │
       ▼
 Vector Embeddings
       │
       ▼
 Qdrant Vector Database
       │
       ▼
 Retrieval-Augmented Generation
```

---

# 🛠 Tech Stack

## Frontend

* Next.js 15
* TypeScript
* Tailwind CSS
* shadcn/ui (Nova)
* TanStack Query
* Axios

## Backend

* FastAPI
* SQLAlchemy
* Alembic
* PostgreSQL

## AI

* Groq LLM
* Hugging Face Embeddings
* Retrieval-Augmented Generation (RAG)
* Qdrant Vector Database
* PyMuPDF
* OCR Pipeline

## Authentication & Storage

* Supabase Auth
* Supabase Storage

## Deployment

* Vercel
* Render

---

# 🚀 Workflow

```
Upload Document
        │
        ▼
Store in Supabase
        │
        ▼
Extract Text
        │
        ▼
OCR (if scanned)
        │
        ▼
Generate Metadata
        │
        ▼
Generate AI Summary
        │
        ▼
Chunk Document
        │
        ▼
Generate Embeddings
        │
        ▼
Store in Qdrant
        │
        ▼
Ready for AI Chat
```

---

# 📷 Screenshots

> Add screenshots here after deployment.

* Landing Page
* Dashboard
* Upload Dialog
* Document Preview
* AI Chat
* Favorites
* Settings

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/docwiseai.git
cd docwiseai
```

---

## Backend

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux / Mac
source venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🔑 Environment Variables

## Backend

```env
DATABASE_URL=

SUPABASE_URL=
SUPABASE_SERVICE_KEY=
SUPABASE_BUCKET=

QDRANT_URL=
QDRANT_API_KEY=

GROQ_API_KEY=

HUGGINGFACE_API_KEY=
```

## Frontend

```env
NEXT_PUBLIC_API_URL=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

---

# 📂 Project Structure

```
DocWiseAI

├── backend
│   ├── api
│   ├── models
│   ├── services
│   ├── schemas
│   ├── database
│   └── main.py
│
├── frontend
│   ├── app
│   ├── components
│   ├── features
│   ├── hooks
│   ├── services
│   └── lib
│
└── README.md
```

---

# 🔒 Security

* User authentication using Supabase Auth
* User-specific document access
* Secure cloud storage
* Server-side authorization
* Protected API endpoints
* Sensitive documents remain isolated per user
* Vector search scoped to authenticated users

---

# 🌟 Future Enhancements

* Collections & folders
* Conversation history
* Multi-document comparison
* AI-generated flashcards & quizzes
* Document sharing with permissions
* Voice interaction
* Mobile application

---

# 👨‍💻 Author

**Nikhil N Achar**

* GitHub: [https://github.com/Nikhil3405](https://github.com/Nikhil3405)
* LinkedIn: [https://linkedin.com/in/nikhil-n-3a892a2b4](https://linkedin.com/in/nikhil-n-3a892a2b4)

---

## ⭐ If you found this project interesting, consider giving it a star!
