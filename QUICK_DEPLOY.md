# 🚀 Quick Vercel Deployment (5 Minutes)

## Easiest Method - Using Vercel Dashboard

### 1️⃣ **Go to Vercel & Sign Up**
- Visit: https://vercel.com
- Click "Continue with GitHub"
- Authorize Vercel

---

### 2️⃣ **Deploy Backend First**

1. Click **"Add New..." → "Project"**
2. Find and import: `Full-stack-Task-Management-website`
3. Configure:
   - **Root Directory**: `backend`
   - **Framework Preset**: Other
   - **Build Command**: `npm install`
   - Leave **Output Directory** empty

4. **Add Environment Variables** (click "Add" for each):
   ```
   NODE_ENV = production
   MONGODB_URI = mongodb+srv://admin:admin123@cluster0.hpxidhg.mongodb.net/fullstack-db?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET = your_super_secret_jwt_key_change_this_in_production_min_32_chars
   JWT_EXPIRE = 30d
   PORT = 5000
   ```

5. Click **"Deploy"** and wait (~2 mins)

6. **Copy your backend URL** (e.g., `https://full-stack-task-backend.vercel.app`)

---

### 3️⃣ **Deploy Frontend**

1. Go back to Vercel Dashboard
2. Click **"Add New..." → "Project"** again
3. Select the **same repository** again
4. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. **Add Environment Variable**:
   ```
   VITE_API_URL = [YOUR_BACKEND_URL]/api
   ```
   Example: `VITE_API_URL = https://full-stack-task-backend.vercel.app/api`

6. Click **"Deploy"** and wait (~2 mins)

7. **Your app is live!** 🎉

---

### 4️⃣ **Update Backend CORS**

After deploying frontend, you need to update backend CORS:

1. Go to your **backend project** in Vercel
2. Settings → Environment Variables
3. Add new variable:
   ```
   FRONTEND_URL = [YOUR_FRONTEND_URL]
   ```
   Example: `FRONTEND_URL = https://full-stack-task-app.vercel.app`

4. Click **"Redeploy"** (Deployments tab → ... → Redeploy)

---

### 5️⃣ **Test Your App**

Visit your frontend URL and test:
- ✅ Registration
- ✅ Login
- ✅ Create tasks
- ✅ Mark tasks complete
- ✅ Dark mode toggle

---

## 🔧 MongoDB Atlas Setup (Important!)

1. Go to https://cloud.mongodb.com
2. **Network Access** → Click "Add IP Address"
3. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click "Confirm"

---

## 📊 Your Live URLs

After deployment:
- **Frontend**: `https://your-app.vercel.app`
- **Backend API**: `https://your-backend.vercel.app/api`
- **Health Check**: `https://your-backend.vercel.app/health`

---

## ❌ Troubleshooting

### "Cannot connect to database"
→ Check MongoDB Atlas allows connections from anywhere (Network Access)

### "API calls failing"
→ Verify `VITE_API_URL` matches your backend URL + `/api`

### "CORS error"
→ Add `FRONTEND_URL` environment variable to backend

---

## 🎯 Quick Checklist

- [ ] Backend deployed with all env vars
- [ ] Frontend deployed with VITE_API_URL
- [ ] MongoDB allows connections (0.0.0.0/0)
- [ ] Backend redeployed with FRONTEND_URL
- [ ] Test registration works
- [ ] Test login works
- [ ] Test creating tasks

---

**That's it! Your app is deployed! 🚀**

Submit your Vercel frontend URL for your assignment.
