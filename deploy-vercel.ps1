# Vercel Deployment Script for Full-Stack App
# Run this script to deploy both frontend and backend

Write-Host "🚀 Full-Stack MERN App - Vercel Deployment" -ForegroundColor Cyan
Write-Host "==========================================`n" -ForegroundColor Cyan

# Check if Vercel CLI is installed
Write-Host "Checking for Vercel CLI..." -ForegroundColor Yellow
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "❌ Vercel CLI not found!" -ForegroundColor Red
    Write-Host "`nInstalling Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
    Write-Host "✅ Vercel CLI installed successfully!`n" -ForegroundColor Green
} else {
    Write-Host "✅ Vercel CLI found!`n" -ForegroundColor Green
}

# Login to Vercel
Write-Host "Step 1: Login to Vercel" -ForegroundColor Cyan
Write-Host "========================`n" -ForegroundColor Cyan
vercel login

Write-Host "`n`n"

# Deploy Backend
Write-Host "Step 2: Deploying Backend..." -ForegroundColor Cyan
Write-Host "============================`n" -ForegroundColor Cyan
Set-Location -Path "backend"
Write-Host "Current directory: backend/" -ForegroundColor Gray

Write-Host "`nDeploying to Vercel (Production)..." -ForegroundColor Yellow
$backendDeploy = vercel --prod

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Backend deployed successfully!" -ForegroundColor Green
    Write-Host "Backend URL: $backendDeploy" -ForegroundColor Green
    
    # Save backend URL for frontend
    $backendUrl = $backendDeploy.Trim()
    Write-Host "`nSave this URL - you'll need it for frontend deployment!" -ForegroundColor Yellow
    Write-Host "Backend API URL: $backendUrl/api`n" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Backend deployment failed!" -ForegroundColor Red
    Set-Location -Path ".."
    exit 1
}

Set-Location -Path ".."

Write-Host "`n`n"

# Deploy Frontend
Write-Host "Step 3: Deploying Frontend..." -ForegroundColor Cyan
Write-Host "============================`n" -ForegroundColor Cyan
Set-Location -Path "frontend"
Write-Host "Current directory: frontend/" -ForegroundColor Gray

Write-Host "`n⚠️  IMPORTANT: Update Environment Variable" -ForegroundColor Yellow
Write-Host "Before deploying frontend, you need to set:" -ForegroundColor Yellow
Write-Host "VITE_API_URL = $backendUrl/api`n" -ForegroundColor Cyan

$response = Read-Host "Have you added VITE_API_URL to Vercel project settings? (y/n)"

if ($response -eq 'y' -or $response -eq 'Y') {
    Write-Host "`nDeploying to Vercel (Production)..." -ForegroundColor Yellow
    $frontendDeploy = vercel --prod
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ Frontend deployed successfully!" -ForegroundColor Green
        Write-Host "Frontend URL: $frontendDeploy" -ForegroundColor Green
    } else {
        Write-Host "`n❌ Frontend deployment failed!" -ForegroundColor Red
        Set-Location -Path ".."
        exit 1
    }
} else {
    Write-Host "`n📝 To add environment variables:" -ForegroundColor Yellow
    Write-Host "1. Go to https://vercel.com/dashboard" -ForegroundColor White
    Write-Host "2. Select your frontend project" -ForegroundColor White
    Write-Host "3. Settings → Environment Variables" -ForegroundColor White
    Write-Host "4. Add: VITE_API_URL = $backendUrl/api" -ForegroundColor White
    Write-Host "5. Run this script again`n" -ForegroundColor White
}

Set-Location -Path ".."

Write-Host "`n`n"
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ Deployment Summary" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Backend API:  $backendUrl/api" -ForegroundColor White
Write-Host "Frontend App: $frontendDeploy" -ForegroundColor White
Write-Host "`nHealth Check: $backendUrl/health" -ForegroundColor Gray
Write-Host "`n🎉 Your full-stack app is live!" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan
