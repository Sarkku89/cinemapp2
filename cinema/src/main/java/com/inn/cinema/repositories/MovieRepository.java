package com.inn.cinema.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.inn.cinema.models.Movie;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Repository


public interface MovieRepository extends JpaRepository<Movie, Integer> {
    @Query("SELECT DISTINCT m.genre FROM Movie m")
    List<String> findAllGenres();

    @Query("SELECT m FROM Movie m WHERE m.genre = :genre")
    List<Movie> findByGenre(@Param("genre") String genre);

}