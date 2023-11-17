package com.inn.cinema.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.inn.cinema.models.Screening;
import com.inn.cinema.repositories.ScreeningRepository;

import java.util.*;

@RestController
public class ScreeningController {

    @Autowired
    private ScreeningRepository screeningRepository;

    @GetMapping(value = "/screenings")
    public List<Screening> getAll() {
        return screeningRepository.findAll();
    }

    @GetMapping(value = "/screenings/{id}")
    public Screening get(@PathVariable(name = "id") Integer id) {
        return screeningRepository.findById(id).get();
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
    public Screening update(@RequestBody Screening screening, @PathVariable(name = "id") Integer id) {
        Screening s = screeningRepository.findById(id).get();
        s.setMovie(screening.getMovie());
        s.setAuditorium(screening.getAuditorium());
        // Add more if needed for other properties
        return screeningRepository.save(s);
    }

    @DeleteMapping(value = "/screenings/{id}")
    public Screening delete(@PathVariable(name = "id") Integer id) {
        Screening s = screeningRepository.findById(id).get();
        screeningRepository.delete(s);
        return s;
    }
}