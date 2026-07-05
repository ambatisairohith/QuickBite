const API_URL = 'http://localhost:8080/api';

// Login function
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    if (email === '' || password === '') {
        message.style.color = 'red';
        message.innerText = 'Please fill all fields!';
        return;
    }

    fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            // Save token, name and email in browser
            localStorage.setItem('token', data.token);
            localStorage.setItem('name', data.name);
            localStorage.setItem('email', document.getElementById('email').value);
            message.style.color = 'green';
            message.innerText = 'Login successful! Redirecting...';
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            message.style.color = 'red';
            message.innerText = data.message;
        }
    })
    .catch(error => {
        message.style.color = 'red';
        message.innerText = 'Error connecting to server!';
    });
}

// Register function
function register() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;
    const location = document.getElementById('location').value;
    const message = document.getElementById('message');

    if (name === '' || email === '' || password === '') {
        message.style.color = 'red';
        message.innerText = 'Please fill all required fields!';
        return;
    }

    fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, phone, location })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'User registered successfully!') {
            message.style.color = 'green';
            message.innerText = 'Registered successfully! Redirecting to login...';
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1000);
        } else {
            message.style.color = 'red';
            message.innerText = data.message;
        }
    })
    .catch(error => {
        message.style.color = 'red';
        message.innerText = 'Error connecting to server!';
    });
}