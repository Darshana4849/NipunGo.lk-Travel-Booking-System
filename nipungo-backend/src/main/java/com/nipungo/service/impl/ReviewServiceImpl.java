package com.nipungo.service.impl;

import com.nipungo.dto.ReviewDto;
import com.nipungo.entity.Hotel;
import com.nipungo.entity.Review;
import com.nipungo.entity.User;
import com.nipungo.exception.ResourceNotFoundException;
import com.nipungo.repository.HotelRepository;
import com.nipungo.repository.ReviewRepository;
import com.nipungo.repository.UserRepository;
import com.nipungo.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final HotelRepository hotelRepository;

    @Override
    public List<ReviewDto> getAllReviews() {
        return reviewRepository.findAll()
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<ReviewDto> getReviewsByHotel(Long hotelId) {
        return reviewRepository.findByHotelId(hotelId)
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ReviewDto createReview(ReviewDto dto, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        Hotel hotel = hotelRepository.findById(dto.getHotelId())
                .orElseThrow(() -> new ResourceNotFoundException("Hotel", "id", dto.getHotelId()));

        Review review = Review.builder()
                .comment(dto.getComment())
                .rating(dto.getRating())
                .user(user)
                .hotel(hotel)
                .build();

        Review saved = reviewRepository.save(review);

        // Update hotel average rating
        Double avgRating = reviewRepository.findAverageRatingByHotelId(hotel.getId());
        if (avgRating != null) {
            hotel.setRating(Math.round(avgRating * 10.0) / 10.0);
            hotel.setReviewCount(reviewRepository.findByHotelId(hotel.getId()).size());
            hotelRepository.save(hotel);
        }

        log.info("Review created by {} for hotel: {}", email, hotel.getName());
        return toDto(saved);
    }

    @Override
    @Transactional
    public void deleteReview(Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review", "id", id));
        reviewRepository.delete(review);
        log.info("Review deleted: id={}", id);
    }

    private ReviewDto toDto(Review r) {
        ReviewDto dto = new ReviewDto();
        dto.setId(r.getId());
        dto.setComment(r.getComment());
        dto.setRating(r.getRating());
        dto.setCreatedAt(r.getCreatedAt());
        if (r.getHotel() != null) {
            dto.setHotelId(r.getHotel().getId());
            dto.setHotelName(r.getHotel().getName());
        }
        if (r.getUser() != null) {
            dto.setUserId(r.getUser().getId());
            dto.setUserFirstName(r.getUser().getFirstName());
            dto.setUserLastName(r.getUser().getLastName());
        }
        return dto;
    }
}
