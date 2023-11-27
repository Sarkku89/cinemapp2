import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext';
import axios from 'axios';

const EditMovies = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const navigate = useNavigate();
    const user = useUserContext();
    const [movieTitle, setMovieTitle] = useState('');
    const [success, setSuccess] = useState(false);
    const [selectedMovieEdit, setSelectedMovieEdit] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        duration: '',
        genre: '',
        language: '',
        imgurl: '',
    });

    useEffect(() => {
        if (!user || !user.user || !user.user.admin) {
            navigate('/access-denied');
        }
    }, [navigate, user]);

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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleEditMovie = () => {
        setSuccess(false);
        if (selectedMovie) {
            setMovieTitle(selectedMovie.title);
            setSelectedMovieEdit(true);
            setFormData({
                title: selectedMovie.title,
                duration: selectedMovie.duration,
                genre: selectedMovie.genre,
                language: selectedMovie.language,
                imgurl: selectedMovie.imgurl,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:8080/movies/${selectedMovie.id}`, {
                title: formData.title,
                duration: formData.duration,
                genre: formData.genre,
                language: formData.language,
                imgurl: formData.imgurl,
            });
            setSelectedMovie(formData);
            setMovieTitle(formData.title);
            setSuccess(true);
            fetchMovies();
        } catch (error) {
            console.error('Error updating movie:', error);
        }
    };
    const handleDeleteMovie = async (movieId) => {
        if (deleteConfirmation) {
            try {
                await axios.delete(`http://localhost:8080/movies/${movieId}`);
                fetchMovies();
                setDeleteConfirmation(false);
            } catch (error) {
                console.error('Error deleting screening:', error);
            }
        } else {
            setDeleteConfirmation(true);
        }
    };

    return (
        <div>
            <h2 id="h2-profile">Manage Movies</h2>
            <label>Select Movie:</label><br /><br />
            <div style={{ display: "flex" }} className='edit-form-container'>
                <select
                    onChange={(e) => {
                        const selectedValue = e.target.value;
                        setSelectedMovie(selectedValue !== '' ? JSON.parse(selectedValue) : null);
                    }}
                    value={selectedMovie ? JSON.stringify(selectedMovie) : ''}
                >
                    <option value="">Select a movie</option>
                    {movies.map((movie) => (
                        <option key={movie.id} value={JSON.stringify(movie)}>
                            {movie.title}
                        </option>
                    ))}
                </select>
                <button onClick={handleEditMovie} disabled={!selectedMovie}>
                    Edit
                </button>

                {selectedMovie && (
                    <>
                        {deleteConfirmation ? (
                            <>
                                <button onClick={() => handleDeleteMovie(selectedMovie.id)} style={{ backgroundColor: '#ff7400', color: "white" }}>
                                    Confirm Delete?
                                </button>
                                <button onClick={() => setDeleteConfirmation(false)}>Cancel Delete</button>
                            </>
                        ) : (
                            <button onClick={() => handleDeleteMovie(selectedMovie.id)} id="delete-btn">Delete</button>
                        )}
                    </>
                )}
            </div>
            <div>
                <br /><br />
                <h2 id="h2-profile">Movie Details:</h2>

                {selectedMovie ? (
                    <table className='users-table'>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Duration</th>
                                <th>Genre</th>
                                <th>Language</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{selectedMovie.title}</td>
                                <td>{selectedMovie.duration}</td>
                                <td>{selectedMovie.genre}</td>
                                <td>{selectedMovie.language}</td>
                                <td>
                                    {selectedMovie.imgurl && (
                                        <img src={selectedMovie.imgurl} alt={`Poster for ${selectedMovie.title}`} style={{ maxWidth: '100px', maxHeight: '150px' }} />
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p>No movie selected</p>
                )}
            </div>
            {selectedMovieEdit && (
                <div>
                    <br />
                    <br />
                    <h2 id="h2-profile">Edit {movieTitle} </h2>
                    {success ? (
                        <div>
                            <p>{movieTitle} updated successfully!</p><br />
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <label htmlFor='title'>Title</label>
                            <input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                            />

                            <label htmlFor='duration'>Duration in minutes</label>
                            <input
                                id="duration"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                            />

                            <label htmlFor='genre'>Genre</label>
                            <input
                                id="genre"
                                name="genre"
                                value={formData.genre}
                                onChange={handleChange}
                            />

                            <label htmlFor='language'>Language</label>
                            <input
                                id="language"
                                name="language"
                                value={formData.language}
                                onChange={handleChange}
                            />

                            <label htmlFor='imgurl'>Image URL</label>
                            <input
                                id="imgurl"
                                name="imgurl"
                                value={formData.imgurl}
                                onChange={handleChange}
                            />

                            <button id="save-btn" type="submit">Save</button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
};

export default EditMovies;
