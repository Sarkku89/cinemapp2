// Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from './UserContext';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useUserContext();
  const [userTickets, setUserTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/please-login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUserTickets = async () => {
      try {
        if (user && user.id) {
          const response = await axios.get(`http://localhost:8080/bookings/by-user/${user.id}`);
          console.log('User Tickets from API:', response.data);
          setUserTickets(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user tickets:', error);
        setLoading(false);
      }
    };

    fetchUserTickets();
  }, [user]);

  const handleCancel = async (ticketId) => {
    try {
      await axios.delete(`http://localhost:8080/bookings/${ticketId}`);
      setUserTickets((prevTickets) => prevTickets.filter((ticket) => ticket.id !== ticketId));
      console.log('Ticket canceled successfully!');
    } catch (error) {
      console.error('Error canceling ticket:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !user.id) {
    // Redirect to another page or display an error message
    return <div>User not found</div>;
  }

  return (
    <div>
      <h2 id="h2-profile">Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>
      <br />
      <Link to="/updateuser"> {/* Wrap the button with Link */}
        <button className='edit-profile'>Edit profile</button>
      </Link>
      <br />
      <br />
      <br />
      <h2 id="h2-profile">Your tickets</h2>
      <table className='tickets-table'>
        <thead>
          <tr>
            <th>Movie</th>
            <th>Date</th>
            <th>Auditorium</th>
            <th>Cancel</th>
          </tr>
        </thead>
        <tbody>
          {userTickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.screening.movie.title}</td>
              <td>{ticket.screening.date}</td>
              <td>{ticket.screening.auditorium.name}</td>
              <td>
                <button className='cancel-ticket' onClick={() => handleCancel(ticket.id)}>
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
