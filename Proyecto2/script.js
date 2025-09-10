document.addEventListener("DOMContentLoaded", () => {
    const logo = document.getElementById("logo-toggle");
    const socialIcons = document.querySelector(".social-icons");

    logo.addEventListener("click", () => {
        socialIcons.classList.toggle("hidden");
    });

    const slides = document.querySelectorAll('.slide');
        const prevBtn = document.querySelector('.flecha.izquierda');
        const nextBtn = document.querySelector('.flecha.derecha');
        let current = 0;

    function mostrarSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    nextBtn.addEventListener('click', () => {
        current = (current + 1) % slides.length;
        mostrarSlide(current);
    });

    prevBtn.addEventListener('click', () => {
        current = (current - 1 + slides.length) % slides.length;
        mostrarSlide(current);
    });

    function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;
      const elementVisible = 100;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } 
    }
  }

  window.addEventListener("scroll", revealOnScroll);
  // ejecuta al cargar
  revealOnScroll();

  

});
