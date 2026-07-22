package com.arbitrage.currencyarbitrage.controller;

import com.arbitrage.currencyarbitrage.dto.LoginDTO;
import com.arbitrage.currencyarbitrage.dto.UserDTO;
import com.arbitrage.currencyarbitrage.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class LoginController {

    @Autowired
    private UserService userService;

    @GetMapping("/login")
    public String showLoginPage(Model model) {
        model.addAttribute("loginDTO", new LoginDTO());
        return "login";
    }

    @PostMapping("/login")
    public String processLogin(@ModelAttribute("loginDTO") LoginDTO loginDTO,
                               HttpSession session,
                               Model model) {
        try {
            UserDTO user = userService.authenticateUser(
                    loginDTO.getEmail(),
                    loginDTO.getPassword(),
                    loginDTO.getRole()
            );

            session.setAttribute("loggedInUser", user);

            // Redirect based on role
            if ("ADMIN".equalsIgnoreCase(user.getRole())) {
                return "redirect:/users";
            } else {
                return "redirect:/currency";
            }
        } catch (Exception e) {
            model.addAttribute("error", e.getMessage());
            return "login";
        }
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/login";
    }
}