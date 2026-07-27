package com.arbitrage.currencyarbitrage.repository;

import com.arbitrage.currencyarbitrage.entity.Currency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CurrencyRepository extends JpaRepository<Currency, Integer> {


    Optional<Currency> findByCurrencyCode(String targetCode);
}
