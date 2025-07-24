import React, { useState } from 'react';
import '../../styles/RoomFilter.css';

function RoomFilter({ onFilter }) {
  const [filters, setFilters] = useState({
    roomType: '',
    minPrice: '',
    maxPrice: '',
    occupancy: '',
    amenities: []
  });

  const amenitiesList = [
    'Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Balcony', 'Jacuzzi'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      amenities: checked 
        ? [...prev.amenities, value]
        : prev.amenities.filter(amenity => amenity !== value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({
      roomType: '',
      minPrice: '',
      maxPrice: '',
      occupancy: '',
      amenities: []
    });
    onFilter({});
  };

  return (
    <div className="room-filter">
      <h2>Filter Rooms</h2>
      <form onSubmit={handleSubmit}>
        <div className="filter-group">
          <label htmlFor="roomType">Room Type</label>
          <select 
            id="roomType" 
            name="roomType" 
            value={filters.roomType} 
            onChange={handleChange}
          >
            <option value="">All Types</option>
            <option value="Single">Single Room</option>
            <option value="Double">Double Room</option>
            <option value="Executive Suite">Executive Suite</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="minPrice">Min Price ($)</label>
          <input 
            type="number" 
            id="minPrice" 
            name="minPrice" 
            value={filters.minPrice} 
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="maxPrice">Max Price ($)</label>
          <input 
            type="number" 
            id="maxPrice" 
            name="maxPrice" 
            value={filters.maxPrice} 
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="occupancy">Occupancy</label>
          <select 
            id="occupancy" 
            name="occupancy" 
            value={filters.occupancy} 
            onChange={handleChange}
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>

        <div className="filter-group amenities-group">
          <label>Amenities</label>
          <div className="amenities-checkboxes">
            {amenitiesList.map(amenity => (
              <div key={amenity} className="amenity-checkbox">
                <input 
                  type="checkbox" 
                  id={`amenity-${amenity}`} 
                  value={amenity}
                  checked={filters.amenities.includes(amenity)}
                  onChange={handleAmenityChange}
                />
                <label htmlFor={`amenity-${amenity}`}>{amenity}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="filter-actions">
          <button type="submit" className="filter-btn">Apply Filters</button>
          <button type="button" className="reset-btn" onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
}

export default RoomFilter;