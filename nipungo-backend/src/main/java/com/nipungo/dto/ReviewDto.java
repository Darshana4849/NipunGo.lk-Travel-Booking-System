package com.nipungo.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReviewDto {
    private Long id;

    @NotBlank(message = "Comment is required")
    @Size(min = 10, max = 2000, message = "Comment must be 10–2000 characters")
    private String comment;

    @NotNull(message = "Rating is required")
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must not exceed 5")
    private Integer rating;

    @NotNull(message = "Hotel ID is required")
    private Long hotelId;

    private String hotelName;
    private Long userId;
    private String userFirstName;
    private String userLastName;
    private LocalDateTime createdAt;
}
