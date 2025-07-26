const API_BASE = "https://reservelt-endpoints.onrender.com";

export const getRooms = async () => {
  const response = await fetch(`${API_BASE}/rooms`);
  return await response.json();
};

export const getRoomById = async (id) => {
  const response = await fetch(`${API_BASE}/rooms/${id}`);
  return await response.json();
};

export const getServices = async () => {
  const response = await fetch(`${API_BASE}/services`);
  return await response.json();
};

export const createBooking = async (bookingData) => {
  const response = await fetch(`${API_BASE}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  });
  return await response.json();
};

export const getReviews = async () => {
  const response = await fetch(`${API_BASE}/reviews`);
  return await response.json();
};

export const addReview = async (reviewData) => {
  const response = await fetch(`${API_BASE}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reviewData),
  });
  return await response.json();
};