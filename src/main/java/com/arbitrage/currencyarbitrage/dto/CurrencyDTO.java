package com.arbitrage.currencyarbitrage.dto;

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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCurrencyName() {
        return currencyName;
    }

    public void setCurrencyName(String currencyName) {
        this.currencyName = currencyName;
    }

    public String getCurrencyCode() {
        return currencyCode;
    }

    public void setCurrencyCode(String currencyCode) {
        this.currencyCode = currencyCode;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }
}
