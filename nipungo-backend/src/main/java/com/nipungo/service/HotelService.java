package com.nipungo.service;

import com.nipungo.dto.HotelDto;

import java.util.List;

public interface HotelService {
    List<HotelDto> getAllHotels();
    HotelDto getHotelById(Long id);
    List<HotelDto> getFeaturedHotels();
    List<HotelDto> getHotelsByDestination(Long destinationId);
    List<HotelDto> searchHotels(String query);
    HotelDto createHotel(HotelDto dto);
    HotelDto updateHotel(Long id, HotelDto dto);
    void deleteHotel(Long id);
}
