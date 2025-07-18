// src/api/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8085',
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.request.use(
  config => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const token = JSON.parse(user)?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("✅ JWT Token from localStorage:", token);
        console.log("✅ Auth header set:", config.headers.Authorization);
      }
    } else {
      console.warn("⚠️ No token found in localStorage.");
    }
    return config;
  },
  error => {
    console.error("❌ Axios request error:", error);
    return Promise.reject(error);
  }
);

export default instance;
