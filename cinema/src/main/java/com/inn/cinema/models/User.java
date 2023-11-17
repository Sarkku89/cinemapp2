package com.inn.cinema.models;

import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int user_id;
    private String name;
    private String email;
    public User() {
        super();
    }
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Booking> bookings;

    public User(int user_id, String name, String email) {

        super();

        this.user_id = user_id;

        this.name = name;

        this.email = email;

    }

    public int getId() {

        return user_id;

    }

    public void setId(int user_id) {

        this.user_id = user_id;

    }

    public String getName() {

        return name;

    }
    public void setName(String name) {
        
        this.name = name;

    }


    public String getEmail() {

        return email;

    }

    public void setEmail(String email) {

        this.email = email;

    }

    @Override
    public String toString() {

        return "User [id=" + user_id + ", name=" + name + ", email=" + email + "]";

    }

}