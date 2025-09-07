package com.project.controller;

import com.project.model.Profile;
import com.project.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Base64;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @GetMapping("/profile/{username}")
    public ResponseEntity<Map<String, Object>> getProfile(@PathVariable String username) {
        Map<String, Object> response = new HashMap<>();

        try {
            Optional<Profile> profileOpt = profileService.getProfileByUsername(username);
            if (profileOpt.isPresent()) {
                Profile profile = profileOpt.get();
                Map<String, Object> profileData = new HashMap<>();
                profileData.put("id", profile.getId());
                profileData.put("username", profile.getUser().getUsername());
                profileData.put("name", profile.getName());
                profileData.put("bio", profile.getBio());
                profileData.put("createdAt", profile.getCreatedAt());
                profileData.put("updatedAt", profile.getUpdatedAt());

                if (profile.getProfileImage() != null) {
                    profileData.put("profileImage", Base64.getEncoder().encodeToString(profile.getProfileImage()));
                }

                response.put("success", true);
                response.put("profile", profileData);
            } else {
                response.put("success", false);
                response.put("message", "Profile not found");
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to fetch profile");
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "/profile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, Object>> updateProfile(
            @RequestParam("username") String username,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "bio", required = false) String bio,
            @RequestParam(value = "profileImage", required = false) MultipartFile profileImage) {

        Map<String, Object> response = new HashMap<>();

        try {
            byte[] imageBytes = null;
            if (profileImage != null && !profileImage.isEmpty()) {
                imageBytes = profileImage.getBytes();
            }

            Profile profile = profileService.createOrUpdateProfile(username, name, bio, imageBytes);

            response.put("success", true);
            response.put("message", "Profile updated successfully!");
            response.put("profileId", profile.getId());
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to update profile: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/profile/{username}/create-default")
    public ResponseEntity<Map<String, Object>> createDefaultProfile(@PathVariable String username) {
        Map<String, Object> response = new HashMap<>();

        try {
            Profile profile = profileService.getOrCreateDefaultProfile(username);
            response.put("success", true);
            response.put("message", "Default profile created!");
            response.put("profileId", profile.getId());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to create default profile: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
