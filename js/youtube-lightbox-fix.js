/**
 * Simple YouTube Lightbox Implementation
 * This creates a custom lightbox that directly uses YouTube's iframe API
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log("Initializing custom YouTube lightbox");
    
    // Create the lightbox elements once
    const lightboxOverlay = document.createElement('div');
    lightboxOverlay.className = 'youtube-lightbox-overlay';
    lightboxOverlay.style.display = 'none';
    lightboxOverlay.style.position = 'fixed';
    lightboxOverlay.style.top = '0';
    lightboxOverlay.style.left = '0';
    lightboxOverlay.style.width = '100%';
    lightboxOverlay.style.height = '100%';
    lightboxOverlay.style.backgroundColor = 'rgba(0,0,0,0.9)';
    lightboxOverlay.style.zIndex = '9999';
    lightboxOverlay.style.display = 'none';
    lightboxOverlay.style.justifyContent = 'center';
    lightboxOverlay.style.alignItems = 'center';
    
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '×';
    closeButton.className = 'youtube-lightbox-close';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '20px';
    closeButton.style.right = '20px';
    closeButton.style.fontSize = '40px';
    closeButton.style.fontWeight = 'bold';
    closeButton.style.color = 'white';
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.cursor = 'pointer';
    closeButton.style.zIndex = '10000';
    closeButton.style.textShadow = '0 0 5px rgba(0,0,0,0.5)';
    
    // Create video container
    const videoContainer = document.createElement('div');
    videoContainer.className = 'youtube-lightbox-container';
    videoContainer.style.position = 'relative';
    videoContainer.style.width = '90%';
    videoContainer.style.maxWidth = '960px';
    videoContainer.style.maxHeight = '80vh';
    videoContainer.style.aspectRatio = '16/9';
    
    // Add elements to DOM
    lightboxOverlay.appendChild(closeButton);
    lightboxOverlay.appendChild(videoContainer);
    document.body.appendChild(lightboxOverlay);
    
    // Handle closing the lightbox
    function closeLightbox() {
        lightboxOverlay.style.display = 'none';
        videoContainer.innerHTML = ''; // Clear video
        document.body.style.overflow = ''; // Re-enable scrolling
    }
    
    // Close button event
    closeButton.addEventListener('click', closeLightbox);
    
    // Close on overlay click (not on video)
    lightboxOverlay.addEventListener('click', function(e) {
        if (e.target === lightboxOverlay) {
            closeLightbox();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightboxOverlay.style.display !== 'none') {
            closeLightbox();
        }
    });
    
    // Function to open YouTube video
    function openYouTubeVideo(videoId) {
        // Create standard YouTube iframe
        const iframe = document.createElement('iframe');
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        iframe.title = 'YouTube video player';
        iframe.frameBorder = '0';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.allowFullscreen = true;
        
        // Clear and add iframe to container
        videoContainer.innerHTML = '';
        videoContainer.appendChild(iframe);
        
        // Show the lightbox
        lightboxOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Attach click event to all portfolio items with video IDs
    document.querySelectorAll('.portfolio-item[data-video-id]').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const videoId = this.getAttribute('data-video-id');
            if (videoId) {
                openYouTubeVideo(videoId);
            }
        });
    });
    
    // Handle external URLs separately
    document.querySelectorAll('.portfolio-item[data-external-url]').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const externalUrl = this.getAttribute('data-external-url');
            if (externalUrl) {
                window.open(externalUrl, '_blank');
            }
        });
    });
});
