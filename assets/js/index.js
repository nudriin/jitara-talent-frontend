(function () {
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');
    const iconOpen = document.getElementById('iconOpen');
    const iconClose = document.getElementById('iconClose');

    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        const open = menu.classList.toggle('hidden');
        // toggle icons
        iconOpen.classList.toggle('hidden');
        iconClose.classList.toggle('hidden');
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
    });
})();