package com.nipungo.service;

import com.nipungo.dto.DestinationDto;

import java.util.List;

public interface DestinationService {
    List<DestinationDto> getAllDestinations();
    DestinationDto getDestinationById(Long id);
    List<DestinationDto> getFeaturedDestinations();
    List<DestinationDto> searchDestinations(String query);
    List<DestinationDto> getDestinationsByCategory(String category);
    DestinationDto createDestination(DestinationDto dto);
    DestinationDto updateDestination(Long id, DestinationDto dto);
    void deleteDestination(Long id);
}
