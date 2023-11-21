package com.inn.cinema.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.inn.cinema.models.Booking;
import com.inn.cinema.models.Screening;
import com.inn.cinema.repositories.BookingRepository;
import com.inn.cinema.repositories.ScreeningRepository;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ScreeningRepository screeningRepository;

    @GetMapping(value = "/bookings")
    public List<Booking> getAll() {
        return bookingRepository.findAll();
    }

    @GetMapping(value = "/bookings/{id}")
    public Booking get(@PathVariable(name = "id") Integer id) {
        return bookingRepository.findById(id).orElse(null);
    }

    @GetMapping(value = "/bookings/by-user/{userId}")
        public List<Booking> getByUserId(@PathVariable(name = "userId") Integer userId) {
            return bookingRepository.findByUserId(userId);
    }

/*     @PostMapping(value = "/bookings")
    public ResponseEntity<?> create(@RequestBody Booking booking) {
        // Haetaan screening, johon varaus liittyy
        Screening screening = booking.getScreening();

        if (screening != null && screening.getAuditorium() != null) {
            if (screening.getBookedSeats() < screening.getAuditorium().getSize()) {
                // Tarkistetaan, onko varattujen paikkojen määrä pienempi kuin auditoriumin koko
                // Jos on, lisätään varaus ja päivitetään varattujen paikkojen määrää
                screening.setBookedSeats(screening.getBookedSeats() + 1);
                screeningRepository.save(screening);

                // Luo tässä vaiheessa uusi varaus
                bookingRepository.save(booking);

                return ResponseEntity.ok("Booking created successfully");
            } else {
                // Varausten määrä on jo saavuttanut auditoriumin koon, ei voi tehdä uutta varausta
                return ResponseEntity.badRequest().body("Error: Auditorium is full");
            }
        } else {
            // Näytön tai sen auditoriumin tiedot puuttuvat
            return ResponseEntity.badRequest().body("Error: Missing screening or auditorium information");
        }
    } */

    @PostMapping(value = "/bookings")
    public Booking create(@RequestBody Booking booking){
        return bookingRepository.save(booking);
    }

    @PutMapping(value = "/bookings/{id}")
    public Booking update(@RequestBody Booking booking, @PathVariable(name = "id") Integer id) {
        Booking b = bookingRepository.findById(id).orElse(null);
        if (b != null) {
            b.setUser(booking.getUser());
            b.setScreening(booking.getScreening());
            // Add more if needed for other properties
            return bookingRepository.save(b);
        } else {
            return null; // or handle the case where the booking with the given id is not found
        }
    }

    @DeleteMapping(value = "/bookings/{id}")
    public ResponseEntity<String> delete(@PathVariable(name = "id") Integer id) {
        Booking b = bookingRepository.findById(id).orElse(null);
        if (b != null) {
            bookingRepository.delete(b);
            return ResponseEntity.ok("Booking deleted successfully");
        } else {
            return ResponseEntity.notFound().build(); // or handle the case where the booking with the given id is not found
        }
    }
}
