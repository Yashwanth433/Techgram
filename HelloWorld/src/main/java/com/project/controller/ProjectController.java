package com.project.controller;

import com.project.model.Project;
import com.project.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;
import java.util.Base64;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @PostMapping(value = "/projects", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, Object>> createProject(
            @RequestParam("username") String username,
            @RequestParam("projectName") String projectName,
            @RequestParam("technologies") String technologies,
            @RequestParam(value = "screenshots", required = false) MultipartFile[] screenshots,
            @RequestParam(value = "video", required = false) MultipartFile video,
            @RequestParam(value = "projectFile", required = false) MultipartFile projectFile) {

        Map<String, Object> response = new HashMap<>();

        try {
            // Validate project file size (max 20MB)
            if (projectFile != null && projectFile.getSize() > 20 * 1024 * 1024) {
                response.put("success", false);
                response.put("message", "Project file size exceeds 20MB limit");
                return ResponseEntity.badRequest().body(response);
            }

            // Convert screenshots to byte arrays
            List<byte[]> screenshotBytes = new ArrayList<>();
            if (screenshots != null) {
                for (MultipartFile screenshot : screenshots) {
                    screenshotBytes.add(screenshot.getBytes());
                }
            }

            // Convert video to byte array
            byte[] videoBytes = null;
            if (video != null) {
                videoBytes = video.getBytes();
            }

            // Convert project file to byte array
            byte[] projectFileBytes = null;
            if (projectFile != null) {
                projectFileBytes = projectFile.getBytes();
            }

            Project project = new Project(username, projectName, technologies,
                                        screenshotBytes, videoBytes, projectFileBytes);
            Project savedProject = projectService.saveProject(project);

            response.put("success", true);
            response.put("message", "Project created successfully!");
            response.put("projectId", savedProject.getId());
            return ResponseEntity.ok(response);

        } catch (IOException e) {
            response.put("success", false);
            response.put("message", "Failed to upload files");
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to create project");
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/projects/{username}")
    public ResponseEntity<Map<String, Object>> getProjectsByUsername(@PathVariable String username) {
        Map<String, Object> response = new HashMap<>();

        try {
            List<Project> projects = projectService.getProjectsByUsername(username);
            List<Map<String, Object>> projectsWithFiles = projects.stream().map(project -> {
                Map<String, Object> projectMap = new HashMap<>();
                projectMap.put("id", project.getId());
                projectMap.put("username", project.getUsername());
                projectMap.put("projectName", project.getProjectName());
                projectMap.put("technologies", project.getTechnologies());
                projectMap.put("createdAt", project.getCreatedAt());

                // Convert screenshots from byte arrays to base64 list
                if (project.getScreenshots() != null && !project.getScreenshots().isEmpty()) {
                    List<String> screenshotBase64 = project.getScreenshots().stream()
                        .map(Base64.getEncoder()::encodeToString)
                        .collect(Collectors.toList());
                    projectMap.put("screenshots", screenshotBase64);
                } else {
                    projectMap.put("screenshots", new ArrayList<>());
                }

                // Convert video to base64 if exists
                if (project.getVideo() != null) {
                    projectMap.put("video", Base64.getEncoder().encodeToString(project.getVideo()));
                }

                // Convert project file to base64 if exists
                if (project.getProjectFile() != null) {
                    projectMap.put("projectFile", Base64.getEncoder().encodeToString(project.getProjectFile()));
                }

                return projectMap;
            }).toList();

            response.put("success", true);
            response.put("projects", projectsWithFiles);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to fetch projects");
            return ResponseEntity.badRequest().body(response);
        }
    }
}
