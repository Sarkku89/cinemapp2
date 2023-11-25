package com.inn.cinema.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.inn.cinema.models.Screening;
import com.inn.cinema.repositories.ScreeningRepository;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ScreeningController {

    @Autowired
    private ScreeningRepository screeningRepository;


    @GetMapping(value = "/screenings")
    public List<Screening> getAll() {
        return screeningRepository.findAll();
    }

    @GetMapping(value = "/screenings/{id}")
    public Screening get(@PathVariable(name = "id") Integer id) {
        return screeningRepository.findById(id).orElse(null);
    }

     @GetMapping(value = "/screenings/by-movie/{movieId}")
    public List<Screening> getScreeningsByMovieId(@PathVariable(name = "movieId") Integer movieId) {
        return screeningRepository.findByMovieIdWithAuditorium(movieId);
    }

    @PostMapping(value = "/screenings")
    public ResponseEntity<?> create(@RequestBody Screening screening) {
        try {
            return ResponseEntity.ok(screeningRepository.save(screening));
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.badRequest().body("Error: Auditorium is already used in another screening");
        }
    }
    @PutMapping(value = "/screenings/{id}")
    public ResponseEntity<?> update(@PathVariable(name = "id") Integer id, @RequestBody Screening updatedScreening) {
        try {
            Screening screening = screeningRepository.findById(id)
                    .orElseThrow(() -> new NoSuchElementException("Screening not found with id " + id));
    
            // Update the screening details
            screening.setDate(updatedScreening.getDate());
            screening.setAuditorium(updatedScreening.getAuditorium());
            screening.setMovie(updatedScreening.getMovie());
    
            screeningRepository.save(screening);
    
            return ResponseEntity.ok(screening);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating screening details");
        }
    }
  


    @DeleteMapping(value = "/screenings/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") Integer id) {
        try {
            Screening screening = screeningRepository.findById(id)
                    .orElseThrow(() -> new NoSuchElementException("Screening not found with id " + id));

            screeningRepository.delete(screening);
            return ResponseEntity.ok(screening);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting screening");
        }
    }
}
