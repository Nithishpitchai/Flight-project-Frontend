// src/pages/MyBookings.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return alert('You must be logged in to view bookings.');

        const res = await axios.get('http://localhost:5000/api/bookings/my-bookings', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setBookings(res.data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        alert('Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto text-black">
      <h2 className="text-2xl font-bold mb-4">📒 My Bookings</h2>

      {loading ? (
        <p className="text-gray-600">Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-600">No bookings found.</p>
      ) : (
        bookings.map((booking, i) => (
          <div key={i} className="border border-gray-300 p-4 mb-4 rounded-lg shadow-md bg-white">
            <h3 className="font-bold text-lg mb-2">
              ✈️ Flight: {booking.flight?.flightNumber || 'N/A'}
            </h3>
            <p>From: {booking.flight?.origin} ➡ To: {booking.flight?.destination}</p>
            <p>Departure: {booking.flight?.departureTime}</p>
            <p>Total Price: ₹{booking.totalPrice}</p>
            <p className="font-semibold mt-2">👥 Passengers:</p>
            <ul className="ml-4 list-disc">
              {booking.passengers.map((p, idx) => (
                <li key={idx}>{p.name}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default MyBookings;
