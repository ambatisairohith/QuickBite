package com.quickbite.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "food_platforms")
public class FoodPlatform {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "food_id")
    private Food food;

    @ManyToOne
    @JoinColumn(name = "platform_id")
    private Platform platform;

    private Double price;
    private Double rating;

    @Column(name = "delivery_time")
    private Integer deliveryTime;

    private String discount;

    @Column(name = "portion_size")
    private String portionSize;

    @Column(name = "redirect_url")
    private String redirectUrl;

    // Getters
    public Long getId() { return id; }
    public Food getFood() { return food; }
    public Platform getPlatform() { return platform; }
    public Double getPrice() { return price; }
    public Double getRating() { return rating; }
    public Integer getDeliveryTime() { return deliveryTime; }
    public String getDiscount() { return discount; }
    public String getPortionSize() { return portionSize; }
    public String getRedirectUrl() { return redirectUrl; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setFood(Food food) { this.food = food; }
    public void setPlatform(Platform platform) { this.platform = platform; }
    public void setPrice(Double price) { this.price = price; }
    public void setRating(Double rating) { this.rating = rating; }
    public void setDeliveryTime(Integer deliveryTime) { this.deliveryTime = deliveryTime; }
    public void setDiscount(String discount) { this.discount = discount; }
    public void setPortionSize(String portionSize) { this.portionSize = portionSize; }
    public void setRedirectUrl(String redirectUrl) { this.redirectUrl = redirectUrl; }
}