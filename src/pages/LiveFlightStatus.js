import React, { useState } from 'react';

function LiveFlightStatus() {
  const [flightNumber, setFlightNumber] = useState('');
  const [flightData, setFlightData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchFlightStatus = async () => {
    if (!flightNumber.trim()) return;
    setLoading(true);
    setError('');
    setFlightData(null);

    try {
      const apiKey = process.env.REACT_APP_AVIATION_API_KEY;
      const res = await fetch(
        `https://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${flightNumber}`
      );
      const data = await res.json();

      if (data?.data?.length > 0) {
        setFlightData(data.data[0]);
      } else {
        setError('No flight data found.');
      }
    } catch (err) {
      setError('Error fetching flight data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Live Flight Status</h1>
      <input
        type="text"
        className="p-2 w-full mb-4 rounded text-black"
        placeholder="Enter flight number (e.g. AA100)"
        value={flightNumber}
        onChange={(e) => setFlightNumber(e.target.value)}
      />
      <button
        onClick={fetchFlightStatus}
        className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-500"
      >
        Check Status
      </button>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-400">{error}</p>}
      {flightData && (
        <div className="mt-6 p-4 bg-black bg-opacity-50 rounded shadow">
          <p><strong>Airline:</strong> {flightData.airline?.name}</p>
          <p><strong>Flight:</strong> {flightData.flight?.iata}</p>
          <p><strong>Status:</strong> {flightData.flight_status}</p>
          <p><strong>From:</strong> {flightData.departure?.airport}</p>
          <p><strong>To:</strong> {flightData.arrival?.airport}</p>
          <p><strong>Scheduled Departure:</strong> {flightData.departure?.scheduled}</p>
          <p><strong>Scheduled Arrival:</strong> {flightData.arrival?.scheduled}</p>
        </div>
      )}
    </div>
  );
}

export default LiveFlightStatus;
