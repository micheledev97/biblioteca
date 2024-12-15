package com.example.biblioteca.repository;

import com.example.biblioteca.model.Reservation;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation,Long> {

    List<Reservation> findByUserId(Long userId);
    List<Reservation> findByBookId(Long bookId);

}
