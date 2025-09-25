document.addEventListener("DOMContentLoaded", () => {
  const logo = document.getElementById("logo-toggle");
  const socialIcons = document.querySelector(".social-icons");

  logo.addEventListener("click", () => {
    socialIcons.classList.toggle("hidden");
  });

  const slides = document.querySelectorAll(".slide");
  const prevSlideBtn = document.querySelector(".flecha.izquierda");
  const nextSlideBtn = document.querySelector(".flecha.derecha");
  let current = 0;

  function mostrarSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    slides[index].classList.add("active");
  }

  nextSlideBtn.addEventListener("click", () => {
    current = (current + 1) % slides.length;
    mostrarSlide(current);
  });

  prevSlideBtn.addEventListener("click", () => {
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

  // ==== SLIDER PODCAST ====
  const podcastSlides = document.querySelectorAll(".podcast-slide");
  const prevPodcast = document.querySelector(".podcast .flecha.izquierda");
  const nextPodcast = document.querySelector(".podcast .flecha.derecha");
  let podcastIndex = 0;

  function showPodcastSlide(n) {
    podcastSlides.forEach((slide) => slide.classList.remove("active"));
    podcastSlides[n].classList.add("active");
  }

  nextPodcast.addEventListener("click", () => {
    podcastIndex = (podcastIndex + 1) % podcastSlides.length;
    showPodcastSlide(podcastIndex);
  });

  prevPodcast.addEventListener("click", () => {
    podcastIndex =
      (podcastIndex - 1 + podcastSlides.length) % podcastSlides.length;
    showPodcastSlide(podcastIndex);
  });



  // --- Reseñas--- // Google Maps Places API
  function initReviews() {
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    service.getDetails(
      {
        placeId: "ChIJaV2qOw83Yg0RjENAtwbwyUc", // Place ID correcto
        fields: ["name", "rating", "user_ratings_total", "reviews"],
      },
      (place, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          place &&
          place.reviews
        ) {
          let container = document.querySelector(".reviews-track");

          // Mezclar reseñas de forma aleatoria
          let shuffled = place.reviews
            .sort(() => 0.5 - Math.random())
            .slice(0, 5); // Selecciona 5 aleatorias

          // Insertar reseñas en el carrusel
          container.innerHTML = "";
          shuffled.forEach((r) => {
            container.innerHTML += `
              <div class="review-card">
                <p><strong>${r.author_name}</strong> ${"★".repeat(r.rating)}</p>
                <p>"${r.text}"</p>
              </div>
            `;
          });
        } else {
          document.querySelector(".reviews-track").innerHTML =
            "<p>No se pudieron cargar las reseñas.</p>";
        }
      }
    );
  }

  // Carrusel automático
  let currentSlide = 0;
  function startCarousel() {
    const track = document.querySelector(".reviews-track");
    const total = document.querySelectorAll(".review-card").length;

    setInterval(() => {
      currentSlide = (currentSlide + 1) % total;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }, 5000);
  }

  window.addEventListener("load", () => {
    initReviews();
    setTimeout(startCarousel, 2000); // espera a que carguen reseñas
  });
});
