// src/pages/FlightSearch.js
import React, { useState } from 'react';
import axios from 'axios';

function FlightSearch() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [flights, setFlights] = useState([]);
  const [passengerName, setPassengerName] = useState('');

  const searchFlights = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/flights/search', {
        params: { origin, destination, date },
      });
      setFlights(res.data.data); // Adjust if your response is different
    } catch (err) {
      alert('❌ Error fetching flights');
    }
  };

  const handleBooking = async (flightId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return alert('Please log in first');

      const res = await axios.post('http://localhost:5000/api/bookings/book', {
        flightId,
        passengers: [{ name: passengerName }],
        totalPrice: 300 // Set price dynamically if needed
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('✅ Booking successful!');
    } catch (err) {
      alert('❌ Booking failed: ' + err.response?.data?.error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Search Flights</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <input placeholder="From (e.g. DEL)" value={origin} onChange={(e) => setOrigin(e.target.value)} className="p-2 border rounded" />
        <input placeholder="To (e.g. BOM)" value={destination} onChange={(e) => setDestination(e.target.value)} className="p-2 border rounded" />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="p-2 border rounded" />
      </div>
      <button onClick={searchFlights} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">Search</button>

      <div className="mb-4">
        <input placeholder="Passenger Name" value={passengerName} onChange={(e) => setPassengerName(e.target.value)} className="p-2 border rounded w-full" />
      </div>

      {flights.length > 0 && (
        <div className="space-y-4">
          {flights.map((flight, i) => (
            <div key={i} className="border p-4 rounded shadow">
              <p><strong>{flight.airline}</strong> - {flight.flight.iata}</p>
              <p>{flight.departure?.airport} ➡ {flight.arrival?.airport}</p>
              <p>Departure Time: {flight.departure?.scheduled}</p>
              <button onClick={() => handleBooking(flight.flight.iata)} className="bg-green-600 text-white px-4 py-1 rounded mt-2">
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FlightSearch;
