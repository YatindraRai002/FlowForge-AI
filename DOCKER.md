# Docker Deployment Guide for FlowForge AI

## 🐳 Quick Start with Docker

### Prerequisites
- Docker installed and running
- Docker Hub account (for pushing images)
- Gemini API key (get free at https://makersuite.google.com/app/apikey)

---

## 📦 Option 1: Pull from Docker Hub

```bash
# Pull the latest image
docker pull yatindrarai002/flowforgeai:latest

# Run the container
docker run -d \
  -p 80:80 \
  -p 8000:8000 \
  -e GEMINI_API_KEY=your_api_key_here \
  -e LLM_PROVIDER=gemini \
  --name flowforge-ai \
  yatindrarai002/flowforgeai:latest

# Access the app at http://localhost
```

---

## 🛠️ Option 2: Build Locally

### Step 1: Clone and Configure

```bash
# Clone the repository
git clone https://github.com/YatindraRai002/FlowForge-AI.git
cd FlowForge-AI

# Copy environment file
copy .env.docker .env

# Edit .env and add your Gemini API key
notepad .env
```

### Step 2: Build the Image

```bash
# Build the Docker image
docker build -t yatindrarai002/flowforgeai:latest .

# This will take 5-10 minutes on first build
```

### Step 3: Run with Docker Compose

```bash
# Start the application
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

---

## 🚀 Push to Docker Hub

### Step 1: Login to Docker Hub

```bash
docker login
# Enter your Docker Hub username and password
```

### Step 2: Build and Tag

```bash
# Build with multiple tags
docker build -t yatindrarai002/flowforgeai:latest -t yatindrarai002/flowforgeai:v1.0 .
```

### Step 3: Push to Docker Hub

```bash
# Push latest tag
docker push yatindrarai002/flowforgeai:latest

# Push version tag
docker push yatindrarai002/flowforgeai:v1.0
```

### Or use the automated script (Windows):

```bash
# Run the automated build and push script
docker_push.bat
```

---

## ⚙️ Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GEMINI_API_KEY` | Yes* | - | Your Gemini API key |
| `LLM_PROVIDER` | No | `gemini` | LLM provider (`gemini` or `ollama`) |
| `LLM_MODEL` | No | `gemini-1.5-flash` | Model to use |
| `LLM_TEMPERATURE` | No | `0.7` | Generation temperature |
| `LLM_MAX_TOKENS` | No | `2048` | Max tokens per request |
| `PORT` | No | `8000` | Backend API port |
| `LOG_LEVEL` | No | `INFO` | Logging level |

*Required if using Gemini provider

---

## 🔍 Troubleshooting

### Check Container Status
```bash
docker ps
docker logs flowforge-ai
```

### Access Container Shell
```bash
docker exec -it flowforge-ai bash
```

### Check Health
```bash
curl http://localhost:8000/health
```

### Rebuild from Scratch
```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

---

## 🌐 Access the Application

- **Frontend**: http://localhost
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

---

## 📝 Docker Image Details

- **Base Images**: 
  - Node 20 Alpine (frontend build)
  - Python 3.11 Slim (runtime)
- **Size**: ~800MB
- **Architecture**: Multi-stage build
- **Services**: Nginx + FastAPI + Supervisor
- **Ports**: 80 (HTTP) + 8000 (API)

---

## 🎯 Production Deployment

### With Custom Domain

```bash
docker run -d \
  -p 80:80 \
  -p 443:443 \
  -e GEMINI_API_KEY=your_key \
  -e LLM_PROVIDER=gemini \
  -v /path/to/ssl:/etc/nginx/ssl \
  --restart unless-stopped \
  --name flowforge-ai \
  yatindrarai002/flowforgeai:latest
```

### With Docker Swarm

```bash
docker stack deploy -c docker-compose.yml flowforge
```

### With Kubernetes

```bash
kubectl apply -f kubernetes/deployment.yaml
```

---

## 📊 Monitoring

```bash
# Resource usage
docker stats flowforge-ai

# Container logs
docker logs -f --tail 100 flowforge-ai

# Health check
watch -n 5 'curl -s http://localhost:8000/health | jq'
```

---

## 🔄 Updates

```bash
# Pull latest image
docker pull yatindrarai002/flowforgeai:latest

# Recreate container
docker-compose up -d --force-recreate
```

---

## 🛡️ Security

- Never commit `.env` file with real API keys
- Use Docker secrets for production deployments
- Run containers with non-root user in production
- Keep images updated regularly

---

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com)
- [Docker Hub Repository](https://hub.docker.com/r/yatindrarai002/flowforgeai)
- [GitHub Repository](https://github.com/YatindraRai002/FlowForge-AI)
