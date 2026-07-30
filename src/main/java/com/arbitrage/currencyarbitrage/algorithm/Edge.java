package com.arbitrage.currencyarbitrage.algorithm;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Edge {

    // Source Currency
    private String source;

    // Destination Currency
    private String destination;

    // Edge Weight = -log(exchangeRate)
    private double weight;
}