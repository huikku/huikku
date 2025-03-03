/**
 * Glitch Effect for Hero Title
 * Creates a dynamic glitching effect for the hero title
 */

document.addEventListener('DOMContentLoaded', function() {
    initGlitchEffect();
});

/**
 * Initialize the glitch effect
 */
function initGlitchEffect() {
    const glitchTitle = document.querySelector('.glitch-title');
    
    // Check if glitch title exists
    if (!glitchTitle) {
        console.warn('Glitch title element not found!');
        return;
    }
    
    // Define the available fonts for glitching
    const rubikFonts = [
        'Rubik Glitch',
        'Rubik Vinyl',
        'Rubik Mono One',
        'Rubik Glitch Pop',
        'Rubik Lines',
        'Rubik Broken Fax',
        'Rubik Puddles',
        'Rubik Maps',
        'Rubik Iso',
        'Rubik 80s Fade'
    ];
    
    // Define color palette
    const colors = ['#00FFFF', '#FFA500', '#FF4D4D', '#FFFFFF'];
    
    // Check if reduced motion is preferred
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Simplified effect for users who prefer reduced motion
        glitchTitle.style.fontFamily = "'Rubik Glitch', sans-serif";
        glitchTitle.style.color = '#FF4D4D';
    } else {
        // Start glitch animation
        startGlitchAnimation(glitchTitle, rubikFonts, colors);
    }
}

/**
 * Start the glitch animation
 * @param {HTMLElement} element - The element to apply the effect to
 * @param {Array} fonts - Array of font families to use
 * @param {Array} colors - Array of colors to use
 */
function startGlitchAnimation(element, fonts, colors) {
    // Default state
    let defaultFont = 'Rubik Glitch';
    let defaultColor = '#FF4D4D';
    
    // Store original text content
    const originalText = element.textContent;
    
    // Set initial styles
    element.style.fontFamily = `'${defaultFont}', sans-serif`;
    element.style.color = defaultColor;
    
    // Variables to control glitch intensity
    let glitchIntensity = 0.2; // 0 to 1, where 1 is maximum glitching
    let lastGlitchTime = 0;
    
    /**
     * Apply a random glitch effect
     */
    function randomGlitch() {
        const now = Date.now();
        const timeSinceLastGlitch = now - lastGlitchTime;
        
        // Random chance to apply glitch based on intensity
        if (Math.random() < glitchIntensity || timeSinceLastGlitch > 5000) {
            // Apply various glitch effects
            
            // 1. Random font
            if (Math.random() < 0.7) {
                const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
                element.style.fontFamily = `'${randomFont}', sans-serif`;
            }
            
            // 2. Random position shift
            if (Math.random() < 0.5) {
                const randomX = Math.random() * 4 - 2; // -2px to +2px
                const randomY = Math.random() * 2 - 1; // -1px to +1px
                element.style.transform = `translate(${randomX}px, ${randomY}px)`;
            }
            
            // 3. Random color
            if (Math.random() < 0.3) {
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                element.style.color = randomColor;
            }
            
            // 4. Text distortion (rarely)
            if (Math.random() < 0.05) {
                // Scramble a few letters
                const textArray = originalText.split('');
                const randomIndex = Math.floor(Math.random() * textArray.length);
                textArray[randomIndex] = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
                element.textContent = textArray.join('');
                
                // Reset text after a brief moment
                setTimeout(() => {
                    element.textContent = originalText;
                }, 50);
            }
            
            // 5. Brightness/contrast flicker
            if (Math.random() < 0.2) {
                const brightness = 100 + Math.random() * 50;
                element.style.filter = `brightness(${brightness}%)`;
                
                // Reset filter after a brief moment
                setTimeout(() => {
                    element.style.filter = 'none';
                }, 50);
            }
            
            lastGlitchTime = now;
            
            // Periodically increase glitch intensity for a burst effect
            if (Math.random() < 0.1) {
                const prevIntensity = glitchIntensity;
                glitchIntensity = 0.8;
                
                // Reset to normal intensity after a burst
                setTimeout(() => {
                    glitchIntensity = prevIntensity;
                }, 1000);
            }
        } else {
            // Occasionally return to default state
            if (Math.random() < 0.1) {
                element.style.fontFamily = `'${defaultFont}', sans-serif`;
                element.style.color = defaultColor;
                element.style.transform = 'translate(0, 0)';
            }
        }
        
        // Random delay for next glitch
        const randomDelay = Math.random() * 450 + 50; // 50ms to 500ms
        setTimeout(randomGlitch, randomDelay);
    }
    
    // Start the glitch animation
    randomGlitch();
}
