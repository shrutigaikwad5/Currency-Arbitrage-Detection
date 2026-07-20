package com.arbitrage.currencyarbitrage.service;

import java.util.List;

import com.arbitrage.currencyarbitrage.dto.CurrencyDTO;

public interface CurrencyService {

    // Add new currency
    CurrencyDTO addCurrency(CurrencyDTO currencyDTO);

    // Get currency by ID
    CurrencyDTO getCurrencyById(Integer id);

    // Get all currencies
    List<CurrencyDTO> getAllCurrencies();

    // Update currency
    CurrencyDTO updateCurrency(Integer id, CurrencyDTO currencyDTO);

    // Delete currency
    void deleteCurrency(Integer id);

}