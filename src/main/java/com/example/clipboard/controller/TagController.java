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

    @PostMapping("/{userId}")
    public ResponseEntity<Tag> addNewTag(@PathVariable Long userId, @RequestBody Tag tag) {
        Tag newTag = tagService.addNewTag(tag, userId);
        return new ResponseEntity<>(newTag, HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Tag>> getAllTags(@PathVariable Long userId) {
        List<Tag> tags = tagService.findAllTags(userId);
        if (tags.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(tags, HttpStatus.OK);
    }

    @GetMapping("/posts/{postId}/{userId}")
    public ResponseEntity<List<Tag>> getTagsByPostId(@PathVariable Long postId, @PathVariable Long userId) {
        List<Tag> tagsByPostId = tagService.getTagsByPostId(postId, userId);
        return new ResponseEntity<>(tagsByPostId, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteTag(@PathVariable Long id) {
        tagService.deleteTag(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
