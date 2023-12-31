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
    private String password;
    private Boolean admin;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
        private List<Booking> bookings;
    
    public User() {
        super();
    }  

    public User(int user_id, String name, String email, String password, Boolean admin) {

        super();

        this.user_id = user_id;

        this.name = name;

        this.email = email;

        this.password = password;

        this.admin = admin;

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

    public String getPassword() {

        return password;

    }

    public void setPassword(String password) {

        this.password = password;

    }

     public Boolean getAdmin() {

        return admin;

    }

    public void setAdmin(Boolean admin) {

        this.admin = admin;

    }

    @Override
    public String toString() {

        return "User [id=" + user_id + ", name=" + name + ", email=" + email + ", password=" + password + ", admin="+ admin +"]";

    }

}