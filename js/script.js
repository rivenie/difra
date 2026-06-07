// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    navLinks.classList.toggle("active");

    const icon = this.querySelector("i");
    if (icon.classList.contains("fa-bars")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });
}

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks && navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      if (mobileMenuBtn) {
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      }
    }
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    navLinks &&
    mobileMenuBtn &&
    !navLinks.contains(e.target) &&
    !mobileMenuBtn.contains(e.target)
  ) {
    navLinks.classList.remove("active");
    if (mobileMenuBtn) {
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
  }
});

// Header scroll effect
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: "smooth",
      });
    }
  });
});

// Animación de entrada para elementos al hacer scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observar elementos para animación
document
  .querySelectorAll(".service-card, .value-card, .portfolio-item, .blog-card")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
    observer.observe(el);
  });

// Agregar clase para animación
const style = document.createElement("style");
style.textContent = `
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Año actual en copyright
const yearElement = document.querySelector(".footer-bottom p");
if (yearElement) {
  const currentYear = new Date().getFullYear();
  yearElement.innerHTML = yearElement.innerHTML.replace("2024", currentYear);
}

// Carrusel Metodología
const methodTrack = document.querySelector(".methodology-carousel-track");
const methodSlides = document.querySelectorAll(".methodology-carousel-slide");
const prevMethodBtn = document.querySelector(".prev-method");
const nextMethodBtn = document.querySelector(".next-method");
const methodDotsContainer = document.querySelector(
  ".methodology-carousel-dots",
);

if (methodTrack && methodSlides.length > 0) {
  let currentIndexMethod = 0;
  let autoMethodInterval;

  function updateMethodCarousel() {
    const slideWidth = methodSlides[0].offsetWidth;
    console.log("slideWidth:", slideWidth, "currentIndex:", currentIndexMethod);
    methodTrack.style.transform = `translateX(-${currentIndexMethod * slideWidth}px)`;

    document.querySelectorAll(".method-dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndexMethod);
    });
  }

  function nextMethodSlide() {
    currentIndexMethod = (currentIndexMethod + 1) % methodSlides.length;
    updateMethodCarousel();
  }

  function prevMethodSlide() {
    currentIndexMethod =
      (currentIndexMethod - 1 + methodSlides.length) % methodSlides.length;
    updateMethodCarousel();
  }

  function startAutoMethod() {
    autoMethodInterval = setInterval(nextMethodSlide, 4000);
  }

  function stopAutoMethod() {
    clearInterval(autoMethodInterval);
  }

  // Crear dots
  for (let i = 0; i < methodSlides.length; i++) {
    const dot = document.createElement("div");
    dot.classList.add("method-dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentIndexMethod = i;
      updateMethodCarousel();
      stopAutoMethod();
      startAutoMethod();
    });
    methodDotsContainer.appendChild(dot);
  }

  // Eventos
  prevMethodBtn?.addEventListener("click", () => {
    prevMethodSlide();
    stopAutoMethod();
    startAutoMethod();
  });

  nextMethodBtn?.addEventListener("click", () => {
    nextMethodSlide();
    stopAutoMethod();
    startAutoMethod();
  });

  startAutoMethod();

  const methodContainer = document.querySelector(
    ".methodology-carousel-container",
  );
  methodContainer?.addEventListener("mouseenter", stopAutoMethod);
  methodContainer?.addEventListener("mouseleave", startAutoMethod);

  window.addEventListener("resize", updateMethodCarousel);
}
