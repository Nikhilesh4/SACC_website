// Ensure jQuery and Turn.js are loaded before running
document.addEventListener('DOMContentLoaded', () => {
    // Verify configuration exists
    if (typeof yearbookConfig === 'undefined') {
        console.error('Yearbook configuration is missing!');
        return;
    }

    const { year, numberOfPages } = yearbookConfig;
    const yearPath = `assets/yearbooks/${year}/`;
    let isMobile = window.innerWidth <= 768;
    let currentPage = 1;

    // Check if device is mobile
    function checkMobile() {
        return window.innerWidth <= 768;
    }

    // Initialize book pages for mobile (single page view with Turn.js)
    function initializeMobileBook() {
        const bookElement = document.getElementById('book');
        bookElement.innerHTML = ''; // Clear any existing content
        bookElement.classList.add('mobile-single-page');

        // Create pages for Turn.js
        for (let i = 0; i < numberOfPages; i++) {
            const div = document.createElement('div');
            div.style.backgroundImage = `url(${yearPath}pageImages/${i}.jpg)`;
            div.style.backgroundSize = 'cover';
            div.style.backgroundPosition = 'center';
            div.style.backgroundRepeat = 'no-repeat';
            bookElement.appendChild(div);
        }

        // Initialize Turn.js for mobile - single page display
        $('#book').turn({
            acceleration: true,
            duration: 600,
            pages: numberOfPages,
            elevation: 30,
            gradients: false,
            display: 'single',
            autoCenter: true,
            when: {
                turned: function(event, page) {
                    currentPage = page;
                    $('#page-number').val(page);
                }
            }
        });
        
        // Set initial page to 1
        $('#book').turn('page', 1);
        currentPage = 1;
        $('#page-number').val(1);
    }

    // Initialize book pages for desktop (Turn.js)
    function initializeDesktopBook() {
        const bookElement = document.getElementById('book');
        bookElement.innerHTML = ''; // Clear any existing content
        bookElement.classList.remove('mobile-single-page');

        for (let i = 0; i < numberOfPages; i++) {
            const div = document.createElement('div');
            div.style.backgroundImage = `url(${yearPath}pageImages/${i}.jpg)`;
            div.style.backgroundSize = 'cover';
            div.style.backgroundPosition = 'center';
            div.style.backgroundRepeat = 'no-repeat';
            bookElement.appendChild(div);
        }

        // Initialize turn.js after pages are loaded
        $('#book').turn({
            acceleration: true,
            duration: 1300,
            pages: numberOfPages,
            elevation: 50,
            gradients: !$.isTouch,
            when: {
                turned: function(event, page) {
                    currentPage = page;
                    $('#page-number').val(page);
                }
            }
        });
    }


    // Initialize book based on screen size
    function initializeBook() {
        isMobile = checkMobile();
        if (isMobile) {
            initializeMobileBook();
        } else {
            initializeDesktopBook();
        }
    }

    // Navigation functions (unified for mobile and desktop)
    function goToPreviousPage() {
        $('#book').turn('previous');
    }

    function goToNextPage() {
        $('#book').turn('next');
    }

    function goToSpecificPage(pageNum) {
        $('#book').turn('page', pageNum);
    }

    // Download page functionality
    function handleDownload() {
        const pageNumber = parseInt(document.getElementById('specific-page-number').value) - 1;
        if (pageNumber >= 0 && pageNumber < numberOfPages) {
            const imageUrl = `${yearPath}pageImages/${pageNumber}.jpg`;
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = `${pageNumber + 1}.jpg`;
            link.click();
        } else {
            alert('Invalid page number.');
        }
    }

    // Handle window resize
    function handleResize() {
        const wasMobile = isMobile;
        isMobile = checkMobile();
        
        if (wasMobile !== isMobile) {
            // Screen size changed, reinitialize book
            $('#book').turn('destroy'); // Destroy Turn.js if it exists
            initializeBook();
        }
    }

    // Page number input event listeners
    document.getElementById('number-pages').textContent = numberOfPages;
    document.getElementById('download-btn').addEventListener('click', handleDownload);
    
    document.getElementById('page-number').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const pageNum = parseInt(e.target.value);
            if (pageNum >= 1 && pageNum <= numberOfPages) {
                goToSpecificPage(pageNum);
            }
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName.toLowerCase() !== 'input') {
            if (e.key === 'ArrowLeft') {
                goToPreviousPage();
            } else if (e.key === 'ArrowRight') {
                goToNextPage();
            }
        }
    });

    // Touch/swipe gestures for mobile
    if ('ontouchstart' in window) {
        let touchStartX = 0;
        let touchEndX = 0;

        document.getElementById('book').addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        document.getElementById('book').addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const swipeDistance = touchEndX - touchStartX;
            
            if (Math.abs(swipeDistance) > swipeThreshold) {
                if (swipeDistance > 0) {
                    // Swipe right - go to previous page
                    goToPreviousPage();
                } else {
                    // Swipe left - go to next page
                    goToNextPage();
                }
            }
        }
    }

    // Window resize listener
    window.addEventListener('resize', handleResize);

    // Expose navigation functions globally for HTML onclick handlers
    window.goToPreviousPage = goToPreviousPage;
    window.goToNextPage = goToNextPage;
    window.goToSpecificPage = goToSpecificPage;

    // Initialize the book
    initializeBook();
});