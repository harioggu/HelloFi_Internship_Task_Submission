package com.hellofi.hellofi_backend.repository;


import com.hellofi.hellofi_backend.model.Device;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DeviceRepo extends MongoRepository<Device, String> {
    // You can add custom query methods if needed later
}
