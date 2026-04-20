import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if needed (e.g. from localStorage)
    const token = localStorage.getItem('jubile_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle errors globally
    const errorMessage = error.response?.data?.error?.message || error.message || 'An unexpected error occurred';
    console.error('API Error:', error.response?.data || error.message);
    
    // You could trigger a global notification system here
    
    return Promise.reject(error.response?.data || { message: errorMessage });
  }
);

export default apiClient;
