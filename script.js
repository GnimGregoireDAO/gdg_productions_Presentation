document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // Split text animation
    const splitTextElements = document.querySelectorAll('.split-text');
    splitTextElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.className = 'char';
            element.appendChild(span);
            
            gsap.from(span, {
                duration: 0.8,
                opacity: 0,
                scale: 0,
                y: -50,
                rotateX: -90,
                delay: i * 0.1,
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    });

    // Simplified service cards animation
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '1';  // Make cards visible by default
        gsap.from(card, {
            duration: 0.6,
            y: 30,
            opacity: 0,
            delay: index * 0.2,
            ease: "power1.out",
            scrollTrigger: {
                trigger: card,
                start: "top 95%",  // Trigger earlier
                toggleActions: "play none none none"
            }
        });
    });

    // Pre-reveal services section
    gsap.set('#services', { opacity: 1 });  // Ensure services section is visible
    gsap.set('.service-card', { clearProps: 'all' });  // Clear any initial GSAP properties

    // Tech stack spans animation
    gsap.utils.toArray('.tech-stack span').forEach((span, i) => {
        gsap.from(span, {
            scrollTrigger: {
                trigger: span,
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            duration: 0.5,
            scale: 0,
            opacity: 0,
            delay: i * 0.1,
            ease: "back.out(1.7)"
        });
    });

    // Contact items animation
    gsap.utils.toArray('.contact-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            duration: 0.6,
            x: -50,
            opacity: 0,
            delay: i * 0.2,
            ease: "power2.out"
        });
    });

    // Floating animation for the logo
    gsap.to('.logo-container', {
        y: 20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });

    // Initialize AOS with simpler settings
    AOS.init({
        duration: 800,
        offset: 50,      // Réduit drastiquement l'offset
        once: true,
        disable: 'mobile'  // Désactive sur mobile pour plus de performance
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const navbar = document.querySelector('.main-nav');
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Video overlay handling
    const videoContainer = document.querySelector('.video-container');
    const video = videoContainer?.querySelector('video');
    const overlay = videoContainer?.querySelector('.video-overlay');

    if (videoContainer && video && overlay) {
        videoContainer.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                overlay.style.opacity = '0';
            } else {
                video.pause();
                overlay.style.opacity = '1';
            }
        });

        video.addEventListener('ended', function() {
            overlay.style.opacity = '1';
        });
    }

    displayWelcomeMessage();
});

// Ensure elements are visible if JavaScript fails
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        document.querySelectorAll('.service-card').forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'none';
        });
    }, 100);
});

// Fallback to ensure visibility
window.addEventListener('load', function() {
    setTimeout(() => {
        document.querySelectorAll('.service-card').forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'none';
        });
    }, 500);
});

function displayWelcomeMessage() {
    alert('Welcome to GDG Productions!');
}

function handleFormSubmission(event) {
    event.preventDefault();
    // Add form submission handling logic here
    alert('Form submitted successfully!');
}
