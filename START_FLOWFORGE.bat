@echo off
echo ========================================
echo FlowForge AI - Startup Script
echo ========================================
echo.

REM Check if .env exists
if not exist "backend\.env" (
    echo [ERROR] backend\.env file not found!
    echo.
    echo Please create backend\.env from backend\.env.example
    echo and add your API key or configure Ollama.
    echo.
    echo See SETUP.md for instructions.
    echo.
    pause
    exit /b 1
)

echo [1/4] Checking Python virtual environment...
if not exist "backend\.venv" (
    echo Creating virtual environment...
    cd backend
    python -m venv .venv
    call .venv\Scripts\activate
    echo Installing dependencies...
    pip install -r requirements.txt
    cd ..
) else (
    echo Virtual environment found.
)

echo.
echo [2/4] Checking Node modules...
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo Node modules found.
)

echo.
echo [3/4] Starting Backend Server...
start "FlowForge Backend" cmd /k "cd backend && .venv\Scripts\activate && python main.py"

echo Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo.
echo [4/4] Starting Frontend Server...
start "FlowForge Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo FlowForge AI is starting!
echo ========================================
echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Press any key to close this window...
echo (Backend and Frontend will keep running)
pause > nul
