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

    // Slider
    const slider = document.querySelector('.slider');
    const slides = document.querySelector('.slides');
    const slide = document.querySelectorAll('.slide');
    let index = 0;

    document.querySelector('.next').addEventListener('click', () => {
        index = (index + 1) % slide.length;
        slides.style.transform = `translateX(${-index * 100}%)`;
    });

    document.querySelector('.prev').addEventListener('click', () => {
        index = (index - 1 + slide.length) % slide.length;
        slides.style.transform = `translateX(${-index * 100}%)`;
    });

    // Auto Slide
    setInterval(() => {
        index = (index + 1) % slide.length;
        slides.style.transform = `translateX(${-index * 100}%)`;
    }, 5000);
});
