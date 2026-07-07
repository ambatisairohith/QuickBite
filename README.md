"# QuickBite" 



# ⚡ QuickBite — Smart Food Comparison Platform

> **Compare Price, Quality & Ratings across all food platforms in one click!**

![QuickBite](https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800)

---

## 🚀 About QuickBite

QuickBite is an AI-powered full-stack web application that allows users to search any food item and instantly compare prices, quality ratings, and delivery times across multiple food platforms like **Swiggy, Zomato, Dominos, Pizza Hut, KFC, McDonalds and Subway** — all in one place!

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 **Smart Food Search** | Search any dish instantly |
| 💰 **Price Comparison** | Compare prices across 7 platforms |
| ⭐ **Quality & Rating** | Find the best rated food |
| 🚚 **Delivery Time** | Find the fastest delivery |
| 🤖 **AI Recommendation** | Smart suggestion scored out of 100 |
| 🔐 **JWT Authentication** | Secure login & register |
| 💳 **Payment Gateway** | UPI, Cards, Net Banking, Wallets |
| 🗺️ **Nearby Restaurants** | Interactive map with Leaflet.js |
| 🛒 **Cart** | Add items before ordering |
| ❤️ **Wishlist** | Save favourite foods |
| 📋 **Order History** | Track all past orders |
| 🚚 **Delivery Tracking** | Real-time order tracking animation |
| 👤 **User Profile** | Personal stats & account info |
| 🎉 **Offers Page** | Browse platform-specific deals |

---

## 🍔 Food Platforms

| Platform | Type |
|---|---|
| 🟠 Swiggy | Food Delivery |
| 🔴 Zomato | Food Delivery |
| 🔵 Dominos | Pizza Chain |
| 🔴 Pizza Hut | Pizza Chain |
| 🔴 KFC | Fast Food |
| 🟡 McDonalds | Fast Food |
| 🟢 Subway | Sandwich Chain |

---

## 🍽️ Food Categories

- 🍕 Fast Food (Pizza, Burger, Sandwich, Shawarma)
- 🍛 Indian (Biryani, Paneer, Chicken Tikka, Pav Bhaji)
- 🍜 Chinese (Noodles, Fried Rice, Manchurian, Spring Rolls)
- 🥞 South Indian (Dosa, Idli)
- 🍰 Desserts (Chocolate Cake, Ice Cream)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | HTML, CSS, JavaScript |
| **Backend** | Java Spring Boot |
| **Database** | MySQL |
| **Authentication** | JWT + Spring Security |
| **AI Feature** | Custom Weighted Scoring Algorithm |
| **Maps** | Leaflet.js + OpenStreetMap |
| **Payment** | Simulated Payment Gateway |

---

## 🗄️ Database Tables

| Table | Description |
|---|---|
| users | User accounts |
| foods | 18 food items |
| platforms | 7 food platforms |
| food_platforms | Price, rating, delivery data |
| cart | User cart items |
| wishlist | User wishlist |
| orders | Order history |
| searches | Search history |
| reviews | Food reviews |

---

## 📁 Project Structure



QuickBite/
├── Frontend/
│   ├── index.html        ← Home page
│   ├── search.html       ← Search results
│   ├── login.html        ← Login page
│   ├── register.html     ← Register page
│   ├── cart.html         ← Shopping cart
│   ├── wishlist.html     ← Wishlist
│   ├── orders.html       ← Order history
│   ├── payment.html      ← Payment gateway
│   ├── tracking.html     ← Delivery tracking
│   ├── profile.html      ← User profile
│   ├── map.html          ← Nearby restaurants
│   ├── offers.html       ← Offers page
│   └── *.js / *.css
└── quickbite-backend/
└── src/main/java/com/quickbite/backend/
├── controller/   ← REST APIs
├── model/        ← Database models
├── repository/   ← Database queries
└── service/      ← Business logic






---

## ⚙️ How to Run

### Prerequisites
- Java 17
- MySQL 8.0
- Maven
- VS Code with Live Server

### Step 1 — Database Setup
```sql
CREATE DATABASE quickbite;
```

### Step 2 — Backend
```bash
cd quickbite-backend
mvn spring-boot:run
```
Backend runs on: `http://localhost:8080`

### Step 3 — Frontend
Open `Frontend/index.html` with **Live Server** in VS Code

---

## 🎯 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/foods | Get all foods |
| GET | /api/foods/search?name= | Search foods |
| GET | /api/compare/search?name= | Compare platforms |
| GET | /api/recommend/best?name= | AI recommendation |
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/cart/{email} | Get cart |
| POST | /api/cart/add | Add to cart |
| GET | /api/wishlist/{email} | Get wishlist |
| GET | /api/orders/{email} | Get orders |
| POST | /api/orders/save | Save order |

---

## 👨‍💻 Developer

**Ambati Sai Rohith**
- 🎓 B.Tech CSE
- 🔗 GitHub: [@ambatisairohith](https://github.com/ambatisairohith)

---

## 📄 Note

This is a concept project built with sample data to demonstrate full-stack development skills including REST APIs, JWT authentication, AI recommendation, and modern UI design.

---

⚡ *QuickBite — One Search. Best Price. Right Bite!*
