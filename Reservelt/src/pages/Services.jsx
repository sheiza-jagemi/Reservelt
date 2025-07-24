import { useEffect, useState } from 'react';
import { getServices } from '../api/api';
import '../App.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <div className="page-container">Loading services...</div>;

  return (
    <div className="page-container">
      <h1>Our Services</h1>
      <div className="services-grid">
        {services.map(service => (
          <div key={service.id} className="service-card">
            <h2>{service.name}</h2>
            <p>{service.description}</p>
            <div className="service-price">${service.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;