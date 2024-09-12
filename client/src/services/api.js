const API_URL = 'http://localhost:8080'; // Replace with your backend URL

// Fetch all users (for admin dashboard)
export const fetchAllUsers = async (token) => {
  const response = await fetch(`${API_URL}/view`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
  return response.json();
};

// Delete user
export const deleteUser = async (userId, token) => {
  const response = await fetch(`${API_URL}/delete/${userId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
  return response.json();
};

// Event management API calls
export const fetchEvents = async (token) => {
  const response = await fetch(`${API_URL}/events`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
  return response.json();
};

export const createEvent = async (eventData, token) => {
  const response = await fetch(`${API_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(eventData),
  });
  return response.json();
};

export const updateEvent = async (eventId, eventData, token) => {
  const response = await fetch(`${API_URL}/events/${eventId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(eventData),
  });
  return response.json();
};

export const deleteEvent = async (eventId, token) => {
  const response = await fetch(`${API_URL}/events/${eventId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
  return response.json();
};
