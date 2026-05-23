(function () {
  "use strict";

  const PRODUCTS = {
    "cyber-short-purple": {
      title: "Cyber short purple",
      category: "Р¤СѓС‚Р±РѕР»РєР°",
      price: "1550р",
      sizes: "XS, S, M, L, XL",
      image: "assets/images/cyber-short-purple.png",
      desc: "Р§С‘СЂРЅР°СЏ С„СѓС‚Р±РѕР»РєР° СЃ РїСЂРёРЅС‚РѕРј В«РљРР‘Р•Р РџРђРќРљВ» Р»Р°РІР°РЅРґРѕРІРѕРіРѕ РѕС‚С‚РµРЅРєР°. 100% С…Р»РѕРїРѕРє, РїСЂСЏРјРѕР№ РєСЂРѕР№.",
    },
    "y4astkoviy-short": {
      title: "Y4astkoviy short",
      category: "Р¤СѓС‚Р±РѕР»РєР°",
      price: "1550р",
      sizes: "S, M, L, XL",
      image: "assets/images/y4astkoviy-short.png",
      desc: "Р§С‘СЂРЅР°СЏ С„СѓС‚Р±РѕР»РєР° СЃ РїСЂРёРЅС‚РѕРј В«РЈР§РђРЎРўРљРћР’Р«Р™ Р РђР—Р‘Р•Р РЃРўРЎРЇВ» Рё РЅР°РґРїРёСЃСЊСЋ РљРР‘Р•Р РџРђРќРљР. 100% С…Р»РѕРїРѕРє.",
    },
    "graphic-wave": {
      title: "Ptitsa short",
      category: "Р¤СѓС‚Р±РѕР»РєР°",
      price: "1550р",
      sizes: "S, M, L, XL",
      image: "assets/images/ptitsa.png",
      desc: "Р›РёРјРёС‚РёСЂРѕРІР°РЅРЅС‹Р№ РїСЂРёРЅС‚ В«WaveВ» РЅР° РіСЂСѓРґРё. РЁРµР»РєРѕРіСЂР°С„РёСЏ, СЃС‚РѕР№РєРёРµ РїРёРіРјРµРЅС‚С‹. РўРёСЂР°Р¶ 200 С€С‚СѓРє.",
    },
    "hoodie-grey": {
      title: "canser short",
      category: "РҐСѓРґРё",
      price: "2888р",
      sizes: "S, M, L, XL",
      image: "assets/images/canser.png",
      desc: "РҐСѓРґРё РЅР° С„Р»РёСЃРµ 320 Рі/РјВІ. РљР°РїСЋС€РѕРЅ СЃ РґРІРѕР№РЅС‹Рј СЃР»РѕРµРј, РєР°СЂРјР°РЅ-РєРµРЅРіСѓСЂСѓ, РјРёРЅРёРјР°Р»РёСЃС‚РёС‡РЅС‹Р№ РІС‹С€РёС‚С‹Р№ Р»РѕРіРѕС‚РёРї.",
    },
    "longsleeve-street": {
      title: "Street",
      category: "Р›РѕРЅРіСЃР»РёРІ",
      price: "4 590 в‚Ѕ",
      sizes: "XS, S, M, L, XL",
      image: "https://images.unsplash.com/photo-1618354691373-d851c5c3f990?w=800&q=80",
      desc: "Р›РѕРЅРіСЃР»РёРІ СЃ Р»С‘РіРєРёРј РѕРІРµСЂСЃР°Р№Р·РѕРј. Р РёР±Р°РЅР° РЅР° РјР°РЅР¶РµС‚Р°С… Рё РіРѕСЂР»РѕРІРёРЅРµ. РЈРЅРёРІРµСЂСЃР°Р»СЊРЅС‹Р№ СЃР»РѕР№ РїРѕРґ С…СѓРґРё РёР»Рё РєСѓСЂС‚РєСѓ.",
    },
    "limited-edition": {
      title: "Limited Edition",
      category: "Р¤СѓС‚Р±РѕР»РєР°",
      price: "5 490 в‚Ѕ",
      sizes: "M, L",
      image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80",
      desc: "Р­РєСЃРєР»СЋР·РёРІРЅР°СЏ РјРѕРґРµР»СЊ СЃ РЅСѓРјРµСЂРѕРІР°РЅРЅРѕР№ Р±РёСЂРєРѕР№. РўРёСЂР°Р¶ 50 С€С‚СѓРє. РџР»РѕС‚РЅС‹Р№ С…Р»РѕРїРѕРє, РґРІРѕР№РЅР°СЏ СЃС‚СЂРѕС‡РєР°.",
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
