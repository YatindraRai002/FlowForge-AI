# FlowForge AI - Complete Docker Deployment Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "FlowForge AI - Docker Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Commit and push to GitHub
Write-Host "[1/5] Pushing code to GitHub..." -ForegroundColor Yellow
git add .
git commit -m "Add Docker deployment configuration and documentation"
git push origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Git push failed!" -ForegroundColor Red
    pause
    exit 1
}

Write-Host "✓ Code pushed to GitHub" -ForegroundColor Green
Write-Host ""

# Step 2: Check Docker
Write-Host "[2/5] Checking Docker..." -ForegroundColor Yellow
docker --version

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Docker is not running! Please start Docker Desktop." -ForegroundColor Red
    pause
    exit 1
}

Write-Host "✓ Docker is running" -ForegroundColor Green
Write-Host ""

# Step 3: Login to Docker Hub
Write-Host "[3/5] Logging into Docker Hub..." -ForegroundColor Yellow
Write-Host "Please enter your Docker Hub credentials:" -ForegroundColor Cyan
docker login

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Docker login failed!" -ForegroundColor Red
    pause
    exit 1
}

Write-Host "✓ Logged into Docker Hub" -ForegroundColor Green
Write-Host ""

# Step 4: Build Docker image
Write-Host "[4/5] Building Docker image (this may take 5-10 minutes)..." -ForegroundColor Yellow
docker build -t yatindrarai002/flowforgeai:latest -t yatindrarai002/flowforgeai:v1.0 .

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Docker build failed!" -ForegroundColor Red
    pause
    exit 1
}

Write-Host "✓ Docker image built successfully" -ForegroundColor Green
Write-Host ""

# Step 5: Push to Docker Hub
Write-Host "[5/5] Pushing to Docker Hub..." -ForegroundColor Yellow
Write-Host "Pushing latest tag..." -ForegroundColor Cyan
docker push yatindrarai002/flowforgeai:latest

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Docker push failed!" -ForegroundColor Red
    pause
    exit 1
}

Write-Host "Pushing version tag..." -ForegroundColor Cyan
docker push yatindrarai002/flowforgeai:v1.0

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Docker push failed!" -ForegroundColor Red
    pause
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✓ Deployment Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Docker images available at:" -ForegroundColor Cyan
Write-Host "  • https://hub.docker.com/r/yatindrarai002/flowforgeai" -ForegroundColor White
Write-Host ""
Write-Host "To run the container:" -ForegroundColor Cyan
Write-Host "  docker run -d -p 80:80 -p 8000:8000 -e GEMINI_API_KEY=your_key yatindrarai002/flowforgeai:latest" -ForegroundColor White
Write-Host ""
Write-Host "GitHub repository:" -ForegroundColor Cyan
Write-Host "  https://github.com/YatindraRai002/FlowForge-AI" -ForegroundColor White
Write-Host ""

pause
