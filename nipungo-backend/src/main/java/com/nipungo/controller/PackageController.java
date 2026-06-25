package com.nipungo.controller;

import com.nipungo.dto.PackageDto;
import com.nipungo.payload.ApiResponse;
import com.nipungo.service.PackageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/packages")
@RequiredArgsConstructor
@Tag(name = "Packages", description = "Travel package management")
public class PackageController {

    private final PackageService packageService;

    @GetMapping
    @Operation(summary = "Get all packages")
    public ResponseEntity<ApiResponse<List<PackageDto>>> getAllPackages(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category) {

        List<PackageDto> packages;
        if (search != null && !search.isBlank()) {
            packages = packageService.searchPackages(search);
        } else if (category != null && !category.isBlank() && !category.equalsIgnoreCase("All")) {
            packages = packageService.getPackagesByCategory(category);
        } else {
            packages = packageService.getAllPackages();
        }
        return ResponseEntity.ok(ApiResponse.success("Packages retrieved successfully", packages));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get package by ID")
    public ResponseEntity<ApiResponse<PackageDto>> getPackageById(@PathVariable Long id) {
        return ResponseEntity.ok(
                ApiResponse.success("Package retrieved successfully", packageService.getPackageById(id)));
    }

    @GetMapping("/featured")
    @Operation(summary = "Get featured packages")
    public ResponseEntity<ApiResponse<List<PackageDto>>> getFeaturedPackages() {
        return ResponseEntity.ok(
                ApiResponse.success("Featured packages retrieved", packageService.getFeaturedPackages()));
    }

    @GetMapping("/popular")
    @Operation(summary = "Get popular packages")
    public ResponseEntity<ApiResponse<List<PackageDto>>> getPopularPackages() {
        return ResponseEntity.ok(
                ApiResponse.success("Popular packages retrieved", packageService.getPopularPackages()));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a package (Admin only)",
               security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ApiResponse<PackageDto>> createPackage(@Valid @RequestBody PackageDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Package created successfully", packageService.createPackage(dto)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update a package (Admin only)",
               security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ApiResponse<PackageDto>> updatePackage(
            @PathVariable Long id, @Valid @RequestBody PackageDto dto) {
        return ResponseEntity.ok(
                ApiResponse.success("Package updated successfully", packageService.updatePackage(id, dto)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a package (Admin only)",
               security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ApiResponse<Void>> deletePackage(@PathVariable Long id) {
        packageService.deletePackage(id);
        return ResponseEntity.ok(ApiResponse.success("Package deleted successfully"));
    }
}
