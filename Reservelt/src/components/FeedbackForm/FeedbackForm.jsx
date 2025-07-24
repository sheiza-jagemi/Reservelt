import { useState } from 'react';
import RatingSystem from './RatingSystem';
import LoadingSpinner from './LoadingSpinner';
import ToastNotification from './ToastNotification';
import '../../styles/FeedbackForm.css';

const FeedbackForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setToast({ message: 'Please select a rating', type: 'error' });
      return;
    }
    
    if (!userName.trim()) {
      setToast({ message: 'Please enter your name', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit({ rating, comment, userName });
      setToast({ message: 'Thank you for your feedback!', type: 'success' });
      setRating(0);
      setComment('');
      setUserName('');
    } catch (error) {
      setToast({ message: 'Failed to submit feedback. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="feedback-form-container">
      <h2 className="feedback-title">Share Your Experience</h2>
      
      {toast && (
        <ToastNotification 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)}
        />
      )}
      
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <label htmlFor="userName" className="form-label">Your Name:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            className="form-input"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="rating" className="form-label">Your Rating:</label>
          <RatingSystem onRatingChange={setRating} initialRating={rating} />
        </div>
        
        <div className="form-group">
          <label htmlFor="comment" className="form-label">Your Review:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="How was your experience?"
            rows="6"
            className="form-textarea"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting || rating === 0 || !userName.trim()}
        >
          {isSubmitting ? <LoadingSpinner size="small" /> : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;