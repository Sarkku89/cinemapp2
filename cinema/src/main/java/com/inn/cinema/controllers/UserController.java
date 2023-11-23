package com.inn.cinema.controllers;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.inn.cinema.models.User;
import com.inn.cinema.repositories.UserRepository;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping(value = "/users")
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @GetMapping(value = "/users/{id}")
    public User get(@PathVariable(name = "id") Integer id) {
        return userRepository.findById(id).get();
    }

    @PostMapping(value = "/users")
    public User create(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        // Find the user by email
        User user = userRepository.findByEmail(email);

        // Check if the user exists and the password matches
        if (user != null && user.getPassword().equals(password)) {
            // Return the user details upon successful login
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }
    }

    @PutMapping(value = "/users/{id}")
    public User update( @RequestBody User user,

    @PathVariable(name = "id") Integer id) {
        User u = userRepository.findById(id).get();
        u.setName(user.getName());
        u.setEmail(user.getEmail());
        u.setPassword(user.getPassword());
        u.setAdmin(user.getAdmin());
        return userRepository.save(u);
    }

    @DeleteMapping(value = "/users/{id}")
    public User delete(@PathVariable(name = "id") Integer id) {
        User u = userRepository.findById(id).get();
        userRepository.delete(u);
        return u;
    }
}