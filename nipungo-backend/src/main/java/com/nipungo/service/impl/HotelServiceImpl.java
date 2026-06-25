package com.nipungo.service.impl;

import com.nipungo.dto.HotelDto;
import com.nipungo.entity.Destination;
import com.nipungo.entity.Hotel;
import com.nipungo.exception.ResourceNotFoundException;
import com.nipungo.repository.DestinationRepository;
import com.nipungo.repository.HotelRepository;
import com.nipungo.service.HotelService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class HotelServiceImpl implements HotelService {

    private final HotelRepository hotelRepository;
    private final DestinationRepository destinationRepository;

    @Override
    public List<HotelDto> getAllHotels() {
        return hotelRepository.findAll()
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public HotelDto getHotelById(Long id) {
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hotel", "id", id));
        return toDto(hotel);
    }

    @Override
    public List<HotelDto> getFeaturedHotels() {
        return hotelRepository.findByFeaturedTrue()
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<HotelDto> getHotelsByDestination(Long destinationId) {
        return hotelRepository.findByDestinationId(destinationId)
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<HotelDto> searchHotels(String query) {
        return hotelRepository.searchHotels(query)
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public HotelDto createHotel(HotelDto dto) {
        Hotel hotel = toEntity(dto);
        if (dto.getDestinationId() != null) {
            Destination destination = destinationRepository.findById(dto.getDestinationId())
                    .orElseThrow(() -> new ResourceNotFoundException("Destination", "id", dto.getDestinationId()));
            hotel.setDestination(destination);
        }
        Hotel saved = hotelRepository.save(hotel);
        log.info("Hotel created: {}", saved.getName());
        return toDto(saved);
    }

    @Override
    @Transactional
    public HotelDto updateHotel(Long id, HotelDto dto) {
        Hotel existing = hotelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hotel", "id", id));

        existing.setName(dto.getName());
        existing.setLocation(dto.getLocation());
        existing.setProvince(dto.getProvince());
        existing.setDescription(dto.getDescription());
        existing.setImageUrl(dto.getImageUrl());
        existing.setPricePerNight(dto.getPricePerNight());
        if (dto.getRating() != null) existing.setRating(dto.getRating());
        if (dto.getReviewCount() != null) existing.setReviewCount(dto.getReviewCount());
        if (dto.getStars() != null) existing.setStars(dto.getStars());
        existing.setCategory(dto.getCategory());
        existing.setCheckIn(dto.getCheckIn());
        existing.setCheckOut(dto.getCheckOut());
        if (dto.getFeatured() != null) existing.setFeatured(dto.getFeatured());

        if (dto.getDestinationId() != null) {
            Destination destination = destinationRepository.findById(dto.getDestinationId())
                    .orElseThrow(() -> new ResourceNotFoundException("Destination", "id", dto.getDestinationId()));
            existing.setDestination(destination);
        }

        Hotel updated = hotelRepository.save(existing);
        log.info("Hotel updated: {}", updated.getName());
        return toDto(updated);
    }

    @Override
    @Transactional
    public void deleteHotel(Long id) {
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hotel", "id", id));
        hotelRepository.delete(hotel);
        log.info("Hotel deleted: id={}", id);
    }

    private HotelDto toDto(Hotel h) {
        HotelDto dto = new HotelDto();
        dto.setId(h.getId());
        dto.setName(h.getName());
        dto.setLocation(h.getLocation());
        dto.setProvince(h.getProvince());
        dto.setDescription(h.getDescription());
        dto.setImageUrl(h.getImageUrl());
        dto.setPricePerNight(h.getPricePerNight());
        dto.setRating(h.getRating());
        dto.setReviewCount(h.getReviewCount());
        dto.setStars(h.getStars());
        dto.setCategory(h.getCategory());
        dto.setCheckIn(h.getCheckIn());
        dto.setCheckOut(h.getCheckOut());
        dto.setFeatured(h.getFeatured());
        dto.setCreatedAt(h.getCreatedAt());
        if (h.getDestination() != null) {
            dto.setDestinationId(h.getDestination().getId());
            dto.setDestinationName(h.getDestination().getName());
        }
        return dto;
    }

    private Hotel toEntity(HotelDto dto) {
        return Hotel.builder()
                .name(dto.getName())
                .location(dto.getLocation())
                .province(dto.getProvince() != null ? dto.getProvince() : "")
                .description(dto.getDescription())
                .imageUrl(dto.getImageUrl())
                .pricePerNight(dto.getPricePerNight())
                .rating(dto.getRating() != null ? dto.getRating() : 0.0)
                .reviewCount(dto.getReviewCount() != null ? dto.getReviewCount() : 0)
                .stars(dto.getStars() != null ? dto.getStars() : 3)
                .category(dto.getCategory())
                .checkIn(dto.getCheckIn())
                .checkOut(dto.getCheckOut())
                .featured(dto.getFeatured() != null ? dto.getFeatured() : false)
                .build();
    }
}
