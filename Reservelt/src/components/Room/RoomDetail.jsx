import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookingForm from '../Booking/BookingForm';
import '../../components/Booking/BookingForm.css';
import '../../styles/RoomDetail.css';

const RoomDetail = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await fetch(`https://reservelt-endpoints.onrender.com/rooms/${roomId}`);
        if (!response.ok) throw new Error('Room not found');
        const data = await response.json();
        setRoom(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await fetch(`https://reservelt-endpoints.onrender.com/bookings?roomId=${roomId}`);
        const data = await response.json();
        setBookings(data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
      }
    };

    fetchRoom();
    fetchBookings();
  }, [roomId]);

  const nextImage = () => {
    if (room && room.images) {
      setCurrentImageIndex((prev) => 
        prev === room.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (room && room.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? room.images.length - 1 : prev - 1
      );
    }
  };

  const handleBookingSuccess = (message) => {
    setNotification({ type: 'success', message });
    setTimeout(() => setNotification(null), 3000);
  };

  if (loading) return <div className="loading">Loading room details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!room) return <div className="error">Room not found</div>;

  return (
    <div className="room-detail-container">
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      
      <div className="room-detail-header">
        <button className="back-btn" onClick={() => navigate('/rooms')}>← Back to Rooms</button>
      </div>
      
      <div className="room-detail-content">
        <div className="room-gallery">
          <div className="main-image">
            <button className="gallery-nav prev" onClick={prevImage}>‹</button>
            <img 
              src={room.images && room.images.length > 0 ? room.images[currentImageIndex] : 'https://via.placeholder.com/600x400?text=No+Image'} 
              alt={`${room.roomType} view ${currentImageIndex + 1}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/600x400?text=Image+Error';
              }}
            />
            <button className="gallery-nav next" onClick={nextImage}>›</button>
          </div>
          
          {room.images && room.images.length > 1 && (
            <div className="thumbnail-gallery">
              {room.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img 
                    src={image || 'https://via.placeholder.com/100x80?text=No+Image'} 
                    alt={`Thumbnail ${index + 1}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/100x80?text=Error';
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="room-info">
          <div className="room-header">
            <h1>{room.roomType} - Room {room.roomNumber}</h1>
            <div className="room-price">
              <span className="price">${room.pricePerNight}</span>
              <span className="period">per night</span>
            </div>
          </div>

          <div className="room-details">
            <div className="detail-item">
              <strong>Max Occupancy:</strong> {room.maxOccupancy} guest{room.maxOccupancy > 1 ? 's' : ''}
            </div>
            {bookings.length > 0 && (
              <div className="detail-item">
                <strong>Upcoming Bookings:</strong>
                <div className="booking-dates">
                  {bookings.map((booking, index) => {
                    const checkIn = new Date(booking.checkIn).toLocaleDateString();
                    const checkOut = new Date(booking.checkOut).toLocaleDateString();
                    return (
                      <div key={index} className="booking-period">
                        {checkIn} - {checkOut}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="room-description">
            <h3>Description</h3>
            <p>{room.description}</p>
          </div>

          <div className="room-amenities">
            <h3>Amenities</h3>
            <div className="amenities-grid">
              {room.amenities.map((amenity, index) => (
                <div key={index} className="amenity-item">
                  <span className="amenity-icon">✓</span>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="booking-section">
            <button 
              className="book-now-btn"
              onClick={() => setShowBookingForm(true)}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {showBookingForm && (
        <BookingForm
          room={room}
          onBookingSuccess={handleBookingSuccess}
          onClose={() => setShowBookingForm(false)}
        />
      )}
    </div>
  );
};

export default RoomDetail;