package com.nipungo.service;

import com.nipungo.dto.ReviewDto;

import java.util.List;

public interface ReviewService {
    List<ReviewDto> getAllReviews();
    List<ReviewDto> getReviewsByHotel(Long hotelId);
    ReviewDto createReview(ReviewDto dto, String email);
    void deleteReview(Long id);
}
