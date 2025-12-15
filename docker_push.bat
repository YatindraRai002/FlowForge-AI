@echo off
echo ========================================
echo FlowForge AI - Docker Build and Push
echo ========================================
echo.

REM Build the Docker image
echo [1/4] Building Docker image...
docker build -t yatindrarai002/flowforgeai:latest -t yatindrarai002/flowforgeai:v1.0 .

if %ERRORLEVEL% NEQ 0 (
    echo Error: Docker build failed!
    pause
    exit /b 1
)

echo.
echo [2/4] Docker image built successfully!
echo.

REM Push latest tag
echo [3/4] Pushing latest tag to Docker Hub...
docker push yatindrarai002/flowforgeai:latest

if %ERRORLEVEL% NEQ 0 (
    echo Error: Docker push failed! Make sure you're logged in with 'docker login'
    pause
    exit /b 1
)

REM Push version tag
echo [4/4] Pushing version tag to Docker Hub...
docker push yatindrarai002/flowforgeai:v1.0

if %ERRORLEVEL% NEQ 0 (
    echo Error: Docker push failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo Docker images pushed successfully!
echo ========================================
echo.
echo Images available at:
echo - yatindrarai002/flowforgeai:latest
echo - yatindrarai002/flowforgeai:v1.0
echo.
echo To run: docker run -p 80:80 -p 8000:8000 yatindrarai002/flowforgeai:latest
echo.
pause
