document.addEventListener('DOMContentLoaded', function() {
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
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown') && !e.target.closest('.toggle-menu') && window.innerWidth <= 768) {
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

    let slideIndexes = [1, 1, 1];
    const sliders = ["slider1", "slider2", "slider3"];

    function plusSlides(n, no) {
        showSlides(slideIndexes[no - 1] += n, no);
    }

    function showSlides(n, no) {
        let i;
        let slider = document.getElementById(sliders[no - 1]);
        if (!slider) return;  // Return early if the slider element is not found
        let slides = slider.getElementsByClassName("slide");
        if (n > slides.length) { slideIndexes[no - 1] = 1 }
        if (n < 1) { slideIndexes[no - 1] = slides.length }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndexes[no - 1] - 1].style.display = "block";
    }

    sliders.forEach((sliderId, index) => {
        showSlides(slideIndexes[index], index + 1);
        setInterval(function() {
            plusSlides(1, index + 1);
        }, 4000);
    });

    window.plusSlides = plusSlides;
});
