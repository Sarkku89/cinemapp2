package com.inn.cinema.models;

import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(
    name = "screenings",
    uniqueConstraints = @UniqueConstraint(columnNames = { "auditorium_id" })
)
public class Screening {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int screening_id;

    private String date;
    //private int bookedSeats; // Uusi kenttä varattujen paikkojen määrälle
    
    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;

    @ManyToOne
    @JoinColumn(name = "auditorium_id")
    private Auditorium auditorium;
    
    @OneToMany(mappedBy = "screening", cascade = CascadeType.ALL)
    private List<Booking> bookings;
    
    // Constructors, getters, setters, other properties if needed

    public int getId() {
        return screening_id;
    }

    public void setId(int screening_id) {
        this.screening_id = screening_id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie_id) {
        this.movie = movie_id;
    }

    public Auditorium getAuditorium() {
        return auditorium;
    }

    public void setAuditorium(Auditorium auditorium_id) {
        this.auditorium = auditorium_id;
    }
    
    //public int getBookedSeats() {
      //  return bookedSeats;
    //}

    //public void setBookedSeats(int bookedSeats) {
        //this.bookedSeats = bookedSeats;
    //}

    @Override
    public String toString() {
        return "Screening [id=" + screening_id + ", movie=" + movie + ", auditorium=" + auditorium + ", date=" + date + "]";
    }
}