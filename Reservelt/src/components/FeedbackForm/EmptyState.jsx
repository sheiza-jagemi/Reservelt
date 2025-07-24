const EmptyState = ({ message = "No data available", icon = "😐" }) => {
  return (
    <div className="empty-state">
      <span className="empty-icon">{icon}</span>
      <p className="empty-message">{message}</p>
    </div>
  );
};

export default EmptyState;