package com.nipungo.service.impl;

import com.nipungo.dto.DestinationDto;
import com.nipungo.entity.Destination;
import com.nipungo.exception.ResourceNotFoundException;
import com.nipungo.repository.DestinationRepository;
import com.nipungo.service.DestinationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class DestinationServiceImpl implements DestinationService {

    private final DestinationRepository destinationRepository;

    @Override
    public List<DestinationDto> getAllDestinations() {
        return destinationRepository.findAll()
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public DestinationDto getDestinationById(Long id) {
        Destination destination = destinationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Destination", "id", id));
        return toDto(destination);
    }

    @Override
    public List<DestinationDto> getFeaturedDestinations() {
        return destinationRepository.findByFeaturedTrue()
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<DestinationDto> searchDestinations(String query) {
        return destinationRepository.searchDestinations(query)
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<DestinationDto> getDestinationsByCategory(String category) {
        return destinationRepository.findByCategory(category)
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public DestinationDto createDestination(DestinationDto dto) {
        Destination destination = toEntity(dto);
        Destination saved = destinationRepository.save(destination);
        log.info("Destination created: {}", saved.getName());
        return toDto(saved);
    }

    @Override
    @Transactional
    public DestinationDto updateDestination(Long id, DestinationDto dto) {
        Destination existing = destinationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Destination", "id", id));

        existing.setName(dto.getName());
        existing.setDistrict(dto.getDistrict());
        existing.setDescription(dto.getDescription());
        existing.setImageUrl(dto.getImageUrl());
        existing.setCategory(dto.getCategory());
        existing.setTagline(dto.getTagline());
        existing.setBestTime(dto.getBestTime());
        existing.setDuration(dto.getDuration());
        if (dto.getRating() != null) existing.setRating(dto.getRating());
        if (dto.getReviewCount() != null) existing.setReviewCount(dto.getReviewCount());
        if (dto.getFeatured() != null) existing.setFeatured(dto.getFeatured());

        Destination updated = destinationRepository.save(existing);
        log.info("Destination updated: {}", updated.getName());
        return toDto(updated);
    }

    @Override
    @Transactional
    public void deleteDestination(Long id) {
        Destination destination = destinationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Destination", "id", id));
        destinationRepository.delete(destination);
        log.info("Destination deleted: id={}", id);
    }

    private DestinationDto toDto(Destination d) {
        DestinationDto dto = new DestinationDto();
        dto.setId(d.getId());
        dto.setName(d.getName());
        dto.setDistrict(d.getDistrict());
        dto.setDescription(d.getDescription());
        dto.setImageUrl(d.getImageUrl());
        dto.setCategory(d.getCategory());
        dto.setTagline(d.getTagline());
        dto.setBestTime(d.getBestTime());
        dto.setDuration(d.getDuration());
        dto.setRating(d.getRating());
        dto.setReviewCount(d.getReviewCount());
        dto.setFeatured(d.getFeatured());
        dto.setCreatedAt(d.getCreatedAt());
        return dto;
    }

    private Destination toEntity(DestinationDto dto) {
        return Destination.builder()
                .name(dto.getName())
                .district(dto.getDistrict())
                .description(dto.getDescription())
                .imageUrl(dto.getImageUrl())
                .category(dto.getCategory() != null ? dto.getCategory() : "General")
                .tagline(dto.getTagline())
                .bestTime(dto.getBestTime())
                .duration(dto.getDuration())
                .rating(dto.getRating() != null ? dto.getRating() : 0.0)
                .reviewCount(dto.getReviewCount() != null ? dto.getReviewCount() : 0)
                .featured(dto.getFeatured() != null ? dto.getFeatured() : false)
                .build();
    }
}
