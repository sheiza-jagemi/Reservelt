import { useState } from 'react';
import './App.css';
import FeedbackForm from './components/FeedbackForm/FeedbackForm';
import ReviewList from './components/FeedbackForm/ReviewList';
import ToastNotification from './components/FeedbackForm/ToastNotification';

function App() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      userName: "Sheiza jagemi",
      date: "2025-07-22",
      rating: 5,
      comment: "Excellent service and comfortable stay! The amenities were perfect and the host was extremely accommodating.",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      id: 2,
      userName: "Cyril Katua",
      date: "2025-07-21",
      rating: 4,
      comment: "Great location and friendly staff. The room was clean and cozy with a beautiful view of the city skyline.",
      avatar: "https://i.pravatar.cc/150?img=2"
    }
  ]);
  const [notification, setNotification] = useState(null);

  const handleSubmitFeedback = async (feedback) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newReview = {
        id: reviews.length + 1,
        userName: "You",
        date: new Date().toISOString(),
        rating: feedback.rating,
        comment: feedback.comment,
        avatar: "https://i.pravatar.cc/150?img=3"
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
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1 className="app-title">Reservelt Feedback System</h1>
        <p className="app-subtitle">Share your experience with us</p>
      </header>

      {/* Main Content */}
      <main className="app-main">
        {/* Feedback Section */}
        <section className="feedback-system">
          {notification && (
            <ToastNotification 
              message={notification.message} 
              type={notification.type} 
            />
          )}
          
          <div className="feedback-card">
            <h2 className="section-title">Leave Your Feedback</h2>
            <p className="section-description">
              We value your opinion! Please share your experience with our services.
            </p>
            <FeedbackForm onSubmit={handleSubmitFeedback} />
          </div>

          <div className="reviews-card">
            <h2 className="section-title">Customer Reviews</h2>
            <p className="section-description">
              What others are saying about their experience
            </p>
            <ReviewList reviews={reviews} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;