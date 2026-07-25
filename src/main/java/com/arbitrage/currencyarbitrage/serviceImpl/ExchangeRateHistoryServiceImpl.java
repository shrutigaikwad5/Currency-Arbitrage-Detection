package com.arbitrage.currencyarbitrage.serviceImpl;

import com.arbitrage.currencyarbitrage.dto.api.FrankfurterHistoryResponse;
import com.arbitrage.currencyarbitrage.dto.response.ExchangeRateHistoryResponse;
import com.arbitrage.currencyarbitrage.service.ExchangeRateHistoryService;
import com.arbitrage.currencyarbitrage.service.api.frankfuter.external.FrankfurterHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExchangeRateHistoryServiceImpl
        implements ExchangeRateHistoryService {

    private final FrankfurterHistoryService historyService;

    @Override
    public void syncHistory() {

        FrankfurterHistoryResponse response =
                historyService.getHistory(
                        "2025-01-01",
                        "2025-12-31",
                        "USD");

        // Loop over all dates

        // Save every record into exchange_rate_history

    }

    @Override
    public List<ExchangeRateHistoryResponse> getHistory(String baseCurrencyCode, String targetCurrencyCode) {
        return List.of();
    }

    @Override
    public List<ExchangeRateHistoryResponse> getHistoryByDateRange(String baseCurrencyCode, String targetCurrencyCode, LocalDate startDate, LocalDate endDate) {
        return List.of();
    }

    @Override
    public void saveLatestRateHistory() {

    }

    @Override
    public void syncHistoricalRates(String baseCurrencyCode, LocalDate startDate, LocalDate endDate) {

    }
}
