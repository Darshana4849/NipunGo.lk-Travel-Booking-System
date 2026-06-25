package com.nipungo.controller;

import com.nipungo.dto.DestinationDto;
import com.nipungo.payload.ApiResponse;
import com.nipungo.service.DestinationService;
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
@RequestMapping("/api/destinations")
@RequiredArgsConstructor
@Tag(name = "Destinations", description = "Sri Lanka destination management")
public class DestinationController {

    private final DestinationService destinationService;

    @GetMapping
    @Operation(summary = "Get all destinations")
    public ResponseEntity<ApiResponse<List<DestinationDto>>> getAllDestinations(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category) {

        List<DestinationDto> destinations;
        if (search != null && !search.isBlank()) {
            destinations = destinationService.searchDestinations(search);
        } else if (category != null && !category.isBlank() && !category.equalsIgnoreCase("All")) {
            destinations = destinationService.getDestinationsByCategory(category);
        } else {
            destinations = destinationService.getAllDestinations();
        }
        return ResponseEntity.ok(
                ApiResponse.success("Destinations retrieved successfully", destinations));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get destination by ID")
    public ResponseEntity<ApiResponse<DestinationDto>> getDestinationById(@PathVariable Long id) {
        DestinationDto destination = destinationService.getDestinationById(id);
        return ResponseEntity.ok(
                ApiResponse.success("Destination retrieved successfully", destination));
    }

    @GetMapping("/featured")
    @Operation(summary = "Get featured destinations")
    public ResponseEntity<ApiResponse<List<DestinationDto>>> getFeaturedDestinations() {
        List<DestinationDto> destinations = destinationService.getFeaturedDestinations();
        return ResponseEntity.ok(
                ApiResponse.success("Featured destinations retrieved", destinations));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a destination (Admin only)",
               security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ApiResponse<DestinationDto>> createDestination(
            @Valid @RequestBody DestinationDto dto) {
        DestinationDto created = destinationService.createDestination(dto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Destination created successfully", created));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update a destination (Admin only)",
               security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ApiResponse<DestinationDto>> updateDestination(
            @PathVariable Long id,
            @Valid @RequestBody DestinationDto dto) {
        DestinationDto updated = destinationService.updateDestination(id, dto);
        return ResponseEntity.ok(
                ApiResponse.success("Destination updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a destination (Admin only)",
               security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ApiResponse<Void>> deleteDestination(@PathVariable Long id) {
        destinationService.deleteDestination(id);
        return ResponseEntity.ok(ApiResponse.success("Destination deleted successfully"));
    }
}
