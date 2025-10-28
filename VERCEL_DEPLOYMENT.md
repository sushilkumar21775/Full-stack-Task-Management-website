# Vercel Deployment Guide

## 🚀 Deploy Full-Stack MERN App to Vercel

### Prerequisites
- GitHub account (already done ✅)
- Vercel account (free): https://vercel.com/signup

---

## Option 1: Deploy via Vercel Dashboard (Recommended - Easiest)

### Step 1: Sign Up/Login to Vercel
1. Go to https://vercel.com
2. Click "Sign Up" or "Login"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub

### Step 2: Import Your Project
1. Click "Add New..." → "Project"
2. Select your repository: `Full-stack-Task-Management-website`
3. Click "Import"

### Step 3: Configure Build Settings

**Framework Preset:** Other

**Root Directory:** `frontend`

**Build Command:**
```bash
npm install && npm run build
```

**Output Directory:**
```
dist
```

**Install Command:**
```bash
npm install
```

### Step 4: Add Environment Variables

Click "Environment Variables" and add these:

#### Frontend Environment Variables:
```
VITE_API_URL = https://your-backend-url.vercel.app/api
```
(Note: You'll update this after deploying the backend)

### Step 5: Deploy Frontend
1. Click "Deploy"
2. Wait for build to complete (~2-3 minutes)
3. You'll get a URL like: `https://your-app.vercel.app`

---

## Deploy Backend Separately

### Step 1: Create New Project for Backend
1. Go back to Vercel Dashboard
2. Click "Add New..." → "Project"
3. Select the same repository again
4. Click "Import"

### Step 2: Configure Backend Settings

**Framework Preset:** Other

**Root Directory:** `backend`

**Build Command:**
```bash
npm install
```

**Output Directory:** (leave empty)

**Install Command:**
```bash
npm install
```

### Step 3: Add Backend Environment Variables

```
NODE_ENV = production
MONGODB_URI = mongodb+srv://admin:admin123@cluster0.hpxidhg.mongodb.net/fullstack-db?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET = your_super_secret_jwt_key_change_this_in_production_min_32_chars_for_security
JWT_EXPIRE = 30d
PORT = 5000
```

### Step 4: Deploy Backend
1. Click "Deploy"
2. Copy the backend URL (e.g., `https://your-backend.vercel.app`)

### Step 5: Update Frontend Environment Variable
1. Go to your Frontend project in Vercel
2. Settings → Environment Variables
3. Update `VITE_API_URL` with your backend URL:
   ```
   VITE_API_URL = https://your-backend.vercel.app/api
   ```
4. Click "Redeploy" to rebuild with new env var

---

## Option 2: Deploy via Vercel CLI (Advanced)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy Frontend
```bash
cd frontend
vercel --prod
```

### Step 4: Deploy Backend
```bash
cd ../backend
vercel --prod
```

---

## ⚙️ Important Configuration Updates

### Update CORS in Backend

Edit `backend/server.js` - update CORS origin:

```javascript
const corsOptions = {
  origin: [
    'https://your-frontend.vercel.app',
    'http://localhost:5173',
    'http://localhost:5174'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};
```

### MongoDB Atlas Network Access
1. Go to MongoDB Atlas: https://cloud.mongodb.com
2. Network Access → Add IP Address
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Or add Vercel IPs specifically

---

## 🔍 Troubleshooting

### Backend not responding?
- Check Vercel Functions logs
- Ensure MongoDB allows connections from anywhere
- Verify environment variables are set

### Frontend API calls failing?
- Check VITE_API_URL is correct
- Ensure backend is deployed and running
- Check CORS settings

### Build fails?
- Check package.json has all dependencies
- Ensure Node version compatibility (use Node 18+)

---

## 📊 Monitoring

### Vercel Dashboard Features:
- Real-time logs
- Analytics
- Performance metrics
- Custom domains

---

## 🎯 Final Checklist

- [ ] Frontend deployed successfully
- [ ] Backend deployed successfully
- [ ] Environment variables configured
- [ ] CORS updated with frontend URL
- [ ] MongoDB allows Vercel connections
- [ ] Frontend can reach backend API
- [ ] Test registration/login works
- [ ] Test task CRUD operations
- [ ] Test dark mode toggle

---

## 🔗 Your Deployed URLs

After deployment, you'll have:
- **Frontend:** https://your-app.vercel.app
- **Backend API:** https://your-backend.vercel.app/api
- **Health Check:** https://your-backend.vercel.app/health

---

## 💡 Pro Tips

1. **Use Environment Variables:** Never hardcode secrets
2. **Enable GitHub Integration:** Auto-deploy on push
3. **Custom Domain:** Add your own domain in Vercel settings
4. **Monitoring:** Check Vercel Analytics regularly
5. **Logs:** Use Vercel logs for debugging

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Support: https://vercel.com/support

Good luck with your deployment! 🚀
