# 🚀 FlowForge AI - Multi-Agent Marketing Campaign Generator

<div align="center">

![FlowForge AI Banner](https://img.shields.io/badge/FlowForge-AI%20Powered-4285F4?style=for-the-badge&logo=robot&logoColor=white)

![Version](https://img.shields.io/badge/version-2.0.0-00C853?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-FF6F00?style=for-the-badge)
![Python](https://img.shields.io/badge/python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![React](https://img.shields.io/badge/react-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-LLM-FF6B35?style=for-the-badge&logo=ai&logoColor=white)

### **Transform ideas into complete marketing campaigns in 30 seconds**
### **Powered by 5 specialized AI agents working in perfect harmony**

[✨ Features](#-features) • [📊 Architecture](#-system-architecture) • [🎯 Use Cases](#-use-cases) • [🚀 Quick Start](#-quick-start) • [☁️ Deploy](#️-deployment)

---

**Live Demo**: *Deploy to Render.com in 5 minutes* | **Documentation**: *Complete setup guides included*

</div>

---

## 📖 Overview

**FlowForge AI** is a production-ready marketing automation platform that uses a sophisticated **multi-agent AI architecture** to generate comprehensive marketing campaigns. Instead of spending hours on research, writing, and revisions, FlowForge orchestrates 5 specialized AI agents that work collaboratively to deliver professional results in **30-60 seconds**.

### 💡 The Problem We Solve

<table>
<tr>
<td width="50%">

**Traditional Marketing Workflow**
- ⏰ **8-12 hours** per campaign
- 🔄 Multiple revision cycles
- 📊 Fragmented tools & workflows
- 💰 High cost per campaign
- 👥 Requires multiple specialists

</td>
<td width="50%">

**FlowForge AI Workflow**
- ⚡ **30-60 seconds** per campaign
- ✅ Single-pass generation
- 🤖 Unified AI platform
- 💸 Minimal operational cost
- 🎯 One-click automation

</td>
</tr>
</table>

### ⚡ How It Works

```mermaid
graph LR
    A[📝 User Input] --> B[🧠 AI Orchestrator]
    B --> C[🎯 Planner Agent]
    C --> D[🔍 Researcher Agent]
    D --> E[✍️ Writer Agent]
    E --> F[🔎 Reviewer Agent]
    F --> G[📋 Assembler Agent]
    G --> H[📄 Marketing Brief]
    
    style A fill:#4CAF50,stroke:#2E7D32,color:#fff
    style B fill:#2196F3,stroke:#1565C0,color:#fff
    style C fill:#FF9800,stroke:#E65100,color:#fff
    style D fill:#9C27B0,stroke:#6A1B9A,color:#fff
    style E fill:#3F51B5,stroke:#283593,color:#fff
    style F fill:#E91E63,stroke:#AD1457,color:#fff
    style G fill:#00BCD4,stroke:#00838F,color:#fff
    style H fill:#4CAF50,stroke:#2E7D32,color:#fff
```

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

</td>
<td width="33%" align="center">

### ⚙️ Technical Excellence
**Production Ready**

- Multi-agent orchestration
- Intelligent LRU caching
- SSE real-time streaming
- Exponential retry logic
- 99.9% uptime architecture

</td>
<td width="33%" align="center">

### 🔌 Integration
**Developer Friendly**

- RESTful API with OpenAPI
- WebSocket support
- Groq LLM integration
- Cross-platform compatible
- Easy cloud deployment

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

---

## 🚀 Quick Start

### 📋 Prerequisites

<table>
<tr>
<td width="50%">

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

```bash
# 1️⃣ Clone repository
git clone https://github.com/YatindraRai002/FlowForge-AI.git
cd FlowForge-AI

# 2️⃣ Backend setup
cd backend
python -m venv .venv

# Activate virtual environment
.venv\Scripts\activate          # Windows
# source .venv/bin/activate     # macOS/Linux

pip install -r requirements.txt

# 3️⃣ Configure environment
copy .env.example .env          # Windows
# cp .env.example .env          # macOS/Linux

# Edit backend/.env and add your API key:
# GROQ_API_KEY=your_actual_groq_api_key_here
# GROQ_MODEL=llama-3.1-8b-instant

# 4️⃣ Frontend setup
cd ..
npm install

# 5️⃣ Start application
START_FLOWFORGE.bat             # Windows (Easy - Auto setup!)

# Or manually:
# Terminal 1: cd backend && .venv\Scripts\activate && python main.py
# Terminal 2: npm run dev
```

> **⚠️ IMPORTANT:** After cloning, you MUST create `backend/.env` from `backend/.env.example` and add your Groq API key. See [SETUP.md](./SETUP.md) for detailed instructions.

### 🌐 Access Your Application

| Service | URL | Description |
|---------|-----|-------------|
| 🖥️ Frontend | `http://localhost:3001` | React UI |
| ⚙️ Backend API | `http://localhost:8000` | FastAPI Server |
| 📚 API Docs | `http://localhost:8000/docs` | Swagger UI |
| 🔍 Health Check | `http://localhost:8000/health` | Status endpoint |

---

## ☁️ Deployment

### 🎯 Deployment Architecture

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

### 🚀 Deploy to Render.com

#### 1️⃣ Deploy Backend Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New+ → Web Service**
3. Connect GitHub: `YatindraRai002/FlowForge-AI`
4. Configure:
   
   | Setting | Value |
   |---------|-------|
   | **Name** | `flowforge-backend` |
   | **Root Directory** | `backend` |
   | **Environment** | `Python 3` |
   | **Build Command** | `pip install -r requirements.txt` |
   | **Start Command** | `uvicorn main:app --host 0.0.0.0 --port $PORT` |

5. **Add Environment Variables**:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   GROQ_MODEL=llama-3.1-8b-instant
   PYTHON_VERSION=3.11.0
   ```

6. Click **Create Web Service**
7. ⏱️ Wait 5-10 minutes for deployment
8. 📋 **Copy your backend URL**: `https://flowforge-backend.onrender.com`

#### 2️⃣ Deploy Frontend Service

1. Click **New+ → Web Service**
2. Connect same GitHub repo
3. Configure:
   
   | Setting | Value |
   |---------|-------|
   | **Name** | `flowforge-ai` |
   | **Root Directory** | *(leave empty)* |
   | **Environment** | `Node` |
   | **Build Command** | `npm install && npm run build` |
   | **Start Command** | `npm run start` |

4. **Add Environment Variables**:
   ```env
   VITE_API_URL=https://flowforge-backend.onrender.com
   NODE_VERSION=22.12.0
   ```
   ⚠️ **Important**: Replace with YOUR actual backend URL!

5. Click **Create Web Service**
6. ⏱️ Wait 3-5 minutes

#### 3️⃣ Verification Checklist

- [ ] Backend health check: `https://your-backend.onrender.com/health`
  ```json
  {"status": "healthy", "provider": "groq", "model": "llama-3.1-8b-instant"}
  ```
- [ ] Frontend loads: `https://your-frontend.onrender.com`
- [ ] Create test campaign works
- [ ] Agents execute successfully
- [ ] Results display correctly

📖 **Troubleshooting Guide**: See [RENDER.md](RENDER.md) for detailed instructions and common issues.

---

## 🎯 Usage Guide

### 📝 Creating Your First Campaign

```mermaid
journey
    title User Journey: Creating a Marketing Campaign
    section Landing
      Visit FlowForge AI: 5: User
      Click Get Started: 5: User
    section Configuration
      Enter campaign details: 4: User
      Select tone & length: 4: User
      Submit request: 5: User
    section Processing
      Watch agents work: 5: User, Agents
      Real-time updates: 5: System
    section Results
      Review marketing brief: 5: User
      Download/Export: 5: User
      Share with team: 4: User
```

### 🖥️ User Interface Workflow

1. **Landing Page** → Click "Get Started"
2. **Campaign Form** → Fill in details:
   - Campaign name
   - Product/service description
   - Target audience
   - Tone: Professional / Casual / Enthusiastic
   - Length: Short / Medium / Long
3. **Progress View** → Watch real-time agent execution:
   - 🎯 Planner analyzing...
   - 🔍 Researcher gathering data...
   - ✍️ Writer creating content...
   - 🔎 Reviewer checking quality...
   - 📋 Assembler finalizing...
4. **Results Page** → View and export:
   - Executive summary
   - Full marketing brief
   - Download as Markdown

### 🔌 API Integration Examples

**Start Workflow**:
```bash
curl -X POST http://localhost:8000/api/workflow/start \
  -H "Content-Type: application/json" \
  -d '{
    "request": "Launch campaign for AI-powered productivity app targeting remote workers",
    "tone": "professional",
    "length": "medium",
    "format": "marketing brief"
  }'
```

**Response**:
```json
{
  "workflow_id": "uuid-here",
  "status": "started",
  "message": "Workflow started successfully"
}
```

**Stream Progress (SSE)**:
```bash
curl -N http://localhost:8000/api/workflow/stream/{workflow_id}
```

**Get Final Result**:
```bash
curl http://localhost:8000/api/workflow/result/{workflow_id}
```

**Response**:
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
  "from_cache": false,
  "execution_time": 45.2
}
```

---

## 📁 Project Structure

```
FlowForge-AI/
│
├── 📂 backend/                     # Python FastAPI Backend
│   ├── 📂 actions/                # Agent action implementations
│   │   ├── plan.py               # Planning logic
│   │   ├── research.py           # Research logic
│   │   ├── write.py              # Writing logic
│   │   ├── review.py             # Review logic
│   │   └── assemble.py           # Assembly logic
│   │
│   ├── 📂 agents/                 # Agent definitions
│   │   ├── planner_agent.py
│   │   ├── researcher_agent.py
│   │   ├── writer_agent.py
│   │   ├── reviewer_agent.py
│   │   └── assembler_agent.py
│   │
│   ├── 📂 flowforge_core/         # Core orchestration
│   │   ├── 📂 llm/               # LLM provider abstractions
│   │   ├── 📂 logs/              # Logging utilities
│   │   └── 📂 base/              # Base classes
│   │
│   ├── 📂 provider/               # LLM integrations
│   │   ├── gemini_api.py         # Gemini integration
│   │   └── base_provider.py     # Provider interface
│   │
│   ├── config.py                  # Configuration management
│   ├── main.py                    # FastAPI application
│   ├── orchestrator.py            # Workflow orchestrator
│   ├── schema.py                  # Pydantic schemas
│   └── requirements.txt           # Python dependencies
│
├── 📂 src/                        # React Frontend
│   ├── 📂 components/            # Reusable UI components
│   │   ├── AgentStatus.jsx       # Agent progress display
│   │   ├── AIChatbot.jsx         # AI chat interface
│   │   ├── Card.jsx              # Card component
│   │   ├── Button.jsx            # Button component
│   │   ├── Navbar.jsx            # Navigation bar
│   │   ├── Footer.jsx            # Footer component
│   │   └── Loader.jsx            # Loading animations
│   │
│   ├── 📂 pages/                 # Application pages
│   │   ├── LandingPage.jsx       # Home page
│   │   ├── CreateCampaign.jsx    # Campaign creator
│   │   ├── WorkflowProgress.jsx  # Real-time progress
│   │   ├── FinalBrief.jsx        # Results display
│   │   ├── Dashboard.jsx         # User dashboard
│   │   └── Settings.jsx          # Settings page
│   │
│   ├── 📂 context/               # React context
│   │   └── ThemeContext.jsx      # Dark/Light theme
│   │
│   ├── 📂 services/              # API services
│   │   └── api.js                # Backend API client
│   │
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles
│
├── 📂 public/                     # Static assets
├── render.yaml                    # Render.com config
├── package.json                   # Node dependencies
├── vite.config.js                # Vite configuration
├── tailwind.config.js            # Tailwind CSS config
├── .env.example                  # Environment template
├── RENDER.md                     # Deployment guide
└── README.md                     # This file
```

---

## 🛠️ Technology Stack

### 📊 Complete Tech Stack Diagram

```mermaid
graph LR
    subgraph "Frontend Stack"
        F1[React 19]
        F2[Vite 7]
        F3[TailwindCSS 3]
        F4[Framer Motion 12]
        F5[React Router 7]
    end
    
    subgraph "Backend Stack"
        B1[Python 3.11+]
        B2[FastAPI 0.100+]
        B3[Pydantic 2.0+]
        B4[Uvicorn]
    end
    
    subgraph "AI & ML"
        A1[Google Gemini]
        A2[gemini-1.5-flash]
    end
    
    subgraph "Infrastructure"
        I1[Render.com]
        I2[GitHub]
        I3[SSE Protocol]
    end
    
    subgraph "Development Tools"
        D1[Git]
        D2[npm/pip]
        D3[VS Code]
    end
    
    F1 --> F2
    F1 --> F3
    F1 --> F4
    F1 --> F5
    
    B1 --> B2
    B2 --> B3
    B2 --> B4
    
    B2 --> A1
    A1 --> A2
    
    F1 --> I3
    I3 --> B2
    
    I2 --> I1
    
    style F1 fill:#61DAFB,stroke:#21A0D2,color:#000
    style B2 fill:#009688,stroke:#00695C,color:#fff
    style A1 fill:#8E75B2,stroke:#6A4C9A,color:#fff
    style I1 fill:#4CAF50,stroke:#2E7D32,color:#fff
```

### 🔧 Technology Details

<table>
<tr>
<td width="50%">

#### Frontend Technologies
| Tech | Version | Purpose |
|------|---------|---------|
| **React** | 19 | UI framework |
| **Vite** | 7 | Build tool & dev server |
| **TailwindCSS** | 3 | Utility-first CSS |
| **Framer Motion** | 12 | Animations |
| **React Router** | 7 | Client routing |
| **React Markdown** | 10 | Markdown rendering |

</td>
<td width="50%">

#### Backend Technologies
| Tech | Version | Purpose |
|------|---------|---------|
| **FastAPI** | 0.100+ | Async API framework |
| **Pydantic** | 2.0+ | Data validation |
| **Uvicorn** | Latest | ASGI server |
| **Google Generative AI** | 0.3+ | Gemini SDK |
| **aiohttp** | 3.8+ | Async HTTP client |
| **python-dotenv** | 1.0+ | Environment config |

</td>
</tr>
</table>

### ⚙️ Configuration Options

**Backend (.env)**:
```bash
# LLM Configuration
LLM_PROVIDER=gemini
GEMINI_API_KEY=your_api_key_here
LLM_MODEL=gemini-1.5-flash
LLM_TEMPERATURE=0.7
LLM_MAX_TOKENS=2048
LLM_TIMEOUT=120

# Server Settings
HOST=0.0.0.0
PORT=8000
LOG_LEVEL=INFO

# Cache Settings (in code)
CACHE_MAX_SIZE=50
CACHE_TTL_SECONDS=1800
```

**Frontend**:
```bash
VITE_API_URL=http://localhost:8000
```

---

## 📊 Performance & Metrics

### ⚡ Performance Benchmarks

```mermaid
gantt
    title Campaign Generation Timeline
    dateFormat  ss
    axisFormat %S

    section Planning
    Planner Agent     :a1, 00, 8s
    
    section Research
    Researcher Agent  :a2, 08, 12s
    
    section Writing
    Writer Agent      :a3, 20, 15s
    
    section Review
    Reviewer Agent    :a4, 35, 8s
    
    section Assembly
    Assembler Agent   :a5, 43, 5s
```

### 📈 Performance Metrics

<table>
<tr>
<td width="50%">

#### Execution Times
| Scenario | Time | Cache | Notes |
|----------|------|-------|-------|
| **First Request** | 45-60s | ❌ | Full pipeline execution |
| **Cached Request** | <0.1s | ✅ | Instant from memory |
| **Cold Start** | 60-90s | ❌ | Render.com cold boot |
| **Single Agent** | 5-15s | ❌ | Per agent average |
| **Retry w/ Backoff** | +1-7s | ❌ | Exponential delay |

</td>
<td width="50%">

#### Resource Usage
| Resource | Usage | Limit | Status |
|----------|-------|-------|--------|
| **Memory** | ~150MB | 512MB | ✅ Normal |
| **CPU** | Low | Shared | ✅ Normal |
| **API Calls** | 5-10/req | 60/min | ✅ Normal |
| **Cache Size** | 50 entries | 50 max | ✅ Normal |
| **Response** | ~2-5KB | N/A | ✅ Normal |

</td>
</tr>
</table>

### 🎯 Optimization Tips

```mermaid
mindmap
  root((Performance))
    Cache Strategy
      TTL: 30 min
      Max: 50 entries
      LRU eviction
    API Limits
      Rate limiting
      Timeout: 120s
      Retry: Exponential
    Frontend
      Code splitting
      Lazy loading
      SSE streaming
    Backend
      Async operations
      Connection pooling
      Request batching
```

**Key Optimizations**:
- ✅ **Caching**: 50-entry LRU cache with 30-min TTL
- ✅ **Retry Logic**: Exponential backoff (1s → 2s → 4s)
- ✅ **Streaming**: Real-time SSE updates
- ✅ **Async**: Non-blocking FastAPI + aiohttp
- ✅ **Error Handling**: Graceful degradation

---

## 🐛 Troubleshooting Guide

### 🔍 Common Issues & Solutions

#### 1. Backend Won't Start

```bash
# Problem: Python version mismatch
python --version  # Must be 3.11+

# Solution: Use correct Python
python3.11 -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
```

#### 2. API Key Invalid

```bash
# Problem: GEMINI_API_KEY not set
echo $GEMINI_API_KEY  # Should print key

# Solution: Set environment variable
export GEMINI_API_KEY="your-key-here"  # Linux/Mac
$env:GEMINI_API_KEY="your-key-here"    # Windows PowerShell
```

#### 3. Frontend Can't Connect

```bash
# Problem: CORS or wrong API URL
curl http://localhost:8000/health

# Solution: Check VITE_API_URL in .env
VITE_API_URL=http://localhost:8000  # Local
VITE_API_URL=https://api.render.com  # Production
```

#### 4. Render Deployment Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| **Cold Start** | Service sleeping | Wait 60-90s for first request |
| **500 Error** | Missing env vars | Check `GEMINI_API_KEY` in Render dashboard |
| **Build Fails** | Wrong Python version | Ensure Python 3.11+ in `runtime.txt` |
| **CORS Error** | Frontend misconfigured | Update `VITE_API_URL` to backend URL |

#### 5. Workflow Stuck

```bash
# Check workflow status
curl http://localhost:8000/api/workflow/status/{workflow_id}

# Cancel stuck workflow (if implemented)
curl -X POST http://localhost:8000/api/workflow/cancel/{workflow_id}
```

### 🔧 Debug Checklist

```mermaid
flowchart TD
    Start([Issue Reported]) --> Q1{Backend Running?}
    Q1 -->|No| Fix1[Start backend:<br/>npm run backend]
    Q1 -->|Yes| Q2{Health Check OK?}
    Q2 -->|No| Fix2[Check logs:<br/>Render dashboard]
    Q2 -->|Yes| Q3{API Key Valid?}
    Q3 -->|No| Fix3[Set GEMINI_API_KEY]
    Q3 -->|Yes| Q4{Frontend Connected?}
    Q4 -->|No| Fix4[Check VITE_API_URL]
    Q4 -->|Yes| Q5{Error in Logs?}
    Q5 -->|Yes| Fix5[Check specific error]
    Q5 -->|No| Solved([Issue Resolved])
    
    Fix1 --> Q2
    Fix2 --> Q3
    Fix3 --> Q4
    Fix4 --> Q5
    Fix5 --> Solved
    
    style Start fill:#4CAF50,color:#fff
    style Solved fill:#2196F3,color:#fff
    style Fix1 fill:#FF9800,color:#000
    style Fix2 fill:#FF9800,color:#000
    style Fix3 fill:#FF9800,color:#000
    style Fix4 fill:#FF9800,color:#000
    style Fix5 fill:#FF9800,color:#000
```

### 📝 Logging & Debugging

**Enable Debug Logging**:
```python
# backend/config.py
LOG_LEVEL = "DEBUG"  # Change from INFO
```

**View Logs**:
```bash
# Local
tail -f backend/logs/app.log

# Render
# Go to Dashboard → Service → Logs tab
```

**Common Log Messages**:
```
✅ INFO: Workflow started: workflow_id=abc123
✅ INFO: Agent completed: agent=planner, time=8.2s
⚠️ WARNING: Retry attempt 2/3 for agent=researcher
❌ ERROR: Gemini API error: Rate limit exceeded
```

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### 📋 Contribution Workflow

```mermaid
graph LR
    A[Fork Repo] --> B[Clone Fork]
    B --> C[Create Branch]
    C --> D[Make Changes]
    D --> E[Test Locally]
    E --> F{Tests Pass?}
    F -->|No| D
    F -->|Yes| G[Commit Changes]
    G --> H[Push to Fork]
    H --> I[Open PR]
    I --> J[Code Review]
    J --> K{Approved?}
    K -->|No| D
    K -->|Yes| L[Merge to Main]
    
    style A fill:#4CAF50,color:#fff
    style L fill:#2196F3,color:#fff
    style F fill:#FF9800,color:#000
    style K fill:#FF9800,color:#000
```

### 🛠️ Development Guidelines

**1. Fork & Clone**:
```bash
# Fork on GitHub, then:
git clone https://github.com/YOUR_USERNAME/FlowForge-AI.git
cd FlowForge-AI
```

**2. Create Feature Branch**:
```bash
git checkout -b feature/amazing-feature
# Or for bug fixes:
git checkout -b fix/bug-description
```

**3. Make Changes**:
- Follow existing code style
- Add comments for complex logic
- Update documentation if needed
- Test thoroughly locally

**4. Commit with Meaningful Messages**:
```bash
git add .
git commit -m "feat: Add amazing new feature"
# Use conventional commits:
# feat: New feature
# fix: Bug fix
# docs: Documentation
# style: Formatting
# refactor: Code restructure
# test: Add tests
# chore: Maintenance
```

**5. Push & Create PR**:
```bash
git push origin feature/amazing-feature
# Then create Pull Request on GitHub
```

### 📜 Code Standards

- **Python**: Follow PEP 8, use type hints
- **JavaScript**: Use ES6+, follow Airbnb style guide
- **Commits**: Use conventional commit messages
- **Tests**: Add tests for new features
- **Documentation**: Update README for user-facing changes

### 🎯 Areas for Contribution

| Area | Description | Difficulty |
|------|-------------|------------|
| **New Agents** | Add specialized agents | 🟢 Medium |
| **LLM Providers** | OpenAI, Claude, etc. | 🟡 Hard |
| **UI/UX** | Improve frontend design | 🟢 Easy |
| **Tests** | Add unit/integration tests | 🟢 Medium |
| **Documentation** | Improve guides/examples | 🟢 Easy |
| **Performance** | Optimize caching/speed | 🟡 Hard |

---



See [LICENSE](LICENSE) file for full details.

---

## 🙏 Acknowledgments

<table>
<tr>
<td align="center" width="25%">
<img src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" width="60"><br>
<strong>Google Gemini</strong><br>
<sub>AI Foundation Model</sub>
</td>
<td align="center" width="25%">
<img src="https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png" width="60"><br>
<strong>FastAPI</strong><br>
<sub>Backend Framework</sub>
</td>
<td align="center" width="25%">
<img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="60"><br>
<strong>React</strong><br>
<sub>Frontend Library</sub>
</td>
<td align="center" width="25%">
<img src="https://dashboard.render.com/favicon.ico" width="60"><br>
<strong>Render</strong><br>
<sub>Cloud Deployment</sub>
</td>
</tr>
</table>

### 💡 Special Thanks

- **Vite** - Lightning-fast build tool
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready animations
- **Pydantic** - Data validation library
- **Open Source Community** - For amazing tools and libraries

---


### Connect with Us

[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/YatindraRai002/FlowForge-AI)
[![Issues](https://img.shields.io/badge/Issues-Report%20Bug-red?style=for-the-badge&logo=github)](https://github.com/YatindraRai002/FlowForge-AI/issues)
[![Pull Requests](https://img.shields.io/badge/Pull%20Requests-Contribute-brightgreen?style=for-the-badge&logo=github)](https://github.com/YatindraRai002/FlowForge-AI/pulls)

</div>

---

<div align="center">

## 🚀 Ready to Transform Your Marketing?

**Start creating AI-powered campaigns in minutes!**

[![Deploy Now](https://img.shields.io/badge/Deploy%20Now-4CAF50?style=for-the-badge&logo=rocket)](https://render.com/deploy)
[![Try Demo](https://img.shields.io/badge/Try%20Demo-2196F3?style=for-the-badge&logo=play)](https://flowforge-ai.onrender.com)
[![View Code](https://img.shields.io/badge/View%20Code-181717?style=for-the-badge&logo=github)](https://github.com/YatindraRai002/FlowForge-AI)

---

**Built with ❤️ by the FlowForge AI Team**

**Powered by Google Gemini | React | FastAPI**

[⬆ Back to Top](#-flowforge-ai---multi-agent-marketing-campaign-generator)

</div>
