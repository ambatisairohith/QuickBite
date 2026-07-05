const urlParams = new URLSearchParams(window.location.search);
const foodName = urlParams.get('name');
const category = urlParams.get('category');
const API_URL = 'http://localhost:8080/api';

window.onload = function() {
    if (foodName) {
        document.getElementById('searchInput').value = foodName;
        document.getElementById('resultsTitle').innerText = `Results for "${foodName}"`;
        fetchComparison(foodName);
    } else if (category) {
        document.getElementById('resultsTitle').innerText = `Category: ${category}`;
        fetchByCategory(category);
    }
}

function fetchComparison(name) {
    // Fetch comparison data
    fetch(`${API_URL}/compare/search?name=${name}`)
        .then(response => response.json())
        .then(data => displayComparison(data))
        .catch(error => console.error('Error:', error));

    // Fetch AI recommendation
    fetch(`${API_URL}/recommend/best?name=${name}`)
        .then(response => response.json())
        .then(data => displayRecommendation(data))
        .catch(error => console.error('Error:', error));
}

// Display AI recommendation
function displayRecommendation(data) {
    const existing = document.getElementById('aiRecommendation');
    if (existing) existing.remove();

    const div = document.createElement('div');
    div.id = 'aiRecommendation';
    div.innerHTML = `
        <div class="ai-box">
            <h3>🤖 QuickBite AI Recommends</h3>
            <div class="ai-content">
                <div class="ai-platform">
                    <span>🏆</span>
                    <h4>${data.recommendedPlatform}</h4>
                </div>
                <div class="ai-details">
                    <p>💰 ₹${data.price}</p>
                    <p>⭐ ${data.rating}</p>
                    <p>🚚 ${data.deliveryTime} mins</p>
                    <p>📊 Score: ${data.score}/100</p>
                </div>
            </div>
            <p class="ai-reason">${data.reason}</p>
        </div>
    `;

    const resultsSection = document.querySelector('.results-section');
    resultsSection.insertBefore(div, document.getElementById('resultsContainer'));
}

function fetchByCategory(category) {
    fetch(`${API_URL}/foods/category?category=${category}`)
        .then(response => response.json())
        .then(foods => {
            const container = document.getElementById('resultsContainer');
            container.innerHTML = foods.map(food => `
                <div class="food-card" onclick="window.location.href='search.html?name=${food.name}'">
                    <h3>🍽️ ${food.name}</h3>
                    <p>${food.description}</p>
                    <p class="category">📁 ${food.category}</p>
                </div>
            `).join('');
        })
        .catch(error => console.error('Error:', error));
}

function displayComparison(data) {
    const container = document.getElementById('resultsContainer');

    if (data.length === 0) {
        container.innerHTML = '<p class="no-results">No foods found! 😕</p>';
        return;
    }

    // Group by food
    const grouped = {};
    data.forEach(item => {
        const foodName = item.food.name;
        if (!grouped[foodName]) {
            grouped[foodName] = {
                food: item.food,
                platforms: []
            };
        }
        grouped[foodName].platforms.push(item);
    });

    // Find best price and best rating
    container.innerHTML = Object.values(grouped).map(group => {
        const bestPrice = Math.min(...group.platforms.map(p => p.price));
        const bestRating = Math.max(...group.platforms.map(p => p.rating));
        const bestDelivery = Math.min(...group.platforms.map(p => p.deliveryTime));

        const platformCards = group.platforms.map(p => `
            <div class="platform-card">
                <h4>${p.platform.name}</h4>
                <p class="price ${p.price === bestPrice ? 'best' : ''}">
                    💰 ₹${p.price} ${p.price === bestPrice ? '✅ Best Price' : ''}
                </p>
                <p class="rating ${p.rating === bestRating ? 'best' : ''}">
                    ⭐ ${p.rating} ${p.rating === bestRating ? '✅ Best Rating' : ''}
                </p>
                <p class="delivery ${p.deliveryTime === bestDelivery ? 'best' : ''}">
                    🚚 ${p.deliveryTime} mins ${p.deliveryTime === bestDelivery ? '✅ Fastest' : ''}
                </p>
                <p>🎉 ${p.discount}</p>
                <div style="display:flex; flex-direction:column; gap:8px; margin-top:15px;">
    <a href="payment.html?amount=${p.price}&platform=${p.platform.name}&food=${group.food.name}" class="order-btn">
        Order on ${p.platform.name}
    </a>
    <button onclick="addToCart('${group.food.name}', '${p.platform.name}', ${p.price})" 
        style="padding:8px; background:white; color:#e23744; border:2px solid #e23744; border-radius:8px; cursor:pointer; font-weight:600;">
        🛒 Add to Cart
    </button>
    <button onclick="addToWishlist('${group.food.name}')" 
        style="padding:8px; background:white; color:#e23744; border:2px solid #e23744; border-radius:8px; cursor:pointer; font-weight:600;">
        ❤️ Wishlist
    </button>
</div>
            </div>
        `).join('');

        return `
            <div class="comparison-card">
                <h3>🍽️ ${group.food.name}</h3>
                <p>${group.food.description}</p>
                <div class="platforms-row">
                    ${platformCards}
                </div>
            </div>
        `;
    }).join('');
}

function searchFood() {
    const query = document.getElementById('searchInput').value;
    if (query.trim() === '') {
        alert('Please enter a food name!');
        return;
    }
    window.location.href = `search.html?name=${query}`;
}



// Add to Cart
function addToCart(foodName, platformName, price) {
    const userEmail = localStorage.getItem('email');
    if (!userEmail) {
        alert('Please login first!');
        window.location.href = 'login.html';
        return;
    }

    fetch('http://localhost:8080/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail, foodName, platformName, price })
    })
    .then(res => res.json())
    .then(data => {
        alert('✅ Added to Cart!');
    });
}

// Add to Wishlist
function addToWishlist(foodName) {
    const userEmail = localStorage.getItem('email');
    if (!userEmail) {
        alert('Please login first!');
        window.location.href = 'login.html';
        return;
    }

    fetch('http://localhost:8080/api/wishlist/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail, foodName })
    })
    .then(res => res.json())
    .then(data => {
        alert('❤️ ' + data.message);
    });
}