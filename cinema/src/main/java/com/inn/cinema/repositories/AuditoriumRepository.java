package com.inn.cinema.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.inn.cinema.models.Auditorium;

@Repository

public interface AuditoriumRepository extends JpaRepository<Auditorium, Integer> {

}