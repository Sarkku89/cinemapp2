import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditScreeningForm from './EditScreeningForm';
import { useUserContext } from './UserContext';

const EditScreenings = () => {
    const { movieId } = useParams();
    const [screenings, setScreenings] = useState([]);
    const [movie, setMovie] = useState({});
    //const navigate = useNavigate();
    const [auditoriums, setAuditoriums] = useState({});
    const [selectedScreening, setSelectedScreening] = useState(null);
    const [auditorium, setAuditorium] = useState();
    const [titleId, setTitleId] = useState();
    const [success, setSuccess] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const user = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.user || !user.user.admin) {
          navigate('/access-denied');
        } 
      }, [navigate, user]);

    useEffect(() => {
        // Fetch the list of screenings for the selected movie when the component mounts
        fetchScreenings();
        // Fetch movie details
        fetchMovieDetails();
        // Fetch movie details
        fetchAuditoriums();
    }, [movieId]);

    const fetchScreenings = async () => {
        try {
            const screenings_response = await axios.get(`http://localhost:8080/screenings/by-movie/${movieId}`);
            const data = screenings_response.data;

            setScreenings(data);
        } catch (error) {
            console.error('Error fetching screenings:', error);
        }
    };

    const fetchAuditoriums = async () => {
        try {
            const auditorium_response = await axios.get(`http://localhost:8080/auditoriums`);
            const data = auditorium_response.data;
            setAuditoriums(data);
        } catch (error) {
            console.error('Error fetching auditorium details:', error);
        }
    };

    const fetchMovieDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/movies/${movieId}`);
            const data = response.data;
            setMovie(data);
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };
    const handleDeleteScreening = async (screeningId) => {
        // If delete confirmation is active, perform deletion
        if (deleteConfirmation) {
            try {
                // Send a request to delete the screening
                await axios.delete(`http://localhost:8080/screenings/${screeningId}`);

                // Update the list of screenings after deletion
                fetchScreenings();
                setDeleteConfirmation(false); // Reset delete confirmation state
            } catch (error) {
                console.error('Error deleting screening:', error);
            }
        } else {
            // If delete confirmation is not active, toggle the confirmation
            setDeleteConfirmation(true);
        }
    };


    const handleEditScreening = (screeningId, auditoriumId) => {
        // Set the selected screening when editing
        const selected = screenings.find((screening) => screening.id === screeningId);
        console.log('Selected screening:', selected);
        setSelectedScreening(selected);
        setAuditorium(auditoriumId);
        setTitleId(screeningId);
    };

    const handleSaveScreening = async (updatedData) => {
        console.log('Received data in handleSaveScreening:', updatedData);

        try {
            // Ensure that updatedData has the necessary properties, including 'id'
            if (!updatedData || !updatedData.id) {
                console.error('Invalid screening ID:', updatedData && updatedData.id);
                return;
            }
            console.log()
            // Send a request to update the screening
            await axios.put(`http://localhost:8080/screenings/${updatedData.id}`, {
                date: updatedData.date,
                auditorium: updatedData.auditorium,
                movie: updatedData.movie
            });

            fetchScreenings();
            setSuccess(true);
        } catch (error) {
            console.error('Error updating screening:', error);
        }
    };
    return (
        <div>
            <h2 id="h2-profile">Edit Screenings for {movie.title}</h2>
            {/* Display the table of screenings */}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Auditorium</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {screenings.map((screening) => (
                        <tr key={screening.id}>
                            <td>{screening.id}</td>
                            <td>{screening.date}</td>
                            <td key={screening.auditorium.id}>{auditoriums[screening.auditorium.id - 1]?.name}</td>
                            <td>
                                <button onClick={() => handleEditScreening(screening.id, screening.auditorium.id)}>Edit</button>
                                {deleteConfirmation ? (
                                    <>
                                        <button onClick={() => handleDeleteScreening(screening.id)} style={{ backgroundColor: '#ff7400', color: "white" }}>
                                            Confirm Delete?
                                        </button>
                                        <button onClick={() => setDeleteConfirmation(false)}>Cancel Delete</button>
                                    </>
                                ) : (
                                    <button onClick={() => handleDeleteScreening(screening.id)} id="delete-btn">Delete</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedScreening && (
                <div>
                    <br />
                    <br />
                    <h2 id="h2-profile">Edit Screening {titleId} </h2>
                    {success ? (
                        <p>Screening {titleId} updated successfully!</p>
                    ) : (
                        <EditScreeningForm
                            screeningId={selectedScreening.id}
                            initialData={selectedScreening}
                            auditoriums={auditoriums}
                            movieId={movieId}
                            onSave={handleSaveScreening}
                        />
                    )}
                </div>
            )}

        </div>
    );
};

export default EditScreenings;