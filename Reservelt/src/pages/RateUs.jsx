import { useState, useEffect } from 'react';
import FeedbackForm from '../components/FeedbackForm/FeedbackForm';
import ReviewList from '../components/FeedbackForm/ReviewList';
import ToastNotification from '../components/FeedbackForm/ToastNotification';
import { feedbackApi } from '../api/bookingApi';
import '../styles/RateUs.css';

const RateUs = () => {
  const [reviews, setReviews] = useState([]);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visibleReviews, setVisibleReviews] = useState(5);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const data = await feedbackApi.getAllFeedback();
        const sortedReviews = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setReviews(sortedReviews);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching feedback:', error);
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const handleSubmitFeedback = async (feedback) => {
    try {
      const newFeedback = await feedbackApi.createFeedback({
        userName: feedback.userName || "Anonymous",
        email: feedback.email || "",
        rating: feedback.rating,
        comment: feedback.comment
      });
      
      const newReview = {
        id: newFeedback.id,
        userName: newFeedback.userName,
        date: newFeedback.date,
        rating: newFeedback.rating,
        comment: newFeedback.comment,
        avatar: newFeedback.avatar
      };
      
      setReviews([newReview, ...reviews]);
      setNotification({
        type: 'success',
        message: 'Thank you for your feedback!'
      });
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to submit feedback. Please try again.'
      });
    } finally {
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="rate-us-container">
      <section className="rate-us-hero">
        <h1>Rate Your Experience</h1>
        <p>We value your feedback and strive to improve our services</p>
      </section>

      <section className="rate-us-content">
        {notification && (
          <ToastNotification 
            message={notification.message} 
            type={notification.type} 
          />
        )}

        <div className="feedback-section">
          <div className="feedback-card">
            <h2>Leave Your Feedback</h2>
            <p>Share your experience with our services and help us serve you better.</p>
            <FeedbackForm onSubmit={handleSubmitFeedback} />
          </div>

          <div className="reviews-section">
            <h2>Customer Reviews</h2>
            <p>What others are saying about their experience</p>
            {loading ? (
              <div className="loading">Loading reviews...</div>
            ) : (
              <>
                <ReviewList reviews={reviews.slice(0, visibleReviews)} />
                {reviews.length > visibleReviews && (
                  <button 
                    className="view-more-reviews-btn"
                    onClick={() => setVisibleReviews(prev => prev + 5)}
                  >
                    View More Reviews
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RateUs;