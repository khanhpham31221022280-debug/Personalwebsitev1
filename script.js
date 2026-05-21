function toggleTheme() {
  const isDark = document.body.classList.toggle("dark");
  try {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch (err) {
    // Ignore storage errors.
  }
}

function setLang(lang) {
  document.body.classList.toggle("lang-en", lang === "en");

  document.querySelectorAll("[data-lang-switch]").forEach((button) => {
    button.classList.toggle("active", button.dataset.langSwitch === lang);
  });

  document.querySelectorAll(".nav-link[data-vi]").forEach((link) => {
    link.textContent = lang === "en" ? link.dataset.en : link.dataset.vi;
  });

  try {
    localStorage.setItem("lang", lang);
  } catch (err) {
    // Ignore storage errors.
  }
}

function activateSection(target) {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
  });
  document.querySelectorAll(".section-page").forEach((section) => {
    section.classList.remove("active");
  });

  document.querySelectorAll(`.nav-link[data-target="${target}"]`).forEach((link) => {
    link.classList.add("active");
  });

  const section = document.getElementById(target);
  if (section) {
    section.classList.add("active");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleDrawer() {
  const btn = document.getElementById("hamburger-btn");
  const drawer = document.getElementById("nav-drawer");
  const overlay = document.getElementById("drawer-overlay");

  const isOpen = drawer.classList.toggle("open");
  btn.classList.toggle("open", isOpen);
  overlay.classList.toggle("open", isOpen);
  document.body.style.overflow = isOpen ? "hidden" : "";
}

function closeDrawer() {
  document.getElementById("hamburger-btn").classList.remove("open");
  document.getElementById("nav-drawer").classList.remove("open");
  document.getElementById("drawer-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark");
    }
  } catch (err) {
    // Ignore storage errors.
  }

  const savedLang = (() => {
    try {
      return localStorage.getItem("lang") || "vi";
    } catch (err) {
      return "vi";
    }
  })();
  setLang(savedLang);

  document.querySelectorAll("[data-lang-switch]").forEach((button) => {
    button.addEventListener("click", () => setLang(button.dataset.langSwitch));
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      activateSection(link.dataset.target);
      closeDrawer();
    });
  });

  document.querySelectorAll(".accordion-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const body = button.nextElementSibling;
      const isOpen = button.classList.toggle("open");
      if (body && body.classList.contains("accordion-body")) {
        body.classList.toggle("open", isOpen);
      }
    });
  });
});
