package com.example.clipboard.service;

import com.example.clipboard.domain.Post;
import com.example.clipboard.domain.User;
import com.example.clipboard.domain.Tag;
import com.example.clipboard.repository.UserRepository;
import com.example.clipboard.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TagService {
    @Autowired
    private final TagRepository tagRepository;

    @Autowired
    private final UserRepository userRepository;

    public TagService(TagRepository tagRepository, UserRepository userRepository) {
        this.tagRepository = tagRepository;
        this.userRepository = userRepository;
    }

    public Tag addNewTag(Tag tag, Long userId) {
        Optional<User> user = userRepository.findById(userId);
        user.ifPresent(tag::setUser);
        return tagRepository.save(tag);
    }

    public List<Tag> findAllTags(Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        List<Tag> tags = null;
        if (optionalUser.isPresent()) {
            tags = tagRepository.findTagsByUser(optionalUser.get());
        }
        return tags;
    }

    public List<Tag> getTagsByPostId(Long postId, Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        List<Tag> allTags = null;
        List<Tag> tagsByPostId;
        if (optionalUser.isPresent()) {
            allTags = tagRepository.findTagsByUser(optionalUser.get());
        }
        tagsByPostId = allTags.stream().filter(tag -> tag.getPosts().stream().anyMatch(post -> post.getId() == postId)).toList();
        return tagsByPostId;
    }

    public void deleteTag(Long id) {
        tagRepository.deleteById(id);
    }
}
