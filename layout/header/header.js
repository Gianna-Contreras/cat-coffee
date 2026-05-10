// Para manejar el clic del avatar
document.querySelectorAll('.avatar-btn, .menu-img-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const page = this.getAttribute('data-page');
        if (page) {
            // Aquí va tu lógica para cambiar de página
            console.log('Navegar a:', page);
        }
    });
});
