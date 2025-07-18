
import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import '../styles/ForgotPassword.css'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`/api/auth/request-otp?email=${email}`);
      setMsg(' OTP sent to your email.');
      localStorage.setItem('reset_email', email);
      setTimeout(() => navigate('/reset-password'), 1500);
    } catch (error) {
      setMsg(' Failed to send OTP. Please try again.');
    }
  };

  return (
    <div className="container forgot-password-container">
      <h3>Forgot Password</h3>
      <form onSubmit={handleSendOtp}>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">📨 Send OTP</button>
        {msg && <p className="mt-3">{msg}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
