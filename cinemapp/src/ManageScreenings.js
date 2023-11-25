// ManageScreenings.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext';

const ManageScreenings = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();
  const user = useUserContext();

  useEffect(() => {
      if (!user || !user.user || !user.user.admin) {
        navigate('/access-denied');
      } }, [navigate, user]);

  useEffect(() => {
    // Fetch the list of movies when the component mounts
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch('http://localhost:8080/movies');
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleEditScreenings = () => {
    // Check if a movie is selected before navigating to the EditScreenings component
    if (selectedMovie) {
      // Navigate to the EditScreenings component with the selected movie ID
      navigate(`/manage-screenings/edit/${selectedMovie.id}`);
    }
  };

  return (
    <div>
      <h2>Manage Screenings</h2>
      <div>
        <label>Select Movie:</label>
        <select
          onChange={(e) => setSelectedMovie(JSON.parse(e.target.value))}
          value={selectedMovie ? JSON.stringify(selectedMovie) : ''}
        >
          <option value="">Select a movie</option>
          {movies.map((movie) => (
            <option key={movie.id} value={JSON.stringify(movie)}>
              {movie.title}
            </option>
          ))}
        </select>
        <button onClick={handleEditScreenings}>Edit Screenings</button>
      </div>
      {/* Display the table of screenings */}
      {/* You can implement this part based on your requirements */}
    </div>
  );
};

export default ManageScreenings;
