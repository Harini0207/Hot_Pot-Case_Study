import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, role: 'ROLE_USER' }; // Default role set here

    try {
      await api.post('/auth/register', payload);
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      alert('Registration failed. Try again.');
    }
  };

  return (
    <div className="register-wrapper d-flex align-items-center justify-content-center">
      <div className="register-card p-4 shadow-lg rounded">
      <h3 className="text-center mb-4 register-heading">Register</h3>

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
        <button type="submit" className="register-btn">Register</button>



        </form>
      </div>
    </div>
  );
}

export default Register;
