// Inicializar layout
function initLayout() {
    loadHeader();
    loadFooter();
    setupMenu();
}

// Cargar header
async function loadHeader() {
    try {
        const headerContainer = document.getElementById('header-container');
        const response = await fetch('layout/header/header.html');
        const html = await response.text();
        headerContainer.innerHTML = html;
        
        // Cargar CSS del header
        loadComponentCSS('layout/header/header.css');
        
        // Inicializar header si tiene JS
        if (typeof initHeader === 'function') {
            initHeader();
        }
    } catch (error) {
        console.error('Error cargando header:', error);
    }
}

// Cargar footer
async function loadFooter() {
    try {
        const footerContainer = document.getElementById('footer-container');
        const response = await fetch('layout/footer/footer.html');
        const html = await response.text();
        footerContainer.innerHTML = html;
        
        // Cargar CSS del footer
        loadComponentCSS('layout/footer/footer.css');
        
        // Inicializar footer si tiene JS
        if (typeof initFooter === 'function') {
            initFooter();
        }
    } catch (error) {
        console.error('Error cargando footer:', error);
    }
}

// Configurar menú
function setupMenu() {
    const menuButtons = document.querySelectorAll('[data-page]');
    
    // Pasar los botones al router para que configure la navegación
    if (window.setupMenuNavigation) {
        window.setupMenuNavigation(menuButtons);
    }
}

// Función auxiliar para cargar CSS
function loadComponentCSS(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLayout);
} else {
    initLayout();
}