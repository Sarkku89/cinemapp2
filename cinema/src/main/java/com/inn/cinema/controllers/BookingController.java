package com.inn.cinema.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.inn.cinema.models.Booking;
import com.inn.cinema.repositories.BookingRepository;

import java.util.*;

@RestController
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping(value = "/bookings")
    public List<Booking> getAll() {
        return bookingRepository.findAll();
    }

    @GetMapping(value = "/bookings/{id}")
    public Booking get(@PathVariable(name = "id") Integer id) {
        return bookingRepository.findById(id).get();
    }

    @PostMapping(value = "/bookings")
    public Booking create(@RequestBody Booking booking) {
        return bookingRepository.save(booking);
    }

    @PutMapping(value = "/bookings/{id}")
    public Booking update(@RequestBody Booking booking, @PathVariable(name = "id") Integer id) {
        Booking b = bookingRepository.findById(id).get();
        b.setUser(booking.getUser());
        b.setScreening(booking.getScreening());
        // Add more if needed for other properties
        return bookingRepository.save(b);
    }

    @DeleteMapping(value = "/bookings/{id}")
    public Booking delete(@PathVariable(name = "id") Integer id) {
        Booking b = bookingRepository.findById(id).get();
        bookingRepository.delete(b);
        return b;
    }
}