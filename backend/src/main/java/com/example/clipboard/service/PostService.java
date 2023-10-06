package com.example.clipboard.service;

import com.example.clipboard.domain.Post;
import com.example.clipboard.domain.Tag;
import com.example.clipboard.repository.PostRepository;
import com.example.clipboard.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    @Autowired
    private final PostRepository postRepository;

    @Autowired
    private final TagRepository tagRepository;

    public PostService(PostRepository postRepository, TagRepository tagRepository) {
        this.postRepository = postRepository;
        this.tagRepository = tagRepository;
    }

    public Post addNewPost(Post post) {
        return postRepository.save(post);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }

    public void addTag(Long tagId, Long postId) {
        Post post = postRepository.getReferenceById(postId);
        Tag tag = tagRepository.getReferenceById(tagId);
        post.addTag(tag);
        postRepository.save(post);
    }
}
