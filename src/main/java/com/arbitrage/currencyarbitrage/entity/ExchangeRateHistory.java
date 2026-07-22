package com.arbitrage.currencyarbitrage.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "exchange_rate_history")
public class ExchangeRateHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "base_currency_id", nullable = false)
    private Currency baseCurrency;

    @ManyToOne
    @JoinColumn(name = "target_currency_id", nullable = false)
    private Currency targetCurrency;

    @Column(name = "exchange_rate", nullable = false, precision = 18, scale = 8)
    private BigDecimal exchangeRate;

    @Column(name = "open_rate", precision = 18, scale = 8)
    private BigDecimal openRate;

    @Column(name = "high_rate", precision = 18, scale = 8)
    private BigDecimal highRate;

    @Column(name = "low_rate", precision = 18, scale = 8)
    private BigDecimal lowRate;

    @Column(name = "close_rate", precision = 18, scale = 8)
    private BigDecimal closeRate;

    @Column(name = "volume")
    private Long volume;

    @Column(name = "provider", length = 100)
    private String provider;

    @Column(name = "source", length = 100)
    private String source;

    @Column(name = "recorded_at", nullable = false)
    private LocalDateTime recordedAt;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        if (this.recordedAt == null) {
            this.recordedAt = now;
        }
        this.createdAt = now;
    }

    // Default Constructor
    public ExchangeRateHistory() {}

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Currency getBaseCurrency() {
        return baseCurrency;
    }

    public void setBaseCurrency(Currency baseCurrency) {
        this.baseCurrency = baseCurrency;
    }

    public Currency getTargetCurrency() {
        return targetCurrency;
    }

    public void setTargetCurrency(Currency targetCurrency) {
        this.targetCurrency = targetCurrency;
    }

    public BigDecimal getExchangeRate() {
        return exchangeRate;
    }

    public void setExchangeRate(BigDecimal exchangeRate) {
        this.exchangeRate = exchangeRate;
    }

    public BigDecimal getOpenRate() {
        return openRate;
    }

    public void setOpenRate(BigDecimal openRate) {
        this.openRate = openRate;
    }

    public BigDecimal getHighRate() {
        return highRate;
    }

    public void setHighRate(BigDecimal highRate) {
        this.highRate = highRate;
    }

    public BigDecimal getLowRate() {
        return lowRate;
    }

    public void setLowRate(BigDecimal lowRate) {
        this.lowRate = lowRate;
    }

    public BigDecimal getCloseRate() {
        return closeRate;
    }

    public void setCloseRate(BigDecimal closeRate) {
        this.closeRate = closeRate;
    }

    public Long getVolume() {
        return volume;
    }

    public void setVolume(Long volume) {
        this.volume = volume;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public LocalDateTime getRecordedAt() {
        return recordedAt;
    }

    public void setRecordedAt(LocalDateTime recordedAt) {
        this.recordedAt = recordedAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}