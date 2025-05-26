package com.hellofi.hellofi_backend.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "valuationRequests")
public class ValuationRequest {
    @Id
    private String id;

    @NotBlank(message = "User ID is required")
    private String userId;

    @NotBlank(message = "Device ID is required")
    private String deviceId;

    @NotBlank(message = "Condition is required")
    private String condition;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private int price;

    @NotNull(message = "Timestamp is required")
    private LocalDateTime timestamp;

    public ValuationRequest() {}

    public ValuationRequest(String userId, String deviceId, String condition, int price, LocalDateTime timestamp) {
        this.userId = userId;
        this.deviceId = deviceId;
        this.condition = condition;
        this.price = price;
        this.timestamp = timestamp;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}