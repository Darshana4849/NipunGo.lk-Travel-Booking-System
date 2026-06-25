package com.nipungo.service;

import com.nipungo.dto.PackageDto;

import java.util.List;

public interface PackageService {
    List<PackageDto> getAllPackages();
    PackageDto getPackageById(Long id);
    List<PackageDto> getFeaturedPackages();
    List<PackageDto> getPopularPackages();
    List<PackageDto> searchPackages(String query);
    List<PackageDto> getPackagesByCategory(String category);
    PackageDto createPackage(PackageDto dto);
    PackageDto updatePackage(Long id, PackageDto dto);
    void deletePackage(Long id);
}
