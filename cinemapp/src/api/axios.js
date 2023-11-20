/*import axios from "axios";


export default axios.create({
    baseURL: 'http://localhost:8081'
    
})*/

import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

// Users

export const getAllUsers = () => {
  return axios.get(`${BASE_URL}/users`);
};

export const getUserById = (userId) => {
  return axios.get(`${BASE_URL}/users/${userId}`);
};

export const createUser = (userData) => {
    return axios.post(`${BASE_URL}/users`, userData);
};

export const updateUser = (userId, userData) => {
    return axios.put(`${BASE_URL}/users/${userId}`, userData);
};

export const deleteUser = (userId) => {
    return axios.delete(`${BASE_URL}/users/${userId}`);
};

// Movies

export const getAllMovies = () => {
    return axios.get(`${BASE_URL}/movies`);
};


export const getMovieById = (movieId) => {
    return axios.get(`${BASE_URL}/movies/${movieId}`);
};

export const createMovie = (movieData) => {
    return axios.post(`${BASE_URL}/movies`, movieData);
};

export const updateMovie = (movieId, movieData) => {
    return axios.put(`${BASE_URL}/movies/${movieId}`, movieData);
};

export const deleteMovie = (movieId) => {
    return axios.delete(`${BASE_URL}/movies/${movieId}`);
};

// Auditoriums

export const getAllAuditoriums = () => {
    return axios.get(`${BASE_URL}/auditoriums`);
};

export const getAuditoriumById = (auditoriumId) => {
    return axios.get(`${BASE_URL}/auditoriums/${auditoriumId}`);
};

export const createAuditorium = (auditoriumData) => {
    return axios.post(`${BASE_URL}/auditoriums`, auditoriumData);
};

export const updateAuditorium = (auditoriumId, auditoriumData) => {
    return axios.put(`${BASE_URL}/auditoriums/${auditoriumId}`, auditoriumData);
};

export const deleteAuditorium = (auditoriumId) => {
    return axios.delete(`${BASE_URL}/auditoriums/${auditoriumId}`);
};

// Screenings

export const getAllScreenings = () => {
    return axios.get(`${BASE_URL}/screenings`);
};

export const getScreeningById = (screeningId) => {
    return axios.get(`${BASE_URL}/screenings/${screeningId}`);
};

export const createScreening = (screeningData) => {
    return axios.post(`${BASE_URL}/screenings`, screeningData);
};

export const updateScreening = (screeningId, screeningData) => {
    return axios.put(`${BASE_URL}/screenings/${screeningId}`, screeningData);
};

export const deleteScreening = (screeningId) => {
    return axios.delete(`${BASE_URL}/screenings/${screeningId}`);
};

// Bookings

export const getAllBookings = () => {
    return axios.get(`${BASE_URL}/bookings`);
};

export const getBookingById = (bookingId) => {
    return axios.get(`${BASE_URL}/bookings/${bookingId}`);
};

export const createBooking = (bookingData) => {
    return axios.post(`${BASE_URL}/bookings`, bookingData);
};

export const updateBooking = (bookingId, bookingData) => {
    return axios.put(`${BASE_URL}/bookings/${bookingId}`, bookingData);
};

export const deleteBooking = (bookingId) => {
    return axios.delete(`${BASE_URL}/bookings/${bookingId}`);
};