package com.arbitrage.currencyarbitrage.service;



import com.arbitrage.currencyarbitrage.dto.response.ExchangeRateHistoryResponse;

import java.time.LocalDate;
import java.util.List;

public interface ExchangeRateHistoryService {

    void syncHistory();

    List<ExchangeRateHistoryResponse> getHistory(
            String baseCurrencyCode,
            String targetCurrencyCode
    );

    List<ExchangeRateHistoryResponse> getHistoryByDateRange(
            String baseCurrencyCode,
            String targetCurrencyCode,
            LocalDate startDate,
            LocalDate endDate
    );

    void saveLatestRateHistory();

    void syncHistoricalRates(
            String baseCurrencyCode,
            LocalDate startDate,
            LocalDate endDate
    );
}