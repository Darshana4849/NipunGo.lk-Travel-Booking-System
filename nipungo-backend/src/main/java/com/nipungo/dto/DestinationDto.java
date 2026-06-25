package com.nipungo.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DestinationDto {
    private Long id;

    @NotBlank(message = "Destination name is required")
    @Size(max = 150, message = "Name must not exceed 150 characters")
    private String name;

    @NotBlank(message = "District is required")
    @Size(max = 150, message = "District must not exceed 150 characters")
    private String district;

    @Size(max = 2000, message = "Description must not exceed 2000 characters")
    private String description;

    @Size(max = 500, message = "Image URL must not exceed 500 characters")
    private String imageUrl;

    @NotBlank(message = "Category is required")
    private String category;

    private String tagline;
    private String bestTime;
    private String duration;

    @DecimalMin(value = "0.0", message = "Rating must be at least 0.0")
    @DecimalMax(value = "5.0", message = "Rating must not exceed 5.0")
    private Double rating;

    private Integer reviewCount;
    private Boolean featured;
    private LocalDateTime createdAt;
}
