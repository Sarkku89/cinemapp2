import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditScreeningsForm = () => {
    const { movieId } = useParams();
    const [screenings, setScreenings] = useState([]);
    const [auditoriums, setAuditoriums] = useState({});
    const navigate = useNavigate();
    const [selectedAuditoriumId, setSelectedAuditoriumId] = useState('');

    useEffect(() => {
        // Fetch the list of screenings for the selected movie when the component mounts
        fetchScreenings();
    }, [movieId]);

    useEffect(() => {
        // Fetch auditorium details when screenings are loaded
        fetchAuditoriumsDetails();
    }, [screenings]);

    const fetchScreenings = async () => {
        try {
            const response = await fetch(`http://localhost:8080/screenings/by-movie/${movieId}`);
            const data = await response.json();
            setScreenings(data);
        } catch (error) {
            console.error('Error fetching screenings:', error);
        }
    };

    const fetchAuditoriumsDetails = async () => {
        try {
            // Extract auditorium ids from screenings
            const auditoriumIds = screenings.map((screening) => screening.auditorium.id);

            // Fetch auditorium details based on auditorium ids
            const response = await fetch(`http://localhost:8080/auditoriums/details`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ auditoriumIds }),
            });
            const data = await response.json();
            setAuditoriums(data);
        } catch (error) {
            console.error('Error fetching auditorium details:', error);
        }
    };

    const handleEditScreening = (screeningId) => {
        // Navigate to the EditScreening component with the selected screening ID
        navigate(`/manage-screenings/edit/${movieId}/screening/${screeningId}`);
    };

    const handleDeleteScreening = async (screeningId) => {
        try {
            // Send a request to delete the screening
            await fetch(`http://localhost:8080/screenings/${screeningId}`, {
                method: 'DELETE',
            });

            // Update the list of screenings after deletion
            fetchScreenings();
        } catch (error) {
            console.error('Error deleting screening:', error);
        }
    };

    return (
        <div>
            <h2 id="h2-profile">Edit Screenings</h2>
            {/* Display the table of screenings */}
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Auditorium</th> {/* Add Auditorium column header */}
                        {/* Add more columns as needed */}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {screenings.map((screening) => (
                        <tr key={screening.id}>
                            <td>{screening.date}</td>
                            <td><label htmlFor="auditorium">Auditorium:</label>
                                <select
                                    id="auditorium"
                                    name="auditorium"
                                    value={selectedAuditoriumId}
                                    onChange={(e) => setSelectedAuditoriumId(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Select an auditorium
                                    </option>
                                    {Object.values(auditoriums).map((auditorium) => (
                                        <option key={auditorium.id} value={auditorium.id}>
                                            {auditorium.name}
                                        </option>
                                    ))}
                                </select></td> {/* Display auditorium name */}
                            {/* Add more cells for other columns */}
                            <td>
                                <button onClick={() => handleEditScreening(screening.id)}>Edit</button>
                                <button onClick={() => handleDeleteScreening(screening.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EditScreeningsForm;
