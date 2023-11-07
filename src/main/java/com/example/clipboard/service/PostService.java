package com.example.clipboard.service;

import com.example.clipboard.domain.Post;
import com.example.clipboard.domain.Tag;
import com.example.clipboard.domain.User;
import com.example.clipboard.repository.PostRepository;
import com.example.clipboard.repository.TagRepository;
import com.example.clipboard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class PostService {
    @Autowired
    private final PostRepository postRepository;

    @Autowired
    private final TagRepository tagRepository;

    @Autowired
    private final UserRepository userRepository;

    public PostService(PostRepository postRepository, TagRepository tagRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.tagRepository = tagRepository;
        this.userRepository = userRepository;
    }

    public Post addNewPost(Post post, Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        optionalUser.ifPresent(post::setUser);
        return postRepository.save(post);
    }

    public List<Post> getAllPosts(Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        List<Post> posts = null;
        if (optionalUser.isPresent()) {
            posts = postRepository.findPostsByUser(optionalUser.get());
        }
        return posts;
    }

    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }

    public void addTags(Long postId, Long[] tagsId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isEmpty()) {
            return;
        }
        Post post = optionalPost.get();
        List<Tag> tags = new ArrayList<>();
        for (Long tagId : tagsId) {
            Optional<Tag> tag = tagRepository.findById(tagId);
            tags.add(tag.get());
        }
        post.addTags(tags);
        postRepository.save(post);
    }

    public void deleteTagFromPost(Long tagId, Long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isEmpty()) {
            return;
        }
        Post post = optionalPost.get();
        post.removeTag(tagId);
        postRepository.save(post);
    }

    public List<Post> getPostsByTagId(Long postId, Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        List<Post> allPosts = null;
        List<Post> postsByTagId;
        if (optionalUser.isPresent()) {
            allPosts = postRepository.findPostsByUser(optionalUser.get());
        }
        postsByTagId = allPosts.stream().filter(post -> post.getTags().stream().anyMatch(tag -> Objects.equals(tag.getId(), postId))).toList();
        return postsByTagId;
    }
}
