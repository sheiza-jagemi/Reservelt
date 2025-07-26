import { useState } from 'react';
import { bookingApi } from '../../api/bookingApi';

const BookingForm = ({ room, onBookingSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    guestName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateTotalPrice = () => {
    if (!formData.checkIn || !formData.checkOut) return 0;
    const checkIn = new Date(formData.checkIn);
    const checkOut = new Date(formData.checkOut);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    return nights * room.pricePerNight;
  };

  const isDateRangeBooked = async (checkIn, checkOut) => {
    try {
      const response = await fetch(`http://localhost:3001/bookings?roomId=${room.id}`);
      const bookings = await response.json();
      
      if (!bookings || bookings.length === 0) return false;
      
      const newCheckIn = new Date(checkIn);
      const newCheckOut = new Date(checkOut);
      
      return bookings.some(booking => {
        const bookedStart = new Date(booking.checkIn);
        const bookedEnd = new Date(booking.checkOut);
        
        return (newCheckIn <= bookedEnd && newCheckOut > bookedStart);
      });
    } catch (error) {
      console.error('Error checking bookings:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Check for date conflicts
    const hasConflict = await isDateRangeBooked(formData.checkIn, formData.checkOut);
    if (hasConflict) {
      setError('Selected dates are already booked. Please choose different dates.');
      setLoading(false);
      return;
    }

    try {
      const bookingData = {
        roomId: room.id,
        ...formData,
        totalPrice: calculateTotalPrice()
      };

      await bookingApi.createBooking(bookingData);
      onBookingSuccess('Booking created successfully!');
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-form-overlay">
      <div className="booking-form-container">
        <div className="booking-form-header">
          <h2>Book {room.roomType} - Room {room.roomNumber}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label>Guest Name *</label>
            <input
              type="text"
              name="guestName"
              value={formData.guestName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Check-in Date *</label>
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="form-group">
              <label>Check-out Date *</label>
              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                min={formData.checkIn}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Number of Guests *</label>
            <select
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
            >
              {[...Array(room.maxOccupancy)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} Guest{i > 0 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="booking-summary">
            <div className="price-breakdown">
              <p>Room Rate: ${room.pricePerNight} per night</p>
              {formData.checkIn && formData.checkOut && (
                <p>Total: ${calculateTotalPrice()}</p>
              )}
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Booking...' : 'Book Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;