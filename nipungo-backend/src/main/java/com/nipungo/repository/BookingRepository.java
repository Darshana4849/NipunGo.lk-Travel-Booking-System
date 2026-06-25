package com.nipungo.repository;

import com.nipungo.entity.Booking;
import com.nipungo.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId);
    List<Booking> findByUserIdAndStatus(Long userId, BookingStatus status);
    List<Booking> findByTravelPackageId(Long packageId);
    Optional<Booking> findByReferenceNumber(String referenceNumber);
    long countByUserId(Long userId);
}
