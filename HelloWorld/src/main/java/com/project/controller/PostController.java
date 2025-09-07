package com.project.controller;

import com.project.model.Post;
import com.project.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping(value = "/posts", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, Object>> createPost(
            @RequestParam("username") String username,
            @RequestParam("image") MultipartFile image,
            @RequestParam("description") String description,
            @RequestParam("tags") String tags,
            @RequestParam("category") String category) {

        Map<String, Object> response = new HashMap<>();

        try {
            byte[] imageBytes = image.getBytes();
            Post post = new Post(username, imageBytes, description, tags, category);
            Post savedPost = postService.savePost(post);

            response.put("success", true);
            response.put("message", "Post created successfully!");
            response.put("postId", savedPost.getId());
            return ResponseEntity.ok(response);

        } catch (IOException e) {
            response.put("success", false);
            response.put("message", "Failed to upload image");
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to create post");
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/posts/{username}")
    public ResponseEntity<Map<String, Object>> getPostsByUsername(@PathVariable String username) {
        Map<String, Object> response = new HashMap<>();

        try {
            List<Post> posts = postService.getPostsByUsername(username);
            List<Map<String, Object>> postsWithImages = posts.stream().map(post -> {
                Map<String, Object> postMap = new HashMap<>();
                postMap.put("id", post.getId());
                postMap.put("username", post.getUsername());
                postMap.put("description", post.getDescription());
                postMap.put("tags", post.getTags());
                postMap.put("category", post.getCategory());
                postMap.put("createdAt", post.getCreatedAt());
                if (post.getImage() != null) {
                    postMap.put("image", Base64.getEncoder().encodeToString(post.getImage()));
                }
                return postMap;
            }).toList();

            response.put("success", true);
            response.put("posts", postsWithImages);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to fetch posts");
            return ResponseEntity.badRequest().body(response);
        }
    }
}
