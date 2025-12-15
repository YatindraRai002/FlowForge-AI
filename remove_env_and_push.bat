@echo off
echo Removing .env files...
git rm -f backend/.env 2>nul
git rm -f backend/.env.example 2>nul

echo Staging changes...
git add .

echo Committing changes...
git commit -m "Remove .env and .env.example files from repository"

echo Pushing to GitHub...
git push origin main

echo Done!
pause
