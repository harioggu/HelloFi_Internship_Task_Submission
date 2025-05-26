package com.hellofi.hellofi_backend.model;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "devices")
public class Device {
    @Id
    private String id;

    @NotBlank(message = "Device ID is required")
    private String deviceId;  // For frontend reference (e.g., "iphone-13")

    @NotBlank(message = "Device name is required")
    private String name;

    @NotBlank(message = "Image URL is required")
    private String image;     // URL to device image

    @NotNull(message = "Base price is required")
    @Min(value = 0, message = "Base price must be greater than or equal to 0")
    private int basePrice;

    public Device() {}

    public Device(String deviceId, String name, String image, int basePrice) {
        this.deviceId = deviceId;
        this.name = name;
        this.image = image;
        this.basePrice = basePrice;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(int basePrice) {
        this.basePrice = basePrice;
    }
}