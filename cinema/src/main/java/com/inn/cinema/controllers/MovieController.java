package com.inn.cinema.controllers;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import com.inn.cinema.models.Movie;
import com.inn.cinema.repositories.MovieRepository;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    @GetMapping(value = "/movies")
    public List<Movie> getAll() {
        return movieRepository.findAll();
    }

    @GetMapping(value = "/movies/{id}")
    public Movie get(@PathVariable(name = "id") Integer id) {
        return movieRepository.findById(id).get();
    }

    @PostMapping(value = "/movies")
    public Movie create(@RequestBody Movie movie) {
        return movieRepository.save(movie);
    }

    @GetMapping(value = "/genres")
    public List<String> getAllGenres() {
        return movieRepository.findAllGenres();
    }

    @GetMapping(value = "/movies/by-genre/{genre}")
    public List<Movie> getByGenre(@PathVariable String genre) {
        return movieRepository.findByGenre(genre);
    }

    @PutMapping(value = "/movies/{id}")
    public Movie update( @RequestBody Movie movie,

    @PathVariable(name = "id") Integer id) {
        Movie u = movieRepository.findById(id).get();
        u.setTitle(movie.getTitle());
        u.setDuration(movie.getDuration());
        u.setGenre(movie.getGenre());
        u.setLanguage(movie.getLanguage());
        return movieRepository.save(u);
    }

    @DeleteMapping(value = "/movies/{id}")
    public Movie delete(@PathVariable(name = "id") Integer id) {
        Movie u = movieRepository.findById(id).get();
        movieRepository.delete(u);
        return u;
    }
}