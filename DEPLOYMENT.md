# 🚀 Deployment Guide

This guide will help you deploy your full-stack application to production.

## 📋 Pre-Deployment Checklist

Before deploying, make sure:

- [ ] Application works perfectly locally
- [ ] All environment variables are documented
- [ ] Sensitive data removed from code
- [ ] Error handling implemented
- [ ] API endpoints tested
- [ ] Database is accessible remotely
- [ ] CORS configured for production domains
- [ ] JWT secret is strong and unique

---

## 🗄️ Database Deployment

### MongoDB Atlas (Recommended)

**Why MongoDB Atlas?**
- Free tier available
- Automatic backups
- Global distribution
- Built-in security

**Steps:**

1. **Create Cluster** (if not already done)
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create account and cluster
   - Choose free tier (M0)

2. **Configure Network Access**
   - Go to Network Access
   - Click "Add IP Address"
   - Option 1: Add your server's IP
   - Option 2: Allow from anywhere (0.0.0.0/0) - *Use with caution*

3. **Create Database User**
   - Go to Database Access
   - Click "Add New Database User"
   - Choose password authentication
   - Set username and strong password
   - Grant read/write permissions

4. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password
   - Replace `<dbname>` with your database name

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/myapp?retryWrites=true&w=majority
```

5. **Test Connection**
   - Update `MONGODB_URI` in backend `.env`
   - Start your backend locally
   - Should see "Connected to MongoDB"

---

## 🖥️ Backend Deployment

### Option 1: Render (Recommended - Free Tier)

**Why Render?**
- Free tier with 750 hours/month
- Automatic deployments from GitHub
- Built-in environment variables
- SSL certificates included

**Steps:**

1. **Prepare Your Code**
   
   Update `backend/server.js`:
   ```javascript
   const PORT = process.env.PORT || 5000;
   ```

   Make sure your `package.json` has:
   ```json
   {
     "scripts": {
       "start": "node server.js"
     }
   }
   ```

2. **Push to GitHub**
   ```powershell
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

3. **Deploy on Render**
   - Go to [Render](https://render.com/)
   - Sign up with GitHub
   - Click "New +" → "Web Service"
   - Connect your repository
   - Configure:
     - **Name**: your-app-backend
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Instance Type**: Free

4. **Add Environment Variables**
   - In Render dashboard, go to "Environment"
   - Add variables:
     ```
     MONGODB_URI=your_atlas_connection_string
     JWT_SECRET=your_super_secret_key
     NODE_ENV=production
     FRONTEND_URL=https://your-frontend-domain.com
     ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for build to complete
   - Note your backend URL: `https://your-app-backend.onrender.com`

### Option 2: Railway

**Steps:**

1. **Install Railway CLI**
   ```powershell
   npm install -g @railway/cli
   ```

2. **Login**
   ```powershell
   railway login
   ```

3. **Initialize Project**
   ```powershell
   cd backend
   railway init
   ```

4. **Add Variables**
   ```powershell
   railway variables set MONGODB_URI=your_connection_string
   railway variables set JWT_SECRET=your_secret
   railway variables set NODE_ENV=production
   ```

5. **Deploy**
   ```powershell
   railway up
   ```

### Option 3: Heroku

**Steps:**

1. **Install Heroku CLI**
   - Download from [Heroku](https://devcenter.heroku.com/articles/heroku-cli)

2. **Login**
   ```powershell
   heroku login
   ```

3. **Create App**
   ```powershell
   cd backend
   heroku create your-app-name
   ```

4. **Set Environment Variables**
   ```powershell
   heroku config:set MONGODB_URI=your_connection_string
   heroku config:set JWT_SECRET=your_secret
   heroku config:set NODE_ENV=production
   ```

5. **Deploy**
   ```powershell
   git push heroku main
   ```

---

## 🌐 Frontend Deployment

### Option 1: Vercel (Recommended)

**Why Vercel?**
- Built for React/Vite
- Free tier
- Automatic deployments
- Global CDN
- Custom domains

**Steps:**

1. **Prepare Code**
   
   Update `frontend/src/context/AuthContext.jsx` and other API calls:
   ```javascript
   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
   ```

2. **Create `vercel.json`** in frontend folder:
   ```json
   {
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```

3. **Deploy**
   
   **Option A: Vercel Website**
   - Go to [Vercel](https://vercel.com/)
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: frontend
     - **Build Command**: `npm run build`
     - **Output Directory**: dist
   - Add environment variable:
     - `VITE_API_URL` = `https://your-backend.onrender.com/api`
   - Click "Deploy"

   **Option B: Vercel CLI**
   ```powershell
   npm install -g vercel
   cd frontend
   vercel
   ```

4. **Configure Custom Domain** (Optional)
   - Go to project settings → Domains
   - Add your custom domain
   - Update DNS records

### Option 2: Netlify

**Steps:**

1. **Create `_redirects` file** in `frontend/public/`:
   ```
   /*    /index.html   200
   ```

2. **Deploy**
   
   **Option A: Netlify Website**
   - Go to [Netlify](https://www.netlify.com/)
   - Drag and drop `frontend/dist` folder
   - Or connect GitHub repository

   **Option B: Netlify CLI**
   ```powershell
   npm install -g netlify-cli
   cd frontend
   npm run build
   netlify deploy --prod
   ```

3. **Environment Variables**
   - Go to Site Settings → Environment Variables
   - Add `VITE_API_URL` with your backend URL

### Option 3: Cloudflare Pages

**Steps:**

1. **Push to GitHub**

2. **Deploy on Cloudflare**
   - Go to [Cloudflare Pages](https://pages.cloudflare.com/)
   - Click "Create a project"
   - Connect GitHub
   - Configure:
     - **Build command**: `npm run build`
     - **Build output**: `dist`
     - **Root directory**: `frontend`
   - Add environment variable:
     - `VITE_API_URL` = your backend URL

---

## 🔒 Production Security Checklist

### Backend

- [ ] **Environment Variables**
  - All sensitive data in `.env`
  - Strong JWT secret (32+ characters)
  - `.env` in `.gitignore`

- [ ] **CORS Configuration**
  ```javascript
  const corsOptions = {
    origin: process.env.FRONTEND_URL || 'https://yourapp.com',
    credentials: true
  };
  app.use(cors(corsOptions));
  ```

- [ ] **Rate Limiting** (Add this)
  ```javascript
  import rateLimit from 'express-rate-limit';
  
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });
  
  app.use('/api/', limiter);
  ```

- [ ] **Helmet** (Add this)
  ```javascript
  import helmet from 'helmet';
  app.use(helmet());
  ```

- [ ] **Input Validation**
  - Validate all user inputs
  - Sanitize data
  - Use express-validator

- [ ] **Error Handling**
  - Don't expose stack traces in production
  - Log errors securely
  - Use proper HTTP status codes

### Frontend

- [ ] **Environment Variables**
  - Use `VITE_` prefix for env vars
  - Don't expose backend secrets
  - Use different configs for dev/prod

- [ ] **Build Optimization**
  ```powershell
  npm run build
  ```
  - Minified code
  - Tree shaking
  - Code splitting

- [ ] **Security Headers**
  - CSP (Content Security Policy)
  - X-Frame-Options
  - X-Content-Type-Options

---

## 🔄 CI/CD Pipeline (Optional)

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: |
          cd backend
          npm install
      - name: Deploy to Render
        # Add deployment steps

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Build
        run: |
          cd frontend
          npm install
          npm run build
      - name: Deploy to Vercel
        # Add deployment steps
```

---

## 📊 Monitoring & Logging

### Backend Monitoring

**Option 1: Winston Logger**

```javascript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

export default logger;
```

**Option 2: Cloud Services**
- [LogRocket](https://logrocket.com/)
- [Sentry](https://sentry.io/)
- [Datadog](https://www.datadoghq.com/)

### Frontend Monitoring

**Error Tracking:**
```javascript
// In main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: import.meta.env.MODE,
});
```

---

## 🧪 Testing in Production

After deployment:

1. **Health Check**
   ```powershell
   Invoke-WebRequest -Uri https://your-backend.com/health
   ```

2. **Test Authentication**
   - Try registering new user
   - Try logging in
   - Check JWT token

3. **Test Protected Routes**
   - Access dashboard
   - Try without token (should fail)

4. **Test CORS**
   - Make requests from frontend
   - Check Network tab in DevTools

5. **Performance**
   - Test load times
   - Check API response times
   - Monitor memory usage

---

## 🔄 Updates & Maintenance

### Deploy Updates

**Backend:**
- Push to GitHub → Auto-deploy on Render/Railway
- Or use: `railway up` / `heroku deploy`

**Frontend:**
- Push to GitHub → Auto-deploy on Vercel/Netlify
- Or use: `vercel --prod` / `netlify deploy --prod`

### Database Backups

**MongoDB Atlas:**
- Enable automatic backups
- Set retention policy
- Test restore procedure

### Rolling Back

**Render/Vercel:**
- Go to deployments
- Find previous successful deployment
- Click "Redeploy"

---

## 💰 Cost Estimation

### Free Tier (For Learning/Small Apps)

- **MongoDB Atlas**: Free (512 MB storage)
- **Render**: Free (750 hours/month)
- **Vercel**: Free (100 GB bandwidth)
- **Total**: $0/month

### Paid Tier (For Production)

- **MongoDB Atlas**: $9/month (Shared)
- **Render**: $7/month (Starter)
- **Vercel**: $20/month (Pro)
- **Total**: ~$36/month

---

## 🆘 Troubleshooting

### Backend Issues

**"Application error" on Render**
- Check logs in Render dashboard
- Verify environment variables
- Check build logs

**MongoDB connection timeout**
- Verify connection string
- Check IP whitelist
- Test locally with Atlas URI

**CORS errors**
- Update `FRONTEND_URL` in backend env
- Check allowed origins

### Frontend Issues

**API requests failing**
- Check `VITE_API_URL` environment variable
- Verify backend is running
- Check CORS configuration

**Build failures**
- Clear cache: `rm -rf node_modules package-lock.json`
- Reinstall: `npm install`
- Check Node version compatibility

---

## ✅ Post-Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Database connected and working
- [ ] Environment variables set correctly
- [ ] CORS configured properly
- [ ] SSL/HTTPS enabled
- [ ] Custom domain configured (if applicable)
- [ ] Error logging set up
- [ ] Monitoring enabled
- [ ] Backups configured
- [ ] Tested all major features
- [ ] Updated documentation with production URLs

---

## 🎉 Success!

Your application is now live! 🚀

**Next steps:**
- Share with users
- Gather feedback
- Monitor performance
- Plan new features

---

**Need help?** Check the logs, read error messages carefully, and refer to platform-specific documentation.

**Good luck with your deployment! 🌟**
