package com.arbitrage.currencyarbitrage.entity;
import jakarta.persistence.*;
@Entity
@Table(name = "currency")

public class Currency {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "currency_name", nullable = false)
    private String currencyName;

    @Column(name = "currency_code", nullable = false, unique = true)
    private String currencyCode;

    @Column(nullable = false)
    private String symbol;

    @Column(nullable = false)
    private String country;

    @Column(nullable = false)
    private Boolean status;

    public Currency() {
    }
    public Currency(String currencyName, String currencyCode, String symbol, String country, Boolean status) {
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
