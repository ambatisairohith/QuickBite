package com.quickbite.backend.controller;

import com.quickbite.backend.model.FoodPlatform;
import com.quickbite.backend.service.FoodPlatformService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/compare")
@CrossOrigin(origins = "*")
public class FoodPlatformController {

    @Autowired
    private FoodPlatformService foodPlatformService;

    // Get all platforms for a food by ID
    @GetMapping("/food/{foodId}")
    public List<FoodPlatform> getByFoodId(@PathVariable Long foodId) {
        return foodPlatformService.getByFoodId(foodId);
    }

    // Search food across all platforms
    @GetMapping("/search")
    public List<FoodPlatform> searchAcrossPlatforms(@RequestParam String name) {
        return foodPlatformService.searchAcrossPlatforms(name);
    }
}