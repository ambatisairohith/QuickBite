package com.quickbite.backend.repository;

import com.quickbite.backend.model.FoodPlatform;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FoodPlatformRepository extends JpaRepository<FoodPlatform, Long> {

    // Get all platforms for a specific food
    List<FoodPlatform> findByFoodId(Long foodId);

    // Get all platforms for a specific food name
    List<FoodPlatform> findByFoodNameContainingIgnoreCase(String name);
}