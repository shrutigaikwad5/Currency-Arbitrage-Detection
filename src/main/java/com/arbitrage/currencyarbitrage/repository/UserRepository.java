package com.arbitrage.currencyarbitrage.repository;

import com.arbitrage.currencyarbitrage.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Method to find a user by their email address for authentication
    Optional<User> findByEmail(String email);

}