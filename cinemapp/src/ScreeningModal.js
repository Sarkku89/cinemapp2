import React from 'react';
import { useUserContext } from './UserContext';

const ScreeningModal = ({ screenings, selectedScreening, onClose, onBookTickets }) => {
    const modalClassName = screenings.length > 0 ? 'screening-modal visible' : 'screening-modal';
    const user = useUserContext();
    console.log('User from UserContextSM:', user);

  
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
                          <th>Auditorium</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {screenings.map(screening => (
                          <tr key={screening.screening_id}>
                            <td>{screening.date}</td>
                            <td>{screening.auditorium}</td>
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
