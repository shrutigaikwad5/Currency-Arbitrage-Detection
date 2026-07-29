package com.arbitrage.currencyarbitrage.serviceImpl;

import com.arbitrage.currencyarbitrage.dto.api.FrankfurterLatestResponse;
import com.arbitrage.currencyarbitrage.dto.request.ExchangeRateRequest;
import com.arbitrage.currencyarbitrage.dto.response.ExchangeRateResponse;
import com.arbitrage.currencyarbitrage.entity.Currency;
import com.arbitrage.currencyarbitrage.entity.ExchangeRate;
import com.arbitrage.currencyarbitrage.entity.ExchangeRateHistory;
import com.arbitrage.currencyarbitrage.repository.CurrencyRepository;
import com.arbitrage.currencyarbitrage.repository.ExchangeRateRepository;
import com.arbitrage.currencyarbitrage.service.ExchangeRateService;
import com.arbitrage.currencyarbitrage.service.api.frankfurter.external.FrankfurterRateService;
import com.arbitrage.currencyarbitrage.dto.response.ExchangeRateResponse;
import com.arbitrage.currencyarbitrage.repository.ExchangeRateHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExchangeRateServiceImpl
        implements ExchangeRateService {

    private final CurrencyRepository currencyRepository;

    private final ExchangeRateRepository exchangeRateRepository;

    private final FrankfurterRateService rateService;

    private final ExchangeRateHistoryRepository historyRepository;

    @Override
    public ExchangeRateResponse createExchangeRate(ExchangeRateRequest request) {
        Currency base = currencyRepository.findByCurrencyCode(request.getBaseCurrency())
                .orElseThrow(() -> new IllegalArgumentException("Base currency not found: " + request.getBaseCurrency()));

        Currency target = currencyRepository.findByCurrencyCode(request.getTargetCurrency())
                .orElseThrow(() -> new IllegalArgumentException("Target currency not found: " + request.getTargetCurrency()));

        ExchangeRate exchangeRate = exchangeRateRepository
                .findByBaseCurrencyAndTargetCurrency(base, target)
                .orElse(new ExchangeRate());

        exchangeRate.setBaseCurrency(base);
        exchangeRate.setTargetCurrency(target);
        exchangeRate.setRate(request.getRate());
        exchangeRate.setProvider(request.getProvider());

        exchangeRate = exchangeRateRepository.save(exchangeRate);

        return mapToResponse(exchangeRate);
    }

    @Override
    public ExchangeRateResponse updateExchangeRate(Long id, ExchangeRateRequest request) {
        ExchangeRate exchangeRate = exchangeRateRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("ExchangeRate not found: " + id));

        if (request.getBaseCurrency() != null) {
            Currency base = currencyRepository.findByCurrencyCode(request.getBaseCurrency())
                    .orElseThrow(() -> new IllegalArgumentException("Base currency not found: " + request.getBaseCurrency()));
            exchangeRate.setBaseCurrency(base);
        }

        if (request.getTargetCurrency() != null) {
            Currency target = currencyRepository.findByCurrencyCode(request.getTargetCurrency())
                    .orElseThrow(() -> new IllegalArgumentException("Target currency not found: " + request.getTargetCurrency()));
            exchangeRate.setTargetCurrency(target);
        }

        if (request.getRate() != null) {
            exchangeRate.setRate(request.getRate());
        }

        if (request.getProvider() != null) {
            exchangeRate.setProvider(request.getProvider());
        }

        exchangeRate = exchangeRateRepository.save(exchangeRate);

        return mapToResponse(exchangeRate);
    }

    @Override
    public ExchangeRateResponse getExchangeRateById(Long id) {
        return exchangeRateRepository.findById(id)
                .map(this::mapToResponse)
                .orElse(null);
    }

    @Override
    public ExchangeRateResponse getExchangeRate(String baseCurrencyCode, String targetCurrencyCode) {
        Currency base = currencyRepository.findByCurrencyCode(baseCurrencyCode).orElse(null);
        Currency target = currencyRepository.findByCurrencyCode(targetCurrencyCode).orElse(null);

        if (base == null || target == null) return null;

        return exchangeRateRepository.findByBaseCurrencyAndTargetCurrency(base, target)
                .map(this::mapToResponse)
                .orElse(null);
    }

    @Override
    public List<ExchangeRateResponse> getAllExchangeRates() {
        return exchangeRateRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public void deleteExchangeRate(Long id) {
        if (exchangeRateRepository.existsById(id)) {
            exchangeRateRepository.deleteById(id);
        }
    }

    private ExchangeRateResponse mapToResponse(ExchangeRate exchangeRate) {
        if (exchangeRate == null) return null;

        return ExchangeRateResponse.builder()
                .id(exchangeRate.getId())
                .baseCurrency(exchangeRate.getBaseCurrency().getCurrencyCode())
                .targetCurrency(exchangeRate.getTargetCurrency().getCurrencyCode())
                .rate(exchangeRate.getRate())
                .provider(exchangeRate.getProvider())
                .lastUpdated(exchangeRate.getLastUpdated())
                .build();
    }

    @Override
    public void syncLatestRates() {

        List<Currency> currencies =
                currencyRepository.findAll();

        for(Currency base : currencies){

            FrankfurterLatestResponse response =
                    rateService.getLatestRates(base.getCurrencyCode());

            System.out.println("Base = " + base.getCurrencyCode());

            if (response == null) {
                System.out.println("Response is NULL");
            } else {
                System.out.println("Rates = " + response.getRates());
            }

            response.getRates().forEach((targetCode,rate)->{

                Currency target = currencyRepository
                        .findByCurrencyCode(targetCode)
                        .orElse(null);

                if (target == null) {
                    System.out.println("Currency not found : " + targetCode);
                    return;
                }

                ExchangeRate exchangeRate = exchangeRateRepository
                        .findByBaseCurrencyAndTargetCurrency(base, target)
                        .orElse(new ExchangeRate());

                exchangeRate.setBaseCurrency(base);
                exchangeRate.setTargetCurrency(target);
                exchangeRate.setRate(rate);
                exchangeRate.setProvider("Frankfurter");

                exchangeRateRepository.save(exchangeRate);

                ExchangeRateHistory history = new ExchangeRateHistory();

                history.setBaseCurrency(base);
                history.setTargetCurrency(target);
                history.setExchangeRate(rate);
                history.setOpenRate(rate);
                history.setHighRate(rate);
                history.setLowRate(rate);
                history.setCloseRate(rate);
                history.setProvider("Frankfurter");
                history.setSource("Frankfurter API");

                historyRepository.save(history);

                System.out.println(base.getCurrencyCode()
                        + " -> "
                        + targetCode
                        + " = "
                        + rate);
            });
        }
    }

            }





