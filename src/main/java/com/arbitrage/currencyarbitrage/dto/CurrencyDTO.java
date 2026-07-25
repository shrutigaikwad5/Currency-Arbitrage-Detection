package com.arbitrage.currencyarbitrage.dto;

import lombok.Getter;

@Getter
public class CurrencyDTO {
    private Integer id;
    private String currencyName;
    private String currencyCode;
    private String symbol;
    private String country;
    private Boolean status;

    public CurrencyDTO() {
    }

    public CurrencyDTO(Integer id, String currencyName, String currencyCode,
                       String symbol, String country, Boolean status) {
        this.id = id;
        this.currencyName = currencyName;
        this.currencyCode = currencyCode;
        this.symbol = symbol;
        this.country = country;
        this.status = status;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setCurrencyName(String currencyName) {
        this.currencyName = currencyName;
    }

    public void setCurrencyCode(String currencyCode) {
        this.currencyCode = currencyCode;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }
}
