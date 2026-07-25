package com.arbitrage.currencyarbitrage.serviceImpl;

import com.arbitrage.currencyarbitrage.dto.api.FrankfurterLatestResponse;
import com.arbitrage.currencyarbitrage.dto.request.ExchangeRateRequest;
import com.arbitrage.currencyarbitrage.dto.response.ExchangeRateResponse;
import com.arbitrage.currencyarbitrage.entity.Currency;
import com.arbitrage.currencyarbitrage.repository.CurrencyRepository;
import com.arbitrage.currencyarbitrage.repository.ExchangeRateRepository;
import com.arbitrage.currencyarbitrage.service.ExchangeRateService;
import com.arbitrage.currencyarbitrage.service.api.frankfuter.external.FrankfurterRateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExchangeRateServiceImpl
        implements ExchangeRateService {

    private final CurrencyRepository currencyRepository;

    private final ExchangeRateRepository exchangeRateRepository;

    private final FrankfurterRateService rateService;

    @Override
    public ExchangeRateResponse createExchangeRate(ExchangeRateRequest request) {
        return null;
    }

    @Override
    public ExchangeRateResponse updateExchangeRate(Long id, ExchangeRateRequest request) {
        return null;
    }

    @Override
    public ExchangeRateResponse getExchangeRateById(Long id) {
        return null;
    }

    @Override
    public ExchangeRateResponse getExchangeRate(String baseCurrencyCode, String targetCurrencyCode) {
        return null;
    }

    @Override
    public List<ExchangeRateResponse> getAllExchangeRates() {
        return List.of();
    }

    @Override
    public void deleteExchangeRate(Long id) {

    }

    @Override
    public void syncLatestRates() {

        List<Currency> currencies =
                currencyRepository.findAll();

        for(Currency base : currencies){

            FrankfurterLatestResponse response =
                    rateService.getLatestRates(base.getCurrencyCode());

            response.getRates().forEach((targetCode,rate)->{

                // Find target currency

                // Update exchange_rate

                // Save history

            });

        }

    }

}
