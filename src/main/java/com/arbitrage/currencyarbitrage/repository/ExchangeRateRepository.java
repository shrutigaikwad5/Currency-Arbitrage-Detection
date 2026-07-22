package com.arbitrage.currencyarbitrage.repository;

import com.arbitrage.currencyarbitrage.entity.Currency;
import com.arbitrage.currencyarbitrage.entity.ExchangeRate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ExchangeRateRepository extends JpaRepository<ExchangeRate, Long> {

    Optional<ExchangeRate> findByBaseCurrencyAndTargetCurrency(Currency baseCurrency, Currency targetCurrency);
}