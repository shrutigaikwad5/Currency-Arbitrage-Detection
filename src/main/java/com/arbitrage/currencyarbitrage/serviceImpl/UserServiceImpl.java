package com.arbitrage.currencyarbitrage.serviceImpl;

import com.arbitrage.currencyarbitrage.dto.UserDTO;
import com.arbitrage.currencyarbitrage.entity.User;
import com.arbitrage.currencyarbitrage.mapper.UserMapper;
import com.arbitrage.currencyarbitrage.repository.UserRepository;
import com.arbitrage.currencyarbitrage.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;


    @Override
    public UserDTO authenticateUser(String email, String rawPassword, String selectedRole) {
        // 1. Fetch user by email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password!"));

        // 2. Validate password
        if (!user.getPassword().equals(rawPassword)) {
            throw new RuntimeException("Invalid email or password!");
        }

        // 3. Validate role (Checks database role vs selected role)
        if (!user.getRole().equalsIgnoreCase(selectedRole)) {
            throw new RuntimeException("Access denied: You are not authorized as " + selectedRole);
        }

        return UserMapper.toDTO(user);
    }

    // Add User
    @Override
    public UserDTO addUser(UserDTO userDTO) {

        User user = UserMapper.toEntity(userDTO);

        User savedUser = userRepository.save(user);

        return UserMapper.toDTO(savedUser);
    }

    // Get User By id
    @Override
    public UserDTO getUserById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID : " + id));

        return UserMapper.toDTO(user);
    }

    // Get All Users
    @Override
    public List<UserDTO> getAllUsers() {

        List<User> userList = userRepository.findAll();

        return userList.stream()
                .map(UserMapper::toDTO)
                .collect(Collectors.toList());
    }

    // Update User
    @Override
    public UserDTO updateUser(Long id, UserDTO userDTO) {

        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID : " + id));

        existingUser.setName(userDTO.getName());
        existingUser.setEmail(userDTO.getEmail());
        existingUser.setPassword(userDTO.getPassword());
        existingUser.setRole(userDTO.getRole());

        User updatedUser = userRepository.save(existingUser);

        return UserMapper.toDTO(updatedUser);
    }

    // Delete User
    @Override
    public void deleteUser(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID : " + id));

        userRepository.delete(user);
    }


}