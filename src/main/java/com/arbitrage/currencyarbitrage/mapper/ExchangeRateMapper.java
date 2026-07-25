package com.arbitrage.currencyarbitrage.mapper;

import com .arbitrage.currencyarbitrage.dto.request.ExchangeRateRequest;
import com.arbitrage.currencyarbitrage.dto.response.ExchangeRateResponse;
import com.arbitrage.currencyarbitrage.entity.Currency;
import com.arbitrage.currencyarbitrage.entity.ExchangeRate;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class ExchangeRateMapper {

    public ExchangeRate toEntity(
            ExchangeRateRequest request,
            Currency baseCurrency,
            Currency targetCurrency) {

        ExchangeRate exchangeRate = new ExchangeRate();

        exchangeRate.setBaseCurrency(baseCurrency);
        exchangeRate.setTargetCurrency(targetCurrency);
        exchangeRate.setRate(request.getRate());
        exchangeRate.setProvider(request.getProvider());
        exchangeRate.setLastUpdated(LocalDateTime.now());

        return exchangeRate;
    }

    public void updateEntity(
            ExchangeRate exchangeRate,
            ExchangeRateRequest request,
            Currency baseCurrency,
            Currency targetCurrency) {

        exchangeRate.setBaseCurrency(baseCurrency);
        exchangeRate.setTargetCurrency(targetCurrency);
        exchangeRate.setRate(request.getRate());
        exchangeRate.setProvider(request.getProvider());
        exchangeRate.setLastUpdated(LocalDateTime.now());
    }

    public ExchangeRateResponse toResponse(
            ExchangeRate exchangeRate) {

        return ExchangeRateResponse.builder()
                .id(exchangeRate.getId())
                .baseCurrency(
                        exchangeRate.getBaseCurrency().getCurrencyCode()
                )
                .targetCurrency(
                        exchangeRate.getTargetCurrency().getCurrencyCode()
                )
                .rate(exchangeRate.getRate())
                .provider(exchangeRate.getProvider())
                .lastUpdated(exchangeRate.getLastUpdated())
                .build();
    }
}