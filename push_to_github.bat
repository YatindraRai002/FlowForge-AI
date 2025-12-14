@echo off
cd /d "c:\Users\Asus\OneDrive\Desktop\FlowForge-AI-main"
git add .
git commit -m "Fix Render deployment: use npx for vite build and add render config"
git push origin main
pause
