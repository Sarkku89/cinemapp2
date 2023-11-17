package com.inn.cinema.models;

import jakarta.persistence.*;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int booking_id;

    @ManyToOne
    @JoinColumn(name = "user_id") // Name of the column in the Booking table referring to the user
    private User user;

    @ManyToOne
    @JoinColumn(name = "screening_id") // Name of the column in the Booking table referring to the screening
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

    public void setUser(User user_id) {
        this.user = user_id;
    }

    public Screening getScreening() {
        return screening;
    }

    public void setScreening(Screening screening_id) {
        this.screening = screening_id;
    }

    @Override
    public String toString() {
        return "Booking [id=" + booking_id + ", user=" + user + ", screening=" + screening + "]";
    }
}