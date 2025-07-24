const fs = require('fs');

// Image URLs for different room types
const singleRoomImages = [
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
];

const doubleRoomImages = [
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
];

const executiveSuiteImages = [
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjBiYXRocm9vbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWwlMjB2aWV3fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
];

const bathroomImages = [
  "https://images.unsplash.com/photo-1552858725-2758b5fb1286?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG90ZWwlMjBiYXRocm9vbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjBiYXRocm9vbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
];

// Function to get random image from array
const getRandomImage = (imageArray) => {
  return imageArray[Math.floor(Math.random() * imageArray.length)];
};

// Generate rooms
const generateRooms = () => {
  const rooms = [];
  let id = 1;
  
  // Generate 40 single rooms
  for (let i = 1; i <= 40; i++) {
    const roomNumber = i < 10 ? `10${i}` : `1${i}`;
    rooms.push({
      id: id++,
      roomNumber,
      roomType: "Single",
      pricePerNight: 100 + Math.floor(Math.random() * 30), // Price between 100-130
      maxOccupancy: 1,
      amenities: ["Wi-Fi", "TV", "Air Conditioning", "Mini Fridge"],
      isAvailable: Math.random() > 0.2, // 80% chance of being available
      images: [
        getRandomImage(singleRoomImages),
        getRandomImage(bathroomImages)
      ],
      description: "Cozy single room with a comfortable bed and modern amenities."
    });
  }
  
  // Generate 30 double rooms
  for (let i = 1; i <= 30; i++) {
    const roomNumber = i < 10 ? `20${i}` : `2${i}`;
    rooms.push({
      id: id++,
      roomNumber,
      roomType: "Double",
      pricePerNight: 150 + Math.floor(Math.random() * 50), // Price between 150-200
      maxOccupancy: 2,
      amenities: ["Wi-Fi", "TV", "Air Conditioning", "Mini Bar", "Coffee Maker"],
      isAvailable: Math.random() > 0.3, // 70% chance of being available
      images: [
        getRandomImage(doubleRoomImages),
        getRandomImage(bathroomImages)
      ],
      description: "Spacious double room with two beds and a beautiful view."
    });
  }
  
  // Generate 30 executive suites
  for (let i = 1; i <= 30; i++) {
    const roomNumber = i < 10 ? `30${i}` : `3${i}`;
    rooms.push({
      id: id++,
      roomNumber,
      roomType: "Executive Suite",
      pricePerNight: 250 + Math.floor(Math.random() * 100), // Price between 250-350
      maxOccupancy: 4,
      amenities: ["Wi-Fi", "TV", "Air Conditioning", "Mini Bar", "Coffee Maker", "Balcony", "Jacuzzi", "Work Desk"],
      isAvailable: Math.random() > 0.4, // 60% chance of being available
      images: [
        getRandomImage(executiveSuiteImages),
        getRandomImage(bathroomImages)
      ],
      description: "Luxurious suite with separate living area and premium amenities."
    });
  }
  
  return rooms;
};

// Generate booked dates for some rooms
const generateBookedDates = (rooms) => {
  const today = new Date();
  
  return rooms.map(room => {
    // Only add booked dates to some rooms
    if (Math.random() > 0.7) {
      return room;
    }
    
    const bookedDates = [];
    const numBookings = Math.floor(Math.random() * 3) + 1; // 1-3 bookings
    
    for (let i = 0; i < numBookings; i++) {
      const startDay = Math.floor(Math.random() * 60); // Random day in next 60 days
      const duration = Math.floor(Math.random() * 5) + 1; // 1-5 days stay
      
      const startDate = new Date(today);
      startDate.setDate(today.getDate() + startDay);
      
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + duration);
      
      bookedDates.push({
        start: startDate.toISOString().split('T')[0],
        end: endDate.toISOString().split('T')[0]
      });
    }
    
    return {
      ...room,
      bookedDates
    };
  });
};

// Generate the database
const db = {
  rooms: generateBookedDates(generateRooms())
};

// Write to db.json
fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
console.log('Generated db.json with 100 rooms');