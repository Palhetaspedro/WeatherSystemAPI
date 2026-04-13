import { useState, useCallback, useRef, useEffect } from 'react';
import {
  fetchWeatherByCity,
  fetchWeatherByCoords,
  aggregateForecast,
} from '../services/api';

// Transform WeatherAPI response into the shape our components expect
const transformWeather = (data) => ({
  // WeatherAPI structure -> OpenWeather-like structure for compatibility
  name: data.location.name,
  sys: { country: data.location.country },
  main: {
    temp: data.current.temp_c,
    feels_like: data.current.feelslike_c,
    temp_max: data.forecast?.forecastday?.[0]?.day?.maxtemp_c ?? data.current.temp_c,
    temp_min: data.forecast?.forecastday?.[0]?.day?.mintemp_c ?? data.current.temp_c,
    humidity: data.current.humidity,
    pressure: data.current.pressure_mb,
  },
  weather: [{
    id: data.current.condition.code,
    description: data.current.condition.text,
    icon: data.current.condition.icon.replace('//cdn', 'https://cdn'),
  }],
  wind: {
    speed: data.current.wind_kph / 3.6, // kph -> m/s
    deg: data.current.wind_degree,
  },
  visibility: data.current.vis_km * 1000, // km -> m
  is_day: data.current.is_day === 1,
  _raw: data,
});

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);
  const initRef = useRef(false);

  const loadWeather = useCallback(async (fetchFn) => {
    // Cancel any in-flight request
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);
    try {
      const data = await fetchFn(controller.signal);
      if (controller.signal.aborted) return;
      setWeather(transformWeather(data));
      setForecast(aggregateForecast(data.forecast?.forecastday));
    } catch (err) {
      if (err.name === 'AbortError') return;
      setError(err.message);
      setWeather(null);
      setForecast([]);
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, []);

  const searchByCity = useCallback(
    (city) => loadWeather((signal) => fetchWeatherByCity(city, signal)),
    [loadWeather]
  );

  const searchByCoords = useCallback(
    (lat, lon) => loadWeather((signal) => fetchWeatherByCoords(lat, lon, signal)),
    [loadWeather]
  );

  // Geolocation on mount — only once
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => searchByCoords(coords.latitude, coords.longitude),
        () => searchByCity('São Paulo')
      );
    } else {
      searchByCity('São Paulo');
    }
  }, [searchByCoords, searchByCity]);

  return { weather, forecast, loading, error, searchByCity, searchByCoords };
};