document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.slider-container');

    sliders.forEach((slider, index) => {
        let slideIndex = 0;
        const slides = slider.getElementsByClassName('slide');
        const nextButton = slider.querySelector('.next');
        const prevButton = slider.querySelector('.prev');

        function showSlides(n) {
            slideIndex += n;
            if (slideIndex >= slides.length) {
                slideIndex = 0;
            }
            if (slideIndex < 0) {
                slideIndex = slides.length - 1;
            }
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slides[slideIndex].style.display = "block";
        }

        nextButton.addEventListener('click', () => {
            showSlides(1);
        });

        prevButton.addEventListener('click', () => {
            showSlides(-1);
        });

        // Auto slide
        setInterval(() => {
            showSlides(1);
        }, 5000); // Change slide every 5 seconds

        // Initialize slider
        showSlides(0);
    });

    // Mobile menu toggle
    const toggleMenu = document.querySelector('.toggle-menu');
    const navLinks = document.querySelector('.nav-links');

    toggleMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
});
