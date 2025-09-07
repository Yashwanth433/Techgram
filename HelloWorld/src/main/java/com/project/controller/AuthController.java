package com.project.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.model.User;
import com.project.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        if (userService.register(user)) {
            response.put("success", true);
            response.put("message", "Registration successful!");
        } else {
            response.put("success", false);
            response.put("message", "User already exists. Please login.");
        }
        return response;
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        User loggedInUser = userService.getUserByUsername(user.getUsername());
        if (loggedInUser != null && loggedInUser.getPassword().equals(user.getPassword())) {
            response.put("success", true);
            response.put("message", "Login successful!");
            response.put("userId", loggedInUser.getId());
            response.put("username", loggedInUser.getUsername());
        } else {
            response.put("success", false);
            response.put("message", "User not found. Please register.");
        }
        return response;
    }
}
