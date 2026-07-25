package com.arbitrage.currencyarbitrage.service.api.frankfuter.external;

import com.arbitrage.currencyarbitrage.dto.api.FrankfurterHistoryResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class FrankfurterHistoryService {

    private final RestClient restClient;

    public FrankfurterHistoryService(RestClient restClient) {
        this.restClient = restClient;
    }

    public FrankfurterHistoryResponse getHistory(
            String startDate,
            String endDate,
            String baseCurrency) {

        return restClient.get()
                .uri(
                        "https://api.frankfurter.app/{startDate}..{endDate}?from={base}",
                        startDate,
                        endDate,
                        baseCurrency
                )
                .retrieve()
                .body(FrankfurterHistoryResponse.class);
    }
}
