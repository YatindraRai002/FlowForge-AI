@echo off
cls
echo ================================================
echo FlowForge AI - Production Quick Start
echo ================================================
echo.
echo Optimized with Fast Models:
echo - phi3:mini (Planner/Assembler)
echo - llama3.2:3b (Researcher)
echo - gemma:2b (Writer)
echo - qwen2.5:1.5b (Reviewer)
echo.
echo Expected workflow time: 30-60 seconds
echo ================================================
echo.

REM Check if Ollama is running
echo Checking Ollama status...
curl -s http://localhost:11434/api/tags >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Ollama is not running!
    echo.
    echo Please start Ollama first:
    echo   1. Open new terminal
    echo   2. Run: ollama serve
    echo.
    echo Then run this script again.
    pause
    exit /b 1
)
echo [OK] Ollama is running
echo.

REM Start Backend
echo Starting Backend Server...
start "FlowForge Backend" powershell -NoExit -Command "cd 'c:\Users\Asus\OneDrive\Desktop\FlowForge-AI-main\backend'; python main_flowforge.py"
timeout /t 5 /nobreak > nul

REM Start Frontend
echo Starting Frontend Server...
start "FlowForge Frontend" powershell -NoExit -Command "cd 'c:\Users\Asus\OneDrive\Desktop\FlowForge-AI-main'; npm run dev"
timeout /t 5 /nobreak > nul

echo.
echo ================================================
echo Servers are starting...
echo ================================================
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Features Enabled:
echo  [x] Response Caching (30min TTL)
echo  [x] Server-Sent Events (SSE)
echo  [x] Auto-retry on timeout
echo  [x] Real-time progress updates
echo.
echo Opening browser in 8 seconds...
timeout /t 8 /nobreak > nul

REM Open browser
start http://localhost:3000

echo.
echo ================================================
echo FlowForge AI is ready!
echo ================================================
echo.
echo To stop: Close the Backend and Frontend windows
echo.
pause
