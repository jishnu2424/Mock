import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/UserDash.css'; // Ensure this path is correct

const UserDash = () => {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '' });
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/event/view', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEvents(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        getEvents();
    }, [token]);

    const handleCreate = async () => {
        try {
            const response = await axios.post('http://localhost:8080/event/create', newEvent, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEvents([...events, response.data]);
            setNewEvent({ title: '', description: '', date: '' });
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (eventId) => {
        try {
            await axios.delete(`http://localhost:8080/event/delete/${eventId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEvents(events.filter(event => event._id !== eventId));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="user-dashboard-container">
            <h2>Your Events</h2>
            <div>
                <h3>Create Event</h3>
                <input
                    type="text"
                    placeholder="Title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                /> <br /> <br />
                <input
                    type="text"
                    placeholder="Description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                /> <br /> <br />
                <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                /> <br /><br />
                <button onClick={handleCreate} className="btn btn-primary">Create</button>
            </div>

            <br /><br />
            <div style={{margin :"2px solid black"}}>
            <ul>
                {events.map(event => (
                    <li key={event._id}>
                        <h4>{event.title}</h4>
                        <p>{event.description}</p>
                        <p>{new Date(event.date).toLocaleDateString()}</p>
                        <button onClick={() => handleDelete(event._id)} className="btn btn-danger">Delete</button>
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
};

export default UserDash;
