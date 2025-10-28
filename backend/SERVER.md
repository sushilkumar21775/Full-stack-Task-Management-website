# Backend Server Documentation

## Overview

Node.js Express server with MongoDB, JWT authentication, and RESTful API endpoints.

## Technology Stack

- **Runtime:** Node.js (v16+)
- **Framework:** Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** bcryptjs, CORS
- **Environment:** dotenv

## Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection configuration
├── controllers/
│   ├── auth.controller.js    # Authentication logic (login, register)
│   └── user.controller.js    # User CRUD operations
├── middleware/
│   ├── auth.js              # JWT verification middleware
│   └── errorHandler.js      # Global error handler
├── models/
│   └── User.model.js        # User schema and methods
├── routes/
│   ├── auth.routes.js       # Authentication routes
│   └── user.routes.js       # User routes
├── .env                     # Environment variables (not in git)
├── .env.example             # Environment template
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies and scripts
└── server.js               # Application entry point
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/fullstack-db
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
FRONTEND_URL=http://localhost:5173
```

### 3. Start MongoDB

**Local MongoDB:**
```bash
mongod
```

**Or use MongoDB Atlas:**
Update `MONGODB_URI` in `.env` with your Atlas connection string.

### 4. Run the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

## Environment Variables

| Variable | Description | Required | Default | Example |
|----------|-------------|----------|---------|---------|
| `PORT` | Server port | No | 5000 | 5000 |
| `NODE_ENV` | Environment | No | development | production |
| `MONGODB_URI` | MongoDB connection string | Yes | - | mongodb://localhost:27017/db |
| `JWT_SECRET` | JWT signing secret | Yes | - | your_secret_key_here |
| `FRONTEND_URL` | Frontend URL for CORS | No | localhost:5173 | https://example.com |

## Server Features

### ✅ Middleware Configuration

1. **CORS**
   - Configurable origins
   - Supports credentials
   - Custom headers and methods
   - Production/Development modes

2. **Body Parsing**
   - JSON payloads (10MB limit)
   - URL-encoded data
   - Automatic parsing

3. **Request Logging**
   - Timestamps
   - HTTP method and path
   - Development mode only

4. **Error Handling**
   - Centralized error handler
   - Stack traces in development
   - Custom error messages
   - Proper status codes

### ✅ Security Features

- JWT token authentication
- Password hashing (bcrypt)
- CORS protection
- Request size limits
- Environment variable validation

### ✅ MongoDB Connection

- Connection pooling (max 10)
- Auto-reconnection
- Graceful shutdown
- Error event handling
- Connection status logging

## API Endpoints

### Health Check

```http
GET /health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-10-28T12:00:00.000Z",
  "uptime": 123.456,
  "environment": "development",
  "mongodb": "connected"
}
```

### Root Endpoint

```http
GET /
```

**Response:**
```json
{
  "message": "Welcome to Full-Stack API",
  "version": "1.0.0",
  "endpoints": {
    "health": "/health",
    "auth": "/api/auth",
    "users": "/api/users"
  }
}
```

### Authentication Routes

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### User Routes (Protected)

#### Get All Users
```http
GET /api/users
Authorization: Bearer <token>
```

#### Get User by ID
```http
GET /api/users/:id
Authorization: Bearer <token>
```

#### Update User
```http
PUT /api/users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

#### Delete User (Admin Only)
```http
DELETE /api/users/:id
Authorization: Bearer <token>
```

## Server Startup

When the server starts successfully, you'll see:

```
✅ ================================
   MongoDB Connected!
   Host: localhost
   Database: fullstack-db
✅ ================================

🚀 ================================
   Server running on port 5000
   Environment: development
   URL: http://localhost:5000
🚀 ================================
```

## Error Handling

### Common HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | Successful GET request |
| 201 | Created | User registered successfully |
| 400 | Bad Request | Invalid input data |
| 401 | Unauthorized | Invalid credentials or token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Database connection failed |

### Error Response Format

```json
{
  "message": "Error description",
  "stack": "Stack trace (development only)",
  "timestamp": "2025-10-28T12:00:00.000Z",
  "path": "/api/endpoint"
}
```

## Graceful Shutdown

The server handles shutdown signals properly:

- **SIGTERM**: Graceful shutdown
- **SIGINT**: Ctrl+C shutdown
- **Auto-timeout**: Forces shutdown after 10 seconds

```bash
# Press Ctrl+C to stop the server
^C
⏳ Shutting down gracefully...
✅ MongoDB connection closed
✅ Server closed
```

## Database Schema

### User Model

```javascript
{
  name: String (required, trimmed),
  email: String (required, unique, lowercase),
  password: String (required, hashed, min 6 chars),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

**Methods:**
- `comparePassword(enteredPassword)` - Verify password

**Middleware:**
- Pre-save hook for password hashing

## Authentication Flow

### Registration
1. Validate input data
2. Check if user exists
3. Hash password with bcrypt
4. Save user to database
5. Generate JWT token
6. Return user data + token

### Login
1. Validate credentials
2. Find user by email
3. Compare passwords
4. Generate JWT token
5. Return user data + token

### Protected Routes
1. Extract token from Authorization header
2. Verify JWT signature
3. Decode user ID from token
4. Fetch user from database
5. Attach user to request object
6. Continue to route handler

## Development Tips

### Debug Mode

Add this to your `.env`:
```env
DEBUG=express:*
```

### Watch Database Changes

```bash
# MongoDB shell
mongosh
use fullstack-db
db.users.watch()
```

### Test Endpoints

Using curl:
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"test123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'

# Get current user
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Production Deployment

### Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong `JWT_SECRET`
- [ ] Configure production MongoDB URI
- [ ] Set correct `FRONTEND_URL`
- [ ] Enable HTTPS
- [ ] Set up process manager (PM2)
- [ ] Configure reverse proxy (Nginx)
- [ ] Enable MongoDB authentication
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy

### PM2 Deployment

```bash
npm install -g pm2
pm2 start server.js --name fullstack-api
pm2 save
pm2 startup
```

## Troubleshooting

### MongoDB Connection Failed

**Problem:** Can't connect to MongoDB
**Solutions:**
- Ensure MongoDB is running: `mongod`
- Check `MONGODB_URI` in `.env`
- Verify network connectivity
- Check firewall settings

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE`
**Solutions:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

### JWT Secret Missing

**Problem:** Server exits on startup
**Solution:** Ensure `JWT_SECRET` is set in `.env`

## Logging

### Development Logs
- Request method and path
- MongoDB connection status
- Error stack traces
- Detailed error messages

### Production Logs
- Error messages only
- No stack traces
- Minimal console output

## Performance

- Connection pooling: 10 connections
- Request timeout: 45 seconds
- Body size limit: 10MB
- Auto-reconnection enabled

## Security Best Practices

1. **Never commit `.env` file**
2. **Use strong JWT secrets** (32+ characters)
3. **Enable HTTPS in production**
4. **Validate all inputs**
5. **Implement rate limiting** (future enhancement)
6. **Keep dependencies updated**
7. **Use MongoDB authentication**
8. **Sanitize user inputs**

## Future Enhancements

- [ ] Rate limiting middleware
- [ ] Request validation with Joi/Express-validator
- [ ] API documentation (Swagger)
- [ ] Logging service (Winston/Morgan)
- [ ] Caching (Redis)
- [ ] File upload support
- [ ] Email service integration
- [ ] WebSocket support
- [ ] API versioning
- [ ] Health monitoring
