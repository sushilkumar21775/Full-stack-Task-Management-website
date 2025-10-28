# Full-Stack Application

A modern full-stack web application built with React, Vite, Tailwind CSS on the frontend and Node.js, Express, MongoDB, and JWT authentication on the backend.

## 🎯 Quick Start

**New to this project?** Follow the **[📘 Quick Start Guide](QUICKSTART.md)** for detailed step-by-step setup instructions!

**Already familiar?** See [Getting Started](#-getting-started) below for quick commands.

## 📁 Project Structure

```
Full Stack/
├── frontend/          # React + Vite + Tailwind CSS
├── backend/           # Node.js + Express + MongoDB
└── README.md          # This file
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** - Choose one:
  - Local installation: [Download here](https://www.mongodb.com/try/download/community)
  - MongoDB Atlas (cloud): [Sign up free](https://www.mongodb.com/cloud/atlas/register)
- **Git** - [Download here](https://git-scm.com/)

### Installation & Setup

#### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd "Full Stack"
```

#### Step 2: Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install all dependencies:**
```bash
npm install
```

This installs:
- `express` (4.18.2) - Web framework
- `mongoose` (8.0.3) - MongoDB ODM
- `jsonwebtoken` (9.0.2) - JWT authentication
- `bcryptjs` (2.4.3) - Password hashing
- `cors` (2.8.5) - Cross-origin requests
- `dotenv` (16.3.1) - Environment variables
- `nodemon` (3.0.2) - Dev auto-reload

3. **Create environment configuration:**

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
# Option 1: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/fullstack-db

# Option 2: MongoDB Atlas (cloud)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fullstack-db?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_min_32_chars
JWT_EXPIRE=30d

# CORS Configuration (optional)
# CORS_ORIGIN=http://localhost:5173
```

4. **Start MongoDB (if using local installation):**

**Windows:**
```powershell
# Start MongoDB service
net start MongoDB
```

**macOS/Linux:**
```bash
# Start MongoDB service
sudo systemctl start mongod
# or
brew services start mongodb-community
```

5. **Seed the database (optional):**
```bash
# Create sample users
npm run seed

# Create sample tasks
npm run seed:tasks
```

6. **Start the backend server:**
```bash
# Development mode (auto-reload on changes)
npm run dev

# Production mode
npm start

# Health check
npm run check
```

✅ Backend should now be running on `http://localhost:5000`

#### Step 3: Frontend Setup

1. **Navigate to frontend directory** (from project root):
```bash
cd ../frontend
```

2. **Install all dependencies:**
```bash
npm install
```

This installs:
- `react` (18.2.0) - UI library
- `react-dom` (18.2.0) - React DOM rendering
- `react-router-dom` (6.20.1) - Routing
- `axios` (1.6.2) - HTTP client
- `tailwindcss` (3.3.6) - CSS framework
- `vite` (5.0.8) - Build tool

3. **Create environment configuration:**

Create a `.env` file in the `frontend` directory:

```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api

# Optional: App Configuration
VITE_APP_NAME=Full-Stack App
VITE_APP_VERSION=1.0.0
```

4. **Start the development server:**
```bash
npm run dev
```

✅ Frontend should now be running on `http://localhost:5173`

#### Step 4: Verify Installation

1. **Open browser** and navigate to `http://localhost:5173`
2. **Test backend health:** Visit `http://localhost:5000/health`
3. **Test user flow:**
   - Register a new account
   - Login with credentials
   - Create, update, and delete tasks
   - Update profile information
   - Test logout functionality

### Quick Start Commands

Once everything is set up, use these commands to run the app:

```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend  
cd frontend && npm run dev
```

## 📦 Features

### Backend Features
- RESTful API with Express.js
- MongoDB database integration with Mongoose
- JWT-based authentication
- User registration and login
- Password hashing with bcrypt
- CORS enabled
- Environment variable configuration
- Error handling middleware
- Request validation

### Frontend Features
- React 18 with Vite for fast development
- Tailwind CSS for styling
- React Router for navigation
- Axios for API requests
- JWT token management
- Protected routes
- Responsive design
- Form validation

## 🛠️ Available Scripts

### Backend Scripts
- `npm start` - Run the production server
- `npm run dev` - Run the development server with nodemon
- `npm run check` - Check server health status
- `npm run seed` - Seed database with sample users
- `npm test` - Run tests (to be implemented)

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📚 API Documentation

### API Endpoints Overview

For complete API documentation, see [backend/SERVER.md](backend/SERVER.md)

**Base URL:** `http://localhost:5000/api`

#### Authentication Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | ❌ |
| POST | `/auth/login` | Login user | ❌ |
| GET | `/auth/me` | Get current user profile | ✅ |

#### User Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users` | Get all users | ✅ |
| GET | `/users/:id` | Get user by ID | ✅ |
| PUT | `/users/:id` | Update user profile | ✅ |
| DELETE | `/users/:id` | Delete user | ✅ |

#### Task Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/tasks` | Get all user's tasks | ✅ |
| GET | `/tasks/:id` | Get task by ID | ✅ |
| POST | `/tasks` | Create new task | ✅ |
| PUT | `/tasks/:id` | Update task | ✅ |
| DELETE | `/tasks/:id` | Delete task | ✅ |

#### Health Check
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/health` | Server health status | ❌ |

### Testing with Postman

A complete Postman collection is included: **`Full-Stack-API.postman_collection.json`**

#### Import Instructions:
1. Open Postman
2. Click **Import** button
3. Select the `Full-Stack-API.postman_collection.json` file
4. Collection will be imported with all endpoints

#### Using the Collection:
1. **Register/Login** first - Token is automatically saved
2. **Test protected endpoints** - Token is auto-included in headers
3. **Environment variables:**
   - `baseUrl`: `http://localhost:5000/api`
   - `token`: Auto-populated after login/register

#### Example API Calls:

**Register User:**
```json
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Create Task:**
```json
POST http://localhost:5000/api/tasks
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish full-stack application",
  "completed": false
}
```

### API Response Formats

**Success Response:**
```json
{
  "success": true,
  "data": { /* resource data */ },
  "token": "jwt_token_here" // Only for auth endpoints
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message here"
}
```

## 🔐 Environment Variables

### Backend
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)

### Frontend
- `VITE_API_URL` - Backend API URL

## 🏗️ Technology Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **dotenv** - Environment variables
- **cors** - Cross-origin resource sharing

## � Documentation

For more detailed information, check out these guides:

- **[Quick Start Guide](QUICKSTART.md)** - Step-by-step setup for beginners with troubleshooting
- **[Authentication Flow](AUTHENTICATION.md)** - How JWT authentication works in this app
- **[Backend API Reference](backend/SERVER.md)** - Complete API documentation, endpoints, and deployment
- **[Project README](README.md)** - This file - project overview and quick reference

## 🧪 Testing

### Health Check

Test if your backend is running correctly:

```bash
cd backend
npm run check
```

### Sample Users

Seed the database with test users:

```bash
cd backend
npm run seed
```

This creates:
- Admin: `admin@example.com` / `admin123`
- User: `john@example.com` / `john123`
- User: `jane@example.com` / `jane123`

## �📝 License

This project is licensed under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Known Issues

None at the moment.

## � Production Deployment & Scaling

### Environment Variables for Production

**Backend Production `.env`:**
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://prod_user:password@cluster.mongodb.net/production-db?retryWrites=true&w=majority
JWT_SECRET=use_a_strong_random_secret_min_64_chars_for_production
JWT_EXPIRE=7d
CORS_ORIGIN=https://your-frontend-domain.com
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=15
```

**Frontend Production `.env`:**
```env
VITE_API_URL=https://api.your-domain.com/api
VITE_APP_NAME=Full-Stack App
VITE_APP_VERSION=1.0.0
NODE_ENV=production
```

### Scaling Frontend-Backend Integration

#### 1. **API Gateway Architecture**

For production-scale applications, implement an API Gateway to handle:

**Benefits:**
- **Centralized authentication & authorization**
- **Rate limiting & throttling**
- **Request/response transformation**
- **Caching & load balancing**
- **API versioning** (`/api/v1`, `/api/v2`)
- **Service discovery & routing**
- **Analytics & monitoring**

**Popular Solutions:**
- **AWS API Gateway** - Fully managed, auto-scaling
- **Kong** - Open-source, Kubernetes-native
- **NGINX Plus** - High-performance reverse proxy
- **Azure API Management** - Enterprise-grade
- **Google Cloud Endpoints** - GCP integration

**Example Architecture:**
```
Client (React) 
    ↓
API Gateway (Kong/AWS)
    ↓
Load Balancer
    ↓
Multiple Backend Instances (Node.js)
    ↓
Database Cluster (MongoDB Replica Set)
```

#### 2. **Environment Configuration Strategy**

**Multi-Environment Setup:**
```javascript
// frontend/src/config/environment.js
const environments = {
  development: {
    apiUrl: 'http://localhost:5000/api',
    wsUrl: 'ws://localhost:5000',
    apiTimeout: 30000
  },
  staging: {
    apiUrl: 'https://api-staging.your-domain.com/api',
    wsUrl: 'wss://api-staging.your-domain.com',
    apiTimeout: 20000
  },
  production: {
    apiUrl: 'https://api.your-domain.com/api',
    wsUrl: 'wss://api.your-domain.com',
    apiTimeout: 15000,
    enableAnalytics: true
  }
};

export const config = environments[import.meta.env.MODE] || environments.development;
```

**Backend Environment Manager:**
```javascript
// backend/config/environment.js
const config = {
  development: {
    db: { host: 'localhost', port: 27017 },
    cache: { enabled: false },
    logging: { level: 'debug' }
  },
  staging: {
    db: { host: process.env.DB_HOST, replica: true },
    cache: { enabled: true, ttl: 300 },
    logging: { level: 'info' }
  },
  production: {
    db: { 
      host: process.env.DB_HOST, 
      replica: true,
      readPreference: 'secondaryPreferred' 
    },
    cache: { 
      enabled: true, 
      ttl: 600,
      provider: 'redis' 
    },
    logging: { level: 'error' }
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];
```

#### 3. **Horizontal Scaling with Load Balancers**

**Docker Compose for Multi-Instance:**
```yaml
version: '3.8'
services:
  backend:
    image: backend:latest
    deploy:
      replicas: 3  # Run 3 instances
    environment:
      - NODE_ENV=production
      - MONGODB_URI=${MONGODB_URI}
    
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    depends_on:
      - backend
```

**NGINX Load Balancer Config:**
```nginx
upstream backend_servers {
    least_conn;  # Load balancing algorithm
    server backend1:5000 weight=3;
    server backend2:5000 weight=2;
    server backend3:5000 weight=1;
}

server {
    location /api {
        proxy_pass http://backend_servers;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### 4. **CDN & Static Asset Distribution**

**Frontend Optimization:**
- **CloudFront (AWS)** - Distribute React build globally
- **Cloudflare** - Free CDN with auto-optimization
- **Netlify/Vercel** - Auto CDN for static sites

**Implementation:**
```javascript
// vite.config.js - Production build optimization
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': ['axios']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  // Use CDN in production
  base: process.env.NODE_ENV === 'production' 
    ? 'https://cdn.your-domain.com/' 
    : '/'
});
```

#### 5. **Microservices Architecture (Future Scaling)**

**Service Decomposition:**
```
API Gateway
    ↓
├── Auth Service (JWT, OAuth)
├── User Service (Profile management)
├── Task Service (CRUD operations)
├── Notification Service (Email, Push)
└── Analytics Service (Logging, Metrics)
```

**Benefits:**
- Independent scaling per service
- Technology flexibility
- Fault isolation
- Easier maintenance

#### 6. **Caching Strategies**

**Redis Integration:**
```javascript
// backend/config/cache.js
const redis = require('redis');
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: 6379
});

// Cache user tasks
app.get('/api/tasks', async (req, res) => {
  const cacheKey = `tasks:${req.user.id}`;
  
  // Check cache first
  const cached = await client.get(cacheKey);
  if (cached) return res.json(JSON.parse(cached));
  
  // Fetch from DB
  const tasks = await Task.find({ userId: req.user.id });
  
  // Cache for 5 minutes
  await client.setex(cacheKey, 300, JSON.stringify(tasks));
  
  res.json(tasks);
});
```

#### 7. **Monitoring & Observability**

**Tools to Implement:**
- **Application Performance Monitoring:** New Relic, DataDog
- **Error Tracking:** Sentry, Rollbar
- **Logging:** ELK Stack (Elasticsearch, Logstash, Kibana)
- **Metrics:** Prometheus + Grafana

**Example Integration:**
```javascript
// backend/middleware/monitoring.js
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
```

### Recommended Deployment Platforms

| Platform | Backend | Frontend | Database | Best For |
|----------|---------|----------|----------|----------|
| **Render** | ✅ | ✅ | PostgreSQL | Full-stack apps, free tier |
| **Railway** | ✅ | ✅ | Built-in | Quick deployments |
| **Heroku** | ✅ | ✅ | Add-ons | Rapid prototyping |
| **AWS** | EC2/ECS | S3+CloudFront | RDS/DocumentDB | Enterprise scale |
| **Vercel** | ❌ | ✅ | - | Static/JAMstack |
| **Netlify** | Functions | ✅ | - | Frontend-focused |
| **DigitalOcean** | Droplets | App Platform | Managed DB | Mid-scale apps |

## �📧 Contact

For questions or support, please open an issue in the repository.
