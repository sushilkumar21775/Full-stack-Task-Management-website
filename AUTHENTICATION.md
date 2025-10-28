# Authentication & Protected Routes Documentation

## Overview

This application implements a secure JWT-based authentication system with protected routes. Users must be authenticated to access certain pages like `/dashboard` and `/profile`.

## Authentication Flow

### 1. Registration Process
```
User fills registration form
    ↓
Client-side validation (email, password strength, etc.)
    ↓
POST /api/auth/register
    ↓
Backend creates user & returns JWT token
    ↓
Token stored in localStorage
    ↓
User state updated in AuthContext
    ↓
Auto-redirect to /dashboard (or attempted page)
```

### 2. Login Process
```
User fills login form
    ↓
Client-side validation
    ↓
POST /api/auth/login
    ↓
Backend verifies credentials & returns JWT token
    ↓
Token stored in localStorage
    ↓
User state updated in AuthContext
    ↓
Auto-redirect to /dashboard (or attempted page)
```

### 3. Protected Route Access
```
User tries to access /dashboard or /profile
    ↓
ProtectedRoute component checks:
  - JWT token in localStorage
  - User authentication state
    ↓
If authenticated: ✅ Show requested page
If not authenticated: ❌ Redirect to /login
    ↓
After login: Redirect back to originally requested page
```

### 4. Logout Process
```
User clicks logout
    ↓
Token removed from localStorage
    ↓
User state cleared in AuthContext
    ↓
Redirect to home page
```

## Components

### ProtectedRoute Component
**Location:** `frontend/src/components/ProtectedRoute.jsx`

**Purpose:** Wraps protected pages and ensures user is authenticated

**Features:**
- ✅ Checks JWT token in localStorage
- ✅ Verifies user state from AuthContext
- ✅ Shows loading spinner during auth check
- ✅ Redirects to /login if not authenticated
- ✅ Preserves attempted URL for post-login redirect
- ✅ Optional role-based access control

**Usage:**
```jsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

// With role-based access
<Route
  path="/admin"
  element={
    <ProtectedRoute requiredRole="admin">
      <AdminPanel />
    </ProtectedRoute>
  }
/>
```

### AuthContext
**Location:** `frontend/src/context/AuthContext.jsx`

**Purpose:** Manages authentication state globally

**Provides:**
- `user` - Current authenticated user object
- `loading` - Loading state during auth check
- `login(email, password)` - Login function
- `register(name, email, password)` - Registration function
- `logout()` - Logout function

**Features:**
- ✅ Auto-checks authentication on app load
- ✅ Stores JWT token in localStorage
- ✅ Makes authenticated API requests
- ✅ Auto-clears invalid tokens

### AuthAlert Component
**Location:** `frontend/src/components/AuthAlert.jsx`

**Purpose:** Shows notification when redirected to login

**Features:**
- ✅ Displays when user tries to access protected route
- ✅ Shows which page they tried to access
- ✅ Auto-dismisses after 5 seconds
- ✅ Manually dismissible

## Protected Routes

Current protected routes in the application:

| Route | Component | Required Auth | Required Role |
|-------|-----------|---------------|---------------|
| `/dashboard` | Dashboard | ✅ Yes | None |
| `/profile` | Profile | ✅ Yes | None |

## Token Management

### Storage
- **Where:** Browser localStorage
- **Key:** `token`
- **Format:** JWT string

### Security Considerations
1. **Token Expiration:** Tokens expire after 30 days (configured in backend)
2. **Auto-refresh:** Currently not implemented (tokens must be manually renewed)
3. **XSS Protection:** Sanitize all user inputs
4. **HTTPS:** Always use HTTPS in production

### Token Structure
```json
{
  "id": "user_id_here",
  "iat": 1234567890,
  "exp": 1237159890
}
```

## API Endpoints

### Authentication Endpoints

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "token": "jwt_token_here"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "token": "jwt_token_here"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer jwt_token_here

Response:
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user"
}
```

## Client-Side Validation

### Email Validation
- **Regex:** `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- **Checks:** Valid email format

### Password Validation
- **Minimum Length:** 6 characters
- **Strength Indicator:** Visual feedback (weak/medium/strong)
- **Criteria:**
  - Length ≥ 6: +1 point
  - Length ≥ 10: +1 point
  - Mixed case: +1 point
  - Contains numbers: +1 point
  - Contains special chars: +1 point

### Name Validation
- **Minimum Length:** 2 characters
- **Trim:** Whitespace removed

## Error Handling

### Common Errors

1. **Invalid Credentials**
   - Message: "Invalid email or password"
   - Status: 401

2. **User Already Exists**
   - Message: "User already exists"
   - Status: 400

3. **Token Expired**
   - Action: Auto-logout and redirect to login
   - Token removed from localStorage

4. **Network Error**
   - Message: "An error occurred. Please try again."
   - Suggestion: Check internet connection

## Best Practices

### For Developers

1. **Always wrap protected routes:**
   ```jsx
   <ProtectedRoute>
     <YourComponent />
   </ProtectedRoute>
   ```

2. **Check authentication state:**
   ```jsx
   const { user, loading } = useAuth();
   
   if (loading) return <LoadingSpinner />;
   if (!user) return <Redirect to="/login" />;
   ```

3. **Include token in API requests:**
   ```javascript
   const token = localStorage.getItem('token');
   const config = {
     headers: {
       Authorization: `Bearer ${token}`
     }
   };
   await axios.get('/api/protected', config);
   ```

4. **Handle logout properly:**
   ```javascript
   const handleLogout = () => {
     logout(); // Clears token and user state
     navigate('/');
   };
   ```

### For Users

1. **Strong Passwords:** Use passwords with mixed case, numbers, and special characters
2. **Secure Connection:** Only use the app over HTTPS
3. **Logout:** Always logout when using shared devices
4. **Token Security:** Never share your authentication token

## Troubleshooting

### Problem: Infinite redirect loop
**Solution:** Check if token exists but is invalid. Clear localStorage and try again.

### Problem: User logged out unexpectedly
**Cause:** Token expired or invalid
**Solution:** Log in again. Consider implementing token refresh.

### Problem: Protected route shows briefly then redirects
**Cause:** Authentication check hasn't completed
**Solution:** This is normal. The loading state prevents flash of content.

### Problem: Can't access protected route after login
**Cause:** Token not saved or AuthContext not updated
**Solution:** Check browser console for errors. Verify token in localStorage.

## Future Enhancements

- [ ] Implement refresh tokens
- [ ] Add "Remember Me" functionality
- [ ] Implement password reset flow
- [ ] Add two-factor authentication (2FA)
- [ ] Session timeout warnings
- [ ] Concurrent session management
- [ ] OAuth integration (Google, GitHub, etc.)
