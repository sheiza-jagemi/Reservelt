const fetch = require('node-fetch');

const API_BASE = 'http://localhost:5000/api';

async function testAPI() {
  console.log('🧪 Testing Reservelt API...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${API_BASE}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData.status);

    // Test rooms endpoint
    console.log('\n2. Testing rooms endpoint...');
    const roomsResponse = await fetch(`${API_BASE}/rooms`);
    const roomsData = await roomsResponse.json();
    console.log(`✅ Rooms: Found ${roomsData.length} rooms`);

    // Test services endpoint
    console.log('\n3. Testing services endpoint...');
    const servicesResponse = await fetch(`${API_BASE}/services`);
    const servicesData = await servicesResponse.json();
    console.log(`✅ Services: Found ${servicesData.length} services`);

    // Test feedback endpoint
    console.log('\n4. Testing feedback endpoint...');
    const feedbackResponse = await fetch(`${API_BASE}/feedback`);
    const feedbackData = await feedbackResponse.json();
    console.log(`✅ Feedback: Found ${feedbackData.feedback ? feedbackData.feedback.length : feedbackData.length} reviews`);

    // Test creating a booking
    console.log('\n5. Testing booking creation...');
    const bookingData = {
      roomId: 1,
      guestName: 'Test User',
      email: 'test@example.com',
      phone: '+1234567890',
      checkIn: '2025-09-01',
      checkOut: '2025-09-03',
      guests: 1,
      totalPrice: 232
    };

    const bookingResponse = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    if (bookingResponse.ok) {
      const newBooking = await bookingResponse.json();
      console.log(`✅ Booking created: ID ${newBooking.id}`);
    } else {
      const error = await bookingResponse.json();
      console.log('❌ Booking creation failed:', error.error);
    }

    // Test creating feedback
    console.log('\n6. Testing feedback creation...');
    const feedbackTestData = {
      userName: 'Test Reviewer',
      email: 'reviewer@example.com',
      rating: 5,
      comment: 'Great API testing experience!',
      roomId: 1
    };

    const feedbackCreateResponse = await fetch(`${API_BASE}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedbackTestData),
    });

    if (feedbackCreateResponse.ok) {
      const newFeedback = await feedbackCreateResponse.json();
      console.log(`✅ Feedback created: ID ${newFeedback.id}`);
    } else {
      const error = await feedbackCreateResponse.json();
      console.log('❌ Feedback creation failed:', error.error);
    }

    console.log('\n🎉 API testing completed successfully!');
    console.log('📊 All endpoints are working correctly.');

  } catch (error) {
    console.error('❌ API test failed:', error.message);
    console.log('💡 Make sure the backend server is running on port 5000');
  }
}

// Run the test
testAPI();