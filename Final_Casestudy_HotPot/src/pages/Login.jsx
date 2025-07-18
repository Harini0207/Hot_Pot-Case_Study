
import React, { useState, useEffect } from 'react';
import '../styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';

const Login = ({ setCurrentUser }) => {
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('login-bg');
    return () => document.body.classList.remove('login-bg');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post('/api/auth/login', { email, password });

      if (res.data.token) {
        const userObj = {
          token: res.data.token,
          role: res.data.role,
          email: res.data.email,
          name: res.data.name || '',
          restaurant: res.data.restaurant || null,
        };

        localStorage.setItem('token', userObj.token);
        localStorage.setItem('currentUser', JSON.stringify(userObj));

        if (setCurrentUser) setCurrentUser(userObj);

        const role = userObj.role.toLowerCase();
        if (role === 'admin') navigate('/admin/dashboard');
        else if (role === 'restaurant') navigate('/restaurant/home');
        else navigate('/user/home');
      } else {
        setMsg(res.data.error || 'Login failed.');
      }
    } catch (error) {
      setMsg('Server error or invalid credentials.');
    }
  };

  return (
    <div className="login-form">
      <h3 className="mb-4 text-maroon">Login to HotByte</h3>

      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            required
          />
        </div>

        <div className="d-grid gap-2">
          <button type="submit" className="har">Login</button>
          <Link to="/register" className="btn btn-outline-light">New user? Register</Link>
          <Link to="/forgot-password" className="btn text">Forgot Password?</Link>
        </div>
      </form>

      {msg && <p className="text-danger mt-3">{msg}</p>}
    </div>
  );
};

export default Login;
