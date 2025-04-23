// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { saveAuth, logout } from '../utils/auth';

const API_URL = process.env.REACT_APP_BACKEND_URL;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      saveAuth(res.data.token, res.data.user);
      alert('✅ Login successful!');
      navigate('/dashboard');
    } catch (err) {
      alert('❌ Login failed: ' + (err.response?.data?.error || 'Unknown error'));
    }
  };

  const handleLogout = () => {
    logout();
    alert('🚪 Logged out!');
    navigate('/login');
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Login
        </button>
      </form>

      <div className="mt-4 text-center">
        <button onClick={handleLogout} className="text-sm text-red-600 underline hover:text-red-800">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Login;
