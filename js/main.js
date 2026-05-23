(function () {
  "use strict";

  const PRODUCTS = {
    "cyber-short-purple": {
      title: "Cyber short purple",
      category: "Футболка",
      price: "1 550 ₽",
      sizes: "XS, S, M, L, XL",
      image: "assets/images/cyber-short-purple.png",
      desc: "Чёрная футболка с принтом «КИБЕРПАНК» лавандового оттенка. 100% хлопок, прямой крой.",
    },
    "y4astkoviy-short": {
      title: "Y4astkoviy short",
      category: "Футболка",
      price: "1 550 ₽",
      sizes: "S, M, L, XL",
      image: "assets/images/y4astkoviy-short.png",
      desc: "Чёрная футболка с принтом «УЧАСТКОВЫЙ РАЗБЕРЁТСЯ» и надписью КИБЕРПАНКИ. 100% хлопок.",
    },
    "graphic-wave": {
      title: "Ptitsa short",
      category: "Футболка",
      price: "4 290 ₽",
      sizes: "S, M, L, XL",
      image: "assets/images/ptitsa.png",
      desc: "Лимитированный принт «Wave» на груди. Шелкография, стойкие пигменты. Тираж 200 штук.",
    },
    "hoodie-grey": {
      title: "Minimal Grey",
      category: "Худи",
      price: "6 990 ₽",
      sizes: "S, M, L, XL",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
      desc: "Худи на флисе 320 г/м². Капюшон с двойным слоем, карман-кенгуру, минималистичный вышитый логотип.",
    },
    "longsleeve-street": {
      title: "Street",
      category: "Лонгслив",
      price: "4 590 ₽",
      sizes: "XS, S, M, L, XL",
      image: "https://images.unsplash.com/photo-1618354691373-d851c5c3f990?w=800&q=80",
      desc: "Лонгслив с лёгким оверсайзом. Рибана на манжетах и горловине. Универсальный слой под худи или куртку.",
    },
    "limited-edition": {
      title: "Limited Edition",
      category: "Футболка",
      price: "5 490 ₽",
      sizes: "M, L",
      image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80",
      desc: "Эксклюзивная модель с нумерованной биркой. Тираж 50 штук. Плотный хлопок, двойная строчка.",
    },
  };

  const header = document.querySelector(".header");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav__link");
  const navToggle = document.querySelector(".nav-toggle");
  const sections = document.querySelectorAll("section[id]");
  const reveals = document.querySelectorAll(".reveal");
  const modal = document.getElementById("product-modal");
  const imageLightbox = document.getElementById("image-lightbox");
  const imageLightboxImg = document.getElementById("image-lightbox-img");
  const imageLightboxViewport = document.getElementById("image-lightbox-viewport");

  const ZOOM_MIN = 1;
  const ZOOM_MAX = 4;
  const ZOOM_STEP = 0.12;
  let imageZoom = 1;

  /* Header scroll state */
  function onScroll() {
    header.classList.toggle("header--scrolled", window.scrollY > 40);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Active nav link via Intersection Observer */
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle("nav__link--active", link.dataset.section === id);
        });
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  /* Reveal on scroll */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal--visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  reveals.forEach((el) => revealObserver.observe(el));

  /* Mobile nav toggle */
  navToggle.addEventListener("click", () => {
    const open = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("nav--open", !open);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("nav--open");
    });
  });

  /* Product modal */
  function openModal(id) {
    const product = PRODUCTS[id];
    if (!product) return;

    document.getElementById("modal-title").textContent = product.title;
    document.getElementById("modal-category").textContent = product.category;
    document.getElementById("modal-price").textContent = product.price;
    document.getElementById("modal-desc").textContent = product.desc;
    document.getElementById("modal-sizes").textContent = product.sizes;
    document.getElementById("modal-image").style.backgroundImage = `url("${product.image}")`;

    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modal.querySelector(".modal__close").focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-open]").forEach((btn) => {
    btn.addEventListener("click", () => openModal(btn.dataset.open));
  });

  modal.querySelectorAll("[data-close]").forEach((el) => {
    el.addEventListener("click", closeModal);
  });

  /* Image lightbox with wheel zoom */
  function applyImageZoom() {
    imageLightboxImg.style.transform = `scale(${imageZoom})`;
  }

  function openImageLightbox(src, alt) {
    imageLightboxImg.src = src;
    imageLightboxImg.alt = alt;
    imageZoom = 1;
    applyImageZoom();
    imageLightbox.hidden = false;
    document.body.style.overflow = "hidden";
    imageLightbox.querySelector(".image-lightbox__close").focus();
  }

  function closeImageLightbox() {
    imageLightbox.hidden = true;
    imageLightboxImg.src = "";
    imageZoom = 1;
    applyImageZoom();
    if (modal.hidden) document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-zoom]").forEach((btn) => {
    btn.addEventListener("click", () => {
      openImageLightbox(btn.dataset.zoom, btn.dataset.zoomAlt || "");
    });
  });

  imageLightbox.querySelectorAll("[data-close-zoom]").forEach((el) => {
    el.addEventListener("click", closeImageLightbox);
  });

  imageLightboxViewport.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
      imageZoom = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, imageZoom + delta));
      applyImageZoom();
    },
    { passive: false }
  );

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!imageLightbox.hidden) {
      closeImageLightbox();
      return;
    }
    if (!modal.hidden) closeModal();
  });
})();
