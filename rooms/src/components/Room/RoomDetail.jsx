import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format, addDays, isWithinInterval, parseISO } from 'date-fns';
import '../../styles/RoomDetail.css';

function RoomDetail() {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [isAvailable, setIsAvailable] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchRoomDetail = async () => {
      try {
        const response = await fetch(`http://localhost:3001/rooms/${roomId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch room details');
        }
        const data = await response.json();
        setRoom(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load room details. Please try again later.");
        setLoading(false);
      }
    };

    fetchRoomDetail();
  }, [roomId]);

  const handleDateChange = () => {
    if (!checkInDate || !checkOutDate || !room) return;
    
    const checkIn = parseISO(checkInDate);
    const checkOut = parseISO(checkOutDate);
    
    // Check if selected dates overlap with any booked dates
    const isBooked = room.bookedDates && room.bookedDates.some(booking => {
      const bookingStart = parseISO(booking.start);
      const bookingEnd = parseISO(booking.end);
      
      return (
        isWithinInterval(checkIn, { start: bookingStart, end: bookingEnd }) ||
        isWithinInterval(checkOut, { start: bookingStart, end: bookingEnd }) ||
        (checkIn <= bookingStart && checkOut >= bookingEnd)
      );
    });
    
    setIsAvailable(!isBooked);
  };

  useEffect(() => {
    handleDateChange();
  }, [checkInDate, checkOutDate]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === room.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? room.images.length - 1 : prevIndex - 1
    );
  };

  const handleBooking = () => {
    alert("Booking functionality will be implemented in the future!");
    // In a real app, this would redirect to a payment page
  };

  if (loading) return <div className="loading">Loading room details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!room) return <div className="error">Room not found</div>;

  return (
    <div className="room-detail-container">
      <div className="room-gallery">
        <div className="main-image">
          <button className="gallery-nav prev" onClick={prevImage}>&#10094;</button>
          <img 
            src={room.images && room.images.length > 0 ? room.images[currentImageIndex] : 'https://via.placeholder.com/600x400?text=No+Image'} 
            alt={`${room.roomType} view ${currentImageIndex + 1}`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/600x400?text=Image+Error';
            }}
          />
          <button className="gallery-nav next" onClick={nextImage}>&#10095;</button>
        </div>
        <div className="thumbnail-container">
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
      </div>

      <div className="room-info-container">
        <div className="room-header">
          <h1>{room.roomType} - Room {room.roomNumber}</h1>
          <p className="room-price">${room.pricePerNight} per night</p>
        </div>

        <div className="room-description">
          <h2>Description</h2>
          <p>{room.description}</p>
        </div>

        <div className="room-features">
          <h2>Features & Amenities</h2>
          <ul className="amenities-list">
            {room.amenities.map((amenity, index) => (
              <li key={index} className="amenity-item">
                <span className="amenity-icon">✓</span> {amenity}
              </li>
            ))}
          </ul>
          <p className="max-occupancy">Maximum Occupancy: {room.maxOccupancy} {room.maxOccupancy === 1 ? 'person' : 'people'}</p>
        </div>

        <div className="booking-section">
          <h2>Check Availability</h2>
          <div className="date-picker">
            <div className="date-input">
              <label htmlFor="check-in">Check-in Date</label>
              <input 
                type="date" 
                id="check-in" 
                value={checkInDate} 
                onChange={(e) => setCheckInDate(e.target.value)}
                min={format(new Date(), 'yyyy-MM-dd')}
              />
            </div>
            <div className="date-input">
              <label htmlFor="check-out">Check-out Date</label>
              <input 
                type="date" 
                id="check-out" 
                value={checkOutDate} 
                onChange={(e) => setCheckOutDate(e.target.value)}
                min={checkInDate || format(addDays(new Date(), 1), 'yyyy-MM-dd')}
              />
            </div>
          </div>

          {isAvailable !== null && (
            <div className={`availability-message ${isAvailable ? 'available' : 'unavailable'}`}>
              {isAvailable 
                ? 'Room is available for the selected dates!' 
                : 'Room is not available for the selected dates. Please try different dates.'}
            </div>
          )}

          <button 
            className="book-now-btn" 
            disabled={!isAvailable}
            onClick={handleBooking}
          >
            Book Now
          </button>
          <p className="booking-note">
            * Booking includes access to swimming pool, racket games, and massage services.
            Meals are not included and must be paid for separately during your stay.
          </p>
        </div>
      </div>
    </div>
  );
}

export default RoomDetail;