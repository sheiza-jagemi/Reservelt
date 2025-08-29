const db = require('../database/db');
const bcrypt = require('bcryptjs');

const seedData = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    await db.run(
      'INSERT OR IGNORE INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      ['Admin User', 'admin@reservelt.com', hashedPassword, 'admin']
    );

    // Seed rooms data
    const rooms = [
      // Single rooms
      ...Array.from({ length: 40 }, (_, i) => ({
        roomNumber: `S${String(i + 1).padStart(3, '0')}`,
        roomType: 'Single',
        pricePerNight: 116,
        maxOccupancy: 1,
        amenities: JSON.stringify(['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Fridge']),
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
          'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjBiYXRocm9vbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
        ]),
        description: 'Cozy single room with a comfortable bed and modern amenities.'
      })),
      // Double rooms
      ...Array.from({ length: 30 }, (_, i) => ({
        roomNumber: `D${String(i + 1).padStart(3, '0')}`,
        roomType: 'Double',
        pricePerNight: 180,
        maxOccupancy: 2,
        amenities: JSON.stringify(['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Fridge', 'Coffee Maker']),
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
          'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjBiYXRocm9vbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
        ]),
        description: 'Spacious double room perfect for couples with modern amenities.'
      })),
      // Executive suites
      ...Array.from({ length: 30 }, (_, i) => ({
        roomNumber: `E${String(i + 1).padStart(3, '0')}`,
        roomType: 'Executive Suite',
        pricePerNight: 350,
        maxOccupancy: 4,
        amenities: JSON.stringify(['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Jacuzzi', 'Room Service', 'Balcony']),
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWwlMjBzdWl0ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
          'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjBiYXRocm9vbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
        ]),
        description: 'Luxurious executive suite with premium amenities and stunning views.'
      }))
    ];

    for (const room of rooms) {
      await db.run(
        `INSERT OR IGNORE INTO rooms (room_number, room_type, price_per_night, max_occupancy, amenities, images, description)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [room.roomNumber, room.roomType, room.pricePerNight, room.maxOccupancy, room.amenities, room.images, room.description]
      );
    }

    // Seed services
    const services = [
      { name: 'Fine Dining', category: 'Meals', price: 45, description: 'Gourmet meals prepared by our executive chef with international cuisine options.' },
      { name: 'Spa & Massage', category: 'Wellness', price: 80, description: 'Professional massage therapy and spa treatments for ultimate relaxation.' },
      { name: 'Tennis & Racquet Sports', category: 'Recreation', price: 25, description: 'Professional tennis courts and racquet sports facilities with equipment rental.' },
      { name: 'Swimming Pool', category: 'Recreation', price: 0, description: 'Olympic-size swimming pool with poolside service and relaxation areas.' },
      { name: 'Continental Breakfast', category: 'Meals', price: 25, description: 'Fresh continental breakfast with local and international options.' }
    ];

    for (const service of services) {
      await db.run(
        `INSERT OR IGNORE INTO services (name, category, price, description)
         VALUES (?, ?, ?, ?)`,
        [service.name, service.category, service.price, service.description]
      );
    }

    // Seed sample feedback
    const feedback = [
      {
        userName: 'Sheiza Jagemi',
        email: 'sheiza@example.com',
        rating: 5,
        comment: 'Excellent service and comfortable stay! The amenities were perfect and the host was extremely accommodating.',
        roomId: 1,
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      {
        userName: 'Cyril Katua',
        email: 'cyril@example.com',
        rating: 4,
        comment: 'Great location and friendly staff. The room was clean and cozy with a beautiful view of the city skyline.',
        roomId: 41,
        avatar: 'https://i.pravatar.cc/150?img=2'
      },
      {
        userName: 'Michael Johnson',
        email: 'michael@example.com',
        rating: 5,
        comment: 'Outstanding experience! The room was spotless and the service exceeded expectations.',
        roomId: 71,
        avatar: 'https://i.pravatar.cc/150?img=3'
      }
    ];

    for (const fb of feedback) {
      await db.run(
        `INSERT OR IGNORE INTO feedback (user_name, email, rating, comment, room_id, avatar)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [fb.userName, fb.email, fb.rating, fb.comment, fb.roomId, fb.avatar]
      );
    }

    console.log('✅ Database seeding completed successfully!');
    console.log('📊 Admin credentials: admin@reservelt.com / admin123');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
};

// Run seeding if called directly
if (require.main === module) {
  seedData().then(() => process.exit(0));
}

module.exports = seedData;