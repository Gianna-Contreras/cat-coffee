document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const guestBtn = document.getElementById('guest-btn');
    const errorMessage = document.getElementById('error-message');
    const loginBtn = document.getElementById('login-btn');

    // Login normal (cualquier cosa funciona por ahora)
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();

        errorMessage.textContent = '';
        loginBtn.textContent = 'Entrando...';
        loginBtn.disabled = true;

        // Simulación de delay
        setTimeout(() => {
            // Guardamos que el usuario está logueado
            localStorage.setItem('isLoggedIn', 'true');
            if (username) {
                localStorage.setItem('username', username);
            } else {
                localStorage.setItem('username', 'Usuario');
            }

            // Redirección a la app principal
            window.location.href = '../index.html';
        }, 800);
    });

    // Entrar como Invitado
    guestBtn.addEventListener('click', () => {
        guestBtn.textContent = 'Entrando como invitado...';
        guestBtn.disabled = true;

        setTimeout(() => {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', 'Invitado');
            localStorage.setItem('isGuest', 'true');

            window.location.href = '../index.html';
        }, 700);
    });
});document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const guestBtn = document.getElementById('guest-btn');
    const errorMessage = document.getElementById('error-message');
    const loginBtn = document.getElementById('login-btn');

    // Login normal (cualquier cosa funciona por ahora)
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();

        errorMessage.textContent = '';
        loginBtn.textContent = 'Entrando...';
        loginBtn.disabled = true;

        // Simulación de delay
        setTimeout(() => {
            // Guardamos que el usuario está logueado
            localStorage.setItem('isLoggedIn', 'true');
            if (username) {
                localStorage.setItem('username', username);
            } else {
                localStorage.setItem('username', 'Usuario');
            }

            // Redirección a la app principal
            window.location.href = '../index.html';
        }, 800);
    });

    // Entrar como Invitado
    guestBtn.addEventListener('click', () => {
        guestBtn.textContent = 'Entrando como invitado...';
        guestBtn.disabled = true;

        setTimeout(() => {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', 'Invitado');
            localStorage.setItem('isGuest', 'true');

            window.location.href = '../index.html';
        }, 700);
    });
});document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const guestBtn = document.getElementById('guest-btn');
    const errorMessage = document.getElementById('error-message');
    const loginBtn = document.getElementById('login-btn');

    // Login normal (cualquier cosa funciona por ahora)
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();

        errorMessage.textContent = '';
        loginBtn.textContent = 'Entrando...';
        loginBtn.disabled = true;

        // Simulación de delay
        setTimeout(() => {
            // Guardamos que el usuario está logueado
            localStorage.setItem('isLoggedIn', 'true');
            if (username) {
                localStorage.setItem('username', username);
            } else {
                localStorage.setItem('username', 'Usuario');
            }

            // Redirección a la app principal
            window.location.href = '../index.html';
        }, 800);
    });

    // Entrar como Invitado
    guestBtn.addEventListener('click', () => {
        guestBtn.textContent = 'Entrando como invitado...';
        guestBtn.disabled = true;

        setTimeout(() => {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', 'Invitado');
            localStorage.setItem('isGuest', 'true');

            window.location.href = '../index.html';
        }, 700);
    });
});