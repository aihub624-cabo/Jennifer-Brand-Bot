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
echo Pushing to GitHub...
git push -u origin master

if %errorlevel% neq 0 (
    echo.
    echo Push failed! You may need to authenticate with GitHub.
    echo Try running: git push -u origin master
    pause
    exit /b 1
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