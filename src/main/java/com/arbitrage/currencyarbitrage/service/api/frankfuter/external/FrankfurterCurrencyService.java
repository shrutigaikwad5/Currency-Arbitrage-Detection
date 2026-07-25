package com.arbitrage.currencyarbitrage.service.api.frankfuter.external;


import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Service
public class FrankfurterCurrencyService {

    private final RestClient restClient;

    public FrankfurterCurrencyService(RestClient restClient) {
        this.restClient = restClient;
    }

    public Map<String, String> getCurrencies() {

        return restClient.get()
                .uri("https://api.frankfurter.app/currencies")
                .retrieve()
                .body(
                        new ParameterizedTypeReference<Map<String, String>>() {
                        }
                );
    }
}
