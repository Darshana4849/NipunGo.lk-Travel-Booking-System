package com.nipungo.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class PackageDto {
    private Long id;

    @NotBlank(message = "Package title is required")
    @Size(max = 200, message = "Title must not exceed 200 characters")
    private String title;

    @NotBlank(message = "Tagline is required")
    @Size(max = 300, message = "Tagline must not exceed 300 characters")
    private String tagline;

    @Size(max = 5000, message = "Description must not exceed 5000 characters")
    private String description;

    @NotNull(message = "Duration is required")
    @Min(value = 1, message = "Duration must be at least 1")
    private Integer duration;

    private String durationUnit;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    private BigDecimal price;

    private BigDecimal originalPrice;

    @Size(max = 500, message = "Image URL must not exceed 500 characters")
    private String imageUrl;

    private String category;
    private String difficulty;
    private String groupSize;
    private String badge;

    @DecimalMin(value = "0.0", message = "Rating must be at least 0.0")
    @DecimalMax(value = "5.0", message = "Rating must not exceed 5.0")
    private Double rating;

    private Integer reviewCount;
    private Boolean featured;
    private Boolean popular;
    private LocalDateTime createdAt;
}
