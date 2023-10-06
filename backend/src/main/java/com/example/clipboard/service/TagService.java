package com.example.clipboard.service;

import com.example.clipboard.domain.Post;
import com.example.clipboard.domain.Tag;
import com.example.clipboard.repository.PostRepository;
import com.example.clipboard.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagService {
    @Autowired
    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public Tag addNewTag(Tag tag) {
        return tagRepository.save(tag);
    }

    public List<Tag> findAllTags() {
        return tagRepository.findAll();
    }

    public void deleteTag(Long id) {
        tagRepository.deleteById(id);
    }
}
