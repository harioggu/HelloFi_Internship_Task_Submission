package com.hellofi.hellofi_backend.service;

import com.hellofi.hellofi_backend.model.Device;
import com.hellofi.hellofi_backend.repository.DeviceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeviceService {

    @Autowired
    private DeviceRepo deviceRepo;

    public List<Device> getAllDevices() {
        return deviceRepo.findAll();
    }

    public Device getDeviceById(String id) {
        Optional<Device> device = deviceRepo.findById(id);
        return device.orElse(null);
    }

    public Device saveDevice(Device device) {
        return deviceRepo.save(device);
    }

    public void deleteDevice(String id) {
        deviceRepo.deleteById(id);
    }
}