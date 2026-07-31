package com.arbitrage.currencyarbitrage.service.api.frankfurter.external;

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

        // Fetch from external provider and save into DB
        currencyService.fetchAndSaveCurrencies();

    }

    @Scheduled(fixedRate = 900000)
    public void syncRates(){

        exchangeRateService.syncLatestRates();

    }

}
