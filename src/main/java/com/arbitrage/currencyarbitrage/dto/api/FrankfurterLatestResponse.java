package com.arbitrage.currencyarbitrage.dto.api;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Map;

@Data
public class FrankfurterLatestResponse {

    private Double amount;

    private String base;

    private String date;

    private Map<String, BigDecimal> rates;

}