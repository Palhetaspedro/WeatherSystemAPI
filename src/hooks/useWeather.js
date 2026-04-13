import { useState, useEffect, useCallback } from 'react';
import {
  fetchWeatherByCity,
  fetchWeatherByCoords,
  fetchForecastByCity,
  fetchForecastByCoords,
  aggregateForecast,
} from '../services/api';

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric'); // future toggle

  const loadWeather = useCallback(async (fetchWeatherFn, fetchForecastFn) => {
    setLoading(true);
    setError(null);
    try {
      const [weatherData, forecastData] = await Promise.all([fetchWeatherFn(), fetchForecastFn()]);
      setWeather(weatherData);
      setForecast(aggregateForecast(forecastData.list));
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchByCity = useCallback(
    (city) => loadWeather(() => fetchWeatherByCity(city), () => fetchForecastByCity(city)),
    [loadWeather]
  );

  const searchByCoords = useCallback(
    (lat, lon) => loadWeather(() => fetchWeatherByCoords(lat, lon), () => fetchForecastByCoords(lat, lon)),
    [loadWeather]
  );

  // Geolocation on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => searchByCoords(coords.latitude, coords.longitude),
        () => searchByCity('São Paulo') // fallback
      );
    } else {
      searchByCity('São Paulo');
    }
  }, []);

  return { weather, forecast, loading, error, searchByCity, searchByCoords };
};
