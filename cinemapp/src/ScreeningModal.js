import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from './UserContext';


const ScreeningModal = ({ movieId, screenings, selectedScreening, onClose, onBookTickets}) => {
  const modalClassName = screenings.length >= 0 ? 'screening-modal visible' : 'screening-modal';
  const user = useUserContext();
  const [modalHeader, setModalHeader] = useState('');
 
  useEffect(() => {
    // Fetch movie details and update modal header
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/movies/${movieId}`);
        const movieName = response.data.title;
        setModalHeader(`Screenings for ${movieName}`);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleBookTickets = () => {
    if (!user || !selectedScreening) {
      console.error('User ID or screening not available');
      return;
    }

    // Pass the entire screening object to onBookTickets
    onBookTickets(selectedScreening);
    
  };

  return (

    <div className={modalClassName}>
      <div className="modal-content">
        <h2>{modalHeader}</h2>

        {!user.user && (
          <p id="warning">Log in to book tickets.</p>
        )}

        {screenings.length > 0 ? (
          <div className="screening-details">
            <table className='modal-table'>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Auditorium</th>
                  <th>Seats</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {screenings.map(screening => (
                  <tr key={screening.id}>
                    <td>{screening.date}</td>
                    <td>{screening.auditorium.name}</td>
                    <td>{screening.auditorium.size}</td>

                    {user.user && (
                      <td>
                        <button onClick={() => handleBookTickets(screening)}>
                          Book Tickets
                        </button>
                      </td>
                    )}

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p id="no-screenings">No screenings at the moment!</p>
        )}

        {/* Close button */}
        <div className="button-container">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};


export default ScreeningModal;
