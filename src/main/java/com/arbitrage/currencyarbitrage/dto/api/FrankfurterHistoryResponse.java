package com.arbitrage.currencyarbitrage.dto.api;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Map;

@Data
public class FrankfurterHistoryResponse {

    private Double amount;

    private String base;

    private String start_date;

    private String end_date;

    private Map<String, Map<String, BigDecimal>> rates;

}
