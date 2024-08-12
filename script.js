document.addEventListener('DOMContentLoaded', function() {
    let slideIndexes = [1, 1, 1];
    const sliders = ["slider1", "slider2", "slider3"];
    let autoSlideIntervals = [];

    function showSlides(n, no) {
        let slider = document.getElementById(sliders[no - 1]);
        if (!slider) return;
        let slides = slider.getElementsByClassName("slide");
        if (n > slides.length) { slideIndexes[no - 1] = 1 }
        if (n < 1) { slideIndexes[no - 1] = slides.length }
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndexes[no - 1] - 1].style.display = "block";
    }

    function startAutoSlide(no) {
        autoSlideIntervals[no - 1] = setInterval(function() {
            slideIndexes[no - 1]++;
            showSlides(slideIndexes[no - 1], no);
        }, 5000);
    }

    sliders.forEach((sliderId, index) => {
        const slider = document.getElementById(sliderId);
        if (slider) {
            showSlides(slideIndexes[index], index + 1);
            startAutoSlide(index + 1);
        }
    });

    // Gestion du menu mobile
    const toggleMenu = document.querySelector('.toggle-menu');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');

    if (toggleMenu && navLinks) {
        toggleMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            document.body.classList.toggle('nav-active');
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = 'none';
            });
        });
    }

    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        const dropdownLink = dropdown.querySelector('a');

        if (dropdownLink && dropdownMenu) {
            dropdownLink.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    if (menu !== dropdownMenu) {
                        menu.style.display = 'none';
                    }
                });

                dropdownMenu.style.display = dropdownMenu.style.display === 'flex' ? 'none' : 'flex';
            });
        }
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown') && !e.target.closest('.toggle-menu') && window.innerWidth <= 620) {
            navLinks.classList.remove('active');
            document.body.classList.remove('nav-active');
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = 'none';
            });
        }
    });

    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length > 0) {
        let currentTestimonial = 0;

        function showTestimonial(index) {
            testimonials.forEach(testimonial => testimonial.style.display = 'none');
            testimonials[index].style.display = 'block';
        }

        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }

        showTestimonial(currentTestimonial);
        setInterval(nextTestimonial, 5000);
    }
});
