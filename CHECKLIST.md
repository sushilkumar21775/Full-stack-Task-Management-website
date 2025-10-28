# 🎯 Setup Checklist

Use this checklist to make sure everything is properly configured and working.

## ✅ Prerequisites

- [ ] Node.js installed (v18+) - `node --version`
- [ ] npm installed (v9+) - `npm --version`
- [ ] MongoDB installed or Atlas account created
- [ ] Git installed (optional) - `git --version`

---

## ✅ Installation

### Backend
- [ ] Navigated to `backend` directory
- [ ] Ran `npm install`
- [ ] All dependencies installed without errors
- [ ] Created `.env` file from `.env.example`
- [ ] Set `MONGODB_URI` in `.env`
- [ ] Set `JWT_SECRET` in `.env`
- [ ] Set `PORT` in `.env` (default: 5000)

### Frontend
- [ ] Navigated to `frontend` directory
- [ ] Ran `npm install`
- [ ] All dependencies installed without errors
- [ ] Created `.env` file from `.env.example`
- [ ] Set `VITE_API_URL` in `.env` (default: http://localhost:5000/api)

---

## ✅ Database Setup

Choose one:

### Option A: MongoDB Atlas (Cloud - Recommended)
- [ ] Created MongoDB Atlas account
- [ ] Created a free cluster
- [ ] Created database user with password
- [ ] Whitelisted IP address (or set to 0.0.0.0/0 for development)
- [ ] Got connection string
- [ ] Updated `MONGODB_URI` in `backend/.env`
- [ ] Connection string includes password
- [ ] Connection string includes database name

### Option B: Local MongoDB
- [ ] MongoDB installed locally
- [ ] MongoDB service running - `mongod`
- [ ] Can connect via `mongo` shell
- [ ] Updated `MONGODB_URI` to `mongodb://localhost:27017/fullstack-app`

---

## ✅ First Run

### Backend
- [ ] Opened terminal in `backend` directory
- [ ] Ran `npm run dev`
- [ ] Server started on port 5000
- [ ] Saw "Connected to MongoDB" message
- [ ] No error messages in console
- [ ] Can access http://localhost:5000 in browser

### Frontend
- [ ] Opened NEW terminal in `frontend` directory
- [ ] Ran `npm run dev`
- [ ] Development server started on port 5173
- [ ] Saw Vite startup message
- [ ] No error messages in console
- [ ] Can access http://localhost:5173 in browser

---

## ✅ Health Check

- [ ] Backend server is running
- [ ] Frontend server is running
- [ ] Ran `npm run check` in backend directory
- [ ] Health check passed
- [ ] MongoDB connection confirmed

---

## ✅ Database Seeding (Optional)

- [ ] Ran `npm run seed` in backend directory
- [ ] Saw "Database seeded successfully" message
- [ ] Three users created (admin, john, jane)
- [ ] Got sample credentials

---

## ✅ Testing Authentication

### Register New User
- [ ] Opened http://localhost:5173
- [ ] Clicked "Get Started" or navigated to /register
- [ ] Filled registration form
- [ ] Password strength indicator works
- [ ] Form validation works (email format, password length)
- [ ] Clicked "Create Account"
- [ ] Redirected to /dashboard
- [ ] Saw welcome message with user info

### Login
- [ ] Clicked "Logout" button
- [ ] Redirected to home page
- [ ] Clicked "Sign In" or navigated to /login
- [ ] Entered credentials
- [ ] Clicked "Sign In"
- [ ] Redirected to /dashboard
- [ ] Token stored in localStorage (check DevTools → Application → Local Storage)

### Protected Routes
- [ ] While logged in, can access /dashboard
- [ ] While logged in, can access /profile
- [ ] Logged out
- [ ] Tried to access /dashboard - redirected to /login
- [ ] Saw yellow warning alert about authentication
- [ ] After logging in, redirected back to attempted page

---

## ✅ Testing Features

### Navigation
- [ ] Navbar shows on all pages
- [ ] Active page indicator works
- [ ] Mobile menu works (try resizing browser)
- [ ] All navigation links work

### Dashboard
- [ ] Shows user name, email, role
- [ ] Shows user ID
- [ ] Role badge displays correctly
- [ ] Stat cards appear

### Profile
- [ ] Can update name
- [ ] Can update email
- [ ] Can update password
- [ ] Form validation works
- [ ] Success message appears after update
- [ ] Changes persist after refresh

### Responsive Design
- [ ] App works on desktop (1920px+)
- [ ] App works on tablet (768px)
- [ ] App works on mobile (375px)
- [ ] Mobile menu appears on small screens
- [ ] Forms are readable on mobile

---

## ✅ API Testing

### Using Health Check Script
- [ ] Ran `npm run check` in backend
- [ ] Health endpoint responded
- [ ] Root endpoint responded
- [ ] Server status is "healthy"

### Manual Testing (Optional)
Try these PowerShell commands:

#### Health Check
```powershell
Invoke-WebRequest -Uri http://localhost:5000/health
```
- [ ] Status 200
- [ ] JSON response with status, uptime, mongodb

#### Register
```powershell
$body = @{name="Test";email="test@test.com";password="test123"} | ConvertTo-Json
Invoke-WebRequest -Uri http://localhost:5000/api/auth/register -Method POST -ContentType "application/json" -Body $body
```
- [ ] Status 201
- [ ] Response includes token

#### Login
```powershell
$body = @{email="test@test.com";password="test123"} | ConvertTo-Json
Invoke-WebRequest -Uri http://localhost:5000/api/auth/login -Method POST -ContentType "application/json" -Body $body
```
- [ ] Status 200
- [ ] Response includes token

---

## ✅ Browser DevTools Check

### Console (F12)
- [ ] No errors in console
- [ ] No CORS errors
- [ ] No 404 errors
- [ ] No authentication errors (when logged in)

### Network Tab
- [ ] API requests going to http://localhost:5000
- [ ] Requests include Authorization header (when logged in)
- [ ] Status codes are 200/201
- [ ] Responses are JSON

### Application Tab
- [ ] localStorage has `token` key (when logged in)
- [ ] Token value is a JWT (long string with dots)
- [ ] Token is removed after logout

---

## ✅ Code Review

### Backend
- [ ] Read `backend/SERVER.md` for API docs
- [ ] Reviewed `backend/server.js` - entry point
- [ ] Checked `backend/models/User.model.js` - user schema
- [ ] Checked `backend/controllers/auth.controller.js` - auth logic
- [ ] Reviewed `backend/middleware/auth.js` - JWT verification

### Frontend
- [ ] Read `AUTHENTICATION.md` for auth flow
- [ ] Reviewed `frontend/src/App.jsx` - routes
- [ ] Checked `frontend/src/context/AuthContext.jsx` - global state
- [ ] Reviewed `frontend/src/components/ProtectedRoute.jsx` - route guard
- [ ] Checked `frontend/src/pages/Login.jsx` - login logic

---

## ✅ Documentation

- [ ] Read `README.md` - project overview
- [ ] Read `QUICKSTART.md` - setup guide
- [ ] Read `AUTHENTICATION.md` - auth flow explanation
- [ ] Read `backend/SERVER.md` - API reference

---

## ✅ Common Issues Fixed

If you encountered issues, mark them as resolved:

- [ ] Fixed MongoDB connection error
- [ ] Fixed CORS error between frontend/backend
- [ ] Fixed port already in use error
- [ ] Fixed missing dependencies
- [ ] Fixed environment variables
- [ ] Fixed password validation
- [ ] Fixed protected route redirects

---

## ✅ Next Steps

Ready to customize?

- [ ] Changed Tailwind colors in `tailwind.config.js`
- [ ] Updated app name/branding
- [ ] Added new pages
- [ ] Created new API endpoints
- [ ] Customized user model with new fields
- [ ] Added email verification
- [ ] Implemented password reset
- [ ] Added file upload
- [ ] Set up deployment

---

## 🎉 All Done!

If all boxes are checked, congratulations! Your full-stack application is fully set up and working.

### What's Working:
✅ Backend API with Express + MongoDB  
✅ Frontend React app with Tailwind CSS  
✅ JWT authentication  
✅ Protected routes  
✅ User registration & login  
✅ Profile management  
✅ Responsive design  
✅ Comprehensive documentation  

### Ready to Build! 🚀

Need help? Check:
- [QUICKSTART.md](QUICKSTART.md) - Troubleshooting section
- [backend/SERVER.md](backend/SERVER.md) - API issues
- Console logs in terminal/browser
- MongoDB connection status

---

**Happy coding! 💻**
