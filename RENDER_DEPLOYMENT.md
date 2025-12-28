# FlowForge AI - Render Deployment Guide

## Prerequisites
- GitHub repository: https://github.com/Yatindrarai002/FlowForge-AI
- Groq API key from https://console.groq.com/

## Deployment Steps

### 1. Connect to Render

1. Go to https://render.com
2. Sign in with your GitHub account
3. Click "New +" → "Blueprint"
4. Connect your GitHub repository: `Yatindrarai002/FlowForge-AI`
5. Select the `main` branch (or `fixed-api-key-issue` if you want the latest)

### 2. Configure Environment Variables

Render will automatically detect the `render.yaml` file. You need to set the following environment variable:

**For the Backend Service (`flowforge-backend`):**

| Variable Name | Value | Notes |
|--------------|-------|-------|
| `GROQ_API_KEY` | `your_groq_api_key_here` | Get from https://console.groq.com/ |
| `LLM_PROVIDER` | `groq` | Already set in render.yaml |
| `LLM_MODEL` | `llama-3.3-70b-versatile` | Already set in render.yaml |

**Important:** 
- In Render dashboard, go to your backend service
- Click "Environment" tab
- Add `GROQ_API_KEY` as a secret environment variable
- Paste your Groq API key: `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`

### 3. Deploy

1. Click "Apply" or "Create Blueprint"
2. Render will:
   - Create 2 services:
     - `flowforge-backend` (Python/FastAPI)
     - `flowforge-ai` (Static site)
   - Install dependencies
   - Build the frontend
   - Start the backend

### 4. Verify Deployment

**Backend Health Check:**
- URL: `https://flowforge-backend.onrender.com/health`
- Should return: `{"status":"healthy","provider":"groq","model":"llama-3.3-70b-versatile"}`

**Frontend:**
- URL: `https://flowforge-ai.onrender.com`
- Should show the FlowForge AI interface with your logo

### 5. Common Issues & Solutions

#### Issue: "Build failed"
**Solution:**
- Check the build logs in Render dashboard
- Ensure `requirements.txt` is in the `backend/` folder
- Ensure `package.json` is in the `frontend/` folder

#### Issue: "Backend returns 500 error"
**Solution:**
- Check if `GROQ_API_KEY` is set correctly
- View backend logs in Render dashboard
- Verify the API key works: Test at https://console.groq.com/

#### Issue: "Frontend can't connect to backend"
**Solution:**
- The `VITE_API_URL` should automatically point to the backend
- Check the frontend environment variables in Render
- Ensure both services are running

#### Issue: "Agents not working"
**Solution:**
- Verify `GROQ_API_KEY` is set in backend environment
- Check backend logs for API errors
- Ensure `LLM_PROVIDER=groq` is set

### 6. Update Deployment

To update your deployment:

1. Push changes to GitHub:
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```

2. Render will automatically redeploy when it detects changes

### 7. Manual Redeploy

If you need to manually redeploy:
1. Go to Render dashboard
2. Select your service
3. Click "Manual Deploy" → "Deploy latest commit"

## Environment Variables Reference

### Backend (`flowforge-backend`)

```bash
# Required
GROQ_API_KEY=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
LLM_PROVIDER=groq
LLM_MODEL=llama-3.3-70b-versatile

# Optional (already set in render.yaml)
PORT=8000
HOST=0.0.0.0
LOG_LEVEL=INFO
PYTHON_VERSION=3.11.0
```

### Frontend (`flowforge-ai`)

```bash
# Automatically set by Render
VITE_API_URL=https://flowforge-backend.onrender.com
NODE_VERSION=22.12.0
```

## Troubleshooting Commands

If you need to debug locally before deploying:

```bash
# Test backend locally
cd backend
pip install -r requirements.txt
export GROQ_API_KEY="your_key"
export LLM_PROVIDER="groq"
export LLM_MODEL="llama-3.3-70b-versatile"
uvicorn main:app --reload

# Test frontend locally
cd frontend
npm install
npm run dev
```

## Support

If you encounter issues:
1. Check Render logs (Dashboard → Service → Logs)
2. Verify environment variables are set correctly
3. Test API key at https://console.groq.com/
4. Ensure GitHub repository is up to date

## URLs After Deployment

- **Frontend**: `https://flowforge-ai.onrender.com`
- **Backend API**: `https://flowforge-backend.onrender.com`
- **Health Check**: `https://flowforge-backend.onrender.com/health`
- **API Docs**: `https://flowforge-backend.onrender.com/docs`
