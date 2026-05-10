package com.quickbite.backend.service;

import com.quickbite.backend.model.FoodPlatform;
import com.quickbite.backend.repository.FoodPlatformRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FoodPlatformService {

    @Autowired
    private FoodPlatformRepository foodPlatformRepository;

    // Get all platforms for a food
    public List<FoodPlatform> getByFoodId(Long foodId) {
        return foodPlatformRepository.findByFoodId(foodId);
    }

    // Search food across all platforms
    public List<FoodPlatform> searchAcrossPlatforms(String name) {
        return foodPlatformRepository.findByFoodNameContainingIgnoreCase(name);
    }
}