package com.hellofi.hellofi_backend.service;

import com.hellofi.hellofi_backend.model.Mobile;
import com.hellofi.hellofi_backend.repository.MobileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MobileService {

    @Autowired
    private MobileRepository mobileRepository;

    public List<Mobile> getAllMobiles() {
        return mobileRepository.findAll();
    }

    public Mobile getMobileById(String id) {
        return mobileRepository.findById(id).orElse(null);
    }

    public Mobile saveMobile(Mobile mobile) {
        return mobileRepository.save(mobile);
    }

    public void deleteMobile(String id) {
        mobileRepository.deleteById(id);
    }
} 