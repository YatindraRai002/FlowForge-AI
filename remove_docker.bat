@echo off
echo Removing Docker files...

git rm -f Dockerfile
git rm -f docker-compose.yml
git rm -f DOCKER.md
git rm -f DEPLOY_DOCKER.ps1
git rm -f docker_push.bat
git rm -f .env.docker
git rm -rf docker

echo Committing changes...
git commit -m "Remove Docker deployment files"

echo Pushing to GitHub...
git push origin main

echo Done!
pause
