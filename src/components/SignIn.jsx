import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Circles } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return toast.error('⚠️ Please fill in all fields!');
    }

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/auth/signin', formData);
      toast.success(`✅ Welcome ${res.data.user.name}! Redirecting...`);
      setFormData({ email: '', password: '' });
      setTimeout(() => {
        navigate('/flights'); // redirect after success
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || '❌ Sign In Failed! Check your credentials.');
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
            <Circles height="80" width="80" color="#4f46e5" visible={true} />
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign In</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Sign In
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
}

export default SignIn;
