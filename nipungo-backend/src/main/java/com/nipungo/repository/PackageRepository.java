package com.nipungo.repository;

import com.nipungo.entity.TravelPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PackageRepository extends JpaRepository<TravelPackage, Long> {
    List<TravelPackage> findByFeaturedTrue();
    List<TravelPackage> findByPopularTrue();
    List<TravelPackage> findByCategory(String category);

    @Query("SELECT p FROM TravelPackage p WHERE " +
           "LOWER(p.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.category) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.tagline) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<TravelPackage> searchPackages(@Param("query") String query);
}
