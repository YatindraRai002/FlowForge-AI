@echo off
echo Updating README...

cd /d "C:\Users\Asus\OneDrive\Desktop\FlowForge-AI-main"

ren README.md README_OLD.md
ren README_NEW.md README.md
del README_OLD.md
del remove_docker.bat

git add .
git commit -m "Update README with clean architecture and remove Docker references"
git push origin main

echo Done!
pause
