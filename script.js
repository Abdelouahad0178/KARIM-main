document.addEventListener('DOMContentLoaded', function() {
    // Indices pour suivre la slide actuelle pour chaque slider
    let slideIndexes = [1, 1, 1];
    const sliders = ["slider1", "slider2", "slider3"];
    let autoSlideIntervals = [];
    let userInteracted = [false, false, false]; // Indicateur d'interaction utilisateur pour chaque slider

    // Fonction pour afficher la slide actuelle
    function showSlides(n, no) {
        let i;
        let slider = document.getElementById(sliders[no - 1]);
        if (!slider) return;  // Si le slider n'existe pas, on sort de la fonction
        let slides = slider.getElementsByClassName("slide");
        if (n > slides.length) { slideIndexes[no - 1] = 1 } // Revenir à la première slide
        if (n < 1) { slideIndexes[no - 1] = slides.length } // Aller à la dernière slide
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none"; // Cacher toutes les slides
        }
        slides[slideIndexes[no - 1] - 1].style.display = "block"; // Afficher la slide actuelle
    }

    // Fonction pour démarrer le défilement automatique
    function startAutoSlide(no) {
        if (!userInteracted[no - 1]) {
            autoSlideIntervals[no - 1] = setInterval(function() {
                slideIndexes[no - 1]++;
                showSlides(slideIndexes[no - 1], no);
            }, 5000);
        }
    }

    // Fonction pour arrêter le défilement automatique
    function stopAutoSlide(no) {
        clearInterval(autoSlideIntervals[no - 1]);
    }

    // Initialisation des sliders et configuration du swipe
    sliders.forEach((sliderId, index) => {
        const slider = document.getElementById(sliderId);
        if (slider) {
            showSlides(slideIndexes[index], index + 1); // Afficher la première slide
            startAutoSlide(index + 1); // Commencer le défilement automatique

            // Détection des gestes de swipe
            let touchstartX = 0;
            let touchendX = 0;

            slider.addEventListener('touchstart', function(event) {
                touchstartX = event.changedTouches[0].screenX; // Enregistrer la position initiale du toucher
                stopAutoSlide(index + 1); // Arrêter le défilement automatique lors du début du swipe
                userInteracted[index] = true; // Marquer le slider comme ayant été manipulé par l'utilisateur
            });

            slider.addEventListener('touchend', function(event) {
                touchendX = event.changedTouches[0].screenX; // Enregistrer la position finale du toucher
                handleGesture(index + 1); // Gérer le swipe
            });

            function handleGesture(no) {
                if (touchendX < touchstartX) {
                    slideIndexes[no - 1]++;
                    showSlides(slideIndexes[no - 1], no); // Swipe vers la gauche
                }
                if (touchendX > touchstartX) {
                    slideIndexes[no - 1]--;
                    showSlides(slideIndexes[no - 1], no); // Swipe vers la droite
                }
            }

            // Désactiver la navigation du slider sur clic
            slider.querySelectorAll('.slide').forEach(slide => {
                slide.addEventListener('click', function(e) {
                    e.stopPropagation(); // Empêche la propagation de l'événement de clic à la navigation du slider
                });
            });
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

    // Gestion des témoignages
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
