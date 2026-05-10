package com.quickbite.backend.repository;

import com.quickbite.backend.model.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {

    // Search foods by name
    List<Food> findByNameContainingIgnoreCase(String name);

    // Search foods by category
    List<Food> findByCategoryIgnoreCase(String category);
}