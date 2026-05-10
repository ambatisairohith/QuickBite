package com.quickbite.backend.service;

import com.quickbite.backend.model.FoodPlatform;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Service
public class RecommendationService {

    // Calculate score for each platform
    public Map<String, Object> getBestRecommendation(List<FoodPlatform> platforms) {
        
        FoodPlatform bestPlatform = null;
        double bestScore = -1;

        // Find best values
        double minPrice = platforms.stream()
                .mapToDouble(FoodPlatform::getPrice)
                .min().orElse(0);

        double maxRating = platforms.stream()
                .mapToDouble(FoodPlatform::getRating)
                .max().orElse(0);

        double minDelivery = platforms.stream()
                .mapToDouble(FoodPlatform::getDeliveryTime)
                .min().orElse(0);

        // Calculate score for each platform
        for (FoodPlatform platform : platforms) {

            // Price score (lower price = higher score)
            double priceScore = minPrice / platform.getPrice() * 40;

            // Rating score (higher rating = higher score)
            double ratingScore = (platform.getRating() / maxRating) * 40;

            // Delivery score (lower time = higher score)
            double deliveryScore = minDelivery / platform.getDeliveryTime() * 20;

            // Total score out of 100
            double totalScore = priceScore + ratingScore + deliveryScore;

            if (totalScore > bestScore) {
                bestScore = totalScore;
                bestPlatform = platform;
            }
        }

        // Build response
        Map<String, Object> result = new HashMap<>();
        result.put("recommendedPlatform", bestPlatform.getPlatform().getName());
        result.put("foodName", bestPlatform.getFood().getName());
        result.put("price", bestPlatform.getPrice());
        result.put("rating", bestPlatform.getRating());
        result.put("deliveryTime", bestPlatform.getDeliveryTime());
        result.put("score", Math.round(bestScore));
        result.put("reason", generateReason(bestPlatform, minPrice, maxRating, minDelivery));

        return result;
    }

    // Generate human readable reason
    private String generateReason(FoodPlatform platform, 
                                   double minPrice, 
                                   double maxRating, 
                                   double minDelivery) {
        String reason = "Best choice because: ";

        if (platform.getPrice() == minPrice) {
            reason += "Lowest price ₹" + platform.getPrice() + "! ";
        }
        if (platform.getRating() == maxRating) {
            reason += "Highest rating ⭐" + platform.getRating() + "! ";
        }
        if (platform.getDeliveryTime() == minDelivery) {
            reason += "Fastest delivery 🚚" + platform.getDeliveryTime() + " mins!";
        }

        return reason;
    }
}