package com.arbitrage.currencyarbitrage.controller;

import com.arbitrage.currencyarbitrage.dto.UserDTO;
import com.arbitrage.currencyarbitrage.service.CurrencyService;
import com.arbitrage.currencyarbitrage.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private CurrencyService currencyService;

    // View User Management Dashboard (ADMIN ONLY)
    @GetMapping
    public String showUserManagementPage(HttpSession session, Model model) {
        UserDTO user = (UserDTO) session.getAttribute("loggedInUser");
        if (user == null || !"ADMIN".equalsIgnoreCase(user.getRole())) {
            return "redirect:/login";
        }

        model.addAttribute("user", user);
        model.addAttribute("userForm", new UserDTO());
        model.addAttribute("userList", userService.getAllUsers());
        model.addAttribute("currencyList", currencyService.getAllCurrencies());
        return "users";
    }

    // Save or Update User
    @PostMapping("/save")
    public String saveUser(@ModelAttribute("userForm") UserDTO userDTO, HttpSession session) {
        UserDTO user = (UserDTO) session.getAttribute("loggedInUser");
        if (user == null || !"ADMIN".equalsIgnoreCase(user.getRole())) {
            return "redirect:/login";
        }

        if (userDTO.getId() != null) {
            userService.updateUser(userDTO.getId(), userDTO);
        } else {
            userService.addUser(userDTO);
        }
        return "redirect:/users";
    }

    // Edit User
    @GetMapping("/edit/{id}")
    public String editUser(@PathVariable("id") Long id, HttpSession session, Model model) {
        UserDTO user = (UserDTO) session.getAttribute("loggedInUser");
        if (user == null || !"ADMIN".equalsIgnoreCase(user.getRole())) {
            return "redirect:/login";
        }

        model.addAttribute("user", user);
        model.addAttribute("userForm", userService.getUserById(id));
        model.addAttribute("userList", userService.getAllUsers());
        model.addAttribute("currencyList", currencyService.getAllCurrencies());
        return "users";
    }

    // Delete User
    @GetMapping("/delete/{id}")
    public String deleteUser(@PathVariable("id") Long id, HttpSession session) {
        UserDTO user = (UserDTO) session.getAttribute("loggedInUser");
        if (user == null || !"ADMIN".equalsIgnoreCase(user.getRole())) {
            return "redirect:/login";
        }

        userService.deleteUser(id);
        return "redirect:/users";
    }
}