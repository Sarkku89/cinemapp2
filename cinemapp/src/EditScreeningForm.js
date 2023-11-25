import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EditScreeningForm = ({ screeningId, initialData, auditoriums, movieId, onSave }) => {
  const [selectedAuditorium, setSelectedAuditorium] = useState(initialData.auditorium.id);
  const [newDate, setNewDate] = useState(new Date(initialData.date));
  

  const handleAuditoriumChange = (e) => {
    const selectedAuditoriumId = e.target.value;
    const selectedAuditoriumObject = auditoriums[selectedAuditoriumId - 1];
    setSelectedAuditorium(selectedAuditoriumObject);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/screenings/${screeningId}`, {
        date: newDate.toISOString().split('T')[0], 
        auditorium: selectedAuditorium,
        movie: initialData.movie
      });

      onSave({
        success: true
      });
    } catch (error) {
      console.error('Error updating screening:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='date'>
        Date:
        </label>
        <DatePicker
          selected={newDate}
          onChange={(date) => setNewDate(date)}
          dateFormat="dd.MM.yyyy"
        />
      <label htmlFor='auditorium'>
        Auditorium:
        </label>
        <select
          id="auditorium"
          name="auditorium"
          value={selectedAuditorium.id}
          onChange={handleAuditoriumChange}
        >
          <option value={initialData.auditorium.id}>{auditoriums[initialData.auditorium.id - 1]?.name}</option>
          {Object.values(auditoriums).map((aud) => (
            <option key={aud.id} value={aud.id}>
              {aud.name}
            </option>
          ))}
        </select>
      <button id="save-btn" type="submit">Save</button>
    </form>
  );
};

export default EditScreeningForm;
