const ReviewItem = ({ review }) => {
  return (
    <div className="review-item">
      <div className="review-header">
        <span className="reviewer-name">{review.userName}</span>
        <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
      </div>
      <div className="review-rating">
        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
      </div>
      <p className="review-text">{review.comment}</p>
    </div>
  );
};

export default ReviewItem;