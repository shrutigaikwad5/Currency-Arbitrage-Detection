package com.arbitrage.currencyarbitrage.serviceImpl;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.arbitrage.currencyarbitrage.config.CurrencyMetadataLoader;
import com.arbitrage.currencyarbitrage.dto.CurrencyMetadataDTO;
import com.arbitrage.currencyarbitrage.util.CurrencyMetadata;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.arbitrage.currencyarbitrage.dto.CurrencyDTO;
import com.arbitrage.currencyarbitrage.entity.Currency;
import com.arbitrage.currencyarbitrage.mapper.CurrencyMapper;
import com.arbitrage.currencyarbitrage.repository.CurrencyRepository;
import com.arbitrage.currencyarbitrage.service.CurrencyService;
import com.arbitrage.currencyarbitrage.service.api.frankfurter.external.FrankfurterCurrencyService;

@Service
public class CurrencyServiceImpl implements CurrencyService {

    @Autowired
    private CurrencyRepository currencyRepository;

    @Autowired
    private FrankfurterCurrencyService frankfurterCurrencyService;

    @Autowired
    private CurrencyMetadataLoader metadataLoader;

    @Override
    public CurrencyDTO addCurrency(CurrencyDTO currencyDTO) {

        Currency currency = CurrencyMapper.toEntity(currencyDTO);

        Currency savedCurrency = currencyRepository.save(currency);

        return CurrencyMapper.toDTO(savedCurrency);
    }

    @Override
    public CurrencyDTO getCurrencyById(Integer id) {

        Currency currency = currencyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Currency not found with ID : " + id));

        return CurrencyMapper.toDTO(currency);
    }

    @Override
    public List<CurrencyDTO> getAllCurrencies() {

        List<Currency> currencyList = currencyRepository.findAll();

        return currencyList.stream()
                .map(CurrencyMapper::toDTO)
                .collect(Collectors.toList());
    }

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

    @Override
    public void deleteCurrency(Integer id) {

        Currency currency = currencyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Currency not found with ID : " + id));

        currencyRepository.delete(currency);
    }

    @Override
    public void fetchAndSaveCurrencies() {

        Map<String, String> currencies = frankfurterCurrencyService.getCurrencies();

        if (currencies == null || currencies.isEmpty()) return;

        for (Map.Entry<String, String> e : currencies.entrySet()) {
            String code = e.getKey();
            String name = e.getValue();

            boolean exists = currencyRepository.findByCurrencyCode(code).isPresent();
            if (exists) continue;

            // symbol, country unknown from API — set sensible defaults
            CurrencyMetadataDTO metadata = metadataLoader.get(code);

            String country = "Unknown";
            String symbol = code;

            if (metadata != null) {
                country = metadata.getCountry();
                symbol = metadata.getSymbol();
            }

            Boolean status = true;

            Currency c = new Currency(
                    name,
                    code,
                    symbol,
                    country,
                    status
            );
        }
    }

}