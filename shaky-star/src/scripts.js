// ====================================
// GDG Productions - Landing Page Scripts
// Animations & Interactions
// ====================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // ============ Navigation ============
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('.main-nav');
    
    // Mobile menu toggle
    if (menuToggle && navLinks) {
        console.log('Menu elements found');
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            console.log('Menu toggled, active:', navLinks.classList.contains('active'));
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    } else {
        console.error('Menu elements not found:', {menuToggle, navLinks});
    }
    
    // Nav background on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.style.padding = '0.5rem 0';
            nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            nav.style.padding = '1rem 0';
            nav.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // ============ Smooth Scroll ============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============ Hero Animations ============
    const heroTimeline = gsap.timeline();
    
    heroTimeline
        .from('.logo-container', {
            scale: 0,
            rotation: 180,
            opacity: 0,
            duration: 1.5,
            ease: 'back.out(1.7)'
        })
        .from('.hero-title .title-line', {
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-subtitle', {
            y: 50,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.3')
        .from('.hero-description', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.2')
        .from('.hero-cta .btn', {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            stagger: 0.15,
            ease: 'back.out(1.7)'
        }, '-=0.2')
        .from('.scroll-indicator', {
            y: -20,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.3');
    
    // ============ Geometric Shapes Animation ============
    gsap.to('.shape', {
        y: 'random(-50, 50)',
        x: 'random(-50, 50)',
        rotation: 'random(-15, 15)',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
            each: 0.5,
            from: 'random'
        }
    });
    
    // ============ Section Title Animations ============
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            scale: 0.5,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.7)'
        });
        
        // Animate decorators
        const decorators = title.querySelectorAll('.title-decorator');
        gsap.from(decorators, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            width: 0,
            duration: 0.8,
            delay: 0.3,
            stagger: 0.2,
            ease: 'power2.out'
        });
    });
    
    // ============ Story Cards Animation ============
    gsap.utils.toArray('.story-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 100,
            opacity: 0,
            rotation: 5,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power3.out'
        });
        
        // Icon animation
        const icon = card.querySelector('.story-icon');
        if (icon) {
            gsap.from(icon, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                scale: 0,
                rotation: 180,
                duration: 0.6,
                delay: index * 0.2 + 0.3,
                ease: 'back.out(1.7)'
            });
        }
    });
    
    // ============ Service Cards Animation ============
    gsap.utils.toArray('.service-card').forEach((card, index) => {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
        
        timeline
            .from(card, {
                y: 80,
                opacity: 0,
                scale: 0.9,
                duration: 0.7,
                ease: 'power3.out'
            })
            .from(card.querySelector('.service-icon'), {
                scale: 0,
                rotation: -180,
                duration: 0.6,
                ease: 'back.out(1.7)'
            }, '-=0.4')
            .from(card.querySelector('h3'), {
                y: 20,
                opacity: 0,
                duration: 0.4
            }, '-=0.3')
            .from(card.querySelector('p'), {
                y: 20,
                opacity: 0,
                duration: 0.4
            }, '-=0.2')
            .from(card.querySelectorAll('.service-features li'), {
                x: -20,
                opacity: 0,
                duration: 0.3,
                stagger: 0.1
            }, '-=0.2');
        
        // Hover effect with GSAP
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -15,
                boxShadow: '0 20px 60px rgba(212, 175, 55, 0.4)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // ============ Timeline Animation ============
    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
        const isEven = index % 2 === 0;
        
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            x: isEven ? -100 : 100,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
        
        // Number animation
        const number = item.querySelector('.timeline-number');
        gsap.from(number, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            scale: 0,
            rotation: 360,
            duration: 0.6,
            delay: 0.3,
            ease: 'back.out(1.7)'
        });
    });
    
    // ============ Portfolio Items Animation ============
    gsap.utils.toArray('.portfolio-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            scale: 0.8,
            opacity: 0,
            rotation: 5,
            duration: 0.7,
            delay: index * 0.15,
            ease: 'back.out(1.7)'
        });
        
        // Hover parallax effect
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            gsap.to(item, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
    
    // ============ Contact Section Animation ============
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        x: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        x: 100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    gsap.utils.toArray('.contact-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: '.contact-info',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            x: -50,
            opacity: 0,
            duration: 0.5,
            delay: 0.5 + index * 0.1,
            ease: 'power2.out'
        });
    });
    
    gsap.from('.social-links a', {
        scrollTrigger: {
            trigger: '.social-links',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        scale: 0,
        rotation: 180,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.8,
        ease: 'back.out(1.7)'
    });
    
    // Form fields animation
    gsap.utils.toArray('.form-group').forEach((group, index) => {
        gsap.from(group, {
            scrollTrigger: {
                trigger: '.contact-form',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 0.5,
            delay: 0.5 + index * 0.1,
            ease: 'power2.out'
        });
    });
    
    // ============ Footer Animation ============
    gsap.from('.footer-content > *', {
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power2.out'
    });
    
    // ============ Parallax Effect on Scroll ============
    gsap.to('.hero', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        opacity: 0.5,
        scale: 1.1
    });
    
    // ============ Button Ripple Effect ============
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                transform: scale(0);
            `;
            
            this.appendChild(ripple);
            
            gsap.to(ripple, {
                scale: 2,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out',
                onComplete: () => ripple.remove()
            });
        });
    });
    
    // ============ Form Validation & Submission ============
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form button
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual submission logic)
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Envoyé!';
                submitBtn.style.background = 'linear-gradient(135deg, #2E8B57 0%, #1B5E3F 100%)';
                
                // Reset form
                setTimeout(() => {
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 2000);
            }, 1500);
        });
        
        // Input focus animations
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('focus', function() {
                gsap.to(this, {
                    scale: 1.02,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            });
            
            input.addEventListener('blur', function() {
                gsap.to(this, {
                    scale: 1,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            });
        });
    }
    
    // ============ Logo Glow Pulse ============
    gsap.to('.logo-glow', {
        scale: 1.2,
        opacity: 0.8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
    
    // ============ Cursor Trail Effect (Optional) ============
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.className = 'cursor-trail';
        cursor.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: radial-gradient(circle, rgba(212, 175, 55, 0.8) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: screen;
        `;
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX - 5,
                y: e.clientY - 5,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    }
    
    // ============ Performance Optimization ============
    // Lazy load images when they come into viewport
    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
    
    // ============ Console Art ============
    console.log('%c' + 
        '  _____ _____   _____   _____               _            _   _                 \n' +
        ' / ____|  __ \\ / ____| |  __ \\             | |          | | (_)                \n' +
        '| |  __| |  | | |  __  | |__) | __ ___   __| |_   _  ___| |_ _  ___  _ __  ___ \n' +
        '| | |_ | |  | | | |_ | |  ___/ \'__/ _ \\ / _` | | | |/ __| __| |/ _ \\| \'_ \\/ __|\n' +
        '| |__| | |__| | |__| | | |   | | | (_) | (_| | |_| | (__| |_| | (_) | | | \\__ \\\n' +
        ' \\_____|_____/ \\_____| |_|   |_|  \\___/ \\__,_|\\__,_|\\___|\\__|_|\\___/|_| |_|___/\n' +
        '\n' +
        'Du charbon au diamant stellaire ✨\n' +
        'Développé avec passion par GDG Productions\n',
        'color: #D4AF37; font-family: monospace; font-size: 10px; line-height: 1.2;'
    );
    
    console.log('%cBienvenue sur notre site! 💎', 'color: #D4AF37; font-size: 16px; font-weight: bold;');
});

// ============ Additional Utils ============
// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Window resize handler
window.addEventListener('resize', debounce(() => {
    ScrollTrigger.refresh();
}, 250));
