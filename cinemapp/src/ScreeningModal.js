import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from './UserContext';


const ScreeningModal = ({ movieId, screenings, onClose}) => {
  const modalClassName = screenings.length >= 0 ? 'screening-modal visible' : 'screening-modal';
  const user = useUserContext();
  const [modalHeader, setModalHeader] = useState('');
  const [success, setSuccess] = useState(false);

 
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


  const handleBookTickets = (screening) => {
    if (!user) {
      console.error('User ID not available');
      return;
    }

    if (!screening || !screening.id) {
      console.error('Invalid screening object or screening_id is not defined');
      return;
    }

    const userId = user.user.id;
    const screeningId = screening.id;

    // Send a request to book tickets
    axios.post('http://localhost:8080/bookings', { "user": { "id": userId }, "screening": { "id": screeningId } })
      .then(response => {
        // Handle the response as needed
        console.log(response.data);
        setSuccess(true);
      })
      .catch(error => {
        console.error('Error booking tickets:', error);
        // Handle errors appropriately
      });
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
        {success && (
          <p>Tickets booked successfully!</p>
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
