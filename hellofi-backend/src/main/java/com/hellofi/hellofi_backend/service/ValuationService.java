package com.hellofi.hellofi_backend.service;

import com.hellofi.hellofi_backend.model.Mobile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ValuationService {

    @Autowired
    private MobileService mobileService;

    private final Map<String, Double> conditionMultipliers = new HashMap<>();

    public ValuationService() {
        // Initialize condition multipliers
        conditionMultipliers.put("Perfect", 1.0);
        conditionMultipliers.put("Minor scratches", 0.8);
        conditionMultipliers.put("Cracked", 0.5);
        conditionMultipliers.put("Good", 1.0);
        conditionMultipliers.put("Average", 0.7);
        conditionMultipliers.put("Poor", 0.4);
        conditionMultipliers.put("Scratched", 0.8);
        conditionMultipliers.put("Damaged", 0.5);
    }

    public double calculatePrice(String mobileId, Map<String, String> conditionAnswers) {
        Mobile mobile = mobileService.getMobileById(mobileId);
        if (mobile == null) {
            throw new IllegalArgumentException("Mobile not found");
        }

        double basePrice = mobile.getBasePrice();
        double finalPrice = basePrice;

        // Debug: log received conditions
        System.out.println("Received conditions: " + conditionAnswers);

        // Apply condition multipliers
        for (Map.Entry<String, String> entry : conditionAnswers.entrySet()) {
            String condition = entry.getValue();
            Double multiplier = conditionMultipliers.get(condition);
            if (multiplier == null) {
                throw new IllegalArgumentException("Invalid condition: '" + condition + "'. Please select a valid option for all fields.");
            }
            finalPrice *= multiplier;
        }

        // Convert to rupees
        finalPrice = finalPrice * 83;

        // Round to 2 decimal places
        return Math.round(finalPrice * 100.0) / 100.0;
    }

    // ADD THESE METHODS BELOW

    public Map<String, Double> getBasePrices() {
        Map<String, Double> basePrices = new HashMap<>();
        for (Mobile mobile : mobileService.getAllMobiles()) {
            basePrices.put(mobile.getId(), mobile.getBasePrice());
        }
        return basePrices;
    }

    public Map<String, Double> getConditionMultipliers() {
        return new HashMap<>(conditionMultipliers);
    }

    public int calculatePrice(String deviceId, String condition) {
        Mobile mobile = mobileService.getMobileById(deviceId);
        if (mobile == null) {
            throw new IllegalArgumentException("Mobile not found");
        }
        Double multiplier = conditionMultipliers.get(condition);
        if (multiplier == null) {
            throw new IllegalArgumentException("Invalid condition: " + condition);
        }
        double price = mobile.getBasePrice() * multiplier;
        // Convert to rupees
        price = price * 83;
        return (int) Math.round(price);
    }
}