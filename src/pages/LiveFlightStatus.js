import React, { useState } from 'react';

const LiveFlightStatus = () => {
  const [flightNumber, setFlightNumber] = useState('');
  const [flightData, setFlightData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchFlightStatus = async () => {
    const trimmedFlight = flightNumber.trim().toUpperCase();
    if (!trimmedFlight) return;

    setLoading(true);
    setError('');
    setFlightData(null);

    try {
      const apiKey = process.env.REACT_APP_AVIATION_API_KEY || 'your_fallback_api_key'; // Replace only for dev
      if (!apiKey || apiKey === 'your_fallback_api_key') {
        setError('AviationStack API key is missing or invalid!');
        return;
      }

      const res = await fetch(
        `https://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${trimmedFlight}`
      );
      const data = await res.json();

      if (data?.data?.length > 0) {
        setFlightData(data.data[0]);
      } else {
        setError('No flight data found.');
      }
    } catch (err) {
      console.error(err);
      setError('Error fetching flight data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white max-w-xl mx-auto p-6 bg-black bg-opacity-50 rounded-lg">
      <h1 className="text-3xl mb-4 text-center">Live Flight Status</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchFlightStatus();
        }}
        className="flex flex-col sm:flex-row items-center gap-4 mb-4"
      >
        <input
          type="text"
          aria-label="Flight number"
          value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value)}
          placeholder="Enter Flight Number (e.g. AA100)"
          className="p-2 w-full text-black rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-yellow-300">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {flightData && (
        <div className="bg-gray-800 p-4 rounded mt-4">
          <p><strong>Airline:</strong> {flightData.airline?.name}</p>
          <p><strong>Flight:</strong> {flightData.flight?.iata}</p>
          <p><strong>Status:</strong> {flightData.flight_status}</p>
          <p>
            <strong>From:</strong> {flightData.departure?.airport} ({flightData.departure?.iata})<br />
            <strong>Departure Time:</strong>{' '}
            {flightData.departure?.scheduled
              ? new Date(flightData.departure.scheduled).toLocaleString()
              : 'N/A'}
          </p>
          <p>
            <strong>To:</strong> {flightData.arrival?.airport} ({flightData.arrival?.iata})<br />
            <strong>Arrival Time:</strong>{' '}
            {flightData.arrival?.scheduled
              ? new Date(flightData.arrival.scheduled).toLocaleString()
              : 'N/A'}
          </p>
        </div>
      )}
    </div>
  );
};

export default LiveFlightStatus;
