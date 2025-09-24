@echo off
echo ========================================
echo Jennifer Brand Bot - Setup & Deploy
echo ========================================
echo.

echo Choose an option:
echo 1. Push to GitHub
echo 2. Deploy to Vercel
echo 3. Both (Push to GitHub then Deploy to Vercel)
echo 4. Exit
echo.
set /p choice="Enter choice (1-4): "

if "%choice%"=="1" goto :push_github
if "%choice%"=="2" goto :deploy_vercel
if "%choice%"=="3" goto :push_and_deploy
if "%choice%"=="4" goto :exit
echo Invalid choice. Please try again.
goto :start

:push_github
echo.
echo ========================================
echo Pushing to GitHub...
echo ========================================
git remote set-url origin https://github.com/aihub624-cabo/Jennifer-Brand-Bot.git
git add .
git commit -m "Update: Jennifer Brand Bot deployment"
git push -u origin main || git push -u origin master
if %errorlevel% neq 0 (
    echo Push failed. Check your GitHub authentication.
    pause
    exit /b 1
)
echo ✓ Successfully pushed to GitHub!
goto :end

:deploy_vercel
echo.
echo ========================================
echo Deploying to Vercel...
echo ========================================
npm run build
if %errorlevel% neq 0 (
    echo Build failed!
    pause
    exit /b 1
)
vercel --prod
echo ✓ Deployment initiated!
goto :end

:push_and_deploy
call :push_github
call :deploy_vercel
goto :end

:end
echo.
echo ========================================
echo Setup Complete!
echo ========================================
pause
exit

:exit
exit