package com.hellofi.hellofi_backend.controller;

import com.hellofi.hellofi_backend.model.Mobile;
import com.hellofi.hellofi_backend.service.MobileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mobiles")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class MobileController {

    @Autowired
    private MobileService mobileService;

    @GetMapping
    public ResponseEntity<?> getAllMobiles() {
        try {
            List<Mobile> mobiles = mobileService.getAllMobiles();
            return ResponseEntity.ok(mobiles);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error fetching mobiles: " + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMobileById(@PathVariable String id) {
        try {
            Mobile mobile = mobileService.getMobileById(id);
            if (mobile == null) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Mobile not found");
                return ResponseEntity.status(404).body(error);
            }
            return ResponseEntity.ok(mobile);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error fetching mobile: " + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }
} 