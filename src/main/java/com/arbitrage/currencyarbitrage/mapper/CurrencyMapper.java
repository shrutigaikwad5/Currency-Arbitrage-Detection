package com.arbitrage.currencyarbitrage.mapper;

import com.arbitrage.currencyarbitrage.dto.CurrencyDTO;
import com.arbitrage.currencyarbitrage.entity.Currency;

public class CurrencyMapper {
    public static CurrencyDTO toDTO(Currency currency) {

        if (currency == null) {
            return null;
        }

        CurrencyDTO dto = new CurrencyDTO();

        dto.setId(currency.getId());
        dto.setCurrencyName(currency.getCurrencyName());
        dto.setCurrencyCode(currency.getCurrencyCode());
        dto.setSymbol(currency.getSymbol());
        dto.setCountry(currency.getCountry());
        dto.setStatus(currency.getStatus());

        return dto;
    }

    public static Currency toEntity(CurrencyDTO dto) {

        if (dto == null) {
            return null;
        }

        Currency currency = new Currency();

        currency.setId(dto.getId());
        currency.setCurrencyName(dto.getCurrencyName());
        currency.setCurrencyCode(dto.getCurrencyCode());
        currency.setSymbol(dto.getSymbol());
        currency.setCountry(dto.getCountry());
        currency.setStatus(dto.getStatus());

        return currency;
    }
}
