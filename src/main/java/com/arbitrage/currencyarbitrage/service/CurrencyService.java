package com.arbitrage.currencyarbitrage.service;

import java.util.List;

import com.arbitrage.currencyarbitrage.dto.CurrencyDTO;

public interface CurrencyService {

    CurrencyDTO addCurrency(CurrencyDTO currencyDTO);
    CurrencyDTO getCurrencyById(Integer id);
    List<CurrencyDTO> getAllCurrencies();
    CurrencyDTO updateCurrency(Integer id, CurrencyDTO currencyDTO);
    void deleteCurrency(Integer id);

    // Fetch currencies from external provider (Frankfurter) and persist new ones
    void fetchAndSaveCurrencies();

}