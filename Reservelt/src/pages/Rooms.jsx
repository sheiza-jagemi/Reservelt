import { useEffect, useState } from 'react';
import { getRooms } from '../api/api';
import '../App.css';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getRooms();
        setRooms(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="page-container">
      <h1>Our Rooms</h1>
      <div className="rooms-grid">
        {rooms.map(room => (
          <div key={room.id} className="room-card">
            <h2>{room.name}</h2>
            <p>{room.description}</p>
            <p>Price: ${room.price} per night</p>
            <p>Size: {room.size} m²</p>
            <p>Capacity: {room.capacity} people</p>
            <div className="amenities">
              <h4>Amenities:</h4>
              <ul>
                {room.amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rooms;