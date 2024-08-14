document.addEventListener('DOMContentLoaded', function() {
    // Menu Hamburger
    const toggleMenu = document.querySelector('.toggle-menu');
    const navLinks = document.querySelector('.nav-links');
    const menuTitles = document.querySelectorAll('.menu-title');

    toggleMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.toggle-menu') && !e.target.closest('.nav-links')) {
            navLinks.classList.remove('active');
            // Close any open dropdown menus
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = 'none';
            });
        }
    });

    // Toggling dropdowns in hamburger mode
    menuTitles.forEach(title => {
        title.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdownMenu = this.nextElementSibling;
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Sliders - Handling multiple sliders independently with time offset
    const sliders = document.querySelectorAll('.slider');

    sliders.forEach((slider, sliderIndex) => {
        const slides = slider.querySelector('.slides');
        const slide = slider.querySelectorAll('.slide');
        let index = 0;

        // Function to show next slide
        const showNextSlide = () => {
            index = (index + 1) % slide.length;
            slides.style.transform = `translateX(${-index * 100}%)`;
        };

        // Function to show previous slide
        const showPrevSlide = () => {
            index = (index - 1 + slide.length) % slide.length;
            slides.style.transform = `translateX(${-index * 100}%)`;
        };

        // Add event listeners for the next and previous buttons
        slider.querySelector('.next').addEventListener('click', showNextSlide);
        slider.querySelector('.prev').addEventListener('click', showPrevSlide);

        // Auto Slide with time offset
        const initialDelay = sliderIndex * 2000; // Delay for each slider (2 seconds per slider)
        setTimeout(() => {
            setInterval(showNextSlide, 5000);
        }, initialDelay);
    });
});
