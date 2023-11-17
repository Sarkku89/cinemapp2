package com.inn.cinema.controllers;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import com.inn.cinema.models.Auditorium;
import com.inn.cinema.repositories.AuditoriumRepository;

import java.util.*;

@RestController

public class AuditoriumController {

    @Autowired
    private AuditoriumRepository auditoriumRepository;

    @GetMapping(value = "/auditoriums")
    public List<Auditorium> getAll() {
        return auditoriumRepository.findAll();
    }

    @GetMapping(value = "/auditoriums/{id}")
    public Auditorium get(@PathVariable(name = "id") Integer id) {
        return auditoriumRepository.findById(id).get();
    }

    @PostMapping(value = "/auditoriums")
    public Auditorium create(@RequestBody Auditorium auditorium) {
        return auditoriumRepository.save(auditorium);
    }

    @PutMapping(value = "/auditoriums/{id}")
    public Auditorium update( @RequestBody Auditorium auditorium,

    @PathVariable(name = "id") Integer id) {
        Auditorium u = auditoriumRepository.findById(id).get();
        u.setSize(auditorium.getSize());
        u.setName(auditorium.getName());
        return auditoriumRepository.save(u);
    }

    @DeleteMapping(value = "/auditoriums/{id}")
    public Auditorium delete(@PathVariable(name = "id") Integer id) {
        Auditorium u = auditoriumRepository.findById(id).get();
        auditoriumRepository.delete(u);
        return u;
    }
}