package com.hellofi.hellofi_backend.repository;

import com.hellofi.hellofi_backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.util.Optional;

public interface UserRepo extends MongoRepository<User, String> {
    
    Optional<User> findByEmail(String email);
    
    boolean existsByEmail(String email);

    @Query(value = "{ 'email' : ?0 }", fields = "{ 'password' : 0 }")
    Optional<User> findByEmailExcludePassword(String email);

    @Query(value = "{ 'email' : ?0 }", fields = "{ 'email' : 1, 'name' : 1, '_id' : 1 }")
    Optional<User> findUserProfileByEmail(String email);
}