const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const handleResponse = async (res) => {
  if (!res.ok) {
    if (res.status === 404) throw new Error('Cidade não encontrada. Verifique o nome e tente novamente.');
    if (res.status === 401) throw new Error('Chave de API inválida. Configure sua VITE_OPENWEATHER_API_KEY no arquivo .env');
    throw new Error(`Erro ao buscar dados: ${res.statusText}`);
  }
  return res.json();
};

export const fetchWeatherByCity = async (city) => {
  const res = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=pt_br`
  );
  return handleResponse(res);
};

export const fetchWeatherByCoords = async (lat, lon) => {
  const res = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`
  );
  return handleResponse(res);
};

export const fetchForecastByCity = async (city) => {
  const res = await fetch(
    `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=pt_br&cnt=40`
  );
  return handleResponse(res);
};

export const fetchForecastByCoords = async (lat, lon) => {
  const res = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br&cnt=40`
  );
  return handleResponse(res);
};

export const getIconUrl = (iconCode, size = '2x') =>
  `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;

// Aggregate 5-day forecast (one entry per day at midday)
export const aggregateForecast = (forecastList) => {
  const days = {};
  forecastList.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'short' });
    const hour = date.getHours();
    if (!days[dayKey]) {
      days[dayKey] = { ...item, dayKey };
    } else if (Math.abs(hour - 12) < Math.abs(new Date(days[dayKey].dt * 1000).getHours() - 12)) {
      days[dayKey] = { ...item, dayKey };
    }
  });
  return Object.values(days).slice(0, 5);
};
