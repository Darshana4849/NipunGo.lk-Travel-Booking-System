package com.nipungo.dto;

import com.nipungo.enums.BookingStatus;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class BookingDto {
    private Long id;
    private String referenceNumber;

    @NotNull(message = "Travel date is required")
    @Future(message = "Travel date must be in the future")
    private LocalDate travelDate;

    private LocalDate bookingDate;
    private BookingStatus status;

    @NotNull(message = "Number of guests is required")
    @Min(value = 1, message = "At least 1 guest is required")
    @Max(value = 20, message = "Maximum 20 guests allowed")
    private Integer numberOfGuests;

    private BigDecimal totalAmount;

    @Size(max = 1000, message = "Special requests must not exceed 1000 characters")
    private String specialRequests;

    @NotNull(message = "Package ID is required")
    private Long packageId;

    private String packageTitle;
    private String packageImageUrl;
    private Long userId;
    private String userFirstName;
    private String userLastName;
    private String userEmail;
    private LocalDateTime createdAt;
}
