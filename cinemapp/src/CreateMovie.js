import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useUserContext } from './UserContext';

const CreateMovie = () => {
  const [movieData, setMovieData] = useState({
    title: '',
    duration: '',
    language: '',
    genre: '',
    imgurl: ''
  });
  
  const user = useUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.user || !user.user.admin) {
      navigate('/access-denied');
    }
  }, [navigate, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData({
      ...movieData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/movies', movieData);
      console.log('Movie created successfully:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error creating movie:', error);
    }
  };

  return (
    <div>
      <h2 id="h2-profile">Create Movie</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={movieData.title} onChange={handleChange} />
        </label>
        <br />
        <label>
          Duration:
          <input type="text" name="duration" value={movieData.duration} onChange={handleChange} />
        </label>
        <br />
        <label>
          Language:
          <input type="text" name="language" value={movieData.language} onChange={handleChange} />
        </label>
        <br />
        <label>
          Genre:
          <input type="text" name="genre" value={movieData.genre} onChange={handleChange} />
        </label>
        <br />
        <label>
          Image:
          <input type="text" name="imgurl" value={movieData.imgurl} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Create Movie</button>
      </form>
    </div>
  );
};

export default CreateMovie;