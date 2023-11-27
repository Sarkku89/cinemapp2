import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 


const CreateScreening = () => {
  const [screeningData, setScreeningData] = useState({
    movie_id: null,
    auditorium_id: null,
    date: '',
  });

  const [allAuditoriums, setAllAuditoriums] = useState([]);
  const [usedAuditoriums, setUsedAuditoriums] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const user = useUserContext();

  useEffect(() => {
    if (!user || !user.user || !user.user.admin) {
      navigate('/access-denied');
    }
    fetchAuditoriums();
    fetchScreenings();
    fetchMovies();
  }, [navigate, user]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:8080/movies');
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const fetchAuditoriums = async () => {
    try {
      const response = await axios.get('http://localhost:8080/auditoriums');
      setAllAuditoriums(response.data);
    } catch (error) {
      console.error('Error fetching auditoriums:', error);
    }
  };

  const fetchScreenings = async () => {
    try {
      const response = await axios.get('http://localhost:8080/screenings');
      setUsedAuditoriums(response.data.map((screening) => screening.auditorium.id));
    } catch (error) {
      console.error('Error fetching screenings:', error);
    }
  };

  const availableAuditoriums = allAuditoriums.filter((auditorium) => !usedAuditoriums.includes(auditorium.id));

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value)
    if (value !== null) {
      setScreeningData({
        ...screeningData,
        [name]: value,
      });
    } else {
      // Handle null value (e.g., show an error or set a default)
      console.error(`Invalid value for ${name}: ${value}`);
    }
  };

  const handleDateChange = (date) => {
    setScreeningData({
      ...screeningData,
      date,
    });
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/screenings', {
        movie: {
          id: screeningData.movie_id,
        },
        auditorium: {
          id: screeningData.auditorium_id,
        },
        date: screeningData.date.toISOString().split('T')[0], 
      });
      console.log('Screening created successfully:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error creating screening:', error);
    }
  };

  return (
    <div>
      <h2 id="h2-profile">Create Screening</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Movie:
          <select
            name="movie_id"
            value={screeningData.movie_id || ''}
            onChange={handleChange}
            onClick={handleDropdownToggle}
            onBlur={handleDropdownToggle}
          >
            {!isDropdownOpen && <option value="">Select Movie</option>}
            {movies.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.title}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Auditorium id:
          <select
            name="auditorium_id"
            value={screeningData.auditorium_id || ''}
            onChange={handleChange}
            onClick={handleDropdownToggle}
            onBlur={handleDropdownToggle}
          >
            {!isDropdownOpen && <option value="">Select Auditorium</option>}
            {availableAuditoriums.map((auditorium) => (
              <option key={auditorium.id} value={auditorium.id}>
                {auditorium.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Date:
          </label>
          <DatePicker
            selected={screeningData.date}
            onChange={handleDateChange}
            dateFormat="dd.MM.yyyy"
          />
        <br />
        <button type="submit">Create Screening</button>
      </form>
    </div>
  );
};

export default CreateScreening;
