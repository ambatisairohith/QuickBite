// Search food by name
function searchFood() {
    const query = document.getElementById('searchInput').value;
    if (query.trim() === '') {
        alert('Please enter a food name!');
        return;
    }
    window.location.href = `search.html?name=${query}`;
}

// Search by category
function searchByCategory(category) {
    window.location.href = `search.html?category=${category}`;
}

// Allow Enter key to search
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchFood();
    }
});