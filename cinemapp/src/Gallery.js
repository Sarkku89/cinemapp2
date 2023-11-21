import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from './Movie';
import ScreeningModal from './ScreeningModal';
import { useUserContext } from './UserContext';

const Gallery = () => {
  const [movies, setMovies] = useState([]);
  const [screenings, setScreenings] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [selectedScreening, setSelectedScreening] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Move the useUserContext hook here
  const user = useUserContext();
  console.log('User:', user);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:8080/movies');     
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

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
    console.log(userId);
    const screeningId = screening.id;

    // Send a request to book tickets
    axios.post('http://localhost:8080/bookings', { user: userId, screening: screeningId })
      .then(response => {
        // Handle the response as needed
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error booking tickets:', error);
        // Handle errors appropriately
      });
  };


  const handleSeeScreenings = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/screenings/by-movie/${id}`);
      setScreenings(response.data);

      // Update the selected screening state based on the clicked screening
      setSelectedScreening(null); // Reset to null initially

      // Open the modal only if there are screenings
      if (response.data.length > 0) {
        setSelectedScreening(response.data[0]); // For now, selecting the first screening
        setSelectedMovieId(id);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error fetching screenings:', error);
    }
  };


  const handleCloseModal = () => {
    setSelectedMovieId(null);
    setScreenings([]);
    setSelectedScreening(null);
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="gallery-container">
      {/* Movie gallery */}
      <div className="movie-container">
        {movies.map((movie) => (
          <Movie key={movie.id} {...movie} onSeeScreenings={handleSeeScreenings} />
        ))}
      </div>


      {isModalOpen && (
        <ScreeningModal
          screenings={screenings}
          selectedScreening={selectedScreening}
          onClose={handleCloseModal}
          onBookTickets={handleBookTickets}
        />
      )}
    </div>
  );
};

export default Gallery;
