// Testimonial Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeTestimonials();
});

// Initialize testimonials page
function initializeTestimonials() {
    setupEventListeners();
    animateOnScroll();
}

// Setup event listeners for interactive elements
function setupEventListeners() {
    // Video card hover effects
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });

    // Photo card hover effects
    const photoCards = document.querySelectorAll('.photo-card');
    photoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });
}

// Animate elements on scroll
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe all cards
    const cards = document.querySelectorAll('.video-card, .photo-card, .stat-item');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Load testimonials from localStorage (for future enhancement)
function getStoredTestimonials() {
    const stored = localStorage.getItem('freshHerbalTestimonials');
    return stored ? JSON.parse(stored) : [];
}

// Save new testimonial to localStorage
function saveTestimonial(testimonial) {
    const testimonials = getStoredTestimonials();
    testimonials.push({
        ...testimonial,
        id: Date.now(),
        date: new Date().toLocaleDateString('id-ID')
    });
    localStorage.setItem('freshHerbalTestimonials', JSON.stringify(testimonials));
    return testimonials;
}

// Format rating display
function createStarRating(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars += '<i class="fas fa-star"></i>';
        } else {
            stars += '<i class="fas fa-star" style="opacity: 0.3;"></i>';
        }
    }
    return stars;
}

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Handle video playback analytics (optional)
function trackVideoPlay(videoTitle) {
    const playHistory = JSON.parse(localStorage.getItem('videoPlayHistory') || '[]');
    playHistory.push({
        video: videoTitle,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('videoPlayHistory', JSON.stringify(playHistory));
}

// Add event listeners to videos for tracking
document.querySelectorAll('.video-container video').forEach(video => {
    const videoTitle = video.closest('.video-card').querySelector('.video-info h3').textContent;
    
    video.addEventListener('play', function() {
        trackVideoPlay(videoTitle);
    });
});

// Add CSS for animations if needed
const testimonialStyles = document.createElement('style');
testimonialStyles.textContent = `
    .video-card,
    .photo-card,
    .stat-item {
        transition: all 0.3s ease;
    }
    
    /* Smooth transitions for all interactive elements */
    .video-container {
        transition: filter 0.3s ease;
    }
    
    .video-card:hover .video-container {
        filter: brightness(1.05);
    }
    
    .photo-wrapper img {
        transition: transform 0.3s ease;
    }
    
    /* Counter animation */
    .stat-number {
        animation: countUp 1s ease-in-out;
    }
    
    @keyframes countUp {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(testimonialStyles);
