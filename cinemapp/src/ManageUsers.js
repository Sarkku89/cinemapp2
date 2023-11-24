import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const user = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.user || !user.user.admin) {
      navigate('/access-denied');
    } else {
      // Fetch the list of users from the backend when the component mounts
      fetchUsers();
    }
  }, [navigate, user]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/users');
      const data = await response.json();
  
      // Assuming user.user contains the information of the currently logged-in user
      const currentUser = user.user;
  
      // Filter out the current user from the list
      const filteredUsers = data.filter((u) => u.id !== currentUser.id);
  
      setUsers(filteredUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  const handleDelete = async (userId) => {
    try {
      // Send a request to delete the user
      await fetch(`http://localhost:8080/users/${userId}`, {
        method: 'DELETE',
      });

      // Update the list of users after deletion
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleAdminToggle = async (userId, currentAdminStatus) => {
    try {
      // Send a request to update the user's admin status
      await fetch(`http://localhost:8080/users/${userId}/admin`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          admin: !currentAdminStatus,
        }),
      });

      // Update the list of users after admin status change
      fetchUsers();
    } catch (error) {
      console.error('Error updating admin status:', error);
    }
  };

  return (
    <div className='gallery-container'>
      <h2 id='h2-profile'>Manage Users</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <label>
                  <input
                    type="checkbox"
                    checked={user.admin}
                    onChange={() => handleAdminToggle(user.id, user.admin)}
                  />
                </label>
              </td>
              <td>
                <button id="delete-btn" onClick={() => handleDelete(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
