// Typing animation with cursor blinking
const typingElement = document.querySelector('.typing');
const text = typingElement.textContent;
typingElement.textContent = '';
let i = 0;
let isCursorVisible = true;

function toggleCursor() {
    isCursorVisible = !isCursorVisible;
    typingElement.style.borderRightColor = isCursorVisible ? '#CFAA70' : 'transparent';
    setTimeout(toggleCursor, 700);
}

toggleCursor();

function type() {
    if (i < text.length) {
        typingElement.textContent += text.charAt(i);
        i++;
        setTimeout(type, 100);
    }
}

type();

// Card, Section Heading, and Timeline Item Scroll Animation
const cards = document.querySelectorAll('.card');
const sectionHeadings = document.querySelectorAll('.section h2, .approach-section h2');
const timelineItems = document.querySelectorAll('.timeline-item');

function checkElements() {
    const triggerBottom = window.innerHeight * 0.8;
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < triggerBottom) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
    sectionHeadings.forEach(heading => {
        const headingTop = heading.getBoundingClientRect().top;
        if (headingTop < triggerBottom) {
            heading.style.opacity = '1';
        }
    });
    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        if (itemTop < triggerBottom) {
            item.classList.add('show');
        }
    });
}

cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.5s ease-out';
});

sectionHeadings.forEach(heading => {
    heading.style.opacity = '0';
});

window.addEventListener('scroll', checkElements);
checkElements();

// Smooth scrolling with offset for nav links, footer links, and buttons
document.querySelectorAll('.nav-links a, .footer-menu a, .explore-btn, .btn').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = targetId === 'footer' ? document.querySelector('footer') : document.getElementById(targetId);
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        if (window.innerWidth <= 768) {
            document.querySelector('.nav-links').classList.remove('active');
        }
    });
});

// Split logo text into individual characters
const logoText = document.querySelector('.logo-text');
const textLogo = logoText.textContent;
logoText.textContent = '';

textLogo.split('').forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char;
    const randomDelay = Math.random() * 1;
    const randomDuration = 3 + Math.random() * 2;
    span.style.animationDelay = `${randomDelay}s`;
    span.style.animationDuration = `${randomDuration}s`;
    span.classList.add('wave-char');
    logoText.appendChild(span);
});

// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
        themeToggle.setAttribute('aria-label', 'Switch to light theme');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
        themeToggle.setAttribute('aria-label', 'Switch to dark theme');
        localStorage.setItem('theme', 'light');
    }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
}

themeToggle.addEventListener('click', toggleTheme);

// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});