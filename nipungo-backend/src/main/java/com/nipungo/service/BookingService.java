package com.nipungo.service;

import com.nipungo.dto.BookingDto;

import java.util.List;

public interface BookingService {
    List<BookingDto> getAllBookings();
    BookingDto getBookingById(Long id);
    List<BookingDto> getMyBookings(String email);
    BookingDto createBooking(BookingDto dto, String email);
    BookingDto updateBookingStatus(Long id, String status);
    void deleteBooking(Long id);
}
