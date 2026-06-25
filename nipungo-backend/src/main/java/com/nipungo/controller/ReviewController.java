package com.nipungo.controller;

import com.nipungo.dto.ReviewDto;
import com.nipungo.payload.ApiResponse;
import com.nipungo.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
@Tag(name = "Reviews", description = "Hotel review management")
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping
    @Operation(summary = "Get all reviews")
    public ResponseEntity<ApiResponse<List<ReviewDto>>> getAllReviews() {
        return ResponseEntity.ok(
                ApiResponse.success("Reviews retrieved successfully",
                        reviewService.getAllReviews()));
    }

    @GetMapping("/hotel/{hotelId}")
    @Operation(summary = "Get reviews by hotel")
    public ResponseEntity<ApiResponse<List<ReviewDto>>> getReviewsByHotel(
            @PathVariable Long hotelId) {
        return ResponseEntity.ok(
                ApiResponse.success("Hotel reviews retrieved",
                        reviewService.getReviewsByHotel(hotelId)));
    }

    @PostMapping
    @Operation(summary = "Submit a hotel review",
               security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ApiResponse<ReviewDto>> createReview(
            @Valid @RequestBody ReviewDto dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        ReviewDto created = reviewService.createReview(dto, userDetails.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Review submitted successfully", created));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a review",
               security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ApiResponse<Void>> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.ok(ApiResponse.success("Review deleted successfully"));
    }
}
