import React from 'react';
import { getUser, logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert('🚪 Logged out!');
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="p-6 max-w-md mx-auto text-center">
        <h2 className="text-xl font-bold mb-2">Not logged in</h2>
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">👋 Welcome, {user.name}</h2>
      <p className="mb-4 text-gray-700">Email: {user.email}</p>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded w-full"
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
