// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Here you would typically send the form data to a server
        // For now, we'll just show an alert
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Add scroll animation for elements
function revealOnScroll() {
    const elements = document.querySelectorAll('.project-card, .about-content, .contact-content');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Add active class to navigation links based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const currentId = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Header scroll effect
const header = document.querySelector('header');
const scrollThreshold = 50;

window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Loading animation
window.addEventListener('load', () => {
    const loadingAnimation = document.querySelector('.loading-animation');
    setTimeout(() => {
        loadingAnimation.classList.add('hidden');
    }, 1000);
});

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-links') && !e.target.closest('.hamburger')) {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Dynamic shape creation and cursor following animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedBg = document.querySelector('.animated-bg');
    const hero = document.querySelector('.hero');
    const NUM_SHAPES = 100;
    
    // Create shapes dynamically
    function createShapes() {
        const colors = [
            'rgba(52, 152, 219, 0.2)',
            'rgba(155, 89, 182, 0.2)',
            'rgba(46, 204, 113, 0.2)',
            'rgba(231, 76, 60, 0.2)',
            'rgba(241, 196, 15, 0.2)'
        ];
        
        for (let i = 0; i < NUM_SHAPES; i++) {
            const shape = document.createElement('div');
            shape.className = 'shape';
            
            // Random size between 10 and 100 pixels
            const size = Math.random() * 90 + 10;
            shape.style.width = `${size}px`;
            shape.style.height = `${size}px`;
            
            // Random position
            shape.style.left = `${Math.random() * 100}%`;
            shape.style.top = `${Math.random() * 100}%`;
            
            // Random color from our palette
            const color1 = colors[Math.floor(Math.random() * colors.length)];
            const color2 = colors[Math.floor(Math.random() * colors.length)];
            shape.style.background = `linear-gradient(45deg, ${color1}, ${color2})`;
            
            // Random opacity
            shape.style.opacity = Math.random() * 0.5 + 0.1;
            
            animatedBg.appendChild(shape);
        }
    }
    
    createShapes();
    
    const shapes = document.querySelectorAll('.shape');
    let mouseX = 0;
    let mouseY = 0;
    let shapesX = new Array(shapes.length).fill(0);
    let shapesY = new Array(shapes.length).fill(0);
    
    // Track mouse position
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });
    
    // Animate shapes
    function animateShapes() {
        shapes.forEach((shape, index) => {
            // Calculate speed based on shape's position in the array
            const speed = 0.02 + (index % 5) * 0.005;
            const delay = index * 0.0001;
            
            // Calculate target position with parallax effect
            const rect = shape.getBoundingClientRect();
            const centerX = hero.offsetWidth / 2;
            const centerY = hero.offsetHeight / 2;
            
            // Update position with smooth interpolation
            shapesX[index] += ((mouseX - centerX) * speed - shapesX[index]) * 0.1;
            shapesY[index] += ((mouseY - centerY) * speed - shapesY[index]) * 0.1;
            
            // Apply transformation with rotation and scale
            const distance = Math.sqrt(
                Math.pow(mouseX - (rect.left + rect.width / 2), 2) +
                Math.pow(mouseY - (rect.top + rect.height / 2), 2)
            );
            
            const scale = 1 - Math.min(distance * 0.0005, 0.2);
            const rotation = Math.atan2(shapesY[index], shapesX[index]) * (180 / Math.PI);
            
            shape.style.transform = `
                translate(${shapesX[index] * (1 - delay)}px, ${shapesY[index] * (1 - delay)}px)
                rotate(${rotation * 0.2}deg)
                scale(${scale})
            `;
        });
        
        requestAnimationFrame(animateShapes);
    }
    
    // Start animation
    animateShapes();
    
    // Reset shapes position when mouse leaves
    hero.addEventListener('mouseleave', () => {
        shapes.forEach((shape, index) => {
            shapesX[index] = 0;
            shapesY[index] = 0;
            shape.style.transform = 'translate(0, 0) rotate(0deg) scale(1)';
        });
    });
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            shapesX = new Array(shapes.length).fill(0);
            shapesY = new Array(shapes.length).fill(0);
        }, 100);
    });
});


// Download button functionality
document.getElementById('downloadBtn').addEventListener('click', function() {
    const link = document.createElement('a');
    link.href = 'Resume2.pdf';
    link.download = 'Ashutosh Pal-Resume2.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});