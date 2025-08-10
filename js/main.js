// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Initialize chart animations
    initChartAnimations();

    // Initialize testimonial slider
    initTestimonialSlider();

    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Initialize chart animations
function initChartAnimations() {
    // Hero chart animation
    const chartLines = document.querySelectorAll('.chart-line');
    chartLines.forEach((line, index) => {
        gsap.to(line, {
            opacity: 0.7,
            duration: 1,
            delay: index * 0.2,
            ease: 'power2.inOut'
        });
    });

    // Performance chart animation
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach((bar, index) => {
        gsap.from(bar, {
            height: 0,
            duration: 1.5,
            delay: 0.5 + (index * 0.2),
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.performance-chart',
                start: 'top 80%'
            }
        });
    });

    // Stats counter animation
    const statItems = document.querySelectorAll('.stat-item h3');
    statItems.forEach(item => {
        const value = parseFloat(item.textContent);

        item.textContent = startValue + suffix;
        
        gsap.to(item, {
            textContent: value,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 80%'
            },

        });
    });
}

// Initialize testimonial slider
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    if (!slider) return;
    
    let isDown = false;
    let startX;
    let scrollLeft;
    
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    
    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    
    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
    
    // Auto scroll testimonials
    let scrollAmount = 0;
    const scrollSpeed = 1;
    const scrollDelay = 30;
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const itemWidth = testimonialItems[0]?.offsetWidth + 30; // 30px is the gap
    const totalWidth = itemWidth * testimonialItems.length;
    
    function autoScroll() {
        if (slider.matches(':hover')) {
            setTimeout(autoScroll, scrollDelay * 5);
            return;
        }
        
        scrollAmount += scrollSpeed;
        if (scrollAmount >= totalWidth) {
            scrollAmount = 0;
        }
        
        slider.scrollLeft = scrollAmount;
        setTimeout(autoScroll, scrollDelay);
    }
    
    // Uncomment to enable auto-scrolling
    // setTimeout(autoScroll, scrollDelay * 20);
}

// Create 3D parallax effect
document.addEventListener('mousemove', function(e) {
    const cards = document.querySelectorAll('.service-card, .feature-card, .blog-card');
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        const distanceX = (e.clientX - cardCenterX) / 30;
        const distanceY = (e.clientY - cardCenterY) / 30;
        
        const isInViewport = (
            rect.top >= -rect.height &&
            rect.left >= -rect.width &&
            rect.bottom <= window.innerHeight + rect.height &&
            rect.right <= window.innerWidth + rect.width
        );
        
        if (isInViewport && distanceX < 20 && distanceY < 20) {
            gsap.to(card, {
                rotationY: distanceX * 0.2,
                rotationX: -distanceY * 0.2,
                duration: 0.5,
                ease: 'power1.out'
            });
        } else {
            gsap.to(card, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.5,
                ease: 'power1.out'
            });
        }
    });
});

// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('preloader-hide');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 500);
    }
});

// Form validation
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formElements = form.elements;
        let isValid = true;
        
        for (let i = 0; i < formElements.length; i++) {
            const element = formElements[i];
            if (element.type !== 'submit' && element.hasAttribute('required') && !element.value.trim()) {
                isValid = false;
                element.classList.add('is-invalid');
            } else {
                element.classList.remove('is-invalid');
            }
        }
        
        if (isValid) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-3';
            successMessage.textContent = 'Form submitted successfully! We will contact you soon.';
            form.appendChild(successMessage);
            
            // Reset form
            form.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        }
    });
});

// Mobile menu toggle
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (navbarToggler && navbarCollapse) {
    document.addEventListener('click', function(e) {
        const isNavbarToggler = navbarToggler.contains(e.target);
        const isNavbarCollapse = navbarCollapse.contains(e.target);
        
        if (!isNavbarToggler && !isNavbarCollapse && navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });
}

// Add active class to nav links based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}` || 
            (current === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
});