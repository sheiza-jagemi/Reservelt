const LoadingSpinner = ({ size = "medium" }) => {
  const sizes = {
    small: "20px",
    medium: "40px",
    large: "60px"
  };

  return (
    <div className="loading-spinner" style={{ width: sizes[size], height: sizes[size] }}>
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;