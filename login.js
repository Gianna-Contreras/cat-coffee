// Login simple - Acepta cualquier dato
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los datos (no importa cuáles sean)
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Guardar en localStorage para saber que está logueado
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);
            
            // Redirigir a la app principal
            window.location.href = 'index.html';
        });
    }
});