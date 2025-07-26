import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RoomFilter from './RoomFilter';
import '../../styles/RoomList.css';

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCounts, setVisibleCounts] = useState({
    single: 8,
    double: 8,
    executive: 8,
    other: 8
  });

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        console.log('Fetching rooms from server...');
        const response = await fetch('https://reservelt-endpoints.onrender.com/rooms');
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error('Failed to fetch rooms');
        }
        const data = await response.json();
        console.log('Rooms data received:', data);
        setRooms(data);
        setFilteredRooms(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching rooms:', err);
        setError("Failed to load rooms. Please try again later.");
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleFilter = (filters) => {
    let filtered = [...rooms];
    
    // Filter by room type
    if (filters.roomType) {
      filtered = filtered.filter(room => room.roomType === filters.roomType);
    }
    
    // Filter by price range
    if (filters.minPrice) {
      filtered = filtered.filter(room => room.pricePerNight >= filters.minPrice);
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(room => room.pricePerNight <= filters.maxPrice);
    }
    
    // Filter by occupancy
    if (filters.occupancy) {
      filtered = filtered.filter(room => room.maxOccupancy >= filters.occupancy);
    }
    
    // Filter by amenities
    if (filters.amenities && filters.amenities.length > 0) {
      filtered = filtered.filter(room => 
        filters.amenities.every(amenity => room.amenities.includes(amenity))
      );
    }
    
    // Reset visible counts when filters are applied
    setVisibleCounts({
      single: 8,
      double: 8,
      executive: 8,
      other: 8
    });
    
    setFilteredRooms(filtered);
  };

  if (loading) return <div className="loading">Loading rooms...</div>;
  if (error) return <div className="error">{error}</div>;



  // Group rooms by type for better organization
  console.log('Filtered rooms:', filteredRooms);
  
  // Use includes instead of exact match to be more flexible with room types
  const singleRooms = filteredRooms.filter(room => room.roomType.includes('Single'));
  const doubleRooms = filteredRooms.filter(room => room.roomType.includes('Double'));
  const executiveSuites = filteredRooms.filter(room => room.roomType.includes('Executive'));
  
  // If no rooms are categorized, just show all rooms
  const uncategorizedRooms = filteredRooms.filter(room => 
    !room.roomType.includes('Single') && 
    !room.roomType.includes('Double') && 
    !room.roomType.includes('Executive')
  );
  
  console.log('Single rooms:', singleRooms.length);
  console.log('Double rooms:', doubleRooms.length);
  console.log('Executive suites:', executiveSuites.length);
  
  // Functions to load more rooms
  const loadMoreSingle = () => {
    setVisibleCounts(prev => ({
      ...prev,
      single: prev.single + 8
    }));
  };
  
  const loadMoreDouble = () => {
    setVisibleCounts(prev => ({
      ...prev,
      double: prev.double + 8
    }));
  };
  
  const loadMoreExecutive = () => {
    setVisibleCounts(prev => ({
      ...prev,
      executive: prev.executive + 8
    }));
  };
  
  const loadMoreOther = () => {
    setVisibleCounts(prev => ({
      ...prev,
      other: prev.other + 8
    }));
  };

  const renderRoomCard = (room) => (
    <div key={room.id} className="room-card">
      <div className="room-image">
        <img 
          src={room.images && room.images.length > 0 ? room.images[0] : 'https://via.placeholder.com/300x200?text=No+Image'} 
          alt={room.roomType}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300x200?text=Image+Error';
          }}
        />
      </div>
      <div className="room-info">
        <h3>{room.roomType} - Room {room.roomNumber}</h3>
        <p className="room-price">${room.pricePerNight} per night</p>
        <p className="room-occupancy">Max occupancy: {room.maxOccupancy}</p>
        <div className="room-amenities">
          {room.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="amenity-tag">{amenity}</span>
          ))}
          {room.amenities.length > 3 && <span className="amenity-tag">+{room.amenities.length - 3} more</span>}
        </div>
        <Link to={`/rooms/${room.id}`} className="view-details-btn">View Details</Link>
      </div>
    </div>
  );

  return (
    <div className="room-list-container">
      <h1>Available Rooms</h1>
      <RoomFilter onFilter={handleFilter} />
      
      {filteredRooms.length > 0 ? (
        <>
          {singleRooms.length > 0 && (
            <div className="room-section">
              <h2>Single Rooms</h2>
              <div className="room-grid">
                {singleRooms.slice(0, visibleCounts.single).map(room => renderRoomCard(room))}
              </div>
              {singleRooms.length > visibleCounts.single && (
                <div className="view-more-container">
                  <button className="view-more-btn" onClick={loadMoreSingle}>
                    View More Single Rooms
                  </button>
                </div>
              )}
            </div>
          )}
          
          {doubleRooms.length > 0 && (
            <div className="room-section">
              <h2>Double Rooms</h2>
              <div className="room-grid">
                {doubleRooms.slice(0, visibleCounts.double).map(room => renderRoomCard(room))}
              </div>
              {doubleRooms.length > visibleCounts.double && (
                <div className="view-more-container">
                  <button className="view-more-btn" onClick={loadMoreDouble}>
                    View More Double Rooms
                  </button>
                </div>
              )}
            </div>
          )}
          
          {executiveSuites.length > 0 && (
            <div className="room-section">
              <h2>Executive Suites</h2>
              <div className="room-grid">
                {executiveSuites.slice(0, visibleCounts.executive).map(room => renderRoomCard(room))}
              </div>
              {executiveSuites.length > visibleCounts.executive && (
                <div className="view-more-container">
                  <button className="view-more-btn" onClick={loadMoreExecutive}>
                    View More Executive Suites
                  </button>
                </div>
              )}
            </div>
          )}
          
          {uncategorizedRooms.length > 0 && (
            <div className="room-section">
              <h2>Other Rooms</h2>
              <div className="room-grid">
                {uncategorizedRooms.slice(0, visibleCounts.other).map(room => renderRoomCard(room))}
              </div>
              {uncategorizedRooms.length > visibleCounts.other && (
                <div className="view-more-container">
                  <button className="view-more-btn" onClick={loadMoreOther}>
                    View More Rooms
                  </button>
                </div>
              )}
            </div>
          )}
          
          {/* If no categorized rooms are found, show all rooms */}
          {singleRooms.length === 0 && doubleRooms.length === 0 && executiveSuites.length === 0 && uncategorizedRooms.length === 0 && (
            <div className="room-section">
              <h2>All Rooms</h2>
              <div className="room-grid">
                {filteredRooms.slice(0, visibleCounts.single).map(room => renderRoomCard(room))}
              </div>
              {filteredRooms.length > visibleCounts.single && (
                <div className="view-more-container">
                  <button className="view-more-btn" onClick={loadMoreSingle}>
                    View More Rooms
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="no-rooms">No rooms match your criteria. Try adjusting your filters.</div>
      )}
    </div>
  );
}

export default RoomList;