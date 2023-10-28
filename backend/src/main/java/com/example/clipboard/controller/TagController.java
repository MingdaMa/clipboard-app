package com.example.clipboard.controller;

import com.example.clipboard.domain.Tag;
import com.example.clipboard.service.TagService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tags")
public class TagController {
    private final TagService tagService;

    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @PostMapping
    public ResponseEntity<Tag> addNewTag(@RequestBody Tag tag) {
        Tag newTag = tagService.addNewTag(tag);
        return new ResponseEntity<>(newTag, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Tag>> getAllTags() {
        List<Tag> tags = tagService.findAllTags();
        if (tags.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(tags, HttpStatus.OK);
    }

    @GetMapping("/posts/{postId}")
    public ResponseEntity<List<Tag>> getTagsByPostId(@PathVariable Long postId) {
        List<Tag> tagsByPostId = tagService.getTagsByPostId(postId);
        return new ResponseEntity<>(tagsByPostId, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteTag(@PathVariable Long id) {
        tagService.deleteTag(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
