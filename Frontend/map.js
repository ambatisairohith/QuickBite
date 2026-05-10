let map;
let userMarker;

// Dummy nearby restaurants data
const restaurants = [
    { name: "Pizza Palace", type: "Pizza", rating: 4.5, time: "30 mins", lat: 0, lng: 0, offset: [0.002, 0.003] },
    { name: "Burger King", type: "Burger", rating: 4.2, time: "20 mins", lat: 0, lng: 0, offset: [0.004, -0.002] },
    { name: "Dominos", type: "Pizza", rating: 4.0, time: "25 mins", lat: 0, lng: 0, offset: [-0.003, 0.004] },
    { name: "Biryani House", type: "Biryani", rating: 4.7, time: "40 mins", lat: 0, lng: 0, offset: [-0.002, -0.003] },
    { name: "Chinese Dragon", type: "Chinese", rating: 4.3, time: "35 mins", lat: 0, lng: 0, offset: [0.005, 0.001] },
    { name: "Sweet Treats", type: "Desserts", rating: 4.6, time: "15 mins", lat: 0, lng: 0, offset: [-0.004, 0.005] }
];

// Initialize map
function initMap(lat, lng) {
    // Create map
    map = L.map('map', {
    center: [lat, lng],
    zoom: 14,
    dragging: true,
    scrollWheelZoom: true,
    doubleClickZoom: true,
    touchZoom: true
}).setView([lat, lng], 14);

    // Add map tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add user location marker
    userMarker = L.marker([lat, lng])
        .addTo(map)
        .bindPopup('📍 You are here!')
        .openPopup();

    // Add restaurant markers
    restaurants.forEach((restaurant, index) => {
        const rLat = lat + restaurant.offset[0];
        const rLng = lng + restaurant.offset[1];

        restaurant.lat = rLat;
        restaurant.lng = rLng;

        L.marker([rLat, rLng])
            .addTo(map)
            .bindPopup(`
                <b>🍽️ ${restaurant.name}</b><br>
                ⭐ ${restaurant.rating}<br>
                🚚 ${restaurant.time}
            `);
    });

    // Show restaurant list
    showRestaurantList();
}

// Show restaurant cards
function showRestaurantList() {
    const container = document.getElementById('restaurantList');
    container.innerHTML = restaurants.map(r => `
        <div class="restaurant-card" onclick="focusRestaurant(${r.lat}, ${r.lng}, '${r.name}')">
            <h4>🍽️ ${r.name}</h4>
            <p>🍴 ${r.type}</p>
            <p>⭐ ${r.rating}</p>
            <p>🚚 ${r.time}</p>
        </div>
    `).join('');
}

// Focus on restaurant on map
function focusRestaurant(lat, lng, name) {
    map.setView([lat, lng], 16);
    L.popup()
        .setLatLng([lat, lng])
        .setContent(`<b>🍽️ ${name}</b>`)
        .openOn(map);
}

// Get user location
function locateMe() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                initMap(lat, lng);
            },
            error => {
                alert('Location access denied! Showing default location.');
                // Default location - Hyderabad
                initMap(17.3850, 78.4867);
            }
        );
    } else {
        alert('Geolocation not supported!');
        initMap(17.3850, 78.4867);
    }
}

// Auto load map with default location
window.onload = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                initMap(position.coords.latitude, position.coords.longitude);
            },
            error => {
                initMap(17.3850, 78.4867);
            }
        );
    } else {
        initMap(17.3850, 78.4867);
    }
}