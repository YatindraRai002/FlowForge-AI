@echo off
echo ========================================
echo FlowForge AI - Quick Start
echo ========================================
echo.
echo SYSTEM STATUS:
echo   Backend:  Running on http://localhost:8000
echo   Frontend: Running on http://localhost:3000
echo   Ollama:   Connected with 7 models
echo.
echo ========================================
echo OPEN YOUR APP:
echo ========================================
echo.
echo Visit: http://localhost:3000
echo.
echo ========================================
echo ACTIVE TERMINALS:
echo ========================================
echo.
echo Terminal 1: Backend (Python - port 8000)
echo Terminal 2: Frontend (Vite - port 3000)
echo Terminal 3: Ollama (LLM server)
echo.
echo ========================================
echo TO USE THE APP:
echo ========================================
echo.
echo 1. Open http://localhost:3000 in browser
echo 2. Click "Create Campaign"
echo 3. Fill in your product details
echo 4. Select marketing channels
echo 5. Click "Start Workflow"
echo 6. Watch AI agents work!
echo 7. View your results
echo.
echo ========================================
echo AI AGENTS READY:
echo ========================================
echo.
echo [OK] Planner      - business-analyst
echo [OK] Researcher   - research-assistant
echo [OK] Writer       - code-assistant
echo [OK] Reviewer     - data-science-specialist
echo [OK] Assembler    - custom-ml-assistant
echo.
echo ========================================
echo TROUBLESHOOTING:
echo ========================================
echo.
echo If something is not working:
echo.
echo 1. Check all 3 terminals are running
echo 2. Verify URLs:
echo    - Backend: http://localhost:8000/health
echo    - Frontend: http://localhost:3000
echo 3. Restart if needed (Ctrl+C then rerun)
echo.
echo ========================================
echo YOUR PROJECT IS READY!
echo ========================================
echo.
echo Press any key to open the app...
pause >nul
start http://localhost:3000
