document.addEventListener('DOMContentLoaded', () => {
    // 1. Reveal Elements on Scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: stop observing once it's visible
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply the reveal class to major sections or elements before observing
    const sectionsToReveal = document.querySelectorAll('section > div, footer');
    sectionsToReveal.forEach(el => {
        el.classList.add('reveal-on-scroll');
        scrollObserver.observe(el);
    });

    // 2. Navbar Backdrop Blur Adjustment
    // Makes the navbar smaller and blurrier when scrolling down
    const navbar = document.querySelector('nav > div');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-[0_4px_20px_rgb(0,0,0,0.1)]', 'py-3');
            navbar.classList.remove('py-4');
        } else {
            navbar.classList.add('py-4');
            navbar.classList.remove('shadow-[0_4px_20px_rgb(0,0,0,0.1)]', 'py-3');
        }
    });

    // 3. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('nav button');
    const navLinks = document.querySelector('nav .hidden.md\\:flex');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('hidden');
            navLinks.classList.toggle('flex');
            navLinks.classList.toggle('flex-col');
            navLinks.classList.toggle('absolute');
            navLinks.classList.toggle('top-full');
            navLinks.classList.toggle('left-0');
            navLinks.classList.toggle('w-full');
            navLinks.classList.toggle('bg-white');
            navLinks.classList.toggle('p-6');
            navLinks.classList.toggle('rounded-b-2xl');
            navLinks.classList.toggle('gap-4');
            navLinks.classList.toggle('shadow-xl');
            
            // Fix space-x-8 when vertical
            if(navLinks.classList.contains('flex-col')) {
                navLinks.classList.remove('space-x-8');
            } else {
                navLinks.classList.add('space-x-8');
            }
        });
    }

    // 4. Smooth Anchor Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Ignore if it's just '#'
            if(this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                // If mobile menu is open, close it
                if(navLinks && !navLinks.classList.contains('hidden') && window.innerWidth < 768) {
                    mobileMenuBtn.click();
                }

                // Scroll to portion with an offset for the fixed navbar
                const yOffset = -100; 
                const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
                
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    });

    // 5. Video Playback Fallback Insurance
    const video = document.querySelector('video');
    if(video) {
        // Some browsers pause videos when out of view, this ensures it plays when visible
        video.play().catch(e => {
            console.log("Autoplay was prevented:", e);
        });
    }
});
