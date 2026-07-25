package com.arbitrage.currencyarbitrage.service.api.frankfuter.external;

import com.arbitrage.currencyarbitrage.dto.api.FrankfurterLatestResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
@RequiredArgsConstructor
public class FrankfurterRateService {

    private final RestClient restClient;

    public FrankfurterLatestResponse getLatestRates(String baseCurrency) {
        return restClient.get()
                .uri("https://api.frankfurter.app/latest?from={base}",baseCurrency)
                .retrieve()
                .body(FrankfurterLatestResponse.class);
    }
}
