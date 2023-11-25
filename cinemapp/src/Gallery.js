import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from './Movie';
import ScreeningModal from './ScreeningModal';
import { useUserContext } from './UserContext';

const Gallery = () => {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [screenings, setScreenings] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  //const [selectedScreening, setSelectedScreening] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);


  // Move the useUserContext hook here
  const user = useUserContext();

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, []);

  const fetchMovies = async () => {
    try {
      let url = 'http://localhost:8080/movies';
      // Append genre query parameter if a genre is selected
      if (selectedGenre) {
        url += `?genre=${selectedGenre}`;
      }
      const response = await axios.get(url);
      setAllMovies(response.data);
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get('http://localhost:8080/genres');
      setGenres(response.data);
    } catch (error) {
      console.error('Error fetching genres:', error);
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
    const screeningId = screening.id;

    // Send a request to book tickets
    axios.post('http://localhost:8080/bookings', { "user": { "id": userId }, "screening": { "id": screeningId } })
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
      
      // Always set the screenings, even if the response is empty
      setScreenings(response.data || []);
  
      // Update the selected screening state based on the clicked screening
      //setSelectedScreening(null);
  
      // Open the modal
      setSelectedMovieId(id);
      setIsModalOpen(true);
      
    } catch (error) {
      console.error('Error fetching screenings:', error);
    }
  };

  const handleGenreChange = (selectedGenre) => {
    if (selectedGenre) {
      setSelectedGenre(selectedGenre);
      const filteredMovies = allMovies.filter(movie => movie.genre === selectedGenre);
      setMovies(filteredMovies);
    }
    else {
      setMovies(allMovies);
    }

  };

  const handleCloseModal = () => {
    setSelectedMovieId(null);
    setScreenings([]);
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="gallery-container">
      {/* Genre filter */}
      <div className="genre-filter">
        <label id="genre-header" htmlFor="genre">Filter by Genre:</label>
        <select className='select-genre' onChange={(e) => handleGenreChange(e.target.value)}>
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      {/* Movie gallery */}
      <div className="movie-container">
        {movies.map((movie) => (
          <Movie key={movie.id} {...movie} onSeeScreenings={handleSeeScreenings} />
        ))}
      </div>

      {isModalOpen && (
        <ScreeningModal
          movieId={selectedMovieId}
          screenings={screenings}
          onClose={handleCloseModal}
          onBookTickets={handleBookTickets}
        />
      )}
    </div>
  );
};

export default Gallery;