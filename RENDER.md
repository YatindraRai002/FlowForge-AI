# Render Deployment Guide - FlowForge AI

## 🚀 Complete Render Setup Instructions

### **Step 1: Deploy Backend Service**

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: `YatindraRai002/FlowForge-AI`
4. Configure the backend:

   **Basic Settings:**
   - **Name**: `flowforge-backend`
   - **Region**: Oregon (US West)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`

   **Build & Deploy:**
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

5. Add **Environment Variables**:
   ```
   LLM_PROVIDER = gemini
   GEMINI_API_KEY = your_gemini_api_key_here
   PYTHON_VERSION = 3.11.0
   ```
   
   Get free Gemini API key: https://makersuite.google.com/app/apikey

6. Click **"Create Web Service"**
7. Wait for deployment (5-10 minutes)
8. **Copy the backend URL** (e.g., `https://flowforge-backend.onrender.com`)

---

### **Step 2: Deploy Frontend Service**

1. In Render Dashboard, click **"New +"** → **"Web Service"**
2. Connect the same repository: `YatindraRai002/FlowForge-AI`
3. Configure the frontend:

   **Basic Settings:**
   - **Name**: `flowforge-ai`
   - **Region**: Oregon (US West)
   - **Branch**: `main`
   - **Root Directory**: (leave empty - root of repo)
   - **Runtime**: `Node`

   **Build & Deploy:**
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`

4. Add **Environment Variables**:
   ```
   NODE_VERSION = 22.12.0
   VITE_API_URL = https://flowforge-backend.onrender.com
   ```
   ⚠️ **Important**: Replace with YOUR actual backend URL from Step 1!

5. Click **"Create Web Service"**
6. Wait for deployment (3-5 minutes)

---

### **Step 3: Verify Deployment**

1. **Test Backend**:
   - Open: `https://flowforge-backend.onrender.com/health`
   - Should return: `{"status":"healthy","provider":"gemini","model":"gemini-1.5-flash"}`

2. **Test Frontend**:
   - Open: `https://flowforge-ai.onrender.com`
   - Should load the FlowForge AI interface

3. **Test Agent Workflow**:
   - Click "Get Started"
   - Enter a prompt
   - Agents should start working!

---

## 🐛 Troubleshooting

### Backend Issues

**Problem: "Module not found" errors**
```bash
# Check logs in Render dashboard
# Make sure Root Directory is set to "backend"
# Verify requirements.txt is in backend/
```

**Problem: "GEMINI_API_KEY not set"**
```bash
# Go to Environment variables in Render
# Add: GEMINI_API_KEY = your_actual_key
# Click "Save Changes"
# Trigger Manual Deploy
```

**Problem: Port binding errors**
```bash
# Make sure Start Command uses $PORT:
# uvicorn main:app --host 0.0.0.0 --port $PORT
```

---

### Frontend Issues

**Problem: "Failed to fetch" or CORS errors**
```bash
# Check VITE_API_URL points to correct backend URL
# Make sure backend is deployed and healthy first
# Trigger Manual Deploy after fixing
```

**Problem: Build fails with "vite: permission denied"**
```bash
# Already fixed in package.json with:
# "build": "node node_modules/vite/bin/vite.js build"
```

**Problem: Agents not responding**
```bash
# Backend might be sleeping (free tier)
# First request takes 30-60 seconds
# Check backend logs for errors
```

---

## 🔄 Update Deployment

When you push changes to GitHub:

1. **Automatic Updates**:
   - Render auto-deploys on git push
   - Wait 3-5 minutes for build

2. **Manual Deploy**:
   - Go to service in Render
   - Click "Manual Deploy" → "Deploy latest commit"

3. **Environment Variable Changes**:
   - Update in Render dashboard
   - Must click "Save Changes"
   - Triggers automatic redeploy

---

## 💰 Render Free Tier Limits

- ✅ **Free Plan Includes**:
  - 750 hours/month per service
  - Services sleep after 15 min inactivity
  - First request may take 30-60 seconds
  - SSL certificates included

- ⚠️ **Limitations**:
  - Backend/Frontend count as 2 services
  - Each service gets its own 750 hours
  - Services restart on every deploy

---

## 🎯 Production Tips

1. **Keep Backend Awake**:
   - Use a monitoring service (UptimeRobot)
   - Ping `/health` every 10 minutes

2. **Optimize Cold Starts**:
   - Backend sleeps after inactivity
   - First request wakes it up
   - Consider upgrading to paid plan

3. **Monitor Logs**:
   - Check logs regularly in Render dashboard
   - Set up log alerts for errors

4. **Use Blueprint (Optional)**:
   - Render can read `render.yaml` automatically
   - Deploy as "Blueprint" instead of manual setup
   - Easier for complex multi-service apps

---

## 📊 Service URLs

After deployment, your services will be at:

- **Frontend**: `https://flowforge-ai.onrender.com`
- **Backend**: `https://flowforge-backend.onrender.com`
- **API Docs**: `https://flowforge-backend.onrender.com/docs`
- **Health Check**: `https://flowforge-backend.onrender.com/health`

---

## 🔒 Security

- Never commit `.env` with real API keys
- Use Render's environment variables for secrets
- GEMINI_API_KEY should be marked as "secret"
- Rotate API keys regularly

---

## 📞 Need Help?

- Check Render logs first
- Verify environment variables are set
- Ensure backend deploys before frontend
- Test `/health` endpoint independently
- Review CORS settings in `backend/config.py`

---

## ✅ Deployment Checklist

- [ ] Backend service created on Render
- [ ] `Root Directory` set to `backend`
- [ ] `GEMINI_API_KEY` environment variable added
- [ ] Backend deployed successfully
- [ ] Backend `/health` endpoint responds
- [ ] Frontend service created on Render
- [ ] `VITE_API_URL` points to backend URL
- [ ] Frontend deployed successfully
- [ ] Frontend loads in browser
- [ ] Test agent workflow end-to-end
