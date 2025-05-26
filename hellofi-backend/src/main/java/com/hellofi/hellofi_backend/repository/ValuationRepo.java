package com.hellofi.hellofi_backend.repository;

import com.hellofi.hellofi_backend.model.ValuationRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ValuationRepo extends MongoRepository<ValuationRequest, String> {
    // Add custom queries if needed later
}

