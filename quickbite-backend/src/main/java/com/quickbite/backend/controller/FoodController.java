package com.quickbite.backend.controller;

import com.quickbite.backend.model.Food;
import com.quickbite.backend.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/foods")
@CrossOrigin(origins = "*")
public class FoodController {

    @Autowired
    private FoodService foodService;

    // Get all foods
    @GetMapping
    public List<Food> getAllFoods() {
        return foodService.getAllFoods();
    }

    // Search foods by name
    @GetMapping("/search")
    public List<Food> searchFoods(@RequestParam String name) {
        return foodService.searchFoods(name);
    }

    // Search foods by category
    @GetMapping("/category")
    public List<Food> getFoodsByCategory(@RequestParam String category) {
        return foodService.getFoodsByCategory(category);
    }
}