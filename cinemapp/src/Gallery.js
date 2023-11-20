import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from './Movie';
import ScreeningModal from './ScreeningModal';

const Gallery = () => {
  const [movies, setMovies] = useState([]);
  const [screenings, setScreenings] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [selectedScreening, setSelectedScreening] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // New state to track modal visibility

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

  const handleBookTickets = (selectedScreening) => {
    console.log('handleBookTickets in Gallery.js called for screening:', selectedScreening);
    // Implement the logic to handle booking tickets
    // You can add more logic here, like redirecting to a booking page or showing a confirmation message
  };

  /*const fetchScreenings = async (movieId) => {
    try {
      const response = await axios.get(`http://localhost:8080/screenings/${movieId}`);
      console.log('Fetched screenings:', response.data);
      setScreenings(response.data);
    } catch (error) {
      console.error('Error fetching screenings:', error);
    }
  };*/

  const handleSeeScreenings = async (id) => {
    try {
      console.log(id)
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

      {/* Screening modal */}
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
