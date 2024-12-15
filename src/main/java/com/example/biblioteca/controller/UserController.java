package com.example.biblioteca.controller;

import com.example.biblioteca.Enum.Role;
import com.example.biblioteca.model.User;
import com.example.biblioteca.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", allowCredentials = "true")
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;

    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User requestUser) {
        // Controlla se l'utente esiste già
        if (userRepository.findByUsername(requestUser.getUsername()) != null) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        // Crea un nuovo utente
        User user = new User();
        user.setName(requestUser.getName());
        user.setSurname(requestUser.getSurname());
        user.setDateBirth(requestUser.getDateBirth());
        user.setUsername(requestUser.getUsername());
        user.setPassword(passwordEncoder.encode(requestUser.getPassword())); // Codifica la password
        user.setRole(Role.USER); // Imposta il ruolo predefinito

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

}
