package com.inn.cinema.controllers;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import com.inn.cinema.models.User;
import com.inn.cinema.repositories.UserRepository;

import java.util.*;

@RestController

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

    @PutMapping(value = "/users/{id}")
    public User update( @RequestBody User user,

    @PathVariable(name = "id") Integer id) {
        User u = userRepository.findById(id).get();
        u.setName(user.getName());
        u.setEmail(user.getEmail());
        return userRepository.save(u);
    }

    @DeleteMapping(value = "/users/{id}")
    public User delete(@PathVariable(name = "id") Integer id) {
        User u = userRepository.findById(id).get();
        userRepository.delete(u);
        return u;
    }
}