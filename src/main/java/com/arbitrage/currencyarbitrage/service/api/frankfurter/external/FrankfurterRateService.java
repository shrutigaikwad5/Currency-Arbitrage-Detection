package com.arbitrage.currencyarbitrage.service.api.frankfurter.external;

import com.arbitrage.currencyarbitrage.dto.api.FrankfurterLatestResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class FrankfurterRateService {

    private final RestTemplate restClient;

    public FrankfurterLatestResponse getLatestRates(String baseCurrency) {
        FrankfurterLatestResponse response = restClient.getForObject(
                "https://api.frankfurter.dev/v1/latest?base={base}",
                FrankfurterLatestResponse.class,
                baseCurrency
        );

        System.out.println(response);

        return response;
    }
}
