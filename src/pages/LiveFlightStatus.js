const fetchFlightStatus = async () => {
  if (!flightNumber.trim()) return;
  setLoading(true);
  setError('');
  setFlightData(null);

  try {
    const apiKey = process.env.REACT_APP_AVIATION_API_KEY;
    if (!apiKey) {
      setError('AviationStack API key is missing!');
      return;
    }

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
