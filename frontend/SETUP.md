# 🚀 FlowForge AI - Setup Guide

## Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.10+
- **Git**
- **Ollama** (for local LLM) OR **Gemini API Key** (for cloud LLM)

---

## Quick Start (5 minutes)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YatindraRai002/FlowForge-AI.git
cd FlowForge-AI
```

### 2️⃣ Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# macOS/Linux:
# source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
copy .env.example .env    # Windows
# cp .env.example .env    # macOS/Linux
```

### 3️⃣ Configure Environment

Edit `backend/.env` and choose ONE option:

**Option A: Using Ollama (Recommended - Free, runs locally)**
```env
LLM_PROVIDER=ollama
LLM_MODEL=llama3.2:3b
OLLAMA_BASE_URL=http://localhost:11434
```

Install and start Ollama:
```bash
# 1. Install Ollama from https://ollama.ai
# 2. Pull the model:
ollama pull llama3.2:3b
# 3. Ollama will auto-start, or run:
ollama serve
```

**Option B: Using Gemini (Cloud - Requires API key)**
```env
LLM_PROVIDER=gemini
LLM_MODEL=gemini-1.5-flash
GEMINI_API_KEY=your_actual_gemini_api_key_here
```
Get free API key: https://makersuite.google.com/app/apikey

### 4️⃣ Frontend Setup

```bash
# Go back to root directory
cd ..

# Install dependencies
npm install
```

### 5️⃣ Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
.venv\Scripts\activate    # Windows
# source .venv/bin/activate    # macOS/Linux
python main.py
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 6️⃣ Access the App

Open http://localhost:3000 in your browser!

---

## Troubleshooting

### ❌ Backend won't start

**Problem:** `GEMINI_API_KEY not set`
- **Solution:** Make sure you created `backend/.env` from `.env.example` and added your API key

**Problem:** `Cannot connect to Ollama`
- **Solution:** 
  1. Install Ollama from https://ollama.ai
  2. Run `ollama serve` in a terminal
  3. Pull model: `ollama pull llama3.2:3b`

**Problem:** `ModuleNotFoundError`
- **Solution:** Make sure virtual environment is activated and run `pip install -r requirements.txt`

### ❌ Frontend won't connect to backend

**Problem:** API errors in browser console
- **Solution:** Make sure backend is running on port 8000
- Check `http://localhost:8000/health` returns `{"status": "healthy"}`

### ❌ Agents not working

**Problem:** Workflow starts but agents don't progress
- **Solution:** 
  - If using Ollama: Make sure Ollama is running (`ollama serve`)
  - If using Gemini: Check your API key is valid
  - Check backend terminal for error messages

---

## Environment Variables Reference

### Backend (.env)

```env
# LLM Provider (choose one)
LLM_PROVIDER=gemini          # or "ollama"
LLM_MODEL=gemini-1.5-flash   # or "llama3.2:3b" for Ollama

# Gemini API (if using Gemini)
GEMINI_API_KEY=your_key_here

# Ollama (if using Ollama)
OLLAMA_BASE_URL=http://localhost:11434

# Server Settings
PORT=8000
HOST=0.0.0.0
LOG_LEVEL=INFO
```

### Frontend (optional)

Create `.env` in root directory:
```env
VITE_API_URL=http://localhost:8000
```

---

## Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for deploying to:
- Vercel (Frontend)
- Railway/Render (Backend)
- Or other platforms

---

## Need Help?

- Check [README.md](./README.md) for full documentation
- Open an issue on GitHub
- Make sure all prerequisites are installed
