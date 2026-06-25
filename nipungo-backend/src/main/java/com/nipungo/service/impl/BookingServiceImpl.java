package com.nipungo.service.impl;

import com.nipungo.dto.BookingDto;
import com.nipungo.entity.Booking;
import com.nipungo.entity.TravelPackage;
import com.nipungo.entity.User;
import com.nipungo.enums.BookingStatus;
import com.nipungo.exception.BadRequestException;
import com.nipungo.exception.ResourceNotFoundException;
import com.nipungo.repository.BookingRepository;
import com.nipungo.repository.PackageRepository;
import com.nipungo.repository.UserRepository;
import com.nipungo.service.BookingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final PackageRepository packageRepository;

    @Override
    public List<BookingDto> getAllBookings() {
        return bookingRepository.findAll()
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public BookingDto getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "id", id));
        return toDto(booking);
    }

    @Override
    public List<BookingDto> getMyBookings(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        return bookingRepository.findByUserId(user.getId())
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public BookingDto createBooking(BookingDto dto, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        TravelPackage pkg = packageRepository.findById(dto.getPackageId())
                .orElseThrow(() -> new ResourceNotFoundException("Package", "id", dto.getPackageId()));

        BigDecimal total = pkg.getPrice()
                .multiply(BigDecimal.valueOf(dto.getNumberOfGuests()));

        String refNumber = "NIP-" + LocalDate.now().getYear() + "-"
                + UUID.randomUUID().toString().substring(0, 6).toUpperCase();

        Booking booking = Booking.builder()
                .referenceNumber(refNumber)
                .bookingDate(LocalDate.now())
                .travelDate(dto.getTravelDate())
                .status(BookingStatus.PENDING)
                .numberOfGuests(dto.getNumberOfGuests())
                .totalAmount(total)
                .specialRequests(dto.getSpecialRequests())
                .user(user)
                .travelPackage(pkg)
                .build();

        Booking saved = bookingRepository.save(booking);
        log.info("Booking created: {} for user: {}", saved.getReferenceNumber(), email);
        return toDto(saved);
    }

    @Override
    @Transactional
    public BookingDto updateBookingStatus(Long id, String status) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "id", id));
        try {
            booking.setStatus(BookingStatus.valueOf(status.toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid booking status: " + status);
        }
        Booking updated = bookingRepository.save(booking);
        log.info("Booking {} status updated to {}", updated.getReferenceNumber(), status);
        return toDto(updated);
    }

    @Override
    @Transactional
    public void deleteBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "id", id));
        bookingRepository.delete(booking);
        log.info("Booking deleted: id={}", id);
    }

    private BookingDto toDto(Booking b) {
        BookingDto dto = new BookingDto();
        dto.setId(b.getId());
        dto.setReferenceNumber(b.getReferenceNumber());
        dto.setBookingDate(b.getBookingDate());
        dto.setTravelDate(b.getTravelDate());
        dto.setStatus(b.getStatus());
        dto.setNumberOfGuests(b.getNumberOfGuests());
        dto.setTotalAmount(b.getTotalAmount());
        dto.setSpecialRequests(b.getSpecialRequests());
        dto.setCreatedAt(b.getCreatedAt());
        if (b.getTravelPackage() != null) {
            dto.setPackageId(b.getTravelPackage().getId());
            dto.setPackageTitle(b.getTravelPackage().getTitle());
            dto.setPackageImageUrl(b.getTravelPackage().getImageUrl());
        }
        if (b.getUser() != null) {
            dto.setUserId(b.getUser().getId());
            dto.setUserFirstName(b.getUser().getFirstName());
            dto.setUserLastName(b.getUser().getLastName());
            dto.setUserEmail(b.getUser().getEmail());
        }
        return dto;
    }
}
