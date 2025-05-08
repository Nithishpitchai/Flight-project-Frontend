import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

function Payment() {
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('bookingData');
    if (stored) {
      setBookingData(JSON.parse(stored));
    } else {
      alert('❌ No booking data found!');
    }
  }, []);

  const handlePayment = async () => {
    if (!bookingData) return alert('No booking data to process');

    try {
      const token = localStorage.getItem('token');
      if (!token) return alert('Please login first');

      // Step 1: Book the flight
      const bookingRes = await axios.post(`${API_URL}/api/bookings/book`, bookingData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const booking = bookingRes.data?.booking;
      if (!booking || !booking.totalPrice) {
        return alert('❌ Booking failed or missing price.');
      }

      // Step 2: Create Stripe checkout session
      const stripeRes = await axios.post(`${API_URL}/api/payments/create-checkout-session`, {
        amount: booking.totalPrice,
      });

      if (stripeRes.data?.url) {
        window.location.href = stripeRes.data.url;
      } else {
        alert('❌ Stripe session creation failed.');
      }
    } catch (err) {
      console.error(err);
      alert('❌ Payment failed: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-xl font-bold mb-4">Confirm & Pay</h2>

      {bookingData && (
        <div className="mb-4">
          <p><strong>Passenger:</strong> {bookingData.passengers[0].name}</p>
          <p><strong>Amount:</strong> ${bookingData.totalPrice}</p>
        </div>
      )}

      <button
        onClick={handlePayment}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Pay with Stripe
      </button>
    </div>
  );
}

export default Payment;
