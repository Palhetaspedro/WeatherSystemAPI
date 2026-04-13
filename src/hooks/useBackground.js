import { useMemo } from 'react';

const THEMES = {
  clear_day: {
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #1a4a6b 100%)',
    accent: '#f59e0b',
    accentSoft: 'rgba(245,158,11,0.15)',
    particles: 'sunny',
  },
  clear_night: {
    gradient: 'linear-gradient(135deg, #0a0a0f 0%, #0d0d1a 40%, #0a0a20 70%, #050510 100%)',
    accent: '#818cf8',
    accentSoft: 'rgba(129,140,248,0.15)',
    particles: 'stars',
  },
  clouds_day: {
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #1e2a3a 40%, #243040 70%, #2a3548 100%)',
    accent: '#94a3b8',
    accentSoft: 'rgba(148,163,184,0.15)',
    particles: 'clouds',
  },
  clouds_night: {
    gradient: 'linear-gradient(135deg, #0d0d15 0%, #111520 40%, #0f1525 70%, #0a1020 100%)',
    accent: '#64748b',
    accentSoft: 'rgba(100,116,139,0.15)',
    particles: 'clouds',
  },
  rain_day: {
    gradient: 'linear-gradient(135deg, #0f1923 0%, #111d2b 40%, #0d1e30 70%, #0a1828 100%)',
    accent: '#38bdf8',
    accentSoft: 'rgba(56,189,248,0.15)',
    particles: 'rain',
  },
  rain_night: {
    gradient: 'linear-gradient(135deg, #080f18 0%, #0a1220 40%, #080f1e 70%, #050c18 100%)',
    accent: '#0ea5e9',
    accentSoft: 'rgba(14,165,233,0.15)',
    particles: 'rain',
  },
  snow: {
    gradient: 'linear-gradient(135deg, #1a2030 0%, #1e2540 40%, #1a2245 70%, #151e3d 100%)',
    accent: '#e2e8f0',
    accentSoft: 'rgba(226,232,240,0.15)',
    particles: 'snow',
  },
  thunderstorm: {
    gradient: 'linear-gradient(135deg, #080810 0%, #0a0a18 40%, #080818 70%, #050510 100%)',
    accent: '#a78bfa',
    accentSoft: 'rgba(167,139,250,0.15)',
    particles: 'storm',
  },
  mist: {
    gradient: 'linear-gradient(135deg, #111520 0%, #161b28 40%, #141820 70%, #101418 100%)',
    accent: '#9ca3af',
    accentSoft: 'rgba(156,163,175,0.15)',
    particles: 'mist',
  },
};

export const useBackground = (weather) => {
  return useMemo(() => {
    if (!weather) return THEMES.clear_night;

    const id = weather.weather[0].id;
    const isNight = weather.weather[0].icon?.endsWith('n');

    let type;
    if (id >= 200 && id < 300) type = 'thunderstorm';
    else if (id >= 300 && id < 600) type = isNight ? 'rain_night' : 'rain_day';
    else if (id >= 600 && id < 700) type = 'snow';
    else if (id >= 700 && id < 800) type = 'mist';
    else if (id === 800) type = isNight ? 'clear_night' : 'clear_day';
    else type = isNight ? 'clouds_night' : 'clouds_day';

    return THEMES[type] || THEMES.clear_day;
  }, [weather]);
};
