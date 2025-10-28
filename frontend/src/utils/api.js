import axios from 'axios';

// API Base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Get Authorization Header with JWT Token
 * @returns {Object} Headers object with Authorization token
 */
export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
};

/**
 * API Service - Centralized Axios calls with JWT authentication
 */
export const api = {
  // ============================================
  // Authentication Endpoints
  // ============================================
  
  /**
   * Register new user
   * @param {Object} userData - { name, email, password }
   * @returns {Promise} User data with JWT token
   */
  register: async (userData) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  },

  /**
   * Login user
   * @param {Object} credentials - { email, password }
   * @returns {Promise} User data with JWT token
   */
  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  },

  /**
   * Get current user profile
   * @returns {Promise} Current user data
   */
  getMe: async () => {
    const response = await axios.get(`${API_URL}/auth/me`, getAuthHeader());
    return response.data;
  },

  // ============================================
  // User Profile Endpoints
  // ============================================

  /**
   * Get all users (admin/authenticated)
   * @returns {Promise} Array of users
   */
  getUsers: async () => {
    const response = await axios.get(`${API_URL}/users`, getAuthHeader());
    return response.data;
  },

  /**
   * Get user by ID
   * @param {string} userId - User ID
   * @returns {Promise} User data
   */
  getUserById: async (userId) => {
    const response = await axios.get(`${API_URL}/users/${userId}`, getAuthHeader());
    return response.data;
  },

  /**
   * Update user profile
   * @param {string} userId - User ID
   * @param {Object} updates - { name, email, password }
   * @returns {Promise} Updated user data
   */
  updateUser: async (userId, updates) => {
    const response = await axios.put(`${API_URL}/users/${userId}`, updates, getAuthHeader());
    return response.data;
  },

  /**
   * Delete user (admin only)
   * @param {string} userId - User ID
   * @returns {Promise} Success message
   */
  deleteUser: async (userId) => {
    const response = await axios.delete(`${API_URL}/users/${userId}`, getAuthHeader());
    return response.data;
  },

  // ============================================
  // Task CRUD Endpoints
  // ============================================

  /**
   * Get all tasks for logged-in user
   * @returns {Promise} Array of tasks
   */
  getTasks: async () => {
    const response = await axios.get(`${API_URL}/tasks`, getAuthHeader());
    return response.data;
  },

  /**
   * Get single task by ID
   * @param {string} taskId - Task ID
   * @returns {Promise} Task data
   */
  getTaskById: async (taskId) => {
    const response = await axios.get(`${API_URL}/tasks/${taskId}`, getAuthHeader());
    return response.data;
  },

  /**
   * Create new task
   * @param {Object} taskData - { title, description, completed }
   * @returns {Promise} Created task data
   */
  createTask: async (taskData) => {
    const response = await axios.post(`${API_URL}/tasks`, taskData, getAuthHeader());
    return response.data;
  },

  /**
   * Update task
   * @param {string} taskId - Task ID
   * @param {Object} updates - { title, description, completed }
   * @returns {Promise} Updated task data
   */
  updateTask: async (taskId, updates) => {
    const response = await axios.put(`${API_URL}/tasks/${taskId}`, updates, getAuthHeader());
    return response.data;
  },

  /**
   * Delete task
   * @param {string} taskId - Task ID
   * @returns {Promise} Success message
   */
  deleteTask: async (taskId) => {
    const response = await axios.delete(`${API_URL}/tasks/${taskId}`, getAuthHeader());
    return response.data;
  }
};

/**
 * Axios Interceptors for Global Error Handling
 */
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    // Handle 401 Unauthorized - token expired or invalid
    if (status === 401) {
      localStorage.removeItem('token');
      
      // Store error message for display on login page
      const errorMessage = message || 'Your session has expired. Please login again.';
      sessionStorage.setItem('authError', errorMessage);
      
      // Don't redirect if already on login/register page
      if (!['/login', '/register', '/'].includes(window.location.pathname)) {
        window.location.href = '/login';
      }
    }

    // Handle 403 Forbidden - insufficient permissions
    if (status === 403) {
      console.error('Access denied:', message);
    }

    return Promise.reject(error);
  }
);

export default api;
