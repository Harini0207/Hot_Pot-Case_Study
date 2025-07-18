
import React, { useState, useEffect } from 'react';
import '../styles/Register.css';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    gender: ''
  });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  
  useEffect(() => {
    document.body.classList.add('register-bg');
    return () => document.body.classList.remove('register-bg');
  }, []);

  const evaluateStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[@$!%*?&]/.test(pwd)) score++;

    switch (score) {
      case 0:
      case 1: return 'Weak';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Strong';
      default: return '';
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setStrength(evaluateStrength(value));
    setFormData({ ...formData, password: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/auth/register', formData);
      console.log("Registration response:", res.data);

      if (res.data.message) {
        alert('Registration successful! Please login.');
        navigate('/login');
      } else if (res.data.error) {
        setMsg(res.data.error);
      } else {
        setMsg('Unexpected response. Please try again.');
      }
    } catch (err) {
      console.error("Registration error:", err);
      if (err.response) {
        setMsg(err.response.data.message || err.response.data.error || 'Registration failed.');
      } else if (err.request) {
        setMsg('No response from server. Check if backend is running and CORS is set.');
      } else {
        setMsg('Error: ' + err.message);
      }
    }
  };

  return (
    <div className="register-form">
      <h3 className="mb-4 text-maroon">Register for HotByte</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input type="text" name="name" className="form-control" placeholder="Full Name" required onChange={handleChange} />
        </div>
        <div className="mb-3">
          <input type="email" name="email" className="form-control" placeholder="Email" required onChange={handleChange} />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {password && (
            <div className={`password-strength ${strength.toLowerCase()}`}>
              Password Strength: <strong>{strength}</strong>
            </div>
          )}
        </div>
        <div className="mb-3">
          <input type="tel" name="phone" className="form-control" placeholder="Phone Number" required onChange={handleChange} />
        </div>
        <div className="mb-3">
          <textarea name="address" className="form-control" placeholder="Address" required onChange={handleChange}></textarea>
        </div>
        <div className="mb-3">
          <label className="me-3">Gender:</label>
          <input type="radio" name="gender" value="male" required onChange={handleChange} /> Male&nbsp;&nbsp;
          <input type="radio" name="gender" value="female" onChange={handleChange} /> Female
        </div>
        <button type="submit" className="btn btn-custom">Register</button>
      </form>
      {msg && <p className="text-danger mt-3">{msg}</p>}
    </div>
  );
};

export default Register;
