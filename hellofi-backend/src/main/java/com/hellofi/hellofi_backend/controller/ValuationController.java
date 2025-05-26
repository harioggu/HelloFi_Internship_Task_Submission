package com.hellofi.hellofi_backend.controller;

import com.hellofi.hellofi_backend.service.ValuationService;
import com.hellofi.hellofi_backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/valuation")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ValuationController {

    @Autowired
    private ValuationService valuationService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/calculate")
    public ResponseEntity<?> calculatePrice(
        @RequestHeader(value = "Authorization", required = false) String authHeader,
        @RequestBody Map<String, Object> request
    ) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(401).body(Map.of("message", "Authentication required"));
            }
            String token = authHeader.substring(7);
            if (!jwtUtil.validateJwtToken(token)) {
                return ResponseEntity.status(401).body(Map.of("message", "Invalid token"));
            }
            String email = jwtUtil.getEmailFromToken(token);

            String mobileId = (String) request.get("mobileId");
            @SuppressWarnings("unchecked")
            Map<String, String> conditionAnswers = (Map<String, String>) request.get("conditionAnswers");

            if (mobileId == null || conditionAnswers == null) {
                return ResponseEntity.badRequest().body(Map.of("message", "Mobile ID and condition answers are required"));
            }

            double price = valuationService.calculatePrice(mobileId, conditionAnswers);
            return ResponseEntity.ok(Map.of("price", price));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "An error occurred while calculating price"));
        }
    }

    @GetMapping("/prices")
    public ResponseEntity<?> getBasePrices() {
        try {
            return ResponseEntity.ok(Map.of(
                "basePrices", valuationService.getBasePrices(),
                "conditionMultipliers", valuationService.getConditionMultipliers()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Error fetching price information"));
        }
    }

    @GetMapping("/estimate")
    public ResponseEntity<?> getPriceEstimate(
            @RequestParam String deviceId,
            @RequestParam String condition) {
        try {
            int price = valuationService.calculatePrice(deviceId, condition);
            return ResponseEntity.ok(Map.of(
                "deviceId", deviceId,
                "condition", condition,
                "estimatedPrice", price
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Error calculating price estimate"));
        }
    }
}