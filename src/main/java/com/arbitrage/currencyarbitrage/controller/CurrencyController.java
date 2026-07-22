package com.arbitrage.currencyarbitrage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.arbitrage.currencyarbitrage.dto.CurrencyDTO;
import com.arbitrage.currencyarbitrage.service.CurrencyService;

@RestController
@RequestMapping("/api/currencies")
public class CurrencyController {

    @Autowired
    private CurrencyService currencyService;
    @PostMapping
    public ResponseEntity<CurrencyDTO> addCurrency(@RequestBody CurrencyDTO currencyDTO) {
        CurrencyDTO savedCurrency = currencyService.addCurrency(currencyDTO);
        return new ResponseEntity<>(savedCurrency, HttpStatus.CREATED);
    }
    @GetMapping("/{id}")
    public ResponseEntity<CurrencyDTO> getCurrencyById(@PathVariable Integer id) {
        CurrencyDTO currencyDTO = currencyService.getCurrencyById(id);
        return ResponseEntity.ok(currencyDTO);
    }
    @GetMapping
    public ResponseEntity<List<CurrencyDTO>> getAllCurrencies() {
        List<CurrencyDTO> currencies = currencyService.getAllCurrencies();
        return ResponseEntity.ok(currencies);
    }
    @PutMapping("/{id}")
    public ResponseEntity<CurrencyDTO> updateCurrency(@PathVariable Integer id,
                                                      @RequestBody CurrencyDTO currencyDTO) {
        CurrencyDTO updatedCurrency = currencyService.updateCurrency(id, currencyDTO);
        return ResponseEntity.ok(updatedCurrency);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCurrency(@PathVariable Integer id) {
        currencyService.deleteCurrency(id);
        return ResponseEntity.ok("Currency deleted successfully.");
    }
}