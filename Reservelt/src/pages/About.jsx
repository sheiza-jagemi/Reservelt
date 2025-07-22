import '../App.css';

const About = () => {
  return (
    <div className="page-container">
      <h1>About Reservelt</h1>
      <section className="about-section">
        <h2>Our Story</h2>
        <p>
          Founded in 2023, Reservelt was created to provide exceptional hospitality
          experiences with a personal touch. We believe every guest deserves a
          memorable stay.
        </p>
      </section>
      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          To connect travelers with beautiful accommodations and premium services,
          making every booking experience seamless and every stay unforgettable.
        </p>
      </section>
      <section className="about-section">
        <h2>Our Team</h2>
        <p>
          A dedicated group of hospitality professionals committed to exceeding
          your expectations.
        </p>
      </section>
    </div>
  );
};

export default About;