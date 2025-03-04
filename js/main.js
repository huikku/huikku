/**
 * Main JavaScript file
 * Handles initialization and general functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        disable: window.innerWidth < 768 // Disable on mobile devices for better performance
    });
    
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize lightbox for portfolio videos
    initLightbox();
    
    // Initialize lazy loading for images
    initLazyLoading();
});

/**
 * Initialize mobile navigation
 */
function initMobileNav() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = document.querySelector('nav').offsetHeight;
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize GLightbox for portfolio videos with robust YouTube handling
 */
function initLightbox() {
    console.log("Initializing lightbox for videos");
    
    // Initialize GLightbox with more robust options
    const lightbox = GLightbox({
        selector: '.portfolio-item[data-video-id]',
        touchNavigation: true,
        loop: false,
        autoplayVideos: true,
        plyr: {
            config: {
                ratio: '16:9', // Default video ratio
                youtube: {
                    noCookie: false, // Use standard YouTube embed
                    rel: 0, // Don't show related videos
                    showinfo: 0, // Don't show video info
                    iv_load_policy: 3 // Don't show annotations
                }
            }
        },
        videosWidth: '960px' // Ensure videos are properly sized
    });
    
    // Robust YouTube link handling
    document.querySelectorAll('.portfolio-item[data-video-id]').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const videoId = this.getAttribute('data-video-id');
            
            if (!videoId) {
                console.warn("No video ID found for item:", this);
                return;
            }
            
            console.log("Opening video:", videoId);
            
            try {
                // First attempt: Try using GLightbox
                lightbox.open({
                    href: `https://www.youtube.com/watch?v=${videoId}`,
                    type: 'video',
                    source: 'youtube'
                });
            } catch (error) {
                console.error("Error opening lightbox, falling back to direct YouTube link:", error);
                // Fallback: open YouTube directly if lightbox fails
                window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
            }
        });
    });
    
    // Handle external URLs for portfolio items
    document.querySelectorAll('.portfolio-item[data-external-url]').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const externalUrl = this.getAttribute('data-external-url');
            if (externalUrl) {
                window.open(externalUrl, '_blank');
            }
        });
    });
}

/**
 * Initialize lazy loading for images
 */
function initLazyLoading() {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // Force load if needed
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    }
}

/**
 * Detect user scroll for header transparency
 */
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    } else {
        nav.style.backgroundColor = 'rgba(26, 26, 26, 0.8)';
    }
});

// Additional safety net for YouTube links
window.addEventListener('load', function() {
    // After 2 seconds, check if GLightbox is working properly
    setTimeout(function() {
        if (typeof GLightbox === 'undefined' || !document.querySelector('.glightbox-container')) {
            console.warn("GLightbox not properly initialized, setting up direct YouTube links");
            
            // Apply direct YouTube links as fallback
            document.querySelectorAll('.portfolio-item[data-video-id]').forEach(item => {
                item.addEventListener('click', function() {
                    const videoId = this.getAttribute('data-video-id');
                    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
                });
            });
        }
    }, 2000);
});
