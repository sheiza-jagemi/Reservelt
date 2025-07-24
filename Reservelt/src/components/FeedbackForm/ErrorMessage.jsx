const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-message">
      <span className="error-icon">❌</span>
      <p className="error-text">{message}</p>
      {onRetry && (
        <button className="retry-button" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;