(function () {
  "use strict";

  const PRODUCTS = {
    "classic-black": {
      title: "Classic Black",
      category: "Футболка",
      price: "3 490 ₽",
      sizes: "XS, S, M, L, XL",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      desc: "Базовая футболка из плотного хлопка 240 г/м². Прямой крой, круглый вырез. Идеальна как основа гардероба.",
    },
    "oversize-white": {
      title: "Oversize White",
      category: "Футболка",
      price: "3 790 ₽",
      sizes: "S, M, L, XL",
      image: "https://images.unsplash.com/photo-1583743814966-6a5c9169b7a4?w=800&q=80",
      desc: "Свободный oversize-крой, мягкий хлопок. Спущенное плечо и удлинённый подол — городской силуэт.",
    },
    "graphic-wave": {
      title: "Graphic «Wave»",
      category: "Футболка",
      price: "4 290 ₽",
      sizes: "S, M, L, XL",
      image: "https://images.unsplash.com/photo-1576566588028-4147f384cdf1?w=800&q=80",
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

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });
})();
