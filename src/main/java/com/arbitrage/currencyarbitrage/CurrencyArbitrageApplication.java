package com.arbitrage.currencyarbitrage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CurrencyArbitrageApplication {

    public static void main(String[] args) {
        SpringApplication.run(CurrencyArbitrageApplication.class, args);
    }

}
