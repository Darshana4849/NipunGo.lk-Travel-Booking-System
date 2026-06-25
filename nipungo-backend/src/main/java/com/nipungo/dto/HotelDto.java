package com.nipungo.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class HotelDto {
    private Long id;

    @NotBlank(message = "Hotel name is required")
    @Size(max = 200, message = "Name must not exceed 200 characters")
    private String name;

    @NotBlank(message = "Location is required")
    @Size(max = 200, message = "Location must not exceed 200 characters")
    private String location;

    @NotBlank(message = "Province is required")
    private String province;

    @Size(max = 3000, message = "Description must not exceed 3000 characters")
    private String description;

    @Size(max = 500, message = "Image URL must not exceed 500 characters")
    private String imageUrl;

    @NotNull(message = "Price per night is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    private BigDecimal pricePerNight;

    @DecimalMin(value = "0.0", message = "Rating must be at least 0.0")
    @DecimalMax(value = "5.0", message = "Rating must not exceed 5.0")
    private Double rating;

    private Integer reviewCount;

    @Min(value = 1, message = "Stars must be at least 1")
    @Max(value = 5, message = "Stars must not exceed 5")
    private Integer stars;

    private String category;
    private String checkIn;
    private String checkOut;
    private Boolean featured;
    private Long destinationId;
    private String destinationName;
    private LocalDateTime createdAt;
}
