package com.hellofi.hellofi_backend.service;

import com.hellofi.hellofi_backend.model.User;
import com.hellofi.hellofi_backend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(User user) throws Exception {
        if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }

        if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
            throw new IllegalArgumentException("Password is required");
        }

        if (user.getPassword().length() < 6) {
            throw new IllegalArgumentException("Password must be at least 6 characters long");
        }

        if (userRepo.existsByEmail(user.getEmail())) {
            throw new Exception("Email already registered");
        }

        // Encode password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    public Optional<User> findUserProfileByEmail(String email) {
        return userRepo.findUserProfileByEmail(email);
    }

    public boolean checkPassword(User user, String rawPassword) {
        if (user == null || rawPassword == null) {
            return false;
        }
        return passwordEncoder.matches(rawPassword, user.getPassword());
    }

    public User updateUserProfile(String email, String name) throws Exception {
        Optional<User> userOpt = userRepo.findByEmail(email);
        if (!userOpt.isPresent()) {
            throw new Exception("User not found");
        }

        User user = userOpt.get();
        if (name != null && !name.trim().isEmpty()) {
            user.setName(name);
        }

        return userRepo.save(user);
    }

    public boolean changePassword(String email, String currentPassword, String newPassword) throws Exception {
        Optional<User> userOpt = userRepo.findByEmail(email);
        if (!userOpt.isPresent()) {
            throw new Exception("User not found");
        }

        User user = userOpt.get();
        if (!checkPassword(user, currentPassword)) {
            throw new Exception("Current password is incorrect");
        }

        if (newPassword == null || newPassword.trim().isEmpty() || newPassword.length() < 6) {
            throw new IllegalArgumentException("New password must be at least 6 characters long");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepo.save(user);
        return true;
    }
}