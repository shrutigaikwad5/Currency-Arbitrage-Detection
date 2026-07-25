package com.arbitrage.currencyarbitrage.controller;

import com.arbitrage.currencyarbitrage.dto.CurrencyDTO;
import com.arbitrage.currencyarbitrage.service.CurrencyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/currency")
public class CurrencyController {

    @Autowired
    private CurrencyService currencyService;

    // Add Currency
    @PostMapping
    public CurrencyDTO addCurrency(@RequestBody CurrencyDTO currencyDTO) {
        return currencyService.addCurrency(currencyDTO);
    }

    // Get Currency By id
    @GetMapping("/{id}")
    public CurrencyDTO getCurrencyById(@PathVariable Integer id) {
        return currencyService.getCurrencyById(id);
    }

    // Get All Currencies
    @GetMapping
    public List<CurrencyDTO> getAllCurrencies() {
        return currencyService.getAllCurrencies();
    }

    // Update Currency
    @PutMapping("/{id}")
    public CurrencyDTO updateCurrency(@PathVariable Integer id,
                                      @RequestBody CurrencyDTO currencyDTO) {
        return currencyService.updateCurrency(id, currencyDTO);
    }

    // Delete Currency
    @DeleteMapping("/{id}")
    public String deleteCurrency(@PathVariable Integer id) {
        currencyService.deleteCurrency(id);
        return "Currency deleted successfully";
    }
}