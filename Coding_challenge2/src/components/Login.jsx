import React, { useState, useContext } from 'react';
import api from '../services/api';
import { saveToken } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../context/AuthContext';
import '../styles/Login.css';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext); // ✅ context hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/auth/login', form);
      const token = res.data.token;

      console.log("✅ Token received:", token);

      saveToken(token);

      const decoded = jwtDecode(token);
      console.log("✅ Decoded JWT payload:", decoded);

      setCurrentUser(decoded); // ✅ update context state

      const role = decoded?.role;

      if (role === 'ROLE_ADMIN') {
        navigate('/dashboard/admin');
      } else if (role === 'ROLE_USER') {
        navigate('/dashboard/user');
      } else {
        alert("❌ Unknown or missing role in token: " + role);
        console.error("❌ Unknown or missing role:", decoded);
      }

    } catch (err) {
      console.error("❌ Login error:", err.response?.data || err.message);
      alert('Login failed: ' + (err.response?.data?.message || 'Server error'));
    }
  };

  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center">
      <div className="login-card p-4 shadow-lg rounded">
        <h3 className="login-heading">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Username"
              className="form-control"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-warning w-100">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
