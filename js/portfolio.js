/**
 * Portfolio Functionality
 * Handles portfolio filtering and interaction
 */

document.addEventListener('DOMContentLoaded', function() {
    initPortfolioFilters();
    enhancePortfolioItems();
});

/**
 * Initialize portfolio filter functionality
 */
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    
    // Apply 'all' filter by default
    setTimeout(() => filterPortfolio('all'), 100);
    
    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Apply filter
            filterPortfolio(filterValue);
        });
    });
}

/**
 * Filter portfolio items based on category
 * @param {string} category - The category to filter by
 */
function filterPortfolio(category) {
    console.log("Filtering by:", category);
    // Get all portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (portfolioItems.length === 0) {
        console.error("No portfolio items found to filter!");
        return;
    }
    
    // Filter items
    portfolioItems.forEach(item => {
        const dataCategory = item.getAttribute('data-category') || '';
        
        if (category === 'all' || dataCategory.toLowerCase().includes(category.toLowerCase())) {
            // Show item with animation
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 50);
        } else {
            // Hide item with animation
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
    
    // Re-layout the grid after filtering
    setTimeout(refreshPortfolioGrid, 350);
}

/**
 * Refresh the portfolio grid layout
 * This helps with any layout shifts after filtering
 */
function refreshPortfolioGrid() {
    const grid = document.getElementById('portfolio-grid');
    if (grid) {
        // Force reflow
        grid.style.display = 'none';
        void grid.offsetHeight; // This line triggers reflow
        grid.style.display = 'grid';
    }
}

/**
 * Enhanced portfolio item hover effects
 * Add touch support for mobile devices
 */
function enhancePortfolioItems() {
    document.querySelectorAll('.portfolio-item').forEach(item => {
        // Add touch capability for mobile
        item.addEventListener('touchstart', function() {
            this.classList.add('touch-hover');
        }, {passive: true});
        
        // Remove the class on touch end
        item.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-hover');
            }, 300);
        }, {passive: true});
    });
}
