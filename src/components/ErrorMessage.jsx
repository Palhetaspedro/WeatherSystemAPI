const ErrorMessage = ({ message }) => (
  <div className="error-card glass">
    <div className="error-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="36" height="36">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
      </svg>
    </div>
    <h3 className="error-title">Oops!</h3>
    <p className="error-message">{message}</p>
  </div>
);

export default ErrorMessage;
