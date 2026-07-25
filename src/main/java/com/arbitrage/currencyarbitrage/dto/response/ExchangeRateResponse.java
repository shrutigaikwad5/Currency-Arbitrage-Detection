package com.arbitrage.currencyarbitrage.dto.response;


import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class ExchangeRateResponse {

    private Long id;

    private String baseCurrency;

    private String targetCurrency;

    private BigDecimal rate;

    private String provider;

    private LocalDateTime lastUpdated;

}
