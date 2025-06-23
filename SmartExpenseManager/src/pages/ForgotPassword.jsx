import React, { useState } from 'react';
import API from '../api/axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/users/forgot-password', { email });
      setMsg('Reset link sent if email exists.');
    } catch (err) {
      setMsg('Something went wrong');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      {msg && <p>{msg}</p>}
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
