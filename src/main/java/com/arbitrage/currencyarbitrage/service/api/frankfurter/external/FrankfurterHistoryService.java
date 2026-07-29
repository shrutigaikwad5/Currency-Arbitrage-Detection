package com.arbitrage.currencyarbitrage.service.api.frankfurter.external;

import com.arbitrage.currencyarbitrage.dto.api.FrankfurterHistoryResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class FrankfurterHistoryService {

    private final RestTemplate restClient;

    public FrankfurterHistoryService(RestTemplate restClient) {
        this.restClient = restClient;
    }

    public FrankfurterHistoryResponse getHistory(
            String startDate,
            String endDate,
            String baseCurrency) {

        String url = "https://api.frankfurter.app/{startDate}..{endDate}?from={base}";
        return restClient.getForObject(
                url,
                FrankfurterHistoryResponse.class,
                startDate,
                endDate,
                baseCurrency
        );
    }
}

