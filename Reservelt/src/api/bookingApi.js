const API_BASE_URL = 'http://localhost:3001';

export const bookingApi = {
  // Get all bookings
  getAllBookings: async () => {
    const response = await fetch(`${API_BASE_URL}/bookings`);
    if (!response.ok) throw new Error('Failed to fetch bookings');
    return response.json();
  },

  // Get booking by ID
  getBookingById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`);
    if (!response.ok) throw new Error('Failed to fetch booking');
    return response.json();
  },

  // Create new booking
  createBooking: async (bookingData) => {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...bookingData,
        id: Date.now(),
        bookingDate: new Date().toISOString(),
        status: 'pending'
      }),
    });
    if (!response.ok) throw new Error('Failed to create booking');
    return response.json();
  },

  // Update booking
  updateBooking: async (id, bookingData) => {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    if (!response.ok) throw new Error('Failed to update booking');
    return response.json();
  },

  // Delete booking
  deleteBooking: async (id) => {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete booking');
    return response.json();
  }
};

export const feedbackApi = {
  // Get all feedback
  getAllFeedback: async () => {
    const response = await fetch(`${API_BASE_URL}/feedback`);
    if (!response.ok) throw new Error('Failed to fetch feedback');
    return response.json();
  },

  // Create new feedback
  createFeedback: async (feedbackData) => {
    const response = await fetch(`${API_BASE_URL}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...feedbackData,
        id: Date.now(),
        date: new Date().toISOString(),
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 10) + 1}`
      }),
    });
    if (!response.ok) throw new Error('Failed to create feedback');
    return response.json();
  }
};