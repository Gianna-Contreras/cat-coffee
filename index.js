// Router simplificado para SPA - VERSIÓN LIMPIA
class Router {
    constructor() {
        this.routes = {
            'inicio': {
                html: 'pages/inicio/inicio.html',
                css: 'pages/inicio/inicio.css'
            },
            'servicios': {
                html: 'pages/servicios/servicios.html',
                css: 'pages/servicios/servicios.css'
            },
            'tienda': {
                html: 'pages/tienda/tienda.html',
                css: 'pages/tienda/tienda.css'
            },
            'contacto': {
                html: 'pages/contacto/contacto.html',
                css: 'pages/contacto/contacto.css'
            },
            'configuracion': {
                html: 'pages/configuracion/configuracion.html',
                css: 'pages/configuracion/configuracion.css'
            },
            'mi-gatito': {
                html: 'pages/mi-gatito/mi-gatito.html',
                css: 'pages/mi-gatito/mi-gatito.css'
            },
             'avatar-btn': {
                html: 'pages/avatar-btn/avatar-btn.html',
                css: 'pages/avatar-btn/avatar-btn.css'
            }

        };
        
        this.currentPage = null;
    }
    
    init() {
        this.loadLayout();
    }
    
    async loadLayout() {
        try {
            console.log('Cargando layout...');
            
            // PRIMERO: Cargar el layout COMPLETO en #app
            await this.loadFullLayout();
            
            // Cargar CSS del layout
            this.loadCSS('layout/layout/layout.css');
            this.loadCSS('layout/header/header.css');
            this.loadCSS('layout/footer/footer.css');
            
            // Inicializar componentes
            this.initComponents();
            
            // Configurar navegación
            this.setupNavigation();
            
            // Cargar página inicial o desde hash
            const hash = window.location.hash.substring(1) || 'inicio';
            this.navigateTo(hash, false);
            
        } catch (error) {
            console.error('Error cargando layout:', error);
            this.showFallbackError();
        }
    }
    
    async loadFullLayout() {
        try {
            // Cargar layout.html completo
            const response = await fetch('layout/layout/layout.html');
            const layoutHTML = await response.text();
            
            // Insertar el layout completo en #app
            document.getElementById('app').innerHTML = layoutHTML;
            
            // AHORA cargar header y footer dentro de sus contenedores
            await this.loadComponent('header-container', 'layout/header/header.html');
            await this.loadComponent('footer-container', 'layout/footer/footer.html');
            
            return true;
            
        } catch (error) {
            console.error('Error cargando layout completo:', error);
            this.showFallbackLayout();
            return false;
        }
    }
    
    showFallbackError() {
        document.getElementById('app').innerHTML = `
            <div class="fallback-error">
                <h2>Cat Coffee</h2>
                <p>Error cargando la aplicación.</p>
                <button onclick="location.reload()">Recargar</button>
            </div>
        `;
    }
    
    showFallbackLayout() {
        document.getElementById('app').innerHTML = `
            <header>
                <h1>Cat Coffee</h1>
            </header>
            <div class="container">
                <aside>
                    <h3>Menú</h3>
                    <div class="fallback-menu">
                        <button onclick="window.appRouter.navigateTo('inicio')">Inicio</button>
                        <button onclick="window.appRouter.navigateTo('servicios')">Servicios</button>
                    </div>
                </aside>
                <main id="main-content">
                    <!-- Contenido dinámico aquí -->
                </main>
            </div>
            <footer>
                <p>cat cutee, miau y miau 🧶🐈‍⬛</p>
            </footer>
        `;
    }
    
    async loadComponent(containerId, url) {
        try {
            const container = document.getElementById(containerId);
            if (!container) {
                console.warn(`Contenedor ${containerId} no encontrado`);
                return false;
            }
            
            const response = await fetch(url);
            const html = await response.text();
            container.innerHTML = html;
            
            return true;
            
        } catch (error) {
            console.error(`Error cargando componente ${containerId}:`, error);
            return false;
        }
    }
    
    initComponents() {
        // Cargar y ejecutar scripts de componentes
        this.loadScript('layout/header/header.js').then(() => {
            if (typeof initHeader === 'function') {
                initHeader();
            }
        });
        
        this.loadScript('layout/footer/js/footer.js').then(() => {
            if (typeof initFooter === 'function') {
                initFooter();
            }
        });
    }
    
    async loadScript(url) {
        return new Promise((resolve, reject) => {
            // Verificar si el script ya está cargado
            if (document.querySelector(`script[src="${url}"]`)) {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = url;
            script.onload = () => {
                console.log(`Script cargado: ${url}`);
                resolve();
            };
            script.onerror = (error) => {
                console.warn(`Error cargando script ${url}:`, error);
                resolve(); // Resolvemos igual para no bloquear
            };
            document.body.appendChild(script);
        });
    }
    
    setupNavigation() {
        // Configurar botones del menú con un pequeño delay para asegurar que el DOM esté listo
        setTimeout(() => {
            const menuButtons = document.querySelectorAll('[data-page]');
            console.log(`Encontrados ${menuButtons.length} botones del menú`);
            
            menuButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const page = button.dataset.page;
                    if (page) {
                        console.log(`Clic en menú: ${page}`);
                        this.navigateTo(page);
                    }
                });
            });
            
            // Manejar navegación con botones atrás/adelante
            window.addEventListener('popstate', (e) => {
                if (e.state && e.state.page) {
                    this.navigateTo(e.state.page, false);
                }
            });
            
        }, 100);
    }
    
    async navigateTo(page, pushState = true) {
        console.log(`Navegando a: ${page}`);
        
        if (!this.routes[page]) {
            console.error(`Página no encontrada: ${page}`);
            this.showError(`Página "${page}" no existe`);
            return;
        }
        
        this.currentPage = page;
        
        // Actualizar historial
        if (pushState) {
            history.pushState({ page }, '', `#${page}`);
        }
        
        // Actualizar menú activo
        this.updateActiveMenu(page);
        
        // Cargar página
        await this.loadPage(page);
    }
    
    async loadPage(page) {
        const mainContent = document.getElementById('main-content');
        if (!mainContent) {
            console.error('main-content no encontrado');
            this.showError('Área de contenido no disponible');
            return;
        }
        
        // Mostrar loading
        mainContent.innerHTML = '<div class="loading">Cargando...</div>';
        mainContent.classList.remove('loaded');
        
        try {
            // Cargar HTML de la página
            const response = await fetch(this.routes[page].html);
            if (!response.ok) {
                throw new Error(`Error HTTP ${response.status}`);
            }
            
            const html = await response.text();
            mainContent.innerHTML = html;
            
            // Cargar CSS específico si existe
            if (this.routes[page].css) {
                this.loadCSS(this.routes[page].css);
            }
            
            // Animar entrada
            setTimeout(() => {
                mainContent.classList.add('loaded');
            }, 50);
            
            console.log(`Página ${page} cargada correctamente`);
            
        } catch (error) {
            console.error(`Error cargando ${page}:`, error);
            this.showError(`No se pudo cargar la página "${page}"`, error.message);
        }
    }
    
    showError(title, message = '') {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.innerHTML = `
                <div class="error">
                    <h2>${title}</h2>
                    ${message ? `<p>${message}</p>` : ''}
                    <button class="error-btn">Volver al inicio</button>
                </div>
            `;
            
            // Configurar botón
            const errorBtn = mainContent.querySelector('.error-btn');
            if (errorBtn) {
                errorBtn.addEventListener('click', () => {
                    this.navigateTo('inicio');
                });
            }
            
            mainContent.classList.add('loaded');
        }
    }
    
    loadCSS(url) {
        try {
            // Evitar cargar duplicados
            if (document.querySelector(`link[href="${url}"]`)) {
                return;
            }
            
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            document.head.appendChild(link);
            
            console.log(`CSS cargado: ${url}`);
            
        } catch (error) {
            console.error(`Error cargando CSS ${url}:`, error);
        }
    }
    
    updateActiveMenu(page) {
        setTimeout(() => {
           const menuButtons = document.querySelectorAll('[data-page]');
            menuButtons.forEach(btn => {
                if (btn.dataset.page === page) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            
            console.log(`Menú actualizado: ${page} activo`);
        }, 50);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado, iniciando aplicación...');
    window.appRouter = new Router();
    window.appRouter.init();
});