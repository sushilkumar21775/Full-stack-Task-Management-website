# 🚀 Quick Start Guide

This guide will help you get the full-stack application up and running quickly.

## 📋 Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - Choose one:
  - [MongoDB Community Server](https://www.mongodb.com/try/download/community) (local)
  - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cloud - recommended for beginners)
- **Git** (optional) - [Download](https://git-scm.com/)

### Check Your Installation

```powershell
node --version   # Should be v18 or higher
npm --version    # Should be 9 or higher
mongod --version # If using local MongoDB
```

---

## ⚡ Quick Setup (5 minutes)

### Step 1: Install Dependencies

Open PowerShell in the project directory and run:

```powershell
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Go back to root
cd ..
```

### Step 2: Set Up MongoDB

**Option A: MongoDB Atlas (Recommended for Beginners)**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier is fine)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

**Option B: Local MongoDB**

1. Start MongoDB:
   ```powershell
   mongod
   ```
2. Your connection string is: `mongodb://localhost:27017/fullstack-app`

### Step 3: Configure Environment Variables

**Backend Configuration:**

```powershell
cd backend
copy .env.example .env
```

Edit `backend/.env`:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/fullstack-app
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fullstack-app

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Frontend Configuration (for CORS)
FRONTEND_URL=http://localhost:5173
```

**Frontend Configuration:**

```powershell
cd ../frontend
copy .env.example .env
```

Edit `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
```

### Step 4: Seed the Database (Optional)

Create sample users for testing:

```powershell
cd backend
npm run seed
```

This creates:
- **Admin**: admin@example.com / admin123
- **User**: john@example.com / john123
- **User**: jane@example.com / jane123

### Step 5: Start the Application

Open **two separate PowerShell windows**:

**Window 1 - Backend:**
```powershell
cd backend
npm run dev
```

You should see:
```
🚀 Server running on http://localhost:5000
✅ Connected to MongoDB
```

**Window 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

You should see:
```
  VITE v5.0.8  ready in XXX ms

  ➜  Local:   http://localhost:5173/
```

### Step 6: Open Your Browser

Visit: **http://localhost:5173**

You should see the home page! 🎉

---

## 🧪 Test the Application

### 1. Register a New User

1. Click "Get Started" or "Sign Up"
2. Fill in the registration form:
   - Name: Your Name
   - Email: your@email.com
   - Password: (min 6 characters)
3. Click "Create Account"
4. You'll be redirected to the dashboard

### 2. Try Protected Routes

- Visit `/dashboard` - Should show your user info
- Visit `/profile` - Should allow editing your profile
- Logout and try visiting `/dashboard` - Should redirect to login

### 3. Test API Endpoints

You can test the API using the health check script:

```powershell
cd backend
npm run check
```

Or manually test with curl/PowerShell:

```powershell
# Health check
Invoke-WebRequest -Uri http://localhost:5000/health

# Register
$body = @{
    name = "Test User"
    email = "test@example.com"
    password = "test123"
} | ConvertTo-Json

Invoke-WebRequest -Uri http://localhost:5000/api/auth/register `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
```

---

## 📁 Project Structure Overview

```
Full Stack/
├── backend/                 # Node.js + Express API
│   ├── config/             # Database configuration
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Auth & error handling
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── scripts/            # Utility scripts
│   ├── server.js           # Entry point
│   └── .env                # Environment variables
│
├── frontend/                # React + Vite app
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # Global state
│   │   ├── pages/          # Route pages
│   │   ├── App.jsx         # Main component
│   │   └── main.jsx        # Entry point
│   └── .env                # Environment variables
│
└── README.md               # Project documentation
```

---

## 🛠️ Common Commands

### Backend

```powershell
cd backend

npm run dev          # Start development server with auto-reload
npm start            # Start production server
npm run check        # Check server health
npm run seed         # Seed database with sample data
```

### Frontend

```powershell
cd frontend

npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## ❓ Troubleshooting

### Backend won't start

**Error: "MONGODB_URI is required"**
- Make sure you created `.env` file in backend folder
- Check that `MONGODB_URI` is set correctly

**Error: "connect ECONNREFUSED"**
- If using local MongoDB, make sure `mongod` is running
- If using Atlas, check your connection string and network access

**Error: "Port 5000 already in use"**
```powershell
# Windows - find and kill the process
netstat -ano | findstr :5000
taskkill /PID <process_id> /F
```

### Frontend won't connect to backend

**Error: "Network Error" or CORS issues**
- Make sure backend is running on port 5000
- Check `VITE_API_URL` in frontend/.env
- Verify `FRONTEND_URL` in backend/.env

**API calls fail**
- Open browser DevTools (F12) → Network tab
- Check if requests are going to correct URL
- Look at response status and error messages

### MongoDB connection issues

**Local MongoDB:**
```powershell
# Start MongoDB
mongod

# Check if running
mongo --eval "db.runCommand({ ping: 1 })"
```

**MongoDB Atlas:**
- Check your IP is whitelisted (or use 0.0.0.0/0 for development)
- Verify username/password in connection string
- Make sure database user has read/write permissions

### Can't login with seeded users

Make sure you ran the seed script:
```powershell
cd backend
npm run seed
```

### Port conflicts

**Change backend port:**
Edit `backend/.env`:
```env
PORT=8000
```

**Change frontend port:**
Edit `frontend/vite.config.js`:
```js
export default defineConfig({
  server: {
    port: 3000  // Change to your preferred port
  }
})
```

---

## 🎯 Next Steps

1. **Explore the Code**
   - Check out `backend/SERVER.md` for API documentation
   - Read `AUTHENTICATION.md` for auth flow details
   - Review `README.md` for project overview

2. **Customize the Application**
   - Update Tailwind colors in `frontend/tailwind.config.js`
   - Add new API endpoints in `backend/routes/`
   - Create new pages in `frontend/src/pages/`

3. **Add Features**
   - Implement password reset
   - Add email verification
   - Create user roles and permissions
   - Add file upload functionality
   - Implement real-time features with WebSocket

4. **Deploy Your App**
   - Backend: Render, Railway, Heroku
   - Frontend: Vercel, Netlify, Cloudflare Pages
   - Database: MongoDB Atlas

---

## 📚 Learn More

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/)

---

## 🆘 Need Help?

- Check the documentation files in the project
- Review error messages carefully
- Use the health check script: `npm run check`
- Check browser console (F12) for frontend errors
- Check terminal output for backend errors

---

**Ready to build something amazing! 🚀**
