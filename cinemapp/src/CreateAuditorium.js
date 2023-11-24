import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useUserContext } from './UserContext';

const CreateAuditorium = () => {
  const [auditoriumData, setAuditoriumData] = useState({
    name: '',
    size: ''
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
    setAuditoriumData({
      ...auditoriumData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auditoriums', auditoriumData);
      console.log('Auditorium created successfully:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error creating auditorium:', error);
    }
  };

  return (
    <div>
      <h2 id="h2-profile">Create Auditorium</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={auditoriumData.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Size:
          <input type="number" name="size" value={auditoriumData.size} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Create Auditorium</button>
      </form>
    </div>
  );
};

export default CreateAuditorium;