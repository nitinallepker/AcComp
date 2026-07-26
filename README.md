# 📚 AcComp 
-- Your Personal AI Assistant for Academic Learning and Concept Mastery --

AcComp is an AI-powered academic learning assistant designed to transform lengthy technical textbooks into an interactive learning experience. Instead of manually searching through hundreds of pages, students can upload an academic book and ask questions naturally. The AI analyzes the uploaded content and delivers accurate, context-aware answers in either concise exam-focused form or detailed conceptual explanations.

---

## 🚀 Live Demo

**Frontend:** https://accomp-frontend.vercel.app/

**Backend API:** https://accomp.onrender.com

---

## ✨ Features

- 📖 Upload academic PDF books
- 🧠 AI-powered contextual question answering
- 🎯 Exam Mode for concise revision-oriented answers
- 📚 Depth Mode for detailed conceptual explanations
- 📁 Manage multiple uploaded books
- ⚡ Fast and intuitive React interface
- 🌐 Fully deployed using Vercel and Render
- 💬 Interactive chat interface
- 🎓 Designed for higher education and technical learning

---

## 💡 Project Story

Traditional academic textbooks often contain hundreds or even thousands of pages. Although they are rich in information, locating specific concepts quickly can be time-consuming and overwhelming.

AcComp addresses this challenge by converting uploaded academic books into an intelligent knowledge source. Rather than searching page by page, users simply upload a textbook, select it from their library, and ask questions in natural language.

Depending on the learner's objective, AcComp provides two learning styles:

- **Exam Mode** — Short, focused answers suitable for revision and examinations.
- **Depth Mode** — Detailed explanations for conceptual understanding.

The project demonstrates how Generative AI can make technical education more interactive, efficient, and personalized.

---

## 🛠 Tech Stack

### Frontend

- React
- Vite
- Axios
- CSS

### Backend

- FastAPI
- Python
- Uvicorn

### AI

- Google Gemini API

### Deployment

- Vercel
- Render

---

## ⚙️ System Architecture

```
User
   │
   ▼
React Frontend (Vercel)
   │
HTTP Requests
   │
   ▼
FastAPI Backend (Render)
   │
PDF Processing
   │
Google Gemini API
   │
AI Response
   │
   ▼
Frontend Chat Interface
```

---

## 📂 Project Structure

```
AcComp/
│
├── backend/
│   ├── main.py
│   ├── upload.py
│   ├── chunk_service.py
│   ├── ai.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── screenshots/
│
└── README.md
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/AcComp.git
```

---

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## 📸 Screenshots
![AcComp UI](/UI.png)

### Home Interface

<p align="center">
<img src="screenshots/accomp-ui.png" width="100%">
</p>

---

## 🎯 Future Improvements

- Chat history
- Authentication
- Multiple file upload
- Semantic search
- OCR support
- Voice interaction
- Citation with page references
- Better document indexing
- Support for Word and PPT documents

---

## 👨‍💻 Author

**Nitin Anand**

---
