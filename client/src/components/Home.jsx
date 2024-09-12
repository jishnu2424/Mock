import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Home.css'; // Adjust path as needed

const Home = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/event/view'); // Replace with your backend URL
        setEvents(response.data);
      } catch (err) {
        setError('Failed to fetch events');
        console.error('Error fetching events:', err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="events-container">
      <h2>Events</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {events.map(event => (
          <li key={event._id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>{new Date(event.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
