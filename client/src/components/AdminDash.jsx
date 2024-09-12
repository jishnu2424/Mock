import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/AdminDash.css'; 

const AdminDash = () => {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/admin/view', {
                    headers: { Authorization: `Bearer ${token}` } 
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        getUsers();
    }, [token]);

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:8080/admin/delete/${userId}`, { 
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.filter(user => user._id !== userId));
            console.log(`Deleted user with ID: ${userId}`);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="admin-dashboard-container">
            <h2>Admin Dashboard</h2>
            <h3>User Management</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => handleDelete(user._id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDash;
