# 🚀 FlowForge AI - Multi-Agent Marketing Campaign Generator

<div align="center">

![FlowForge AI](https://img.shields.io/badge/FlowForge-AI-blue?style=for-the-badge&logo=robot)
![Version](https://img.shields.io/badge/version-2.0.0-green?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-orange?style=for-the-badge)
![Python](https://img.shields.io/badge/python-3.11+-blue?style=for-the-badge&logo=python)
![React](https://img.shields.io/badge/react-19-61DAFB?style=for-the-badge&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-00a393?style=for-the-badge&logo=fastapi)

**Transform ideas into complete marketing campaigns in 30 seconds using AI-powered specialized agents**

[✨ Features](#-features) • [🏗️ Architecture](#️-architecture) • [🚀 Quick Start](#-quick-start) • [☁️ Deploy](#️-deploy-to-render)

</div>

---

## 📖 Overview

FlowForge AI is a **production-ready** marketing automation platform powered by a sophisticated multi-agent AI architecture. Generate comprehensive marketing briefs, campaign strategies, and content in **30-60 seconds** using specialized LLM models, intelligent caching, and real-time streaming.

### 💡 The Problem

Traditional marketing requires:
- ⏰ **Hours of research** across competitors and trends
- ✍️ **Manual content creation** for multiple channels
- 🔄 **Multiple revision cycles**
- 📊 **Fragmented workflows**

### ⚡ The Solution

FlowForge AI delivers:
- 🎯 **Complete briefs in 30 seconds**
- 🤖 **5 specialized AI agents** working together
- 💾 **Instant cached results** (0.1s)
- 📡 **Real-time progress updates**
- 🌐 **Cloud deployment** (Render.com)

---

## ✨ Features

### 🎨 User Experience
- **Modern UI**: Responsive interface with dark/light themes
- **Real-Time Updates**: Server-Sent Events (SSE) streaming
- **Instant Results**: LRU cache (30-min TTL)
- **Markdown Export**: Professional briefs

### ⚙️ Technical Excellence
- **Multi-Agent System**: 5 specialized agents
- **Smart Caching**: MD5-keyed LRU cache
- **Error Resilience**: Exponential backoff (1s → 2s → 4s)
- **Production Ready**: FastAPI + React
- **Cloud Native**: Render.com optimized

### 🔌 Integration
- **REST API**: OpenAPI/Swagger docs
- **SSE Streaming**: Real-time updates
- **Gemini AI**: Google's latest models
- **Cross-Platform**: Windows, macOS, Linux

---

## 🏗️ Architecture

### 🎯 System Overview

```
┌─────────────────────────────────────────────────────────┐
│                FlowForge AI Platform                    │
│                                                         │
│  ┌──────────────┐          ┌──────────────┐           │
│  │   Frontend   │◄── SSE ──│   Backend    │           │
│  │  React+Vite  │          │   FastAPI    │           │
│  │  Port: 3001  │          │  Port: 8000  │           │
│  └──────────────┘          └──────┬───────┘           │
│                                    │                    │
│                 ┌──────────────────┴───────┐           │
│                 │                          │           │
│          ┌──────▼──────┐          ┌────────▼───────┐  │
│          │   Cache     │          │   Gemini AI    │  │
│          │  (LRU+TTL)  │          │ gemini-1.5-flash│ │
│          └─────────────┘          └────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### 🔄 Agent Workflow

```
User Request
     │
     ▼
┌─────────────┐
│Cache Check? │── Yes ─→ Return (0.1s)
└──────┬──────┘
       │ No
       ▼
┌─────────────────────────────────────┐
│   Execute 5-Agent Pipeline          │
├─────────────────────────────────────┤
│  🎯 Planner    → Strategy           │
│  🔍 Researcher → Market Intel       │
│  ✍️ Writer     → Content            │
│  🔎 Reviewer   → Quality Check      │
│  📋 Assembler  → Final Polish       │
└──────────────┬──────────────────────┘
               │
               ▼
        Store + Return Result
```

### 🤖 Agent Specialization

| Agent | Role | Output |
|-------|------|--------|
| 🎯 **Planner** | Strategic Analysis | Execution strategy |
| 🔍 **Researcher** | Market Intelligence | Research insights |
| ✍️ **Writer** | Content Creation | Draft content |
| 🔎 **Reviewer** | Quality Assurance | Quality score + feedback |
| 📋 **Assembler** | Final Production | Professional brief |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Python 3.10+
- [Gemini API Key](https://makersuite.google.com/app/apikey) (free)

### Installation

```bash
# 1. Clone repository
git clone https://github.com/YatindraRai002/FlowForge-AI.git
cd FlowForge-AI

# 2. Backend setup
cd backend
python -m venv .venv
.venv\Scripts\activate  # Windows
# source .venv/bin/activate  # macOS/Linux
pip install -r requirements.txt

# 3. Configure environment
copy .env.example .env
# Edit .env and add your GEMINI_API_KEY

# 4. Frontend setup
cd ..
npm install

# 5. Start application
# Windows:
START_FLOWFORGE.bat

# Manual:
# Terminal 1: cd backend && python main.py
# Terminal 2: npm run dev
```

### Access

- 🌐 Frontend: `http://localhost:3001`
- 🔌 Backend API: `http://localhost:8000`
- 📚 API Docs: `http://localhost:8000/docs`

---

## ☁️ Deploy to Render

### Quick Deploy

#### 1️⃣ Backend Service

1. [Render Dashboard](https://dashboard.render.com) → **New+ → Web Service**
2. Connect: `YatindraRai002/FlowForge-AI`
3. Configure:
   - **Name**: `flowforge-backend`
   - **Root Directory**: `backend`
   - **Build**: `pip install -r requirements.txt`
   - **Start**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Environment:
   ```
   LLM_PROVIDER = gemini
   GEMINI_API_KEY = your_api_key
   PYTHON_VERSION = 3.11.0
   ```
5. **Copy backend URL** (e.g., `https://flowforge-backend.onrender.com`)

#### 2️⃣ Frontend Service

1. **New+ → Web Service**
2. Connect same repo
3. Configure:
   - **Name**: `flowforge-ai`
   - **Build**: `npm install && npm run build`
   - **Start**: `npm run start`
4. Environment:
   ```
   VITE_API_URL = https://flowforge-backend.onrender.com
   NODE_VERSION = 22.12.0
   ```

#### 3️⃣ Verify

- ✅ Backend: `https://flowforge-backend.onrender.com/health`
- ✅ Frontend: `https://flowforge-ai.onrender.com`

📖 **Detailed Guide**: [RENDER.md](RENDER.md)

---

## 🎯 Usage

### Create Campaign

1. Click "Get Started"
2. Fill campaign details:
   - Name, description
   - Target audience
   - Tone, length
3. Watch agents work (30-60s)
4. Download markdown brief

### API Example

```bash
# Start workflow
curl -X POST http://localhost:8000/api/workflow/start \
  -H "Content-Type: application/json" \
  -d '{
    "request": "AI productivity app",
    "tone": "professional"
  }'

# Stream progress
curl -N http://localhost:8000/api/workflow/stream/{id}

# Get result
curl http://localhost:8000/api/workflow/result/{id}
```

---

## 📚 Project Structure

```
FlowForge-AI/
├── backend/
│   ├── actions/          # Agent implementations
│   ├── agents/           # Agent definitions
│   ├── flowforge_core/   # Core logic
│   ├── provider/         # LLM integrations
│   ├── main.py           # FastAPI app
│   └── requirements.txt
├── src/
│   ├── components/       # UI components
│   ├── pages/           # App pages
│   └── context/         # React context
├── render.yaml          # Render config
└── README.md
```

---

## 🔧 Configuration

### Environment Variables

**Backend (.env)**:
```bash
LLM_PROVIDER=gemini
GEMINI_API_KEY=your_key
LLM_MODEL=gemini-1.5-flash
LLM_TEMPERATURE=0.7
PORT=8000
```

**Frontend**:
```bash
VITE_API_URL=http://localhost:8000
```

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | FastAPI, Pydantic |
| AI | Google Gemini |
| Frontend | React 19, Vite 7 |
| Styling | TailwindCSS 3 |
| Animations | Framer Motion |
| Deployment | Render.com |
| Updates | Server-Sent Events |

---

## 📊 Performance

| Scenario | Time | Notes |
|----------|------|-------|
| First Request | 30-60s | Full pipeline |
| Cache Hit | 0.1s | Instant |
| Retry | +1-7s | With backoff |

---

## 🐛 Troubleshooting

**Backend Issues**:
```bash
# Check Python version
python --version  # 3.10+

# Verify API key
echo $GEMINI_API_KEY

# Test backend
curl http://localhost:8000/health
```

**Frontend Issues**:
```bash
# Check VITE_API_URL
echo $VITE_API_URL

# Verify backend connection
curl http://localhost:8000/health
```

**Render Issues**:
- First request: 30-60s (cold start)
- Check backend logs in Render
- Verify environment variables

---

## 🤝 Contributing

1. Fork repository
2. Create branch: `git checkout -b feature/Amazing`
3. Commit: `git commit -m 'Add Amazing'`
4. Push: `git push origin feature/Amazing`
5. Open Pull Request

---

## 📄 License

MIT License - see [LICENSE](LICENSE)

---

## 🙏 Acknowledgments

- **Google Gemini** - AI models
- **FastAPI** - Backend framework
- **React & Vite** - Frontend tools
- **Render.com** - Cloud deployment

---

<div align="center">

**Built with ❤️ by FlowForge AI Team**

[⬆ Back to Top](#-flowforge-ai---multi-agent-marketing-campaign-generator)

</div>
