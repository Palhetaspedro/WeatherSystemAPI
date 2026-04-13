import { getIconUrl } from '../services/api';

const WeatherCard = ({ weather, theme }) => {
  const { name, sys, main, weather: conditions, wind, visibility } = weather;
  const icon = conditions[0].icon;
  const description = conditions[0].description;

  const formatDate = () => {
    return new Date().toLocaleDateString('pt-BR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  const formatVisibility = (vis) => {
    if (!vis) return '--';
    return vis >= 1000 ? `${(vis / 1000).toFixed(1)} km` : `${vis} m`;
  };

  const getWindDirection = (deg) => {
    if (deg === undefined) return '--';
    const dirs = ['N', 'NE', 'L', 'SE', 'S', 'SO', 'O', 'NO'];
    return dirs[Math.round(deg / 45) % 8];
  };

  return (
    <div className="weather-card glass" style={{ '--accent': theme.accent, '--accent-soft': theme.accentSoft }}>
      <div className="weather-card__header">
        <div className="weather-card__location">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="location-icon">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          <div>
            <h2 className="city-name">{name}</h2>
            <span className="country">{sys.country}</span>
          </div>
        </div>
        <p className="date-text">{formatDate()}</p>
      </div>

      <div className="weather-card__main">
        <div className="temp-section">
          <div className="temp-display">
            <span className="temp-value">{Math.round(main.temp)}</span>
            <span className="temp-unit">°C</span>
          </div>
          <p className="feels-like">Sensação: {Math.round(main.feels_like)}°C</p>
          <p className="description">{description.charAt(0).toUpperCase() + description.slice(1)}</p>
          <div className="temp-range">
            <span className="temp-max">
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              {Math.round(main.temp_max)}°
            </span>
            <span className="temp-min">
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              {Math.round(main.temp_min)}°
            </span>
          </div>
        </div>
        <div className="icon-section">
          <img
            src={getIconUrl(icon, 128)}
            alt={description}
            className="weather-icon-main"
          />
        </div>
      </div>

      <div className="weather-card__stats">
        <StatItem icon="💧" label="Umidade" value={`${main.humidity}%`} />
        <StatItem icon="🌬️" label="Vento" value={`${Math.round(wind.speed * 3.6)} km/h ${getWindDirection(wind.deg)}`} />
        <StatItem icon="🔽" label="Pressão" value={`${main.pressure} hPa`} />
        <StatItem icon="👁️" label="Visib." value={formatVisibility(visibility)} />
      </div>
    </div>
  );
};

const StatItem = ({ icon, label, value }) => (
  <div className="stat-item">
    <span className="stat-icon">{icon}</span>
    <span className="stat-label">{label}</span>
    <span className="stat-value">{value}</span>
  </div>
);

export default WeatherCard;
