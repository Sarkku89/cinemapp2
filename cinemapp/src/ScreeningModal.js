import React from 'react';
import { useUserContext } from './UserContext';

const ScreeningModal = ({ screenings, selectedScreening, onClose, onBookTickets }) => {
    const modalClassName = screenings.length > 0 ? 'screening-modal visible' : 'screening-modal';
    const user = useUserContext();
  
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
          <h2>Screenings</h2>

        {screenings.length > 0 ? (
          <div className="screening-details">
            <table className='modal-table'>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Auditorium name</th>
                  <th>Auditorium size</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {screenings.map(screening => (
                  <tr key={screening.id}>
                    <td>{screening.date}</td>
                    <td>{screening.auditorium.name}</td>
                    <td>{screening.auditorium.size}</td>
                    <td>
                      <button onClick={() => onBookTickets(screening)}>
                        Book Tickets
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No screenings available</p>
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
