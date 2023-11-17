package com.inn.cinema.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "movies")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int movie_id;
    private String title;
    private int duration;
    private String genre;
    private String language;
    public Movie() {
        super();
    }
    
    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL)
    private List<Screening> screenings;

    public Movie(int movie_id, String title, int duration, String genre, String language) {

        super();

        this.movie_id = movie_id;

        this.title = title;

        this.duration = duration;
        
        this.genre = genre;

        this.language = language;

    }

    public int getId() {

        return movie_id;

    }

    public void setId(int movie_id) {

        this.movie_id = movie_id;

    }

    public String getTitle() {

        return title;

    }

    public void setTitle(String title) {
        
        this.title = title;

    }

    public int getDuration() {

        return duration;

    }

    public void setDuration(int duration) {

        this.duration = duration;

    }

    public String getGenre() {

        return genre;

    }

    public void setGenre(String genre) {
        
        this.genre = genre;

    }

    public String getLanguage() {

        return language;

    }

    public void setLanguage(String language) {
        
        this.language = language;

    }

    @Override
    public String toString() {

        return "Movie [id=" + movie_id + ", title=" + title + ", duration=" + duration + ", genre=" + genre + ", language=" + "]";

    }

}