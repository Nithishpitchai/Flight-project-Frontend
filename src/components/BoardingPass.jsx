import React from 'react';

function BoardingPass({ passenger, flight }) {
  if (!passenger || !flight) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg border-2 border-blue-600">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">Your Boarding Pass</h2>

        <div className="border-dashed border-2 border-gray-300 p-4 rounded-xl space-y-3">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-700 font-semibold">Passenger:</p>
              <p>{passenger.name}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Seat:</p>
              <p>{passenger.seatNumber || "Auto-Assigned"}</p>
            </div>
          </div>

          <hr className="my-2" />

          <div className="flex justify-between">
            <div>
              <p className="text-gray-700 font-semibold">Flight:</p>
              <p>{flight.airline} {flight.flightNumber}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Date:</p>
              <p>{flight.departureDate || "N/A"}</p>
            </div>
          </div>

          <div className="flex justify-between">
            <div>
              <p className="text-gray-700 font-semibold">From:</p>
              <p>{flight.origin}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">To:</p>
              <p>{flight.destination}</p>
            </div>
          </div>

          <div className="flex justify-between">
            <div>
              <p className="text-gray-700 font-semibold">Departure:</p>
              <p>{flight.departureTime}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Price:</p>
              <p>${flight.price}</p>
            </div>
          </div>

          <hr className="my-2" />

          <div className="text-center">
            <p className="text-gray-600 text-sm">Transaction ID:</p>
            <p className="text-black font-mono font-semibold">
              TXN-{Math.floor(100000 + Math.random() * 900000)}
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-green-600 font-semibold">✅ Have a safe flight!</p>
        </div>
      </div>
    </div>
  );
}

export default BoardingPass;
