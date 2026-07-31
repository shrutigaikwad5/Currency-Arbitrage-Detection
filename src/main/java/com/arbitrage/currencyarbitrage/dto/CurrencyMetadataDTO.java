package com.arbitrage.currencyarbitrage.dto;

import lombok.Data;

@Data
public class CurrencyMetadataDTO {

    private String currencyCode;
    private String currencyName;
    private String country;
    private String symbol;
}