function initHeader() {
    const links = document.querySelectorAll('[data-page]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;

            if (page && window.appRouter) {
                window.appRouter.navigateTo(page);
            }
        });
    });
}