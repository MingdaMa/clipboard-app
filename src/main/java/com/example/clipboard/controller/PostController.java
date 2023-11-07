package com.example.clipboard.controller;

import com.example.clipboard.domain.Post;
import com.example.clipboard.domain.Tag;
import com.example.clipboard.service.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping("/{userId}")
    public ResponseEntity<Post> addNewPost(@PathVariable Long userId, @RequestBody Post post) {
        Post newPost = postService.addNewPost(post, userId);
        return new ResponseEntity<>(newPost, HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Post>> getAllPosts(@PathVariable Long userId) {
        List<Post> posts = postService.getAllPosts(userId);
        if (posts.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @GetMapping("/tags/{tagId}/{userId}")
    public ResponseEntity<List<Post>> getPostsByTagId(@PathVariable Long tagId, @PathVariable Long userId) {
        List<Post> postsByTagId = postService.getPostsByTagId(tagId, userId);
        return new ResponseEntity<>(postsByTagId, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/addTags/{postId}")
    public ResponseEntity<HttpStatus> addTags(@PathVariable Long postId, @RequestBody Long[] tagsId) {
        postService.addTags(postId, tagsId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/addTags/{tagId}/{postId}")
    public ResponseEntity<HttpStatus> deleteTag(@PathVariable Long tagId, @PathVariable Long postId) {
        postService.deleteTagFromPost(tagId, postId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

