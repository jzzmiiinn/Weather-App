import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState(''); 
  const [weatherData, setWeatherData] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(''); 
  const API_KEY = "YOUR_API_KEY"; 

  const fetchWeather = async (searchCity) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError('City not found. Please try another city.');
      setWeatherData(null);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (city.trim()) {
        fetchWeather(city.trim());
        setCity(''); 
      }
    }
  };

  useEffect(() => {
    fetchWeather('Addis Ababa');
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        <h1>Weather App</h1>
        <p>Search for the weather in any city</p>
      </header>

      <main className="app-main">
        <section className="search-section">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Enter city name (e.g., New York)"
            className="city-input"
          />
          <button onClick={handleSearch} className="search-button" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </section>

        {error && <div className="error-message">{error}</div>}

        {weatherData && !loading && (
          <section className="weather-display">
            <div className="weather-card">
              <h2 className="city-name">{weatherData.name}, {weatherData.sys.country}</h2>
              <div className="temperature">{Math.round(weatherData.main.temp)}°C</div>
              <div className="condition">{weatherData.weather[0].description}</div>
              <div className="additional-info">
                <p>Feels like: {Math.round(weatherData.main.feels_like)}°C</p>
                <p>Humidity: {weatherData.main.humidity}%</p>
              </div>
            </div>
          </section>
        )}

        {loading && <div className="loading-message">Loading weather data...</div>}
      </main>
    </div>
  );
}

export default App;
