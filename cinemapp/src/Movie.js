import React from 'react';

const Movie = ({ movie_id, title, duration, genre, language, imgurl, onSeeScreenings }) => {

  const handleSeeScreenings = (movie_id, event) => {
    event.preventDefault();
    onSeeScreenings(movie_id);

  };

  return (
    <div className="movie">
      <img src={imgurl} alt={title} />
      <div className="details">
        <h4>{title}</h4>
        <p>Duration: {duration} mins <br />
          Genre: {genre}<br />
          Language: {language}<br />
          <button onClick={(e) => handleSeeScreenings(movie_id, e)}>See Screenings</button>
        </p>
      </div>
    </div>
  );
};



export default Movie;
