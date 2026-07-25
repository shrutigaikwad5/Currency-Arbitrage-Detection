package com.arbitrage.currencyarbitrage.dto.request;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ExchangeRateRequest {

    private String baseCurrency;

    private String targetCurrency;

    private BigDecimal rate;

    private String provider;

}

