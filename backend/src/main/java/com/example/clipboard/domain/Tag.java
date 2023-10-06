package com.example.clipboard.domain;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tags")
public class Tag extends Model {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "tag_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tagId;

    @Column(name = "name")
    private String name;

    @ManyToMany(fetch = FetchType.LAZY,
        cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    @JoinTable(
        name = "tags_posts",
        joinColumns = {
            @JoinColumn(name = "tag_id")
        },
        inverseJoinColumns = {
            @JoinColumn(name = "post_id")
        }
    )
    private Set<Post> posts = new HashSet<Post>();

    public Tag(){
        super();
    }

    public Tag(String name) {
        this.name = name;
    }

    public Long getTagId() {
        return tagId;
    }

    public void setTagId(Long tagId) {
        this.tagId = tagId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Post> getPosts() {
        return posts;
    }

    public void setPosts(Set<Post> projects) {
        this.posts = projects;
    }
}
