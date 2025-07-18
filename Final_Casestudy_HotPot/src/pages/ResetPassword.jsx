
import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import '../styles/ResetPassword.css'; 

const ResetPassword = () => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const email = localStorage.getItem('reset_email');

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`/api/auth/reset-password?email=${email}&newPassword=${newPassword}&otp=${otp}`);
      setMsg('Password updated successfully!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setMsg('❌ Failed to reset password. Check OTP and try again.');
    }
  };

  return (
    <div className="container reset-password-container">
      <h3>Reset Password</h3>
      <form onSubmit={handleReset}>
        <div className="mb-3">
          <label>OTP</label>
          <input
            type="text"
            className="form-control"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>New Password</label>
          <input
            type="password"
            className="form-control"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success">🔑 Reset Password</button>
        {msg && <p className="mt-3">{msg}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
