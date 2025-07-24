import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Reservelt</h3>
          <p>Your perfect getaway experience</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/rooms">Rooms</a></li>
            <li><a href="/services">Services</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>info@reservelt.com</p>
          <p>+123 456 7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Reservelt. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;