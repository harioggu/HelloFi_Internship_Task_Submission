package com.hellofi.hellofi_backend.repository;

import com.hellofi.hellofi_backend.model.Mobile;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MobileRepository extends MongoRepository<Mobile, String> {
} 