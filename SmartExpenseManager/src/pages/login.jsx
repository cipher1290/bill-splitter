import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // ✅ This login() must save user + token to localStorage
  const navigate = useNavigate();
  const [error, setError] = useState('');

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post('/users/login', { email, password });
    login(res.data.user, res.data.token); // ✅ AuthContext ke login fn
    
    localStorage.setItem('token', res.data.token); // ✅ Required for Axios
    localStorage.setItem('user', JSON.stringify(res.data.user));
    navigate('/dashboard');
  } catch (err) {
    setError(err.response?.data?.message || 'Login failed');
  }
};


  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p onClick={() => navigate('/forgot-password')} style={{ cursor: 'pointer', color: 'blue' }}>Forgot Password?</p>
      <p style={{ marginTop: '10px' }}>
        New here? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
}

export default Login;
