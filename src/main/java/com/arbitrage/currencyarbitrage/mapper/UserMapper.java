package com.arbitrage.currencyarbitrage.mapper;

import com.arbitrage.currencyarbitrage.dto.UserDTO;
import com.arbitrage.currencyarbitrage.entity.User;

public class UserMapper {

    // Convert Entity to DTO
    public static UserDTO toDTO(User user) {

        if (user == null) {
            return null;
        }

        return new UserDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPassword(),
                user.getRole()
        );
    }

    // Convert DTO to Entity
    public static User toEntity(UserDTO userDTO) {

        if (userDTO == null) {
            return null;
        }

        User user = new User();

        user.setId(userDTO.getId());
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setRole(userDTO.getRole());

        return user;
    }
}