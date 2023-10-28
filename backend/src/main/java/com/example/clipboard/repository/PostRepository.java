package com.example.clipboard.repository;

import com.example.clipboard.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findPostsByTagsId(Long tagId);
}
