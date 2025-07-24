import '../styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About Reservelt</h1>
        <p>Excellence in hospitality since our founding</p>
      </section>

      <section className="about-content">
        <div className="about-grid">
          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              Reservelt was founded with a vision to provide exceptional accommodations 
              that combine luxury, comfort, and modern convenience. Our commitment to 
              excellence has made us a premier destination for travelers seeking 
              quality and service.
            </p>
            <p>
              With 100 carefully designed rooms across three distinct categories, 
              we cater to every type of guest - from business travelers to families 
              and luxury seekers.
            </p>
          </div>
          <div className="about-stats">
            <div className="stat-item">
              <h3>100</h3>
              <p>Premium Rooms</p>
            </div>
            <div className="stat-item">
              <h3>3</h3>
              <p>Room Categories</p>
            </div>
            <div className="stat-item">
              <h3>24/7</h3>
              <p>Guest Support</p>
            </div>
            <div className="stat-item">
              <h3>100%</h3>
              <p>Satisfaction Rate</p>
            </div>
          </div>
        </div>

        <div className="services-section">
          <h2>Our Services</h2>
          <div className="services-grid">
            <div className="service-item">
              <h3>Room Service</h3>
              <p>24-hour room service available for Executive Suite guests</p>
            </div>
            <div className="service-item">
              <h3>Concierge</h3>
              <p>Professional concierge services to enhance your stay</p>
            </div>
            <div className="service-item">
              <h3>Business Center</h3>
              <p>Fully equipped business facilities for corporate guests</p>
            </div>
            <div className="service-item">
              <h3>Spa & Wellness</h3>
              <p>Relaxation and wellness facilities including jacuzzi access</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;