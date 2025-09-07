package com.project.service;

import com.project.model.Post;
import com.project.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    public Post savePost(Post post) {
        return postRepository.save(post);
    }

    public List<Post> getPostsByUsername(String username) {
        return postRepository.findByUsernameOrderByCreatedAtDesc(username);
    }
}
