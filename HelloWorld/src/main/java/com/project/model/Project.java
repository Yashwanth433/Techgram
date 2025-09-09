package com.project.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String projectName;

    @Column(length = 1000)
    private String technologies;

    @ElementCollection
    @CollectionTable(name = "project_screenshots", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "screenshot")
    @Lob
    private List<byte[]> screenshots;

    @Lob
    @Column(name = "video")
    private byte[] video;

    @Lob
    @Column(name = "project_file")
    private byte[] projectFile;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    public Project() {}

    public Project(String username, String projectName, String technologies,
                   List<byte[]> screenshots, byte[] video, byte[] projectFile) {
        this.username = username;
        this.projectName = projectName;
        this.technologies = technologies;
        this.screenshots = screenshots;
        this.video = video;
        this.projectFile = projectFile;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getTechnologies() {
        return technologies;
    }

    public void setTechnologies(String technologies) {
        this.technologies = technologies;
    }

    public List<byte[]> getScreenshots() {
        return screenshots;
    }

    public void setScreenshots(List<byte[]> screenshots) {
        this.screenshots = screenshots;
    }

    public byte[] getVideo() {
        return video;
    }

    public void setVideo(byte[] video) {
        this.video = video;
    }

    public byte[] getProjectFile() {
        return projectFile;
    }

    public void setProjectFile(byte[] projectFile) {
        this.projectFile = projectFile;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
