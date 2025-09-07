package com.project.service;

import com.project.model.Profile;
import com.project.model.User;
import com.project.repository.ProfileRepository;
import com.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private UserRepository userRepository;

    public Profile createOrUpdateProfile(String username, String name, String bio, byte[] profileImage) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        Optional<Profile> existingProfile = profileRepository.findByUser(user);

        Profile profile;
        if (existingProfile.isPresent()) {
            profile = existingProfile.get();
            profile.setName(name);
            profile.setBio(bio);
            if (profileImage != null) {
                profile.setProfileImage(profileImage);
            }
            profile.setUpdatedAt(java.time.LocalDateTime.now());
        } else {
            profile = new Profile(user, name, bio, profileImage);
        }

        return profileRepository.save(profile);
    }

    public Optional<Profile> getProfileByUsername(String username) {
        return profileRepository.findByUserUsername(username);
    }

    public Profile getOrCreateDefaultProfile(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        Optional<Profile> existingProfile = profileRepository.findByUser(user);
        if (existingProfile.isPresent()) {
            return existingProfile.get();
        }

        // Create default profile
        Profile defaultProfile = new Profile(user, username, "Welcome to my profile!", null);
        return profileRepository.save(defaultProfile);
    }
}
