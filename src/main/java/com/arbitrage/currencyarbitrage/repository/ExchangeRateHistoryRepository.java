package com.arbitrage.currencyarbitrage.repository;

import com.arbitrage.currencyarbitrage.entity.ExchangeRateHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExchangeRateHistoryRepository extends JpaRepository<ExchangeRateHistory, Long> {
}