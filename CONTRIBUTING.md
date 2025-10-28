# 🤝 Contributing Guide

Thank you for your interest in contributing to this project! This guide will help you get started.

## 📋 Before You Start

1. **Read the documentation:**
   - [README.md](README.md) - Project overview
   - [QUICKSTART.md](QUICKSTART.md) - Setup instructions
   - [AUTHENTICATION.md](AUTHENTICATION.md) - Auth flow
   - [backend/SERVER.md](backend/SERVER.md) - API reference

2. **Set up your development environment:**
   - Follow the [QUICKSTART.md](QUICKSTART.md) guide
   - Make sure everything works locally
   - Complete the [CHECKLIST.md](CHECKLIST.md)

## 🌿 Development Workflow

### 1. Create a Branch

```powershell
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding tests

### 2. Make Your Changes

Follow the coding standards below.

### 3. Test Your Changes

Make sure:
- Backend server starts without errors
- Frontend builds without warnings
- All existing features still work
- Your new code doesn't break anything

### 4. Commit Your Changes

```powershell
git add .
git commit -m "feat: add user profile picture upload"
```

Commit message format:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code formatting (no logic changes)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### 5. Push and Create Pull Request

```powershell
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

---

## 📝 Coding Standards

### Backend (Node.js)

**File Organization:**
```
backend/
├── controllers/    # Business logic
├── models/         # Database schemas
├── routes/         # Route definitions
├── middleware/     # Custom middleware
└── config/         # Configuration files
```

**Naming Conventions:**
- Files: `camelCase.js` or `PascalCase.model.js`
- Functions: `camelCase`
- Classes/Models: `PascalCase`
- Constants: `UPPER_SNAKE_CASE`

**Example Controller:**
```javascript
// controllers/post.controller.js
export const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    
    // Validation
    if (!title || !content) {
      return res.status(400).json({ 
        message: 'Title and content are required' 
      });
    }
    
    // Business logic
    const post = await Post.create({
      title,
      content,
      author: req.user.id
    });
    
    res.status(201).json({
      success: true,
      data: post
    });
  } catch (error) {
    next(error);
  }
};
```

**API Response Format:**
```javascript
// Success
{
  "success": true,
  "data": { /* ... */ }
}

// Error
{
  "success": false,
  "message": "Error description"
}
```

### Frontend (React)

**File Organization:**
```
frontend/src/
├── components/     # Reusable components
├── pages/          # Page components
├── context/        # React context
├── hooks/          # Custom hooks
└── utils/          # Utility functions
```

**Naming Conventions:**
- Components: `PascalCase.jsx`
- Hooks: `useCamelCase.js`
- Utils: `camelCase.js`
- Constants: `UPPER_SNAKE_CASE`

**Example Component:**
```jsx
// components/PostCard.jsx
import React from 'react';
import PropTypes from 'prop-types';

const PostCard = ({ title, content, author, onDelete }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-xl font-bold">{title}</h3>
        <span className="text-sm text-gray-500">by {author}</span>
      </div>
      <div className="card-body">
        <p>{content}</p>
      </div>
      <div className="card-footer">
        <button 
          onClick={onDelete}
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  onDelete: PropTypes.func
};

export default PostCard;
```

**Custom Hooks:**
```javascript
// hooks/usePosts.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/api/posts');
        setPosts(res.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
};
```

---

## 🎨 Tailwind CSS Guidelines

**Use Utility Classes:**
```jsx
// ✅ Good
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">

// ❌ Avoid inline styles
<div style={{ display: 'flex', padding: '1rem' }}>
```

**Custom Components in index.css:**
```css
@layer components {
  .btn-custom {
    @apply px-4 py-2 bg-purple-600 text-white rounded-lg 
           hover:bg-purple-700 transition-colors;
  }
}
```

**Responsive Design:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Cards */}
</div>
```

---

## 🧪 Testing Guidelines

### Backend Testing (Future)

Example test structure:
```javascript
// __tests__/auth.test.js
import request from 'supertest';
import app from '../server.js';

describe('Auth Endpoints', () => {
  test('POST /api/auth/register - should create new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'test123'
      });
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });
});
```

### Frontend Testing (Future)

Example component test:
```javascript
// __tests__/Login.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../pages/Login';

test('Login form submits with valid data', async () => {
  render(<Login />);
  
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'test@example.com' }
  });
  
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'test123' }
  });
  
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
  
  // Assert expected behavior
});
```

---

## 📦 Adding New Features

### Example: Adding Posts Feature

#### 1. Backend

**Create Model:**
```javascript
// backend/models/Post.model.js
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  published: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model('Post', postSchema);
```

**Create Controller:**
```javascript
// backend/controllers/post.controller.js
import Post from '../models/Post.model.js';

export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, data: posts });
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    
    const post = await Post.create({
      title,
      content,
      author: req.user.id
    });
    
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};
```

**Create Routes:**
```javascript
// backend/routes/post.routes.js
import express from 'express';
import { getPosts, createPost } from '../controllers/post.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', protect, createPost);

export default router;
```

**Register Routes:**
```javascript
// backend/server.js
import postRoutes from './routes/post.routes.js';

app.use('/api/posts', postRoutes);
```

#### 2. Frontend

**Create Page:**
```jsx
// frontend/src/pages/Posts.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`);
        setPosts(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>
      <div className="grid gap-4">
        {posts.map(post => (
          <div key={post._id} className="card">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p>{post.content}</p>
            <span className="text-sm text-gray-500">
              by {post.author.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
```

**Add Route:**
```jsx
// frontend/src/App.jsx
import Posts from './pages/Posts';

// In your routes:
<Route path="/posts" element={<Posts />} />
```

---

## 🐛 Bug Reports

When reporting bugs, include:

1. **Description**: What happened?
2. **Expected behavior**: What should happen?
3. **Steps to reproduce**: How to trigger the bug?
4. **Environment**: 
   - OS (Windows/Mac/Linux)
   - Node version
   - Browser (if frontend issue)
5. **Error messages**: Console logs, stack traces
6. **Screenshots**: If applicable

---

## 💡 Feature Requests

When suggesting features, include:

1. **Problem**: What problem does this solve?
2. **Solution**: How should it work?
3. **Alternatives**: Other ways to solve it?
4. **Use case**: Example scenario?

---

## 📚 Documentation

When updating docs:

- Keep language clear and simple
- Include code examples
- Add screenshots for UI changes
- Update relevant files (README, QUICKSTART, etc.)

---

## ✅ Pull Request Checklist

Before submitting:

- [ ] Code follows project style guidelines
- [ ] All existing tests pass
- [ ] New code has appropriate comments
- [ ] Documentation updated (if needed)
- [ ] No console.log() left in code
- [ ] No sensitive data (API keys, passwords)
- [ ] Tested locally - everything works
- [ ] Meaningful commit messages

---

## 🎯 Areas for Contribution

### Easy (Good First Issues)
- Update documentation
- Fix typos
- Add code comments
- Improve error messages
- Add loading states

### Medium
- Add form validation
- Improve UI/UX
- Add new pages
- Create reusable components
- Add API endpoints

### Advanced
- Add testing suite
- Implement caching
- Add real-time features (WebSocket)
- Improve security
- Add CI/CD pipeline
- Deploy to cloud

---

## 🆘 Getting Help

Stuck? Here's how to get help:

1. **Check Documentation**
   - Read all .md files
   - Review code comments

2. **Search Issues**
   - Look for similar problems
   - Check closed issues too

3. **Ask Questions**
   - Open a new issue
   - Describe what you tried
   - Include error messages

---

## 🎉 Recognition

Contributors will be:
- Added to README credits
- Mentioned in release notes
- Appreciated forever! 💙

---

**Thank you for contributing! 🙏**

Your help makes this project better for everyone.
