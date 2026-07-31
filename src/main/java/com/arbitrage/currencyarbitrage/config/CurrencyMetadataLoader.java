package com.arbitrage.currencyarbitrage.config;

import com.arbitrage.currencyarbitrage.dto.CurrencyMetadataDTO;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class CurrencyMetadataLoader {

    private final Map<String, CurrencyMetadataDTO> metadataMap = new HashMap<>();

    @PostConstruct
    public void load() {

        try {

            ObjectMapper mapper = new ObjectMapper();

            InputStream inputStream = getClass()
                    .getClassLoader()
                    .getResourceAsStream("currency-metadata.json");

            List<CurrencyMetadataDTO> list =
                    mapper.readValue(inputStream,
                            new TypeReference<List<CurrencyMetadataDTO>>() {
                            });

            list.forEach(item ->
                    metadataMap.put(item.getCurrencyCode(), item));

            System.out.println("Loaded " + metadataMap.size() + " currencies.");

        } catch (Exception e) {

            throw new RuntimeException("Unable to load currency metadata", e);
        }
    }

    public CurrencyMetadataDTO get(String code) {
        return metadataMap.get(code);
    }

}