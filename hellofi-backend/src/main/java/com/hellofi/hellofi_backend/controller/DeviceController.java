package com.hellofi.hellofi_backend.controller;

import com.hellofi.hellofi_backend.model.Device;
import com.hellofi.hellofi_backend.service.DeviceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/devices")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class DeviceController {

    @Autowired
    private DeviceService deviceService;

    @GetMapping
    public ResponseEntity<?> getDevices() {
        try {
            List<Device> devices = deviceService.getAllDevices();
            if (devices.isEmpty()) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "No devices found");
                return ResponseEntity.ok(response);
            }
            return ResponseEntity.ok(devices);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error fetching devices: " + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDeviceById(@PathVariable String id) {
        try {
            Device device = deviceService.getDeviceById(id);
            if (device == null) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Device not found");
                return ResponseEntity.status(404).body(error);
            }
            return ResponseEntity.ok(device);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error fetching device: " + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    @PostMapping
    public ResponseEntity<?> createDevice(@Valid @RequestBody Device device) {
        try {
            Device savedDevice = deviceService.saveDevice(device);
            return ResponseEntity.ok(savedDevice);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error creating device: " + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateDevice(@PathVariable String id, @Valid @RequestBody Device device) {
        try {
            Device existingDevice = deviceService.getDeviceById(id);
            if (existingDevice == null) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Device not found");
                return ResponseEntity.status(404).body(error);
            }

            device.setId(id); // Ensure the ID is set correctly
            Device updatedDevice = deviceService.saveDevice(device);
            return ResponseEntity.ok(updatedDevice);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error updating device: " + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDevice(@PathVariable String id) {
        try {
            Device existingDevice = deviceService.getDeviceById(id);
            if (existingDevice == null) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Device not found");
                return ResponseEntity.status(404).body(error);
            }

            deviceService.deleteDevice(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Device deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error deleting device: " + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return ResponseEntity.badRequest().body(errors);
    }
}