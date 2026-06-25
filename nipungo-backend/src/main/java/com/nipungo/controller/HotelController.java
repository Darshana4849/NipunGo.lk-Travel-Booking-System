package com.nipungo.controller;

import com.nipungo.dto.HotelDto;
import com.nipungo.payload.ApiResponse;
import com.nipungo.service.HotelService;
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
@RequestMapping("/api/hotels")
@RequiredArgsConstructor
@Tag(name = "Hotels", description = "Hotel listing and management")
public class HotelController {

    private final HotelService hotelService;

    @GetMapping
    @Operation(summary = "Get all hotels")
    public ResponseEntity<ApiResponse<List<HotelDto>>> getAllHotels(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Long destinationId) {

        List<HotelDto> hotels;
        if (search != null && !search.isBlank()) {
            hotels = hotelService.searchHotels(search);
        } else if (destinationId != null) {
            hotels = hotelService.getHotelsByDestination(destinationId);
        } else {
            hotels = hotelService.getAllHotels();
        }
        return ResponseEntity.ok(ApiResponse.success("Hotels retrieved successfully", hotels));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get hotel by ID")
    public ResponseEntity<ApiResponse<HotelDto>> getHotelById(@PathVariable Long id) {
        return ResponseEntity.ok(
                ApiResponse.success("Hotel retrieved successfully", hotelService.getHotelById(id)));
    }

    @GetMapping("/featured")
    @Operation(summary = "Get featured hotels")
    public ResponseEntity<ApiResponse<List<HotelDto>>> getFeaturedHotels() {
        return ResponseEntity.ok(
                ApiResponse.success("Featured hotels retrieved", hotelService.getFeaturedHotels()));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a hotel (Admin only)",
               security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ApiResponse<HotelDto>> createHotel(@Valid @RequestBody HotelDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Hotel created successfully", hotelService.createHotel(dto)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update a hotel (Admin only)",
               security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ApiResponse<HotelDto>> updateHotel(
            @PathVariable Long id, @Valid @RequestBody HotelDto dto) {
        return ResponseEntity.ok(
                ApiResponse.success("Hotel updated successfully", hotelService.updateHotel(id, dto)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a hotel (Admin only)",
               security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ApiResponse<Void>> deleteHotel(@PathVariable Long id) {
        hotelService.deleteHotel(id);
        return ResponseEntity.ok(ApiResponse.success("Hotel deleted successfully"));
    }
}
