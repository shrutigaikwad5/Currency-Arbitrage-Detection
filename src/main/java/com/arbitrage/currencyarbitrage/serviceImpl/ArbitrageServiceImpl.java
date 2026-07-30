package com.arbitrage.currencyarbitrage.serviceImpl;

import com.arbitrage.currencyarbitrage.algorithm.Edge;
import com.arbitrage.currencyarbitrage.algorithm.GraphBuilder;
import com.arbitrage.currencyarbitrage.entity.ExchangeRate;
import com.arbitrage.currencyarbitrage.repository.ExchangeRateRepository;
import com.arbitrage.currencyarbitrage.service.ArbitrageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ArbitrageServiceImpl implements ArbitrageService {

    private final ExchangeRateRepository exchangeRateRepository;
    private final GraphBuilder graphBuilder;

    @Override
    public List<String> detectArbitrage() {

        // Fetch all exchange rates
        List<ExchangeRate> exchangeRates = exchangeRateRepository.findAll();

        // Convert exchange rates into graph edges
        List<Edge> edges = graphBuilder.buildGraph(exchangeRates);

        // Extract all currencies (vertices)
        Set<String> vertices = new HashSet<>();

        for (Edge edge : edges) {
            vertices.add(edge.getSource());
            vertices.add(edge.getDestination());
        }

        // Distance map
        Map<String, Double> distance = new HashMap<>();

        // Parent map (used to reconstruct cycle)
        Map<String, String> parent = new HashMap<>();

        // Initialize all distances to 0
        for (String vertex : vertices) {
            distance.put(vertex, 0.0);
            parent.put(vertex, null);
        }

        String updatedVertex = null;

        // Bellman-Ford Relaxation
        for (int i = 0; i < vertices.size(); i++) {

            updatedVertex = null;

            for (Edge edge : edges) {

                String u = edge.getSource();
                String v = edge.getDestination();

                double EPS = 1e-10;

                if (distance.get(u) + edge.getWeight() < distance.get(v) - EPS) {

                    System.out.println(
                            "Relaxing: " + u + " -> " + v +
                                    " weight = " + edge.getWeight() +
                                    " old = " + distance.get(v) +
                                    " new = " + (distance.get(u) + edge.getWeight())
                    );

                    distance.put(v, distance.get(u) + edge.getWeight());

                    parent.put(v, u);

                    updatedVertex = v;
                }
            }
        }

        // No Arbitrage
        if (updatedVertex == null) {
            return Collections.singletonList("No Arbitrage Opportunity Found");
        }

        // Move inside cycle
        for (int i = 0; i < vertices.size(); i++) {
            updatedVertex = parent.get(updatedVertex);
        }

        // Reconstruct cycle
        List<String> cycle = new ArrayList<>();

        String current = updatedVertex;

        do {
            cycle.add(current);
            current = parent.get(current);

            if(current == null){
                return Collections.singletonList("No Arbitrage Opportunity Found");
            }

        } while(!current.equals(updatedVertex));

        cycle.add(updatedVertex);

        Collections.reverse(cycle);

        return cycle;
    }
}