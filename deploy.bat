@echo off
echo ========================================
echo Jennifer Brand Bot - Vercel Deployment
echo ========================================
echo.

echo Step 1: Building the application...
call npm run build
if %errorlevel% neq 0 (
    echo Build failed!
    pause
    exit /b 1
)

echo.
echo Step 2: Deploying to Vercel...
echo Make sure you're logged in with: aihub624@gmail.com
echo.
call vercel --prod

echo.
echo ========================================
echo Deployment Complete!
echo ========================================
echo.
echo If this is your first deployment, set these environment variables in Vercel:
echo - NEXT_PUBLIC_SUPABASE_URL = https://bqrenmlkgduelsfyhdxa.supabase.co
echo - NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxcmVubWxrZ2R1ZWxzZnloZHhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NTc2ODAsImV4cCI6MjA3NDIzMzY4MH0.GepcO2Xd4AgGhp225WrBDIXe7Z6ohgJsVgN7NOiLEc8
echo.
pause