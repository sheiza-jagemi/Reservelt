import { useState } from 'react';

const RatingSystem = ({ initialRating = 0, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleClick = (newRating) => {
    setRating(newRating);
    if (onRatingChange) onRatingChange(newRating);
  };

  return (
    <div className="rating-system">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className={`star ${star <= (hover || rating) ? 'filled' : ''}`}
          onClick={() => handleClick(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          aria-label={`Rate ${star} star`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default RatingSystem;