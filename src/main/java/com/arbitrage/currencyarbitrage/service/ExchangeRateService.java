package com.arbitrage.currencyarbitrage.service;



import com.arbitrage.currencyarbitrage.dto.request.ExchangeRateRequest;
import com.arbitrage.currencyarbitrage.dto.response.ExchangeRateResponse;

import java.util.List;

public interface ExchangeRateService {

    ExchangeRateResponse createExchangeRate(ExchangeRateRequest request);

    ExchangeRateResponse updateExchangeRate(Long id, ExchangeRateRequest request);

    ExchangeRateResponse getExchangeRateById(Long id);

    ExchangeRateResponse getExchangeRate(
            String baseCurrencyCode,
            String targetCurrencyCode
    );

    List<ExchangeRateResponse> getAllExchangeRates();

    void deleteExchangeRate(Long id);

    void syncLatestRates();
}