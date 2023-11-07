package com.example.clipboard.repository;

import com.example.clipboard.domain.Tag;
import com.example.clipboard.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long> {
    List<Tag> findTagsByPostsId(Long postId);

    List<Tag> findTagsByUser(User user);
}
