package com.inn.cinema.models;

import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "auditoriums")
public class Auditorium {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int auditorium_id;
    private int size;
    private String name;
    public Auditorium() {
        super();
    }
    
    @OneToMany(mappedBy = "auditorium", cascade = CascadeType.ALL)
    private List<Screening> screenings;

    public Auditorium(int auditorium_id, int size, String name) {

        super();

        this.auditorium_id = auditorium_id;
        
        this.size = size;
        
        this.name = name;

    }

    public int getId() {

        return auditorium_id;

    }

    public void setId(int auditorium_id) {

        this.auditorium_id = auditorium_id;

    }

    public int getSize() {

        return size;

    }

    public void setSize(int size) {

        this.size = size;

    }

    public String getName() {

        return name;

    }
    
    public void setName(String name) {
        
        this.name = name;

    }

    @Override
    public String toString() {

        return "Auditorium [id=" + auditorium_id + ", size=" + size + ", name=" + name +  "]";

    }

}