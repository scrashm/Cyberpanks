(function () {
  "use strict";

  const PRODUCTS = {
    "cyber-short-purple": {
      title: "Cyber short purple",
      category: "Футболка",
      price: "1550р",
      sizes: "XS, S, M, L, XL",
      image: "assets/images/cyber-short-purple.png",
      desc: "Чёрная футболка с принтом «КИБЕРПАНК» лавандового оттенка. 100% хлопок, прямой крой.",
    },
    "y4astkoviy-short": {
      title: "Y4astkoviy short",
      category: "Футболка",
      price: "1550р",
      sizes: "S, M, L, XL",
      image: "assets/images/y4astkoviy-short.png",
      desc: "Чёрная футболка с принтом «УЧАСТКОВЫЙ РАЗБЕРЁТСЯ» и надписью КИБЕРПАНКИ. 100% хлопок.",
    },
    "graphic-wave": {
      title: "Ptitsa short",
      category: "Футболка",
      price: "1550р",
      sizes: "S, M, L, XL",
      image: "assets/images/ptitsa.png",
      desc: "Лимитированный принт «Wave» на груди. Шелкография, стойкие пигменты. Тираж 200 штук.",
    },
    "hoodie-grey": {
      title: "canser short",
      category: "Худи",
      price: "2888р",
      sizes: "S, M, L, XL",
      image: "assets/images/canser.png",
      desc: "Худи на флисе 320 г/м². Капюшон с двойным слоем, карман-кенгуру, минималистичный вышитый логотип.",
    },
    "longsleeve-street": {
      title: "Street",
      category: "Лонгслив",
      price: "4 590 ₽",
      sizes: "XS, S, M, L, XL",
      image: "assets/images/street.png",
      desc: "Лонгслив с лёгким оверсайзом. Рибана на манжетах и горловине. Универсальный слой под худи или куртку.",
    },
    "limited-edition": {
      title: "Limited Edition",
      category: "Футболка",
      price: "5 490 ₽",
      sizes: "M, L",
      image: "assets/images/limited-edition.png",
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
  let imageRotate = 0;

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
  function applyImageTransform() {
    imageLightboxImg.style.transform = `scale(${imageZoom}) rotate(${imageRotate}deg)`;
  }

  function openImageLightbox(src, alt) {
    imageLightboxImg.src = src;
    imageLightboxImg.alt = alt;
    imageZoom = 1;
    imageRotate = 0;
    applyImageTransform();
    imageLightbox.hidden = false;
    document.body.style.overflow = "hidden";
    imageLightbox.querySelector(".image-lightbox__close").focus();
  }

  function closeImageLightbox() {
    imageLightbox.hidden = true;
    imageLightboxImg.src = "";
    imageZoom = 1;
    imageRotate = 0;
    applyImageTransform();
    if (modal.hidden) document.body.style.overflow = "";
  }

  function resetImageView() {
    imageZoom = 1;
    imageRotate = 0;
    applyImageTransform();
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
      applyImageTransform();
    },
    { passive: false }
  );

  imageLightbox.querySelectorAll("[data-rotate]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const delta = Number(btn.getAttribute("data-rotate")) || 0;
      imageRotate = (imageRotate + delta) % 360;
      applyImageTransform();
    });
  });

  imageLightbox.querySelectorAll("[data-reset-view]").forEach((btn) => {
    btn.addEventListener("click", resetImageView);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (!imageLightbox.hidden) {
        closeImageLightbox();
        return;
      }
      if (!modal.hidden) closeModal();
      return;
    }

    if (imageLightbox.hidden) return;
    if (e.key === "q" || e.key === "Q" || e.key === "й" || e.key === "Й") {
      imageRotate = (imageRotate - 90) % 360;
      applyImageTransform();
      return;
    }
    if (e.key === "e" || e.key === "E" || e.key === "у" || e.key === "У") {
      imageRotate = (imageRotate + 90) % 360;
      applyImageTransform();
      return;
    }
    if (e.key === "0") {
      resetImageView();
      return;
    }
  });
})();
