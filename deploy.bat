@echo off
echo ========================================
echo Jennifer Brand Bot - Vercel Deployment
echo ========================================
echo.

echo Current directory: %CD%
echo.

echo Step 1: Checking if package.json exists...
if not exist package.json (
    echo ERROR: package.json not found!
    echo Make sure you're in the correct directory.
    pause
    exit /b 1
)
echo ✓ package.json found

echo.
echo Step 2: Checking if Next.js is installed...
if not exist node_modules\next (
    echo Installing dependencies...
    call npm install
)
echo ✓ Next.js found

echo.
echo Step 3: Building the application...
call npm run build
if %errorlevel% neq 0 (
    echo Build failed!
    pause
    exit /b 1
)
echo ✓ Build successful

echo.
echo Step 4: Check Vercel login...
echo Make sure you're logged in with: aihub624@gmail.com
echo If not logged in, run: vercel login
echo.
pause

echo.
echo Step 5: Deploying to Vercel...
call vercel --prod --debug
if %errorlevel% neq 0 (
    echo Deployment failed!
    echo Try running: vercel login
    pause
    exit /b 1
)

echo.
echo ========================================
echo Deployment Complete!
echo ========================================
echo.
echo If this is your first deployment, set these environment variables in Vercel Dashboard:
echo.
echo NEXT_PUBLIC_SUPABASE_URL = https://bqrenmlkgduelsfyhdxa.supabase.co
echo.
echo NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxcmVubWxrZ2R1ZWxzZnloZHhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NTc2ODAsImV4cCI6MjA3NDIzMzY4MH0.GepcO2Xd4AgGhp225WrBDIXe7Z6ohgJsVgN7NOiLEc8
echo.
echo Open your Vercel dashboard to add these variables if needed.
echo.
pause