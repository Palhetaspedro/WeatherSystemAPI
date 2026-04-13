const LoadingScreen = () => (
  <div className="loading-screen">
    <div className="loading-orb">
      <div className="loading-ring" />
      <div className="loading-ring loading-ring--2" />
      <div className="loading-ring loading-ring--3" />
      <div className="loading-core">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
    <p className="loading-text">Obtendo dados do clima<span className="loading-dots">...</span></p>
  </div>
);

export default LoadingScreen;
