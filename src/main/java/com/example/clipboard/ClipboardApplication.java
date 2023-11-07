package com.example.clipboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ClipboardApplication {
	public static void main(String[] args) {
		SpringApplication.run(ClipboardApplication.class, args);
	}
}
