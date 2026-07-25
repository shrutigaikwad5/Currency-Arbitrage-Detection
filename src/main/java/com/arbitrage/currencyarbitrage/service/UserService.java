package com.arbitrage.currencyarbitrage.service;

import com.arbitrage.currencyarbitrage.dto.UserDTO;

import java.util.List;

public interface UserService {

    // Add User
    UserDTO addUser(UserDTO userDTO);

    // Get User By id
    UserDTO getUserById(Long id);

    // Get All Users
    List<UserDTO> getAllUsers();

    // Update User
    UserDTO updateUser(Long id, UserDTO userDTO);

    // In UserService.java
    UserDTO authenticateUser(String email, String rawPassword, String role);

    // Delete User
    void deleteUser(Long id);


}