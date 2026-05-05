# 🚀 FlowForge AI

<div align="center">

![Version](https://img.shields.io/badge/version-2.0.0-00C853?style=for-the-badge)
![Python](https://img.shields.io/badge/python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![React](https://img.shields.io/badge/react-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-LLM-FF6B35?style=for-the-badge&logo=ai&logoColor=white)

**Enterprise-grade multi-agent AI system for automated marketing content generation**

Transform ideas into complete marketing campaigns in 30 seconds with 5 specialized AI agents working in perfect harmony.

[Features](#-features) • [Quick Start](#-quick-start) • [Deploy](#-deployment) • [API Docs](#-api-reference)

</div>

---

## 📖 Overview

**FlowForge AI** orchestrates 5 autonomous AI agents that collaborate to generate professional marketing campaigns. Built on FastAPI and Groq LLM, it delivers production-ready content in under 60 seconds.

### 🎯 Key Benefits

| Traditional | FlowForge AI |
|------------|--------------|
| ⏰ 8-12 hours per campaign | ⚡ 30-60 seconds |
| 🔄 Multiple revision cycles | ✅ Single-pass generation |
| 💰 High operational cost | 💸 Minimal cost (Groq LLM) |
| 👥 Multiple specialists needed | 🤖 One-click automation |

### 🤖 Agent Pipeline

```
User Input → 🎯 Planner → 🔍 Researcher → ✍️ Writer → 🔎 Critic → 📋 Assembler → Marketing Brief
```

**Agent Roles:**
- **Planner**: Strategic analysis and execution strategy
- **Researcher**: Market intelligence and competitive insights
- **Writer**: Data-driven content creation
- **Critic**: Quality assurance and enhancement
- **Assembler**: Final polish and formatting

---

## ✨ Features

<table>
<tr>
<td width="33%" align="center">

### 🎨 User Experience
**Modern & Intuitive**

- Responsive dark/light themes
- Real-time progress tracking
- One-click campaign generation
- Instant markdown export
- Mobile-friendly interface
- **Campaign history tracking**
- **Snowfall visual effects**

</td>
<td width="33%" align="center">

### ⚙️ Technical Excellence
**Production Ready**

- Multi-agent orchestration
- Intelligent LRU caching
- SSE real-time streaming
- Exponential retry logic
- 99.9% uptime architecture
- **Persistent state management**
- Groq LLM (llama-3.1-8b-instant)

</td>
<td width="33%" align="center">

### 🔌 Integration
**Developer Friendly**

- RESTful API with OpenAPI
- WebSocket support
- Groq LLM integration
- Cross-platform compatible
- Easy cloud deployment
- **Zustand state management**

</td>
</tr>
</table>

---

## 📊 System Architecture

### 🏗️ High-Level Architecture

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[React SPA<br/>Port 3001]
        A1[TailwindCSS UI]
        A2[Framer Motion]
        A3[React Router]
        A --> A1
        A --> A2
        A --> A3
    end
    
    subgraph "Communication Layer"
        B[Server-Sent Events<br/>SSE Stream]
        C[REST API<br/>JSON/HTTP]
    end
    
    subgraph "Backend Layer"
        D[FastAPI Server<br/>Port 8000]
        D1[Pydantic Validation]
        D2[Async Workers]
        D --> D1
        D --> D2
    end
    
    subgraph "Core Services"
        E[Workflow Orchestrator]
        F[Cache Manager<br/>LRU + TTL]
        G[Agent Manager]
    end
    
    subgraph "AI Layer"
        H[Groq LLM API]
        H1[llama-3.1-8b-instant]
        H2[Retry Logic<br/>1s→2s→4s]
        H --> H1
        H --> H2
    end
    
    subgraph "Agent Pipeline"
        I1[🎯 Planner]
        I2[🔍 Researcher]
        I3[✍️ Writer]
        I4[🔎 Reviewer]
        I5[📋 Assembler]
        I1 --> I2 --> I3 --> I4 --> I5
    end
    
    A <-->|SSE| B
    A <-->|REST| C
    B --> D
    C --> D
    D --> E
    E --> F
    E --> G
    G --> I1
    I5 --> H
    H --> F
    F --> D
    
    style A fill:#61DAFB,stroke:#21A0D2,color:#000
    style D fill:#009688,stroke:#00695C,color:#fff
    style E fill:#2196F3,stroke:#1565C0,color:#fff
    style F fill:#FF9800,stroke:#E65100,color:#fff
    style H fill:#8E75B2,stroke:#6A4C9A,color:#fff
    style I1 fill:#FF9800,stroke:#E65100,color:#fff
    style I2 fill:#9C27B0,stroke:#6A1B9A,color:#fff
    style I3 fill:#3F51B5,stroke:#283593,color:#fff
    style I4 fill:#E91E63,stroke:#AD1457,color:#fff
    style I5 fill:#00BCD4,stroke:#00838F,color:#fff
```

### 🔄 Data Flow Architecture

```mermaid
sequenceDiagram
    participant U as 👤 User
    participant F as 🖥️ Frontend
    participant B as ⚙️ Backend
    participant C as 💾 Cache
    participant A as 🤖 Agents
    participant G as 🧠 Groq LLM
    
    U->>F: Submit Campaign Request
    F->>B: POST /api/workflow/start
    B->>C: Check Cache (MD5 Hash)
    
    alt Cache Hit
        C-->>B: Return Cached Result
        B-->>F: Instant Response (0.1s)
        F-->>U: Display Brief
    else Cache Miss
        B->>A: Execute Agent Pipeline
        
        loop 5 Agents Sequential
            A->>G: Generate Content
            G-->>A: AI Response
            A->>F: SSE Progress Update
            F->>U: Show Agent Status
        end
        
        A->>C: Store Result (30min TTL)
        A-->>B: Final Brief
        B-->>F: Complete Response
        F-->>U: Display Brief
    end
    
    Note over U,G: Total Time: 30-60s (first) | 0.1s (cached)
```

### 🤖 Agent Specialization Matrix

```mermaid
graph TD
    subgraph "Agent Pipeline"
        A1[🎯 PLANNER<br/>Strategic Analysis]
        A2[🔍 RESEARCHER<br/>Market Intelligence]
        A3[✍️ WRITER<br/>Content Creation]
        A4[🔎 REVIEWER<br/>Quality Assurance]
        A5[📋 ASSEMBLER<br/>Final Production]
    end
    
    A1 -->|Execution Strategy| A2
    A2 -->|Research Insights| A3
    A3 -->|Draft Content| A4
    A4 -->|Quality Score| A5
    A5 -->|Polished Brief| OUT[📄 Final Output]
    
    A1 -.->|Analyzes| T1[Target Audience<br/>Campaign Goals<br/>Success Metrics]
    A2 -.->|Gathers| T2[Competitive Data<br/>Market Trends<br/>Customer Insights]
    A3 -.->|Creates| T3[Marketing Copy<br/>Campaign Messaging<br/>Call-to-Actions]
    A4 -.->|Evaluates| T4[Clarity Score<br/>Tone Alignment<br/>Effectiveness]
    A5 -.->|Produces| T5[Formatted Brief<br/>Executive Summary<br/>Action Items]
    
    style A1 fill:#FF9800,stroke:#E65100,color:#fff
    style A2 fill:#9C27B0,stroke:#6A1B9A,color:#fff
    style A3 fill:#3F51B5,stroke:#283593,color:#fff
    style A4 fill:#E91E63,stroke:#AD1457,color:#fff
    style A5 fill:#00BCD4,stroke:#00838F,color:#fff
    style OUT fill:#4CAF50,stroke:#2E7D32,color:#fff
```

---

## 🎯 Use Cases

### 📱 Use Case Diagram

```mermaid
graph LR
    subgraph "User Roles"
        U1[👨‍💼 Marketing Manager]
        U2[✍️ Content Creator]
        U3[🎨 Creative Director]
        U4[🏢 Business Owner]
        U5[💻 Developer]
    end
    
    subgraph "Core Features"
        F1[📝 Create Campaign]
        F2[📊 View Analytics]
        F3[💾 Export Brief]
        F4[🔄 Iterate Content]
        F5[🎯 Set Parameters]
    end
    
    subgraph "System Functions"
        S1[🤖 Agent Orchestration]
        S2[💾 Cache Management]
        S3[📡 Real-time Streaming]
        S4[🔌 API Integration]
    end
    
    U1 --> F1
    U1 --> F2
    U2 --> F1
    U2 --> F3
    U3 --> F4
    U3 --> F5
    U4 --> F1
    U4 --> F2
    U5 --> F4
    U5 --> S4
    
    F1 --> S1
    F2 --> S2
    F3 --> S1
    F4 --> S1
    F5 --> S3
    
    style U1 fill:#2196F3,stroke:#1565C0,color:#fff
    style U2 fill:#4CAF50,stroke:#2E7D32,color:#fff
    style U3 fill:#FF9800,stroke:#E65100,color:#fff
    style U4 fill:#9C27B0,stroke:#6A1B9A,color:#fff
    style U5 fill:#E91E63,stroke:#AD1457,color:#fff
```

### 💼 Real-World Scenarios

<table>
<tr>
<td width="50%">

#### 🚀 Scenario 1: Product Launch
**User**: Startup founder launching AI productivity app

**Input**:
- Product: AI task manager
- Audience: Remote workers, 25-40
- Tone: Professional, innovative

**Output**:
- Complete go-to-market strategy
- Target audience analysis
- 5 campaign channels
- 10+ content ideas
- Competitive positioning

**Time**: 45 seconds

</td>
<td width="50%">

#### 📱 Scenario 2: Social Media Campaign
**User**: Content creator for tech brand

**Input**:
- Campaign: Holiday season promo
- Platform: Instagram, LinkedIn
- Tone: Enthusiastic, engaging

**Output**:
- Platform-specific content
- Hashtag strategy
- Post schedule
- Engagement tactics
- Performance metrics

**Time**: 38 seconds

</td>
</tr>
<tr>
<td width="50%">

#### 🎯 Scenario 3: Rebranding
**User**: Marketing agency rebranding client

**Input**:
- Current: Traditional B2B
- Target: Modern tech-forward
- Audience: Enterprise CTOs

**Output**:
- Brand positioning
- Messaging framework
- Content pillars
- Channel strategy
- Implementation roadmap

**Time**: 52 seconds

</td>
<td width="50%">

#### 💡 Scenario 4: API Integration
**User**: Developer building marketing automation

**Input**: REST API call with campaign parameters

**Output**:
- JSON formatted brief
- Structured data
- Markdown export
- Real-time webhooks
- Custom templates

**Time**: 35 seconds (cached: 0.1s)

</td>
</tr>
</table>

---

## 🔄 Workflow States

```mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> Initializing: User submits request
    Initializing --> CacheCheck: Validate input
    
    CacheCheck --> CacheHit: Result found
    CacheCheck --> CacheMiss: Result not found
    
    CacheHit --> Completed: Return cached result (0.1s)
    
    CacheMiss --> Planning: Execute pipeline
    Planning --> Researching: Strategy ready
    Researching --> Writing: Data gathered
    Writing --> Reviewing: Content drafted
    Reviewing --> Assembling: Quality checked
    Assembling --> Caching: Brief polished
    Caching --> Completed: Store result
    
    Completed --> [*]
    
    Planning --> Error: Agent failure
    Researching --> Error: Timeout
    Writing --> Error: API error
    Reviewing --> Error: Validation failed
    
    Error --> Retrying: Exponential backoff
    Retrying --> Planning: Retry (1s, 2s, 4s)
    Retrying --> Failed: Max retries exceeded
    Failed --> [*]
```

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
│          │   Cache     │          │   Groq LLM     │  │
│          │  (LRU+TTL)  │          │llama-3.1-8b-instant│ │
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
>>>>>>> 0043940b29c6c9911d46ae0c07cdcb827b75a966

---

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** and npm
- **Python 3.10+**
- **Groq API Key** (free): [Get yours here](https://console.groq.com/)

<<<<<<< HEAD
### Local Setup
=======
**Required Software**
- Node.js 18+ and npm
- Python 3.10+
- Git

</td>
<td width="50%">

**API Keys (Free)**
- [Groq API Key](https://console.groq.com/)
- GitHub account (for deployment)

</td>
</tr>
</table>

### 💻 Local Development Setup
>>>>>>> 0043940b29c6c9911d46ae0c07cdcb827b75a966

```bash
# 1. Clone repository
git clone https://github.com/YatindraRai002/FlowForge-AI.git
cd FlowForge-AI

# 2. Backend setup
cd backend
python -m venv .venv
.venv\Scripts\activate          # Windows
# source .venv/bin/activate     # macOS/Linux

pip install -r requirements.txt

# 3. Configure environment
copy .env.example .env          # Windows
# cp .env.example .env          # macOS/Linux

<<<<<<< HEAD
# Edit backend/.env:
# GROQ_API_KEY=your_groq_api_key_here
=======
# Edit backend/.env and add your API key:
# GROQ_API_KEY=your_actual_groq_api_key_here
>>>>>>> 0043940b29c6c9911d46ae0c07cdcb827b75a966
# GROQ_MODEL=llama-3.1-8b-instant

# 4. Frontend setup
cd ..
npm install

# 5. Start application
# Terminal 1: cd backend && .venv\Scripts\activate && python main.py
# Terminal 2: npm run dev
```



| Service | URL | Description |
|---------|-----|-------------|
| 🖥️ Frontend | `http://localhost:3001` | React UI |
| ⚙️ Backend API | `http://localhost:8000` | FastAPI Server |
| 📚 API Docs | `http://localhost:8000/docs` | Swagger UI |

---



<<<<<<< HEAD
#### Backend Service
=======
```mermaid
graph TB
    subgraph "Render.com Cloud"
        subgraph "Frontend Service"
            F1[Static Web Service]
            F2[Nginx Server]
            F3[React Build]
            F1 --> F2 --> F3
        end
        
        subgraph "Backend Service"
            B1[Web Service]
            B2[Uvicorn ASGI]
            B3[FastAPI App]
            B1 --> B2 --> B3
        end
        
        subgraph "External Services"
            E1[Groq LLM API]
            E2[GitHub Repository]
        end
    end
    
    U[👤 Users] -->|HTTPS| F1
    F3 -->|REST/SSE| B3
    B3 -->|API Calls| E1
    E2 -->|Auto Deploy| F1
    E2 -->|Auto Deploy| B1
    
    style F1 fill:#61DAFB,stroke:#21A0D2,color:#000
    style B1 fill:#009688,stroke:#00695C,color:#fff
    style E1 fill:#8E75B2,stroke:#6A4C9A,color:#fff
    style E2 fill:#24292e,stroke:#000,color:#fff
```
>>>>>>> 0043940b29c6c9911d46ae0c07cdcb827b75a966

1. Go to [Render Dashboard](https://dashboard.render.com) → **New+ → Web Service**
2. Connect GitHub: `YatindraRai002/FlowForge-AI`
3. Configure:
   - **Name**: `flowforge-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

4. **Environment Variables**:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   GROQ_MODEL=llama-3.1-8b-instant
   PYTHON_VERSION=3.14.0
   ```

5. Deploy and copy your backend URL

#### Frontend Service

1. **New+ → Web Service** → Same GitHub repo
2. Configure:
   - **Name**: `flowforge-ai`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`

3. **Environment Variables**:
   ```env
   VITE_API_URL=https://your-backend-url.onrender.com
   NODE_VERSION=22.12.0
   ```

4. Deploy and access your app!

### Verification

<<<<<<< HEAD
```bash
# Health check
curl https://your-backend.onrender.com/health
=======
- [ ] Backend health check: `https://your-backend.onrender.com/health`
  ```json
  {"status": "healthy", "provider": "groq", "model": "llama-3.1-8b-instant"}
  ```
- [ ] Frontend loads: `https://your-frontend.onrender.com`
- [ ] Create test campaign works
- [ ] Agents execute successfully
- [ ] Results display correctly
>>>>>>> 0043940b29c6c9911d46ae0c07cdcb827b75a966

# Expected response:
{"status": "healthy", "provider": "groq", "model": "llama-3.1-8b-instant"}
```

---

## 📡 API Reference

### Start Workflow

```bash
curl -X POST http://localhost:8000/api/workflow/start \
  -H "Content-Type: application/json" \
  -d '{
    "request": "Launch campaign for AI productivity app targeting remote workers",
    "tone": "professional",
    "length": "medium",
    "format": "marketing brief"
  }'
```

**Response:**
```json
{
  "workflow_id": "uuid-here",
  "status": "started",
  "message": "Workflow started successfully"
}
```

### Stream Progress (SSE)

```bash
curl -N http://localhost:8000/api/workflow/stream/{workflow_id}
```

### Get Result

```bash
curl http://localhost:8000/api/workflow/result/{workflow_id}
```

**Response:**
```json
{
  "workflow_id": "uuid-here",
  "status": "completed",
  "result": {
    "title": "AI Productivity App Campaign",
    "summary": "Executive summary...",
    "body": "Full markdown content...",
    "raw": "Raw markdown text"
  },
  "execution_time": 45.2
}
```

---

## 🏗️ Architecture

### System Overview

```mermaid
graph TB
    subgraph "Client Layer"
        U[👤 User]
        UI[🖥️ React Frontend<br/>Port 3001]
    end
    
    subgraph "Communication"
        SSE[📡 Server-Sent Events]
        REST[🔌 REST API]
    end
    
    subgraph "Backend Layer"
        API[⚙️ FastAPI Server<br/>Port 8000]
        ORCH[🎯 Orchestrator]
        CACHE[💾 LRU Cache<br/>30min TTL]
    end
    
    subgraph "Agent Pipeline"
        A1[🎯 Planner<br/>Strategy]
        A2[🔍 Researcher<br/>Market Intel]
        A3[✍️ Writer<br/>Content]
        A4[🔎 Critic<br/>Quality]
        A5[📋 Assembler<br/>Polish]
    end
    
    subgraph "AI Layer"
        GROQ[🧠 Groq LLM API<br/>llama-3.1-8b-instant]
    end
    
    U --> UI
    UI <-->|Real-time Updates| SSE
    UI <-->|HTTP/JSON| REST
    SSE --> API
    REST --> API
    API --> ORCH
    ORCH --> CACHE
    ORCH --> A1
    A1 --> A2 --> A3 --> A4 --> A5
    A1 & A2 & A3 & A4 & A5 -.->|LLM Calls| GROQ
    GROQ -.->|Responses| A5
    A5 --> CACHE
    CACHE --> API
    
    style UI fill:#61DAFB,stroke:#21A0D2,color:#000
    style API fill:#009688,stroke:#00695C,color:#fff
    style ORCH fill:#2196F3,stroke:#1565C0,color:#fff
    style CACHE fill:#FF9800,stroke:#E65100,color:#fff
    style A1 fill:#FF9800,stroke:#E65100,color:#fff
    style A2 fill:#9C27B0,stroke:#6A1B9A,color:#fff
    style A3 fill:#3F51B5,stroke:#283593,color:#fff
    style A4 fill:#E91E63,stroke:#AD1457,color:#fff
    style A5 fill:#00BCD4,stroke:#00838F,color:#fff
    style GROQ fill:#FF6B35,stroke:#D84315,color:#fff
```

### Tech Stack

**Backend:**
- FastAPI (async/await)
- Groq LLM (llama-3.1-8b-instant)
- LangChain integration
- Pydantic validation

**Frontend:**
- React 19
- Vite
- TailwindCSS
- Framer Motion

**Infrastructure:**
- Server-Sent Events (SSE)
- LRU caching with TTL
- Exponential retry logic
- Production-ready error handling

### Project Structure

```
FlowForge-AI/
├── backend/
│   ├── agents/          # 5 specialized AI agents
│   ├── utils/           # Groq client, event bus
│   ├── llm_factory.py   # Centralized LLM configuration
│   ├── orchestrator.py  # Workflow orchestration
│   └── main.py          # FastAPI application
├── frontend/
│   └── src/
│       ├── pages/       # React pages
│       └── components/  # Reusable components
└── README.md
```



---

## 🔧 Configuration

### Supported Groq Models

| Model | Use Case | Speed | Quality |
|-------|----------|-------|---------|
| `llama-3.1-8b-instant` | **Default** - Fast responses | ⚡⚡⚡ | ⭐⭐⭐ |
| `mixtral-8x7b-32768` | Better reasoning | ⚡⚡ | ⭐⭐⭐⭐ |
| `llama-3.1-70b-versatile` | Maximum capability | ⚡ | ⭐⭐⭐⭐⭐ |

### Environment Variables

```env
# Required
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.1-8b-instant

# Optional
LLM_TEMPERATURE=0.2
LLM_MAX_TOKENS=2048
PORT=8000
HOST=0.0.0.0
LOG_LEVEL=INFO
```

---

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📧 Support

For issues and questions:
- 🐛 [GitHub Issues](https://github.com/YatindraRai002/FlowForge-AI/issues)
- 📖 [Documentation](https://github.com/YatindraRai002/FlowForge-AI)

---

<div align="center">

**Built with ❤️ using FastAPI, React, and Groq LLM**

⭐ Star this repo if you find it useful!

</div>
