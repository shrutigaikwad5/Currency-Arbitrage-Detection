package com.arbitrage.currencyarbitrage.util;

import java.util.HashMap;
import java.util.Map;

public class CurrencyMetadata {

    public static final Map<String, String> COUNTRY_MAP = new HashMap<>();
    public static final Map<String, String> SYMBOL_MAP = new HashMap<>();

    static {

        COUNTRY_MAP.put("USD", "United States");
        COUNTRY_MAP.put("INR", "India");
        COUNTRY_MAP.put("EUR", "European Union");
        COUNTRY_MAP.put("GBP", "United Kingdom");
        COUNTRY_MAP.put("AUD", "Australia");
        COUNTRY_MAP.put("CAD", "Canada");
        COUNTRY_MAP.put("CHF", "Switzerland");
        COUNTRY_MAP.put("CNY", "China");
        COUNTRY_MAP.put("JPY", "Japan");
        COUNTRY_MAP.put("NZD", "New Zealand");
        COUNTRY_MAP.put("SGD", "Singapore");
        COUNTRY_MAP.put("HKD", "Hong Kong");
        COUNTRY_MAP.put("MXN", "Mexico");
        COUNTRY_MAP.put("BRL", "Brazil");
        COUNTRY_MAP.put("ZAR", "South Africa");
        COUNTRY_MAP.put("SEK", "Sweden");
        COUNTRY_MAP.put("NOK", "Norway");
        COUNTRY_MAP.put("DKK", "Denmark");
        COUNTRY_MAP.put("PLN", "Poland");
        COUNTRY_MAP.put("CZK", "Czech Republic");
        COUNTRY_MAP.put("RON", "Romania");
        COUNTRY_MAP.put("TRY", "Turkey");
        COUNTRY_MAP.put("THB", "Thailand");
        COUNTRY_MAP.put("MYR", "Malaysia");
        COUNTRY_MAP.put("PHP", "Philippines");
        COUNTRY_MAP.put("IDR", "Indonesia");
        COUNTRY_MAP.put("KRW", "South Korea");
        COUNTRY_MAP.put("ILS", "Israel");
        COUNTRY_MAP.put("ISK", "Iceland");
        COUNTRY_MAP.put("HUF", "Hungary");

        SYMBOL_MAP.put("USD", "$");
        SYMBOL_MAP.put("INR", "₹");
        SYMBOL_MAP.put("EUR", "€");
        SYMBOL_MAP.put("GBP", "£");
        SYMBOL_MAP.put("AUD", "A$");
        SYMBOL_MAP.put("CAD", "C$");
        SYMBOL_MAP.put("CHF", "CHF");
        SYMBOL_MAP.put("CNY", "¥");
        SYMBOL_MAP.put("JPY", "¥");
        SYMBOL_MAP.put("NZD", "NZ$");
        SYMBOL_MAP.put("SGD", "S$");
        SYMBOL_MAP.put("HKD", "HK$");
        SYMBOL_MAP.put("MXN", "$");
        SYMBOL_MAP.put("BRL", "R$");
        SYMBOL_MAP.put("ZAR", "R");
        SYMBOL_MAP.put("SEK", "kr");
        SYMBOL_MAP.put("NOK", "kr");
        SYMBOL_MAP.put("DKK", "kr");
        SYMBOL_MAP.put("PLN", "zł");
        SYMBOL_MAP.put("CZK", "Kč");
        SYMBOL_MAP.put("RON", "lei");
        SYMBOL_MAP.put("TRY", "₺");
        SYMBOL_MAP.put("THB", "฿");
        SYMBOL_MAP.put("MYR", "RM");
        SYMBOL_MAP.put("PHP", "₱");
        SYMBOL_MAP.put("IDR", "Rp");
        SYMBOL_MAP.put("KRW", "₩");
        SYMBOL_MAP.put("ILS", "₪");
        SYMBOL_MAP.put("ISK", "kr");
        SYMBOL_MAP.put("HUF", "Ft");
    }

    public static String getCountry(String code) {
        return COUNTRY_MAP.getOrDefault(code, "Unknown");
    }

    public static String getSymbol(String code) {
        return SYMBOL_MAP.getOrDefault(code, code);
    }
}
