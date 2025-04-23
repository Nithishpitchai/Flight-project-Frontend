import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://flight-booking-backend-1-jkxo.onrender.com';

function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return alert('Please log in to view your bookings.');

        const res = await axios.get(`${API_URL}/api/bookings/my-bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBookings(res.data);
      } catch (err) {
        console.error(err);
        alert('❌ Error fetching booking history');
      }
    };

    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this ticket?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/bookings/cancel/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookings((prev) => prev.filter((b) => b._id !== id));
      alert('✅ Ticket cancelled successfully!');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to cancel booking');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Your Bookings</h2>

        {bookings.length === 0 ? (
          <p className="text-gray-600 text-center">No bookings found.</p>
        ) : (
          bookings.map((booking) => (
            <div key={booking._id} className="p-4 mb-4 bg-blue-50 rounded-xl shadow-sm border border-blue-100">
              <h3 className="font-semibold text-lg">{booking.flight?.airline} - {booking.flight?.flightNumber}</h3>
              <p>{booking.flight?.origin} ➡ {booking.flight?.destination}</p>
              <p>Departure Time: {booking.flight?.departureTime}</p>
              <p>Total Price: ₹{booking.totalPrice}</p>
              <p className="font-semibold mt-2">👥 Passengers:</p>
              <ul className="ml-4 list-disc">
                {booking.passengers.map((p, i) => (
                  <li key={i}>{p.name}</li>
                ))}
              </ul>
              <button
                onClick={() => handleCancel(booking._id)}
                className="mt-3 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Cancel Ticket
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BookingHistory;
