package com.inn.cinema.models;

import jakarta.persistence.*;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int booking_id;

    @ManyToOne
    @JoinColumn(name = "user_id") 
    private User user;

    @ManyToOne
    @JoinColumn(name = "screening_id")
    private Screening screening;

    // Constructors, getters, setters, other properties if needed

    public int getId() {
        return booking_id;
    }

    public void setId(int booking_id) {
        this.booking_id = booking_id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
        // Make sure to update the inverse side as well
       // user.getTickets().add(this);
    }

    public Screening getScreening() {
        return screening;
    }

    public void setScreening(Screening screening) {
        this.screening = screening;
    }

    @Override
    public String toString() {
        return "Booking [id=" + booking_id + ", user=" + user + ", screening=" + screening + "]";
    }
}