package com.nipungo.repository;

import com.nipungo.entity.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {
    List<Hotel> findByFeaturedTrue();
    List<Hotel> findByDestinationId(Long destinationId);
    List<Hotel> findByCategory(String category);

    @Query("SELECT h FROM Hotel h WHERE " +
           "LOWER(h.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(h.location) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(h.category) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Hotel> searchHotels(@Param("query") String query);
}
