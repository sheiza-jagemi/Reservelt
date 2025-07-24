import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/GlobalOverrides.css';
import './styles/ButtonOverrides.css';
import './components/Navigation/Navigation.css';
import './components/Booking/BookingForm.css';
import './App.css';

// Core Layout Components
import Navbar from './components/Navigation/Navbar';
import Footer from './components/Footer/Footer';

// Pages
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';

// Room Components
import RoomDetail from './components/Room/RoomDetail';

// Feedback Components
import FeedbackForm from './components/FeedbackForm/FeedbackForm';
import ReviewList from './components/FeedbackForm/ReviewList';
import ToastNotification from './components/FeedbackForm/ToastNotification';

// API
import { feedbackApi } from './api/bookingApi';

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
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:roomId" element={<RoomDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* Feedback route */}
            <Route path="/feedback" element={
              <div className="feedback-system">
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
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
