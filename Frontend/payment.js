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
function processPayment() {
    // Generate random transaction ID
    const transactionId = 'QB' + Math.random().toString(36).substr(2, 9).toUpperCase();

    // Show processing
    const payBtns = document.querySelectorAll('.pay-btn');
    payBtns.forEach(btn => {
        btn.innerText = 'Processing...';
        btn.disabled = true;
        btn.style.display = 'none';
    });

    // Simulate payment processing
    setTimeout(() => {
        document.getElementById('transactionId').innerText = 
            `Transaction ID: ${transactionId}`;
        document.getElementById('successPopup').classList.remove('hidden');
    }, 2000);
}