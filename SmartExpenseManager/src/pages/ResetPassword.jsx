import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/users/reset-password/${token}`, { password });
      setMsg('Password reset successful');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setMsg('Reset failed');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {msg && <p>{msg}</p>}
      <form onSubmit={handleReset}>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New Password" required />
        <button type="submit">Reset</button>
      </form>
    </div>
  );
}

export default ResetPassword;
