package com.quickbite.backend.controller;

import com.quickbite.backend.JwtUtil;
import com.quickbite.backend.model.User;
import com.quickbite.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    // Register
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody User user) {
        Map<String, String> response = new HashMap<>();

        if (userRepository.existsByEmail(user.getEmail())) {
            response.put("message", "Email already exists!");
            return ResponseEntity.badRequest().body(response);
        }

        user.setPassword(encoder.encode(user.getPassword()));
        user.setCreatedAt(LocalDateTime.now());
        userRepository.save(user);

        response.put("message", "User registered successfully!");
        return ResponseEntity.ok(response);
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody User user) {
        Map<String, String> response = new HashMap<>();

        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isEmpty()) {
            response.put("message", "User not found!");
            return ResponseEntity.badRequest().body(response);
        }

        if (!encoder.matches(user.getPassword(), existingUser.get().getPassword())) {
            response.put("message", "Invalid password!");
            return ResponseEntity.badRequest().body(response);
        }

        String token = jwtUtil.generateToken(user.getEmail());
        response.put("token", token);
        response.put("message", "Login successful!");
        response.put("name", existingUser.get().getName());
        return ResponseEntity.ok(response);
    }
}