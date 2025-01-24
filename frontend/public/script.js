// Ensure jQuery and Turn.js are loaded before running
document.addEventListener('DOMContentLoaded', () => {
    // Verify configuration exists
    if (typeof yearbookConfig === 'undefined') {
        console.error('Yearbook configuration is missing!');
        return;
    }

    const { year, numberOfPages } = yearbookConfig;
    const yearPath = `assets/yearbooks/${year}/`;

    // Initialize book pages
    function initializeBook() {
        const bookElement = document.getElementById('book');
        bookElement.innerHTML = ''; // Clear any existing content

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
                turned: function(e, page) {
                    $('#page-number').val(page);
                }
            }
        });
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

    // Page number input event listeners
    document.getElementById('number-pages').textContent = numberOfPages;
    document.getElementById('download-btn').addEventListener('click', handleDownload);
    
    document.getElementById('page-number').addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
            $('#book').turn('page', $('#page-number').val());
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName.toLowerCase() !== 'input') {
            if (e.keyCode === 37) {
                $('#book').turn('previous');
            } else if (e.keyCode === 39) {
                $('#book').turn('next');
            }
        }
    });

    // Initialize the book
    initializeBook();
});