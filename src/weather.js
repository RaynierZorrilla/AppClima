    import React, { useState } from 'react';
    import axios from 'axios';
    import './Weather.css';
// By Raynier Zorrilla 
    const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    
    const fetchWeather = async (cityName) => {
        try {
            const response = await axios.get(
                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=NFRC9ARZGGKFWUGN4CLYSWA8C&contentType=json`
            );
            setWeatherData(response.data);
            setError(null); // Clear error if the request is successful
        } catch (error) {
            setWeatherData(null);
            setError('No se encontró la ciudad. Por favor, intenta con otro nombre.');
            }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (city.trim() !== '') {
        fetchWeather(city);
        }
    };

    const getWeatherIcon = (conditions) => {
        if (conditions.toLowerCase().includes('clear')) return '☀️';
        if (conditions.toLowerCase().includes('cloud')) return '☁️';
        if (conditions.toLowerCase().includes('rain')) return '🌧️';
        if (conditions.toLowerCase().includes('snow')) return '❄️';
        return '🌤️';
    };

    return (
        <div className="weather-container">
        <form onSubmit={handleSearch}>
            <input
            type="text"
            placeholder="Buscar ciudad..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            />
            <button type="submit">Buscar</button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {weatherData && (
            <div className="weather-info">
            <h2>Clima en {weatherData.resolvedAddress}</h2>
            <div className="weather-details">
                <div className="weather-icon">
                {getWeatherIcon(weatherData.currentConditions.conditions)}
                </div>
                <div className="weather-data">
                <p>Temperatura: {weatherData.currentConditions.temp}°C</p>
                <p>Condiciones: {weatherData.currentConditions.conditions}</p>
                <p>Humedad: {weatherData.currentConditions.humidity}%</p>
                <p>Viento: {weatherData.currentConditions.windspeed} km/h</p>
                </div>
            </div>
            </div>
        )}
        </div>
    );
    };

    export default Weather;
