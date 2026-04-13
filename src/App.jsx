import { useWeather } from './hooks/useWeather';
import { useBackground } from './hooks/useBackground';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import LoadingScreen from './components/LoadingScreen';
import ErrorMessage from './components/ErrorMessage';
import ParticleBackground from './components/ParticleBackground';
import './App.css';

function App() {
  const { weather, forecast, loading, error, searchByCity } = useWeather();
  const theme = useBackground(weather);

  return (
    <div className="app" style={{ background: theme.gradient }}>
      <ParticleBackground type={theme.particles} accent={theme.accent} />

      <div className="app__overlay" />

      <main className="app__content">
        {/* Header */}
        <header className="app__header">
          <div className="logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="logo-icon" style={{ stroke: theme.accent }}>
              <path d="M12 2a7 7 0 0 1 7 7c0 4-7 13-7 13S5 13 5 9a7 7 0 0 1 7-7z"/>
              <circle cx="12" cy="9" r="2.5"/>
            </svg>
            <span className="logo-text">WeatherDash</span>
          </div>
          <SearchBar onSearch={searchByCity} loading={loading} accentColor={theme.accent} />
        </header>

        {/* Body */}
        <section className="app__body">
          {loading && <LoadingScreen />}

          {!loading && error && <ErrorMessage message={error} />}

          {!loading && !error && weather && (
            <div className="dashboard">
              <div className="dashboard__left">
                <WeatherCard weather={weather} theme={theme} />
              </div>

              {forecast.length > 0 && (
                <div className="dashboard__right">
                  <h3 className="forecast-title" style={{ color: theme.accent }}>
                    Próximos 5 dias
                  </h3>
                  <div className="forecast-grid">
                    {forecast.map((item, i) => (
                      <ForecastCard key={item.dt} item={item} theme={theme} index={i} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {!loading && !error && !weather && (
            <div className="welcome glass">
              <div className="welcome__icon">🌍</div>
              <h2>Bem-vindo ao WeatherDash</h2>
              <p>Digite o nome de uma cidade ou permita o acesso à localização.</p>
            </div>
          )}
        </section>

        <footer className="app__footer">
          <span>Powered by <a href="https://openweathermap.org" target="_blank" rel="noreferrer">OpenWeatherMap</a></span>
          <span className="footer__watermark">@Palhetaspedro</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
