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

// Carrusel Metodología - Loop infinito (sin botones)
const methodTrack = document.querySelector(".methodology-carousel-track");
const methodSlides = document.querySelectorAll(".methodology-carousel-slide");
const methodDotsContainer = document.querySelector(
  ".methodology-carousel-dots",
);

if (methodTrack && methodSlides.length > 0) {
  let currentIndexMethod = 0;
  let autoMethodInterval;
  let isMobile = window.innerWidth <= 768;

  function updateSlideWidth() {
    isMobile = window.innerWidth <= 768;
  }

  function updateMethodCarousel() {
    const slideWidth = methodSlides[0].offsetWidth;
    methodTrack.style.transform = `translateX(-${currentIndexMethod * slideWidth}px)`;

    document.querySelectorAll(".method-dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndexMethod);
    });
  }

  function nextMethodSlide() {
    currentIndexMethod = (currentIndexMethod + 1) % methodSlides.length;
    updateMethodCarousel();
  }

  function startAutoMethod() {
    autoMethodInterval = setInterval(nextMethodSlide, 5000);
  }

  function stopAutoMethod() {
    clearInterval(autoMethodInterval);
  }

  // Crear dots (solo si no existen ya)
  if (methodDotsContainer.children.length === 0) {
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
  }

  startAutoMethod();

  const methodContainer = document.querySelector(
    ".methodology-carousel-container",
  );
  methodContainer?.addEventListener("mouseenter", stopAutoMethod);
  methodContainer?.addEventListener("mouseleave", startAutoMethod);

  window.addEventListener("resize", () => {
    updateSlideWidth();
    updateMethodCarousel();
  });

  updateMethodCarousel();
}

// Contador animado (clientes)
// Contador animado en bucle (1 a 99, rápido, imperceptible)
function animateInfiniteCounter() {
  const counterElement = document.getElementById("yearsCounter");
  if (!counterElement) return;

  let currentValue = 1;

  function updateCounter() {
    currentValue++;

    // Si llega a 99, vuelve a 1
    if (currentValue > 99) {
      currentValue = 1;
    }

    counterElement.textContent = currentValue;
  }

  // Cambiar cada 50ms (muy rápido, casi imperceptible)
  setInterval(updateCounter, 50);
}

// Iniciar contador cuando la sección sea visible
function initInfiniteCounterOnScroll() {
  const counterCard = document.querySelector(".counter-card");
  if (!counterCard) return;

  let started = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          started = true;
          animateInfiniteCounter();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 },
  );

  observer.observe(counterCard);
}

// Ejecutar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", initInfiniteCounterOnScroll);

// Modal Blog
const blogModal = document.getElementById("blogModal");
const blogModalBody = document.getElementById("blogModalBody");
const closeModal = document.querySelector(".blog-modal-close");

// Contenido de los blogs
const blogContent = {
  0: {
    title: "MARKETING CON ESTRATEGIA",
    content:
      "<p>Publicar no es suficiente. Las marcas que crecen tienen dirección, intención y estrategia.</p><p>Convertimos ideas en acciones que conectan, posicionan y generan resultados reales. Una estrategia bien definida es la diferencia entre presencia digital y crecimiento real.</p><p>El marketing estratégico analiza datos, entiende a la audiencia y crea contenido relevante que genera conversiones. No se trata de estar, se trata de conectar.</p>",
  },
  1: {
    title: "IDENTIDAD QUE CONECTA",
    content:
      "<p>Tu marca habla antes que tú. Haz que cada detalle comunique valor.</p><p>Branding, diseño y coherencia visual para marcas memorables. Una identidad bien construida genera confianza, reconocimiento y preferencia en tus clientes.</p><p>Desde el logo hasta los colores, cada elemento debe reflejar la personalidad y los valores de tu marca.</p>",
  },
  2: {
    title: "RESULTADOS CON PROPÓSITO",
    content:
      "<p>No buscamos solo presencia digital. Creamos crecimiento con propósito.</p><p>Cada estrategia está pensada para conectar audiencia, fortalecer marca y generar impacto. El éxito no es solo número, es construir relaciones duraderas.</p><p>Trabajamos con métricas que importan: engagement real, lealtad de clientes y crecimiento sostenible.</p>",
  },
  3: {
    title: "SEGUIR UN PLAN DE TRABAJO",
    content:
      "<p>Los resultados no ocurren por casualidad. Nacen de un plan claro, constante y bien ejecutado.</p><p>Cada proyecto necesita estructura, objetivos definidos y una estrategia con seguimiento para lograr crecimiento sostenible. La disciplina y la constancia son claves del éxito.</p><p>Planificamos cada paso, medimos resultados y ajustamos el rumbo para garantizar el cumplimiento de objetivos.</p>",
  },
};

// Agregar evento a cada "Leer más"
document.querySelectorAll(".blog-card .read-more").forEach((link, index) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const blogData = blogContent[index % 4]; // Cicla entre los 4 contenidos
    blogModalBody.innerHTML = `
            <h2>${blogData.title}</h2>
            ${blogData.content}
            <button class="btn btn-primary cerrar-modal" style="margin-top: 20px;">Cerrar</button>
        `;
    blogModal.classList.add("show");

    // Evento para cerrar con el botón dentro del modal
    document.querySelector(".cerrar-modal")?.addEventListener("click", () => {
      blogModal.classList.remove("show");
    });
  });
});

// Cerrar modal con X
closeModal?.addEventListener("click", () => {
  blogModal.classList.remove("show");
});

// Cerrar modal al hacer clic fuera del contenido
blogModal?.addEventListener("click", (e) => {
  if (e.target === blogModal) {
    blogModal.classList.remove("show");
  }
});
