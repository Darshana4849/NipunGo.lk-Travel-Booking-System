package com.nipungo.service.impl;

import com.nipungo.dto.PackageDto;
import com.nipungo.entity.TravelPackage;
import com.nipungo.exception.ResourceNotFoundException;
import com.nipungo.repository.PackageRepository;
import com.nipungo.service.PackageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class PackageServiceImpl implements PackageService {

    private final PackageRepository packageRepository;

    @Override
    public List<PackageDto> getAllPackages() {
        return packageRepository.findAll()
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public PackageDto getPackageById(Long id) {
        TravelPackage pkg = packageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Package", "id", id));
        return toDto(pkg);
    }

    @Override
    public List<PackageDto> getFeaturedPackages() {
        return packageRepository.findByFeaturedTrue()
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<PackageDto> getPopularPackages() {
        return packageRepository.findByPopularTrue()
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<PackageDto> searchPackages(String query) {
        return packageRepository.searchPackages(query)
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<PackageDto> getPackagesByCategory(String category) {
        return packageRepository.findByCategory(category)
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PackageDto createPackage(PackageDto dto) {
        TravelPackage pkg = toEntity(dto);
        TravelPackage saved = packageRepository.save(pkg);
        log.info("Package created: {}", saved.getTitle());
        return toDto(saved);
    }

    @Override
    @Transactional
    public PackageDto updatePackage(Long id, PackageDto dto) {
        TravelPackage existing = packageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Package", "id", id));

        existing.setTitle(dto.getTitle());
        existing.setTagline(dto.getTagline());
        existing.setDescription(dto.getDescription());
        existing.setDuration(dto.getDuration());
        existing.setDurationUnit(dto.getDurationUnit());
        existing.setPrice(dto.getPrice());
        existing.setOriginalPrice(dto.getOriginalPrice());
        existing.setImageUrl(dto.getImageUrl());
        existing.setCategory(dto.getCategory());
        existing.setDifficulty(dto.getDifficulty());
        existing.setGroupSize(dto.getGroupSize());
        existing.setBadge(dto.getBadge());
        if (dto.getRating() != null) existing.setRating(dto.getRating());
        if (dto.getReviewCount() != null) existing.setReviewCount(dto.getReviewCount());
        if (dto.getFeatured() != null) existing.setFeatured(dto.getFeatured());
        if (dto.getPopular() != null) existing.setPopular(dto.getPopular());

        TravelPackage updated = packageRepository.save(existing);
        log.info("Package updated: {}", updated.getTitle());
        return toDto(updated);
    }

    @Override
    @Transactional
    public void deletePackage(Long id) {
        TravelPackage pkg = packageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Package", "id", id));
        packageRepository.delete(pkg);
        log.info("Package deleted: id={}", id);
    }

    private PackageDto toDto(TravelPackage p) {
        PackageDto dto = new PackageDto();
        dto.setId(p.getId());
        dto.setTitle(p.getTitle());
        dto.setTagline(p.getTagline());
        dto.setDescription(p.getDescription());
        dto.setDuration(p.getDuration());
        dto.setDurationUnit(p.getDurationUnit());
        dto.setPrice(p.getPrice());
        dto.setOriginalPrice(p.getOriginalPrice());
        dto.setImageUrl(p.getImageUrl());
        dto.setCategory(p.getCategory());
        dto.setDifficulty(p.getDifficulty());
        dto.setGroupSize(p.getGroupSize());
        dto.setBadge(p.getBadge());
        dto.setRating(p.getRating());
        dto.setReviewCount(p.getReviewCount());
        dto.setFeatured(p.getFeatured());
        dto.setPopular(p.getPopular());
        dto.setCreatedAt(p.getCreatedAt());
        return dto;
    }

    private TravelPackage toEntity(PackageDto dto) {
        return TravelPackage.builder()
                .title(dto.getTitle())
                .tagline(dto.getTagline())
                .description(dto.getDescription())
                .duration(dto.getDuration())
                .durationUnit(dto.getDurationUnit() != null ? dto.getDurationUnit() : "days")
                .price(dto.getPrice())
                .originalPrice(dto.getOriginalPrice())
                .imageUrl(dto.getImageUrl())
                .category(dto.getCategory())
                .difficulty(dto.getDifficulty())
                .groupSize(dto.getGroupSize())
                .badge(dto.getBadge())
                .rating(dto.getRating() != null ? dto.getRating() : 0.0)
                .reviewCount(dto.getReviewCount() != null ? dto.getReviewCount() : 0)
                .featured(dto.getFeatured() != null ? dto.getFeatured() : false)
                .popular(dto.getPopular() != null ? dto.getPopular() : false)
                .build();
    }
}
