const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

const handleResponse = async (res) => {
  if (!res.ok) {
    const data = await res.json().catch(() => null);
    if (data?.error?.code === 1006) throw new Error('Cidade não encontrada. Verifique o nome e tente novamente.');
    if (data?.error?.code === 2006 || data?.error?.code === 2007 || data?.error?.code === 2008) {
      throw new Error('Chave de API inválida. Configure sua VITE_WEATHER_API_KEY no arquivo .env');
    }
    throw new Error(`Erro ao buscar dados (${res.status}): ${res.statusText}`);
  }
  return res.json();
};

// WeatherAPI's forecast endpoint returns current weather + forecast in one call
// So we only need one function per lookup type
export const fetchWeatherByCity = async (city, signal) => {
  const res = await fetch(
    `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=5&lang=pt`,
    { signal }
  );
  return handleResponse(res);
};

export const fetchWeatherByCoords = async (lat, lon, signal) => {
  const res = await fetch(
    `${BASE_URL}/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=5&lang=pt`,
    { signal }
  );
  return handleResponse(res);
};

// Keep backward-compat names; they all call forecast.json now
export const fetchForecastByCity = fetchWeatherByCity;
export const fetchForecastByCoords = fetchWeatherByCoords;

export const getIconUrl = (iconCode, size) => {
  if (!iconCode) return '';
  let url = iconCode.startsWith('http') ? iconCode : `https:${iconCode}`;
  if (size) {
    url = url.replace(/\/\d+x\d+\//, `/${size}x${size}/`);
  }
  return url;
};

// Transform WeatherAPI forecast days into a flat array compatible with ForecastCard
export const aggregateForecast = (forecastDays) => {
  if (!forecastDays) return [];
  return forecastDays.map((day) => ({
    date: day.date,
    dt: new Date(day.date).getTime() / 1000,
    main: {
      temp: day.day.avgtemp_c,
      temp_max: day.day.maxtemp_c,
      temp_min: day.day.mintemp_c,
      humidity: day.day.avghumidity,
    },
    weather: [{
      id: day.day.condition.code,
      description: day.day.condition.text,
      icon: day.day.condition.icon.replace('//cdn', 'https://cdn'),
    }],
  }));
};