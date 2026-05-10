package com.quickbite.backend.service;

import com.quickbite.backend.model.Food;
import com.quickbite.backend.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FoodService {

    @Autowired
    private FoodRepository foodRepository;

    // Get all foods
    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    // Search foods by name
    public List<Food> searchFoods(String name) {
        return foodRepository.findByNameContainingIgnoreCase(name);
    }

    // Search foods by category
    public List<Food> getFoodsByCategory(String category) {
        return foodRepository.findByCategoryIgnoreCase(category);
    }
}