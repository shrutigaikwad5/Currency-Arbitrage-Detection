package com.arbitrage.currencyarbitrage.controller;

import com.arbitrage.currencyarbitrage.dto.CurrencyDTO;
import com.arbitrage.currencyarbitrage.dto.UserDTO;
import com.arbitrage.currencyarbitrage.service.CurrencyService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/currency")
public class CurrencyPageController {

    @Autowired
    private CurrencyService currencyService;

    // Show Page (Both USER and ADMIN can view)
    @GetMapping
    public String showPage(HttpSession session, Model model) {
        UserDTO user = (UserDTO) session.getAttribute("loggedInUser");
        if (user == null) {
            return "redirect:/login";
        }

        model.addAttribute("user", user);
        model.addAttribute("currency", new CurrencyDTO());
        model.addAttribute("currencyList", currencyService.getAllCurrencies());
        return "index";
    }

    // Save or Update Currency (Both USER and ADMIN can create/update)
    @PostMapping("/save")
    public String saveCurrency(@ModelAttribute("currency") CurrencyDTO currencyDTO, HttpSession session) {
        UserDTO user = (UserDTO) session.getAttribute("loggedInUser");
        if (user == null) {
            return "redirect:/login";
        }

        if (currencyDTO.getId() != null) {
            currencyService.updateCurrency(currencyDTO.getId(), currencyDTO);
        } else {
            currencyService.addCurrency(currencyDTO);
        }
        return "redirect:/currency";
    }

    // Edit Currency (Both USER and ADMIN can load existing records)
    @GetMapping("/edit/{id}")
    public String editCurrency(@PathVariable("id") Integer id, HttpSession session, Model model) {
        UserDTO user = (UserDTO) session.getAttribute("loggedInUser");
        if (user == null) {
            return "redirect:/login";
        }

        CurrencyDTO currencyDTO = currencyService.getCurrencyById(id);
        model.addAttribute("user", user);
        model.addAttribute("currency", currencyDTO);
        model.addAttribute("currencyList", currencyService.getAllCurrencies());
        return "index";
    }

    // Delete Currency (ONLY ADMIN IS PERMITTED TO DELETE)
    @GetMapping("/delete/{id}")
    public String deleteCurrency(@PathVariable("id") Integer id, HttpSession session) {
        UserDTO user = (UserDTO) session.getAttribute("loggedInUser");
        if (user == null) {
            return "redirect:/login";
        }

        // Role restriction check
        if (!"ADMIN".equalsIgnoreCase(user.getRole())) {
            // Block non-admin users from triggering delete via URL manipulation
            return "redirect:/currency";
        }

        currencyService.deleteCurrency(id);
        return "redirect:/currency";
    }
}