package com.inn.cinema.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.inn.cinema.models.Screening;

@Repository

public interface ScreeningRepository extends JpaRepository<Screening, Integer> {

}