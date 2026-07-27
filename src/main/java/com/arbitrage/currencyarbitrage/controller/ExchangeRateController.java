package com.arbitrage.currencyarbitrage.controller;

import com.arbitrage.currencyarbitrage.dto.request.ExchangeRateRequest;
import com.arbitrage.currencyarbitrage.dto.response.ExchangeRateResponse;
import com.arbitrage.currencyarbitrage.service.ExchangeRateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exchange-rate")
@RequiredArgsConstructor
public class ExchangeRateController {

    private final ExchangeRateService exchangeRateService;



    // Create Exchange Rate
    @PostMapping
    public ExchangeRateResponse createExchangeRate(
            @RequestBody ExchangeRateRequest request) {

        return exchangeRateService.createExchangeRate(request);
    }

    // Update Exchange Rate
    @PutMapping("/{id}")
    public ExchangeRateResponse updateExchangeRate(
            @PathVariable Long id,
            @RequestBody ExchangeRateRequest request) {

        return exchangeRateService.updateExchangeRate(id, request);
    }

    // Get By Id
    @GetMapping("/{id}")
    public ExchangeRateResponse getExchangeRateById(
            @PathVariable Long id) {

        return exchangeRateService.getExchangeRateById(id);
    }

    // Get By Currency Codes
    @GetMapping("/search")
    public ExchangeRateResponse getExchangeRate(
            @RequestParam String baseCurrency,
            @RequestParam String targetCurrency) {

        return exchangeRateService.getExchangeRate(
                baseCurrency,
                targetCurrency
        );
    }

    // Get All
    @GetMapping
    public List<ExchangeRateResponse> getAllExchangeRates() {

        return exchangeRateService.getAllExchangeRates();
    }

    // Delete
    @DeleteMapping("/{id}")
    public String deleteExchangeRate(
            @PathVariable Long id) {

        exchangeRateService.deleteExchangeRate(id);

        return "Exchange Rate Deleted Successfully";
    }

    // Sync Latest Rates
    @PostMapping("/sync")
    public String syncLatestRates() {

        System.out.println("syncLatestRates() started");
        exchangeRateService.syncLatestRates();

        return "Latest Exchange Rates Synced Successfully";
    }
}