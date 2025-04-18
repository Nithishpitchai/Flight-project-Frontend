import React, { useEffect, useState } from 'react';

function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(savedBookings);
  }, []);

  const handleCancel = (index) => {
    if (window.confirm('Are you sure you want to cancel this ticket?')) {
      const updatedBookings = [...bookings];
      updatedBookings.splice(index, 1);
      setBookings(updatedBookings);
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Your Bookings</h2>

        {bookings.length === 0 ? (
          <p className="text-gray-600 text-center">No bookings found.</p>
        ) : (
          bookings.map((booking, index) => (
            <div key={index} className="p-4 mb-4 bg-blue-50 rounded-xl shadow-sm border border-blue-100">
              <h3 className="font-semibold text-lg">{booking.flight.airline} - {booking.flight.flightNumber}</h3>
              <p>{booking.flight.origin} ➡ {booking.flight.destination}</p>
              <p>Departure Time: {booking.flight.departureTime}</p>
              <p>Passenger: {booking.passenger.name} ({booking.passenger.email})</p>
              <button
                onClick={() => handleCancel(index)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
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
