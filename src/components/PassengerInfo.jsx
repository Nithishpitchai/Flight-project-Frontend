import React, { useState } from 'react';
import BoardingPass from './BoardingPass';

function PassengerInfo({ selectedFlight, onBookingComplete }) {
  const [passengerName, setPassengerName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [bookingDone, setBookingDone] = useState(false);  // Track if booked

  const handleBooking = () => {
    setError('');

    if (!passengerName || !email) {
      setError('Please fill in all fields.');
      return;
    }

    const bookingDetails = {
      flight: selectedFlight,
      passenger: {
        name: passengerName,
        email,
      },
    };

    onBookingComplete(bookingDetails);
    setBookingDone(true); // Show Boarding Pass
  };

  // When booking is complete, show the boarding pass!
  if (bookingDone) {
    return (
      <BoardingPass
        passenger={{ name: passengerName, email }}
        flight={selectedFlight}
      />
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Passenger Information</h2>

        {/* Selected flight details */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg">Selected Flight:</h3>
          <p>{selectedFlight.airline} - {selectedFlight.flightNumber}</p>
          <p>From: {selectedFlight.origin} ➡ To: {selectedFlight.destination}</p>
          <p>Departure Time: {selectedFlight.departureTime}</p>
          <p>Price: ${selectedFlight.price}</p>
        </div>

        {/* Passenger Name Input */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            value={passengerName}
            onChange={(e) => setPassengerName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter your email address"
          />
        </div>

        {/* Error message */}
        {error && <div className="text-red-500 text-sm mt-4">{error}</div>}

        {/* Booking Button */}
        <button
          onClick={handleBooking}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

export default PassengerInfo;
