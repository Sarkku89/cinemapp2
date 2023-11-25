package com.inn.cinema.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.inn.cinema.models.Screening;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository

public interface ScreeningRepository extends JpaRepository<Screening, Integer> {
    List<Screening> findByMovieId(Integer movieId);

    @Query("SELECT s FROM Screening s LEFT JOIN FETCH s.auditorium WHERE s.movie.id = :movieId")
    List<Screening> findByMovieIdWithAuditorium(@Param("movieId") Integer movieId);
}
