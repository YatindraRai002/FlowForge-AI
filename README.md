# 🚀 FlowForge AI - Multi-Agent Marketing Campaign Generator

<div align="center">

![FlowForge AI](https://img.shields.io/badge/FlowForge-AI-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.0.0-green?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-orange?style=for-the-badge)

**An intelligent multi-agent system that generates complete marketing campaigns using specialized AI agents**

[Features](#-features) • [Architecture](#-architecture) • [Quick Start](#-quick-start) • [Documentation](#-documentation)

</div>

---

## 📖 Overview

FlowForge AI is a production-ready marketing automation platform that leverages a multi-agent AI architecture to generate comprehensive marketing briefs, campaign strategies, and content. Built with performance optimization in mind, it uses specialized LLM models and advanced caching mechanisms to deliver results in 30-60 seconds.

### What It Does

Instead of spending hours researching markets, writing copy, and planning campaigns, FlowForge AI orchestrates 5 specialized AI agents that work collaboratively to:

- 🎯 **Analyze** your product and target market
- 🔍 **Research** competitive landscape and trends  
- ✍️ **Write** compelling marketing content
- 🔎 **Review** and refine output quality
- 📋 **Assemble** a complete, professional marketing brief

---

## ✨ Features

### Core Capabilities

- ⚡ **Ultra-Fast Performance**: Complete workflows in 30-60 seconds using optimized models
- 🤖 **Multi-Agent Architecture**: 5 specialized agents working in orchestrated sequence
- 💾 **Intelligent Caching**: LRU cache with 30-minute TTL for instant repeat results
- 📡 **Real-Time Updates**: Server-Sent Events (SSE) for live workflow progress
- 🔄 **Auto-Retry Logic**: Exponential backoff for robust error handling
- 🎨 **Beautiful UI**: Modern, responsive interface with dark/light themes
- 🐳 **Docker Ready**: Complete containerization with nginx reverse proxy
- 📊 **Production Optimized**: Built for scale with FastAPI backend

### Technical Highlights

- **Response Caching**: MD5-keyed LRU cache reduces redundant LLM calls
- **SSE Streaming**: Real-time progress updates with automatic polling fallback
- **Model Specialization**: Each agent uses the optimal model for its task
- **Retry Resilience**: Automatic retry with 1s, 2s, 4s backoff intervals
- **Structured Responses**: Markdown parsing with title/summary extraction
- **Cross-Platform**: Windows, macOS, and Linux support

---

## 🏗️ Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        FlowForge AI Platform                        │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                ┌───────────────────┴───────────────────┐
                │                                       │
        ┌───────▼────────┐                     ┌───────▼────────┐
        │    Frontend    │                     │    Backend     │
        │   (React App)  │◄────────SSE─────────│  (FastAPI)     │
        │   Port: 3001   │                     │  Port: 8000    │
        └────────────────┘                     └────────┬────────┘
                                                        │
                                        ┌───────────────┼───────────────┐
                                        │               │               │
                                   ┌────▼────┐   ┌─────▼─────┐   ┌────▼────┐
                                   │  Cache  │   │  Ollama   │   │  Logs   │
                                   │  Layer  │   │   LLMs    │   │ System  │
                                   │ (LRU)   │   │Port: 11434│   │         │
                                   └─────────┘   └───────────┘   └─────────┘
```

### Multi-Agent Workflow Architecture

```
┌──────────────────────────────────────────────────────────────────────────┐
│                          User Request                                    │
│              "Create a campaign for AI productivity app"                 │
└────────────────────────────────┬─────────────────────────────────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │   Workflow Orchestrator │
                    │   (FastAPI Backend)     │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │   Check Cache Layer     │
                    │   (MD5 Key Lookup)      │
                    └──┬──────────────────┬───┘
                       │                  │
                 Cache Hit           Cache Miss
                       │                  │
                       ▼                  ▼
              ┌────────────┐      ┌──────────────────┐
              │   Return   │      │  Execute Agent   │
              │  Cached    │      │    Pipeline      │
              │  Result    │      └────────┬─────────┘
              │  (~0.1s)   │               │
              └────────────┘               │
                                          │
        ┌─────────────────────────────────┴─────────────────────────────────┐
        │                      Agent Execution Pipeline                      │
        │                         (Sequential)                               │
        └────────────────────────────────────────────────────────────────────┘
                │           │           │           │           │
                ▼           ▼           ▼           ▼           ▼
        ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐
        │  Agent 1  │ │  Agent 2  │ │  Agent 3  │ │  Agent 4  │ │  Agent 5  │
        │  PLANNER  │→│ RESEARCHER│→│  WRITER   │→│ REVIEWER  │→│ ASSEMBLER │
        │           │ │           │ │           │ │           │ │           │
        │ phi3:mini │ │llama3.2:3b│ │ gemma:2b  │ │qwen2.5:1.5│ │ phi3:mini │
        │  (2.2GB)  │ │  (2.0GB)  │ │  (1.7GB)  │ │  (986MB)  │ │  (2.2GB)  │
        └─────┬─────┘ └─────┬─────┘ └─────┬─────┘ └─────┬─────┘ └─────┬─────┘
              │             │             │             │             │
              ▼             ▼             ▼             ▼             ▼
        ┌─────────────────────────────────────────────────────────────────┐
        │  Creates plan  │  Researches  │  Writes    │  Reviews   │ Final │
        │  & execution   │  market data │  content   │  & scores  │polish │
        │  strategy      │  & insights  │  drafts    │  quality   │format │
        └─────────────────────────────────────────────────────────────────┘
                                         │
                              ┌──────────▼───────────┐
                              │  Store in Cache      │
                              │  Return Structured   │
                              │  Response            │
                              └──────────────────────┘
```

### Agent Roles & Responsibilities

| Agent | Model | Size | Role | Output |
|-------|-------|------|------|--------|
| **🎯 Planner** | phi3:mini | 2.2GB | Analyzes request, creates execution strategy | Structured plan with objectives |
| **🔍 Researcher** | llama3.2:3b | 2.0GB | Gathers market data, competitive analysis | Research report with insights |
| **✍️ Writer** | gemma:2b | 1.7GB | Creates marketing content and copy | Draft marketing brief |
| **🔎 Reviewer** | qwen2.5:1.5b | 986MB | Evaluates quality, identifies improvements | Quality score + feedback |
| **📋 Assembler** | phi3:mini | 2.2GB | Final formatting and polish | Complete marketing brief |

### Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Frontend (React)                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Landing Page → Create Campaign → Workflow Progress → Final Brief  │
│       │               │                    │                │       │
│       │               │                    │                │       │
│       │           ┌───▼────────────────────▼────────────────▼───┐  │
│       │           │         React Router (Client-Side)         │  │
│       │           └───┬────────────────────┬────────────────┬───┘  │
│       │               │                    │                │       │
│       │          POST /api/workflow   GET /stream    GET /result   │
│       │               │                    │                │       │
└───────┼───────────────┼────────────────────┼────────────────┼───────┘
        │               │                    │                │
        │       ┌───────▼────────────────────▼────────────────▼───┐
        │       │           FastAPI Backend (Python)              │
        │       ├─────────────────────────────────────────────────┤
        │       │                                                 │
        │       │  ┌──────────────┐      ┌──────────────┐        │
        │       │  │   Cache      │◄────►│  Workflow    │        │
        │       │  │   Manager    │      │  Orchestrator│        │
        │       │  │   (LRU/TTL)  │      │              │        │
        │       │  └──────────────┘      └──────┬───────┘        │
        │       │                               │                │
        │       │                      ┌────────▼─────────┐      │
        │       │                      │   Agent Manager   │      │
        │       │                      │   (Sequential)    │      │
        │       │                      └────────┬──────────┘      │
        │       └───────────────────────────────┼─────────────────┘
        │                                       │
        │                       ┌───────────────┼───────────────┐
        │                       │               │               │
        │                   ┌───▼───┐       ┌───▼───┐       ┌───▼───┐
        │                   │ Agent │       │ Agent │       │ Agent │
        │                   │   1   │──────►│   2   │──────►│  ...  │
        │                   └───┬───┘       └───┬───┘       └───┬───┘
        │                       │               │               │
        │                       └───────────────┴───────────────┘
        │                                       │
        │                              ┌────────▼─────────┐
        │                              │  Ollama API      │
        │                              │  (Local LLMs)    │
        │                              │  Port: 11434     │
        │                              └──────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    Response Flow (Structured)                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  {                                                                  │
│    "workflow_id": "uuid",                                           │
│    "status": "completed",                                           │
│    "result": {                                                      │
│      "title": "Marketing Campaign Title",                           │
│      "summary": "Executive summary (300 chars)",                    │
│      "body": "Full markdown content",                               │
│      "raw": "Raw markdown text"                                     │
│    },                                                               │
│    "from_cache": false                                              │
│  }                                                                  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Performance Optimization Flow

```
Request → Cache Check → [HIT] → Return Instantly (0.1s)
                    ↓
                  [MISS]
                    ↓
            Execute Pipeline
                    ↓
        ┌──────────────────────┐
        │  Ollama API Call     │
        │  with Retry Logic    │
        ├──────────────────────┤
        │  Try 1: 0s wait      │
        │  Try 2: 1s wait      │◄─── Exponential Backoff
        │  Try 3: 2s wait      │
        │  Try 4: 4s wait      │
        └──────────┬───────────┘
                   │
            [SUCCESS/FAIL]
                   ↓
        ┌──────────────────────┐
        │  Parse Response      │
        │  Extract Title       │
        │  Extract Summary     │
        │  Format Body         │
        └──────────┬───────────┘
                   │
        ┌──────────▼───────────┐
        │  Store in Cache      │
        │  (30min TTL)         │
        └──────────┬───────────┘
                   │
            Return Structured
              Response
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.10+
- **Ollama** (for local LLM inference)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FlowForge-AI-main
   ```

2. **Install Ollama and download models**
   ```bash
   # Install Ollama from https://ollama.ai
   
   # Pull optimized models (total ~7GB)
   ollama pull phi3:mini      # 2.2GB - Planner & Assembler
   ollama pull llama3.2:3b    # 2.0GB - Researcher
   ollama pull gemma:2b       # 1.7GB - Writer
   ollama pull qwen2.5:1.5b   # 986MB - Reviewer
   ```

3. **Backend Setup**
   ```bash
   cd backend
   
   # Create virtual environment
   python -m venv venv
   
   # Activate virtual environment
   # Windows:
   .\venv\Scripts\activate
   # macOS/Linux:
   source venv/bin/activate
   
   # Install dependencies
   pip install -r requirements.txt
   
   # Copy and configure environment
   cp .env.example .env
   # Edit .env to match your setup (defaults work for most cases)
   ```

4. **Frontend Setup**
   ```bash
   cd ..  # Back to root directory
   
   # Install dependencies
   npm install
   ```

5. **Start the Application**

   **Option A: Using the startup script (Windows)**
   ```bash
   ./START_FLOWFORGE.bat
   ```

   **Option B: Manual startup**
   ```bash
   # Terminal 1 - Backend
   cd backend
   python main_flowforge.py
   
   # Terminal 2 - Frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: `http://localhost:3001`
   - Backend API: `http://localhost:8000`
   - API Docs: `http://localhost:8000/docs`

---

## 🎯 Usage

### Creating Your First Campaign

1. **Navigate to Create Campaign**
   - Click "Get Started" from the landing page
   - Fill in your product/service details:
     - Campaign name
     - Product description
     - Target audience
     - Tone preference (Professional, Casual, Enthusiastic)
     - Content length

2. **Watch the Agents Work**
   - Real-time progress updates via SSE
   - Visual indicators for each agent
   - Estimated completion time: 30-60 seconds

3. **Review Your Marketing Brief**
   - Executive summary with key points
   - Full campaign strategy
   - Target audience analysis
   - Content recommendations
   - Download as Markdown

### API Usage

**Start a workflow:**
```bash
curl -X POST http://localhost:8000/api/workflow/start \
  -H "Content-Type: application/json" \
  -d '{
    "request": "AI productivity app for developers",
    "content_type": "marketing brief",
    "tone": "professional"
  }'
```

**Check workflow status:**
```bash
curl http://localhost:8000/api/workflow/status/{workflow_id}
```

**Stream workflow progress (SSE):**
```bash
curl -N http://localhost:8000/api/workflow/stream/{workflow_id}
```

**Get final result:**
```bash
curl http://localhost:8000/api/workflow/result/{workflow_id}
```

---

## 📚 Documentation

### Project Structure

```
FlowForge-AI-main/
├── backend/                    # FastAPI backend
│   ├── actions/               # Agent actions (Plan, Research, Write, etc.)
│   ├── agents/                # Agent definitions
│   ├── flowforge_core/        # Core orchestration logic
│   │   ├── llm/              # LLM provider abstractions
│   │   ├── logs/             # Logging utilities
│   │   └── base/             # Base classes
│   ├── provider/              # LLM provider implementations
│   │   └── ollama_api.py     # Ollama integration with retry logic
│   ├── config.py              # Configuration management
│   ├── main_flowforge.py      # Main FastAPI application
│   └── requirements.txt       # Python dependencies
├── src/                       # React frontend
│   ├── components/           # Reusable UI components
│   │   ├── AgentStatus.jsx   # Agent progress indicator
│   │   ├── AIChatbot.jsx     # Chat interface
│   │   ├── Card.jsx          # Card component
│   │   ├── Navbar.jsx        # Navigation bar
│   │   └── ...
│   ├── pages/                # Main application pages
│   │   ├── LandingPage.jsx   # Home page
│   │   ├── CreateCampaign.jsx # Campaign creation form
│   │   ├── WorkflowProgress.jsx # Real-time progress view
│   │   └── FinalBrief.jsx    # Results display
│   ├── context/              # React context providers
│   │   └── ThemeContext.jsx  # Dark/Light theme
│   └── data/                 # Static data
├── docker/                    # Docker configuration
│   ├── nginx.conf            # Nginx reverse proxy
│   └── start.sh              # Container startup script
├── Dockerfile                 # Multi-stage Docker build
├── docker-compose.yml         # Docker Compose configuration
├── PRODUCTION_GUIDE.md        # Production deployment guide
└── README.md                  # This file
```

### Configuration

**Backend Environment Variables** (`.env`):
```bash
# LLM Configuration
LLM_PROVIDER=ollama
LLM_MODEL=phi3:mini
LLM_TEMPERATURE=0.7
LLM_MAX_TOKENS=1024
LLM_TIMEOUT=120

# Specialized Models
PLANNER_MODEL=phi3:mini
RESEARCHER_MODEL=llama3.2:3b
WRITER_MODEL=gemma:2b
REVIEWER_MODEL=qwen2.5:1.5b
ASSEMBLER_MODEL=phi3:mini

# Ollama Settings
OLLAMA_BASE_URL=http://localhost:11434

# Server Settings
HOST=0.0.0.0
PORT=8000
```

### Key Technologies

**Backend:**
- FastAPI 0.100+ - High-performance async API framework
- Pydantic - Data validation and settings management
- Ollama - Local LLM inference
- Python 3.10+ - Core language

**Frontend:**
- React 19 - UI framework
- Vite 7 - Build tool and dev server
- TailwindCSS 3 - Utility-first CSS
- Framer Motion 12 - Animation library
- React Router 7 - Client-side routing
- React Markdown - Markdown rendering

**Infrastructure:**
- Docker - Containerization
- Nginx - Reverse proxy
- SSE (Server-Sent Events) - Real-time updates

---

## 🐳 Docker Deployment

### Build and Run with Docker Compose

```bash
# Build the image
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Manual Docker Build

```bash
# Build image
docker build -t flowforge-ai:latest .

# Run container
docker run -d \
  --name flowforge-ai \
  -p 8000:8000 \
  -p 3001:80 \
  -e OLLAMA_BASE_URL=http://host.docker.internal:11434 \
  flowforge-ai:latest
```

**Note:** Ensure Ollama is accessible from the container. On Docker Desktop, use `host.docker.internal:11434`.

---

## 🔧 Advanced Configuration

### Performance Tuning

**Cache Settings:**
```python
# In main_flowforge.py
response_cache = SimpleCache(
    max_size=50,        # Number of cached responses
    ttl_seconds=1800    # Cache lifetime (30 minutes)
)
```

**Retry Configuration:**
```python
# In provider/ollama_api.py
llm = OllamaAPI(
    max_retries=3,      # Number of retry attempts
    # Backoff: 1s, 2s, 4s
)
```

**Timeout Settings:**
```bash
# In .env
LLM_TIMEOUT=120      # Seconds before request timeout
LLM_MAX_TOKENS=1024  # Maximum tokens per response
```

### Model Customization

You can swap models for different performance/quality tradeoffs:

**For Better Quality (slower):**
```bash
RESEARCHER_MODEL=llama3:8b      # 4.7GB - Higher quality research
WRITER_MODEL=mistral:7b         # 4.1GB - Better writing
```

**For Faster Speed (lower quality):**
```bash
RESEARCHER_MODEL=tinyllama:1.1b # 637MB - Ultra-fast
WRITER_MODEL=qwen2.5:0.5b       # 352MB - Minimal size
```

### Multi-Instance Deployment

For high-traffic scenarios, run multiple backend instances:

```bash
# Instance 1
PORT=8000 python main_flowforge.py

# Instance 2
PORT=8001 python main_flowforge.py

# Use nginx for load balancing
```

---

## 📊 Monitoring & Logging

### Health Check Endpoint

```bash
curl http://localhost:8000/health
```

Response:
```json
{
  "status": "healthy",
  "ollama_connected": true,
  "models_loaded": [
    "phi3:mini",
    "llama3.2:3b",
    "gemma:2b",
    "qwen2.5:1.5b"
  ]
}
```

### Workflow Metrics

The system logs:
- Request/response times
- Cache hit/miss rates
- Agent execution duration
- Error rates and retry attempts

Check logs in `backend/logs/` directory.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow PEP 8 for Python code
- Use ESLint/Prettier for JavaScript
- Write unit tests for new features
- Update documentation as needed

---

## 🐛 Troubleshooting

### Common Issues

**1. Ollama Connection Failed**
```bash
# Check if Ollama is running
ollama list

# Start Ollama service
ollama serve
```

**2. Port Already in Use**
```bash
# Windows - Find and kill process
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:8000 | xargs kill -9
```

**3. Models Not Found**
```bash
# Verify models are downloaded
ollama list

# Pull missing models
ollama pull phi3:mini
ollama pull llama3.2:3b
ollama pull gemma:2b
ollama pull qwen2.5:1.5b
```

**4. Frontend Can't Connect to Backend**
- Check backend is running: `http://localhost:8000/health`
- Verify CORS settings in `main_flowforge.py`
- Check firewall/antivirus blocking port 8000

**5. Slow Workflow Performance**
- Ensure you're using optimized models (not large variants)
- Check available RAM (need 8GB+ for 4 models)
- Verify cache is working (check logs for cache hits)

---

## 📈 Performance Benchmarks

| Configuration | Time | Cache Hit Time |
|--------------|------|----------------|
| Optimized Models (phi3:mini, llama3.2:3b, etc.) | 30-60s | ~0.1s |
| Standard Models (llama3:8b, mistral:7b) | 2-4 min | ~0.1s |
| Large Models (llama3:70b, mixtral:8x7b) | 5-10 min | ~0.1s |

**Hardware Tested:**
- CPU: Intel i7-10th Gen / AMD Ryzen 5 5600X
- RAM: 16GB
- No GPU required (CPU inference)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Ollama** - For providing local LLM inference
- **FastAPI** - For the excellent async Python framework
- **React & Vite** - For modern frontend tooling
- **MetaGPT** - For multi-agent architecture inspiration

---

## 📞 Support

- **Documentation**: [PRODUCTION_GUIDE.md](PRODUCTION_GUIDE.md)
- **Issues**: Open an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions

---

<div align="center">

**Built with ❤️ by the FlowForge AI Team**

[⬆ Back to Top](#-flowforge-ai---multi-agent-marketing-campaign-generator)

</div>
