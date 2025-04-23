// src/components/PassengerInfo.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PassengerInfo({ flight }) {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleProceedToPayment = () => {
    if (!name.trim()) return alert('Please enter passenger name');

    // Save booking data to localStorage
    localStorage.setItem('bookingData', JSON.stringify({
      flightId: flight._id,
      passengers: [{ name }],
      totalPrice: flight.price,
    }));

    navigate('/payment');
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Passenger Info</h2>
      <p><strong>Flight:</strong> {flight.airline} - {flight.flightNumber}</p>
      <p><strong>From:</strong> {flight.origin} ➡ {flight.destination}</p>
      <p><strong>Price:</strong> ${flight.price}</p>

      <input
        type="text"
        placeholder="Passenger Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded mt-4 mb-4"
      />
      <button
        onClick={handleProceedToPayment}
        className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600"
      >
        Proceed to Payment
      </button>
    </div>
  );
}

export default PassengerInfo;
