package com.arbitrage.currencyarbitrage.service.api.frankfurter.external;



import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class FrankfurterCurrencyService {

    private final RestTemplate restClient;

    public FrankfurterCurrencyService(RestTemplate restClient) {
        this.restClient = restClient;
    }

    public Map<String, String> getCurrencies() {

        @SuppressWarnings("unchecked")
        Map<String, String> map = restClient.getForObject(
                "https://api.frankfurter.app/currencies",
                Map.class
        );

        return map;
    }
}

