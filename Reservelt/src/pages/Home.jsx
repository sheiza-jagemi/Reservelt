import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Reservelt</h1>
          <p>Your premier destination for luxury accommodations and exceptional service</p>
          <Link to="/rooms" className="cta-button">Explore Our Rooms</Link>
        </div>
      </section>

      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&w=300&h=200&fit=crop" alt="Premium Rooms" className="feature-image" />
            <h3>100 Premium Rooms</h3>
            <p>Choose from 40 Single rooms, 30 Double rooms, and 30 Executive Suites, each designed for comfort and luxury.</p>
          </div>
          <div className="feature-card">
            <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&w=300&h=200&fit=crop" alt="Modern Amenities" className="feature-image" />
            <h3>Modern Amenities</h3>
            <p>All rooms feature Wi-Fi, TV, Air Conditioning, and premium amenities tailored to each room type.</p>
          </div>
          <div className="feature-card">
            <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&w=300&h=200&fit=crop" alt="Easy Booking" className="feature-image" />
            <h3>Easy Booking</h3>
            <p>Our streamlined booking system prevents double-bookings and ensures your reservation is secure.</p>
          </div>
          <div className="feature-card">
            <img src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&w=300&h=200&fit=crop" alt="Customer Reviews" className="feature-image" />
            <h3>Customer Reviews</h3>
            <p>Read authentic feedback from our guests and share your own experience with our community.</p>
          </div>
        </div>
      </section>

      <section className="room-types-section">
        <h2>Room Categories</h2>
        <div className="room-types-grid">
          <div className="room-type-card">
            <h3>Single Rooms</h3>
            <p className="price">$116/night</p>
            <p>Perfect for solo travelers, featuring essential amenities and comfortable accommodations.</p>
            <ul>
              <li>1 Guest capacity</li>
              <li>Wi-Fi & TV</li>
              <li>Air Conditioning</li>
              <li>Mini Fridge</li>
            </ul>
          </div>
          <div className="room-type-card">
            <h3>Double Rooms</h3>
            <p className="price">$180/night</p>
            <p>Spacious rooms ideal for couples, with enhanced amenities and city views.</p>
            <ul>
              <li>2 Guest capacity</li>
              <li>Wi-Fi & TV</li>
              <li>Air Conditioning</li>
              <li>Mini Fridge & Coffee Maker</li>
            </ul>
          </div>
          <div className="room-type-card">
            <h3>Executive Suites</h3>
            <p className="price">$350/night</p>
            <p>Luxurious suites with premium amenities and stunning views for the ultimate experience.</p>
            <ul>
              <li>4 Guest capacity</li>
              <li>Premium amenities</li>
              <li>Mini Bar & Jacuzzi</li>
              <li>Room Service & Balcony</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;