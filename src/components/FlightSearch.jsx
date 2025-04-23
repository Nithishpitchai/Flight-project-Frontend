import React, { useState } from 'react';
import axios from 'axios';

function FlightSearch({ onSelectFlight }) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [flights, setFlights] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`https://flight-booking-backend-1-jkxo.onrender.com/api/flights/search`, {
        params: { origin, destination, date },
      });
      setFlights(res.data.data); // ✅ FIX: access res.data.data
    } catch (err) {
      alert('❌ Error fetching flights: ' + (err.response?.data?.error || 'Unknown error'));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Search Flights</h2>
      <form onSubmit={handleSearch} className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="Origin"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Destination"
          className="p-2 border rounded"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="col-span-full bg-blue-600 text-white py-2 rounded"
        >
          Search
        </button>
      </form>

      <div className="space-y-4">
        {flights.map((flight) => (
          <div key={flight._id} className="border p-4 rounded shadow">
            <p><strong>Airline:</strong> {flight.airline}</p>
            <p><strong>Flight #:</strong> {flight.flightNumber}</p>
            <p><strong>From:</strong> {flight.origin} <strong>To:</strong> {flight.destination}</p>
            <p><strong>Departure:</strong> {new Date(flight.departureTime).toLocaleString()}</p>
            <p><strong>Arrival:</strong> {new Date(flight.arrivalTime).toLocaleString()}</p>
            <p><strong>Price:</strong> ${flight.price}</p>
            <button
              className="mt-2 bg-green-600 text-white px-4 py-1 rounded"
              onClick={() => onSelectFlight(flight)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FlightSearch;
