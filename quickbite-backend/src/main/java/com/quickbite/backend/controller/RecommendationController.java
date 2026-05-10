package com.quickbite.backend.controller;

import com.quickbite.backend.model.FoodPlatform;
import com.quickbite.backend.service.FoodPlatformService;
import com.quickbite.backend.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recommend")
@CrossOrigin(origins = "*")
public class RecommendationController {

    @Autowired
    private FoodPlatformService foodPlatformService;

    @Autowired
    private RecommendationService recommendationService;

    // Get best recommendation for a food
    @GetMapping("/best")
    public Map<String, Object> getBestRecommendation(@RequestParam String name) {
        List<FoodPlatform> platforms = foodPlatformService.searchAcrossPlatforms(name);
        
        if (platforms.isEmpty()) {
            return Map.of("message", "No food found!");
        }
        
        return recommendationService.getBestRecommendation(platforms);
    }
}