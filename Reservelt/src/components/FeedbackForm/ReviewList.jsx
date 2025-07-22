import ReviewItem from './ReviewItem';
import EmptyState from './EmptyState';

const ReviewList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <EmptyState message="No reviews yet. Be the first to review!" icon="✍️" />;
  }

  return (
    <div className="review-list">
      <h3 className="review-list-title">Customer Reviews</h3>
      {reviews.map((review, index) => (
        <ReviewItem key={`review-${index}`} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;