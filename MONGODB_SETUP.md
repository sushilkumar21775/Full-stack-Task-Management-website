# 🔧 Quick Fix: MongoDB Not Running

## Issue
Backend server cannot connect to MongoDB because MongoDB is not running locally.

## Solutions (Choose ONE)

### Option 1: Use MongoDB Atlas (Recommended - FREE & Easy)

1. **Create MongoDB Atlas Account** (Free tier):
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Sign up for a free account

2. **Create a Cluster**:
   - Choose "FREE" shared cluster
   - Select a region close to you
   - Click "Create Cluster" (takes 3-5 minutes)

3. **Get Connection String**:
   - Click "Connect" on your cluster
   - Click "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/...`)

4. **Update backend/.env file**:
   ```env
   MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/fullstack-db?retryWrites=true&w=majority
   ```
   Replace `YOUR_USERNAME` and `YOUR_PASSWORD` with your actual credentials

5. **Whitelist Your IP**:
   - In Atlas, go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0) for development
   - Click "Confirm"

6. **Restart Backend**:
   - Backend will auto-restart with nodemon
   - Or manually: `cd backend && npm run dev`

---

### Option 2: Install & Run MongoDB Locally

#### For Windows:

1. **Download MongoDB**:
   - Go to https://www.mongodb.com/try/download/community
   - Download Windows MSI installer
   - Run installer (Choose "Complete" installation)

2. **Start MongoDB Service**:
   ```powershell
   # Start MongoDB service
   net start MongoDB
   ```

3. **Verify MongoDB is Running**:
   ```powershell
   # Check if service is running
   Get-Service -Name MongoDB
   ```

4. **Backend .env stays the same**:
   ```env
   MONGODB_URI=mongodb://localhost:27017/fullstack-db
   ```

#### For macOS:

```bash
# Install MongoDB with Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify
brew services list
```

#### For Linux:

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify
sudo systemctl status mongod
```

---

## After Setup

1. **Restart Backend Server**:
   ```powershell
   cd "e:\Full Stack\backend"
   npm run dev
   ```

2. **You should see**:
   ```
   ✅ MongoDB Connected Successfully!
      Database: fullstack-db
      Host: ...
   ```

3. **Test Registration**:
   - Go to http://localhost:5173/register
   - Fill in the form
   - Click "Create account"
   - Should work now! ✅

---

## Current Status

- ✅ Frontend running: http://localhost:5173
- ✅ Backend running: http://localhost:5000
- ❌ MongoDB: **NOT CONNECTED** (use one of the options above)

---

## Quick MongoDB Atlas Setup (Visual Guide)

1. **Sign up** → https://www.mongodb.com/cloud/atlas/register
2. **Create FREE cluster** → Choose M0 (Free tier)
3. **Create Database User**:
   - Username: `fullstack-user`
   - Password: `SecurePassword123` (save this!)
4. **Get connection string**:
   - Connect → Drivers → Copy connection string
5. **Update .env**:
   ```env
   MONGODB_URI=mongodb+srv://fullstack-user:SecurePassword123@cluster0.xxxxx.mongodb.net/fullstack-db?retryWrites=true&w=majority
   ```
6. **Done!** Backend will auto-connect

---

## Troubleshooting

**Issue**: Still can't connect to Atlas
- **Fix**: Check Network Access → Add your IP (or 0.0.0.0/0 for dev)

**Issue**: "Authentication failed"
- **Fix**: Verify username/password in connection string

**Issue**: Local MongoDB won't start
- **Fix**: Try MongoDB Atlas instead (easier for development)

**Issue**: Port 27017 already in use
- **Fix**: Another MongoDB instance is running - restart your computer or kill the process
