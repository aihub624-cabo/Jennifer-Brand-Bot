@echo off
echo ========================================
echo Pushing Jennifer Brand Bot to GitHub
echo ========================================
echo.

echo Setting GitHub repository URL...
git remote set-url origin https://github.com/aihub624-cabo/Jennifer-Brand-Bot.git

echo.
echo Current repository: 
git remote -v

echo.
echo Adding all files to git...
git add .

echo.
echo Committing changes...
git commit -m "Initial commit: Jennifer Brand Bot - AI-powered MSP assistant"

echo.
echo Pushing to GitHub (main branch)...
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo Push to main failed. Trying master branch...
    git push -u origin master
    
    if %errorlevel% neq 0 (
        echo.
        echo Push failed! You may need to authenticate with GitHub.
        echo Make sure you have:
        echo 1. Git configured with your credentials
        echo 2. GitHub Personal Access Token set up
        echo 3. Repository exists at: https://github.com/aihub624-cabo/Jennifer-Brand-Bot
        echo.
        echo Try running manually:
        echo git push -u origin main
        echo.
        pause
        exit /b 1
    )
)

echo.
echo ========================================
echo SUCCESS! Code pushed to GitHub
echo ========================================
echo.
echo Next steps:
echo 1. Go to: https://vercel.com/dashboard
echo 2. Click "Add New" - "Project"
echo 3. Import: Jennifer-Brand-Bot repository
echo 4. Add environment variables and deploy
echo.
echo Repository URL: https://github.com/aihub624-cabo/Jennifer-Brand-Bot
echo.
pause