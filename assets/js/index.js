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

// Hero Background Image Slider
(function () {
    const heroSlides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.hero-indicator');
    const prevBtn = document.querySelector('.hero-prev');
    const nextBtn = document.querySelector('.hero-next');
    
    if (heroSlides.length === 0) return;

    let currentHeroSlide = 0;
    let heroInterval;
    const heroSlideInterval = 5000;

    // Inisialisasi indicator pertama
    if (indicators.length > 0) {
        indicators.forEach((indicator, idx) => {
            if (idx === 0) {
                indicator.classList.add('active', 'bg-jitara-orange');
                indicator.classList.remove('bg-transparent');
            } else {
                indicator.classList.remove('active', 'bg-jitara-orange');
                indicator.classList.add('bg-transparent');
            }
        });
    }

    function updateHeroSlide(index) {
        // Update slides
        heroSlides.forEach((slide, idx) => {
            if (idx === index) {
                slide.classList.remove('opacity-0');
                slide.classList.add('active', 'opacity-60');
            } else {
                slide.classList.remove('active', 'opacity-60');
                slide.classList.add('opacity-0');
            }
        });

        // Update indicators
        indicators.forEach((indicator, idx) => {
            if (idx === index) {
                indicator.classList.remove('bg-transparent');
                indicator.classList.add('active', 'bg-jitara-orange');
            } else {
                indicator.classList.remove('active', 'bg-jitara-orange');
                indicator.classList.add('bg-transparent');
            }
        });

        currentHeroSlide = index;
    }

    function nextHeroSlide() {
        const nextIndex = (currentHeroSlide + 1) % heroSlides.length;
        updateHeroSlide(nextIndex);
    }

    function prevHeroSlide() {
        const prevIndex = (currentHeroSlide - 1 + heroSlides.length) % heroSlides.length;
        updateHeroSlide(prevIndex);
    }

    function startHeroAutoPlay() {
        heroInterval = setInterval(nextHeroSlide, heroSlideInterval);
    }

    function stopHeroAutoPlay() {
        clearInterval(heroInterval);
    }

    // Navigation arrows
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextHeroSlide();
            stopHeroAutoPlay();
            startHeroAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevHeroSlide();
            stopHeroAutoPlay();
            startHeroAutoPlay();
        });
    }

    // Indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            updateHeroSlide(index);
            stopHeroAutoPlay();
            startHeroAutoPlay();
        });
    });

    // Auto-play
    if (heroSlides.length > 1) {
        startHeroAutoPlay();
        
        // Pause on hover
        const sliderContainer = document.getElementById('heroSlider');
        if (sliderContainer) {
            sliderContainer.parentElement.addEventListener('mouseenter', stopHeroAutoPlay);
            sliderContainer.parentElement.addEventListener('mouseleave', startHeroAutoPlay);
        }
    }
})();