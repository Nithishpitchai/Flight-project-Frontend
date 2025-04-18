import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Circles } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      return toast.error('⚠️ All fields are required!');
    }

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
      toast.success('🎉 Registration Successful! Redirecting...');
      setFormData({ name: '', email: '', password: '' });

      setTimeout(() => {
        navigate('/signin'); // Redirect to Sign In page after signup
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || '❌ Sign Up Failed! Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <ToastContainer />
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <Circles height="80" width="80" color="#10b981" visible={true} />
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <button
                type="submit"
                className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-200"
              >
                Sign Up
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
}

export default SignUp;
