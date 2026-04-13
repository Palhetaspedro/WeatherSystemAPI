import { getIconUrl } from '../services/api';

const ForecastCard = ({ item, theme, index }) => {
  const date = new Date(item.dt * 1000);
  const isToday = index === 0;

  const dayLabel = isToday
    ? 'Hoje'
    : date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '').toUpperCase();

  const dateLabel = date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' });
  const icon = item.weather[0].icon;
  const description = item.weather[0].description;
  const temp = Math.round(item.main.temp);
  const tempMax = Math.round(item.main.temp_max);
  const tempMin = Math.round(item.main.temp_min);

  return (
    <div
      className="forecast-card glass"
      style={{ '--accent': theme.accent, '--accent-soft': theme.accentSoft, animationDelay: `${index * 80}ms` }}
    >
      <p className="forecast-day">{dayLabel}</p>
      <p className="forecast-date">{dateLabel}</p>
      <img src={getIconUrl(icon)} alt={description} className="forecast-icon" />
      <p className="forecast-desc">{description}</p>
      <div className="forecast-temps">
        <span className="forecast-max">{tempMax}°</span>
        <div className="forecast-bar">
          <div className="forecast-bar-fill" />
        </div>
        <span className="forecast-min">{tempMin}°</span>
      </div>
      <div className="forecast-humidity">
        <span>💧 {item.main.humidity}%</span>
      </div>
    </div>
  );
};

export default ForecastCard;
