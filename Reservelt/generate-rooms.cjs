const fs = require('fs');

const generateRooms = () => {
  const rooms = [];
  const images = [
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjBiYXRocm9vbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWwlMjBzdWl0ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
  ];

  let id = 1;

  // Generate 40 Single rooms
  for (let i = 1; i <= 40; i++) {
    rooms.push({
      id: id++,
      roomNumber: `S${i.toString().padStart(3, '0')}`,
      roomType: "Single",
      pricePerNight: 116,
      maxOccupancy: 1,
      amenities: ["Wi-Fi", "TV", "Air Conditioning", "Mini Fridge"],
      isAvailable: true,
      images: [images[0], images[1]],
      description: "Cozy single room with a comfortable bed and modern amenities.",
      bookedDates: []
    });
  }

  // Generate 30 Double rooms
  for (let i = 1; i <= 30; i++) {
    rooms.push({
      id: id++,
      roomNumber: `D${i.toString().padStart(3, '0')}`,
      roomType: "Double",
      pricePerNight: 180,
      maxOccupancy: 2,
      amenities: ["Wi-Fi", "TV", "Air Conditioning", "Mini Fridge", "Coffee Maker"],
      isAvailable: true,
      images: [images[2], images[1]],
      description: "Spacious double room perfect for couples with modern amenities.",
      bookedDates: []
    });
  }

  // Generate 30 Executive Suites
  for (let i = 1; i <= 30; i++) {
    rooms.push({
      id: id++,
      roomNumber: `E${i.toString().padStart(3, '0')}`,
      roomType: "Executive Suite",
      pricePerNight: 350,
      maxOccupancy: 4,
      amenities: ["Wi-Fi", "TV", "Air Conditioning", "Mini Bar", "Jacuzzi", "Room Service", "Balcony"],
      isAvailable: true,
      images: [images[3], images[1]],
      description: "Luxurious executive suite with premium amenities and stunning views.",
      bookedDates: []
    });
  }

  return rooms;
};

const db = {
  rooms: generateRooms(),
  bookings: [
    {
      id: 1,
      roomId: 1,
      guestName: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      checkIn: "2025-08-01",
      checkOut: "2025-08-05",
      guests: 1,
      totalPrice: 464,
      status: "confirmed",
      bookingDate: "2025-07-24T10:30:00Z"
    },
    {
      id: 2,
      roomId: 41,
      guestName: "Jane Smith",
      email: "jane@example.com",
      phone: "+1234567891",
      checkIn: "2025-08-10",
      checkOut: "2025-08-12",
      guests: 2,
      totalPrice: 360,
      status: "pending",
      bookingDate: "2025-07-24T11:15:00Z"
    },
    {
      id: 3,
      roomId: 71,
      guestName: "Michael Johnson",
      email: "michael@example.com",
      phone: "+1234567892",
      checkIn: "2025-08-15",
      checkOut: "2025-08-18",
      guests: 2,
      totalPrice: 1050,
      status: "confirmed",
      bookingDate: "2025-07-24T12:00:00Z"
    }
  ],
  feedback: [
    {
      id: 1,
      userName: "Sheiza jagemi",
      email: "sheiza@example.com",
      rating: 5,
      comment: "Excellent service and comfortable stay! The amenities were perfect and the host was extremely accommodating.",
      date: "2025-07-22T14:30:00Z",
      roomId: 1,
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      id: 2,
      userName: "Cyril Katua",
      email: "cyril@example.com",
      rating: 4,
      comment: "Great location and friendly staff. The room was clean and cozy with a beautiful view of the city skyline.",
      date: "2025-07-21T16:45:00Z",
      roomId: 41,
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    {
      id: 3,
      userName: "Michael Johnson",
      email: "michael@example.com",
      rating: 5,
      comment: "Outstanding experience! The room was spotless and the service exceeded expectations.",
      date: "2025-07-20T09:20:00Z",
      roomId: 71,
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    {
      id: 4,
      userName: "Sarah Wilson",
      email: "sarah@example.com",
      rating: 4,
      comment: "Very comfortable stay with excellent amenities. The executive suite was luxurious and well-maintained.",
      date: "2025-07-19T11:20:00Z",
      roomId: 72,
      avatar: "https://i.pravatar.cc/150?img=4"
    }
  ]
};

fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
console.log('Generated 100 rooms: 40 Single, 30 Double, 30 Executive Suites');