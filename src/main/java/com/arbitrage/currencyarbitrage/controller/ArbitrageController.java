package com.arbitrage.currencyarbitrage.controller;

import com.arbitrage.currencyarbitrage.service.ArbitrageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/arbitrage")
@RequiredArgsConstructor
public class ArbitrageController {

    private final ArbitrageService arbitrageService;

    // Detect Arbitrage Opportunity
    @GetMapping("/detect")
    public List<String> detectArbitrage() {
        return arbitrageService.detectArbitrage();
    }
}