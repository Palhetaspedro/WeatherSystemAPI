import { useState } from 'react';

const SearchBar = ({ onSearch, loading, accentColor }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-wrapper">
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar cidade..."
          className="search-input"
          disabled={loading}
          autoComplete="off"
        />
        <button type="submit" className="search-btn" disabled={loading || !query.trim()} style={{ '--accent': accentColor }}>
          {loading ? (
            <span className="spinner" />
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
