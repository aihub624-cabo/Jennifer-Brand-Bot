# 🚀 GitHub Repository Setup

## Step 1: Create GitHub Repository

1. Go to: https://github.com/aihub624-cabo
2. Click "New repository" (green button)
3. Repository settings:
   - **Repository name**: `jennifer-brand-bot`
   - **Description**: `Jennifer Brand Bot - AI-powered MSP sales and marketing assistant`
   - **Visibility**: Public (recommended) or Private
   - **DO NOT** check "Add a README file"
   - **DO NOT** check "Add .gitignore" 
   - **DO NOT** check "Choose a license"
4. Click "Create repository"

## Step 2: Push Code to GitHub

After creating the repository, run these commands:

```bash
git push -u origin master
```

## Step 3: Deploy to Vercel

Once pushed to GitHub:

1. Go to https://vercel.com/dashboard (logged in as aihub624@gmail.com)
2. Click "Add New" → "Project"
3. Import from Git: `jennifer-brand-bot` repository
4. Configure:
   - Framework Preset: Next.js (should auto-detect)
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Add Environment Variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://bqrenmlkgduelsfyhdxa.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxcmVubWxrZ2R1ZWxzZnloZHhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NTc2ODAsImV4cCI6MjA3NDIzMzY4MH0.GepcO2Xd4AgGhp225WrBDIXe7Z6ohgJsVgN7NOiLEc8
   ```
6. Click "Deploy"

## Alternative: Use Different Repository Name

If you prefer a different name, run:
```bash
git remote set-url origin https://github.com/aihub624-cabo/YOUR-REPO-NAME.git
git push -u origin master
```

## What You'll Get After Setup:
- ✅ Code on GitHub for version control
- ✅ Automatic deployments from GitHub to Vercel
- ✅ Professional Jennifer Brand Bot live on your domain
- ✅ Ready for N8N integration