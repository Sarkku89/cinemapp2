import React, { useState } from 'react';

const Movie = ({ id, title, duration, genre, language, imgurl, onSeeScreenings }) => {

  const handleSeeScreenings = (id, event) => {
    event.preventDefault();
    onSeeScreenings(id);
  };

  return (
    <div className="movie">
      <img src={imgurl} alt={title} />
      <div className="details">
        <h4>{title}</h4>
        <p>Duration: {duration} mins <br />
          Genre: {genre}<br />
          Language: {language}<br />
          <button onClick={(e) => handleSeeScreenings(id, e)}>See Screenings</button>
        </p>
      </div>
    </div>
  );
};



export default Movie;
