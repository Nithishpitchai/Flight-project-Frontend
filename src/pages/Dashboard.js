// src/pages/Dashboard.js
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>

          <button
            onClick={handleLogout}
            className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>User not found. Please log in again.</p>
      )}
    </div>
  );
};

export default Dashboard;
