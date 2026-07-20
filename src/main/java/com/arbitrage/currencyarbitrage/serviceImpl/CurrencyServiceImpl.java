package com.arbitrage.currencyarbitrage.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.arbitrage.currencyarbitrage.dto.CurrencyDTO;
import com.arbitrage.currencyarbitrage.entity.Currency;
import com.arbitrage.currencyarbitrage.mapper.CurrencyMapper;
import com.arbitrage.currencyarbitrage.repository.CurrencyRepository;
import com.arbitrage.currencyarbitrage.service.CurrencyService;

@Service
public class CurrencyServiceImpl implements CurrencyService {

    @Autowired
    private CurrencyRepository currencyRepository;

    // Add Currency
    @Override
    public CurrencyDTO addCurrency(CurrencyDTO currencyDTO) {

        Currency currency = CurrencyMapper.toEntity(currencyDTO);

        Currency savedCurrency = currencyRepository.save(currency);

        return CurrencyMapper.toDTO(savedCurrency);
    }

    // Get Currency By id
    @Override
    public CurrencyDTO getCurrencyById(Integer id) {

        Currency currency = currencyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Currency not found with ID : " + id));

        return CurrencyMapper.toDTO(currency);
    }

    // Get All Currencies
    @Override
    public List<CurrencyDTO> getAllCurrencies() {

        List<Currency> currencyList = currencyRepository.findAll();

        return currencyList.stream()
                .map(CurrencyMapper::toDTO)
                .collect(Collectors.toList());
    }

    // Update Currency
    @Override
    public CurrencyDTO updateCurrency(Integer id, CurrencyDTO currencyDTO) {

        Currency existingCurrency = currencyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Currency not found with ID : " + id));

        existingCurrency.setCurrencyName(currencyDTO.getCurrencyName());
        existingCurrency.setCurrencyCode(currencyDTO.getCurrencyCode());
        existingCurrency.setSymbol(currencyDTO.getSymbol());
        existingCurrency.setCountry(currencyDTO.getCountry());
        existingCurrency.setStatus(currencyDTO.getStatus());

        Currency updatedCurrency = currencyRepository.save(existingCurrency);

        return CurrencyMapper.toDTO(updatedCurrency);
    }

    // Delete Currency
    @Override
    public void deleteCurrency(Integer id) {

        Currency currency = currencyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Currency not found with ID : " + id));

        currencyRepository.delete(currency);
    }

}