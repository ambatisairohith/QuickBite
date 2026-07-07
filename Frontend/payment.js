// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const amount = urlParams.get('amount');
const platform = urlParams.get('platform');
const food = urlParams.get('food');

// Show order details on page load
window.onload = function() {
    document.getElementById('orderDetails').innerHTML = `
        <div style="margin-bottom:10px;">
            <p>🍽️ <strong>${food}</strong></p>
            <p>🏪 Platform: <strong>${platform}</strong></p>
        </div>
    `;
    document.getElementById('totalAmount').innerText = `₹${amount}`;
}

// Show payment tab
function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// Select UPI app
function selectUPI(element) {
    document.querySelectorAll('.upi-app').forEach(app => {
        app.classList.remove('selected');
    });
    element.classList.add('selected');
}

// Select Bank
function selectBank(element) {
    document.querySelectorAll('.bank-card').forEach(bank => {
        bank.classList.remove('selected');
    });
    element.classList.add('selected');
}

// Process Payment
// Process Payment
function processPayment() {
    const transactionId = 'QB' + Math.random().toString(36).substr(2, 9).toUpperCase();

    // Hide only payment tab buttons
    document.querySelectorAll('.tab-content .pay-btn').forEach(btn => {
        btn.innerText = 'Processing...';
        btn.disabled = true;
        btn.style.display = 'none';
    });

    // Simulate payment processing
    // Simulate payment processing
    setTimeout(() => {
        document.getElementById('transactionId').innerText = 
            `Transaction ID: ${transactionId}`;
        document.getElementById('successPopup').classList.remove('hidden');

        // Save order to database
        const userEmail = localStorage.getItem('email');
        if (userEmail) {
            fetch('http://localhost:8080/api/orders/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userEmail: userEmail,
                    foodName: food,
                    platformName: platform,
                    price: parseFloat(amount),
                    transactionId: transactionId
                })
            });
        }
    }, 2000);
}

// Go to tracking page
function goToTracking() {
    const tidText = document.getElementById('transactionId').innerText;
    const tid = tidText.replace('Transaction ID: ', '');
    window.location.href = `tracking.html?food=${food}&platform=${platform}&price=${amount}&tid=${tid}`;
}