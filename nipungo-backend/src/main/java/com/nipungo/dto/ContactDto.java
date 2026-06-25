package com.nipungo.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ContactDto {
    private Long id;

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 150, message = "Name must be 2–150 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    private String email;

    @Size(max = 20, message = "Phone must not exceed 20 characters")
    private String phone;

    @NotBlank(message = "Subject is required")
    @Size(max = 200, message = "Subject must not exceed 200 characters")
    private String subject;

    @NotBlank(message = "Message is required")
    @Size(min = 20, max = 2000, message = "Message must be 20–2000 characters")
    private String message;

    private Boolean replied;
    private LocalDateTime createdAt;
}
