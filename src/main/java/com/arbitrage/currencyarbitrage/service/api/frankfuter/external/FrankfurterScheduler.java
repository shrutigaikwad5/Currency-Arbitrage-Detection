package com.arbitrage.currencyarbitrage.service.api.frankfuter.external;

import com.arbitrage.currencyarbitrage.service.CurrencyService;
import com.arbitrage.currencyarbitrage.service.ExchangeRateService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FrankfurterScheduler {

    private final CurrencyService currencyService;

    private final ExchangeRateService exchangeRateService;

    @Scheduled(cron = "0 0 0 * * *")
    public void getAllCurrencies(){

        currencyService.getAllCurrencies();

    }

    @Scheduled(fixedRate = 900000)
    public void syncRates(){

        exchangeRateService.syncLatestRates();

    }

}