package com.arbitrage.currencyarbitrage.algorithm;

import com.arbitrage.currencyarbitrage.entity.ExchangeRate;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class GraphBuilder {

    /**
     * Converts ExchangeRate entities into graph edges
     */
    public List<Edge> buildGraph(List<ExchangeRate> exchangeRates) {

        List<Edge> edges = new ArrayList<>();

        for (ExchangeRate rate : exchangeRates) {

            double weight = -Math.log(rate.getRate().doubleValue());

            Edge edge = new Edge(
                    rate.getBaseCurrency().getCurrencyCode(),
                    rate.getTargetCurrency().getCurrencyCode(),
                    weight
            );

            edges.add(edge);
        }

        for (Edge edge : edges) {
            System.out.println(
                    edge.getSource() + " -> " +
                            edge.getDestination() +
                            " Rate Weight = " + edge.getWeight()
            );
        }

        return edges;
    }
}