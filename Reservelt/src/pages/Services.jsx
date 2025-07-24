import '../styles/Services.css';

const Services = () => {
  const services = [
    {
      id: 1,
      name: "Fine Dining",
      category: "Meals",
      price: "$45",
      description: "Gourmet meals prepared by our executive chef with international cuisine options.",
      features: ["Breakfast buffet", "À la carte dinner", "Room service", "Dietary accommodations"]
    },
    {
      id: 2,
      name: "Spa & Massage",
      category: "Wellness",
      price: "$80",
      description: "Professional massage therapy and spa treatments for ultimate relaxation.",
      features: ["Swedish massage", "Deep tissue", "Hot stone therapy", "Aromatherapy"]
    },
    {
      id: 3,
      name: "Premium Accommodation",
      category: "Accommodation",
      price: "Included",
      description: "Luxury accommodation services with personalized attention to detail.",
      features: ["Daily housekeeping", "Concierge service", "24/7 front desk", "Laundry service"]
    },
    {
      id: 4,
      name: "Tennis & Racquet Sports",
      category: "Recreation",
      price: "$25/hour",
      description: "Professional tennis courts and racquet sports facilities with equipment rental.",
      features: ["Tennis courts", "Badminton", "Equipment rental", "Professional coaching"]
    },
    {
      id: 5,
      name: "Swimming Pool",
      category: "Recreation",
      price: "Complimentary",
      description: "Olympic-size swimming pool with poolside service and relaxation areas.",
      features: ["Heated pool", "Pool bar", "Loungers", "Swimming lessons"]
    },
    {
      id: 6,
      name: "Continental Breakfast",
      category: "Meals",
      price: "$25",
      description: "Fresh continental breakfast with local and international options.",
      features: ["Fresh pastries", "Tropical fruits", "Coffee & tea", "Healthy options"]
    }
  ];

  return (
    <div className="services-container">
      <section className="services-hero">
        <h1>Our Services</h1>
        <p>Exceptional amenities and services to enhance your stay</p>
      </section>

      <section className="services-content">
        <div className="services-grid">
          {services.map(service => (
            <div key={service.id} className="service-card">
              <div className="service-header">
                <h3>{service.name}</h3>
                <span className="service-category">{service.category}</span>
                <div className="service-price">{service.price}</div>
              </div>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <button className="book-service-btn">Book Service</button>
            </div>
          ))}
        </div>

        <section className="service-categories">
          <h2>Service Categories</h2>
          <div className="categories-grid">
            <div className="category-card">
              <h3>Dining & Meals</h3>
              <p>From continental breakfast to fine dining experiences, our culinary team provides exceptional meal services.</p>
            </div>
            <div className="category-card">
              <h3>Wellness & Spa</h3>
              <p>Rejuvenate with our professional massage and spa services designed for complete relaxation.</p>
            </div>
            <div className="category-card">
              <h3>Recreation & Sports</h3>
              <p>Stay active with our tennis courts, swimming pool, and various recreational facilities.</p>
            </div>
            <div className="category-card">
              <h3>Accommodation Services</h3>
              <p>Premium accommodation services including concierge, housekeeping, and personalized guest care.</p>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Services;