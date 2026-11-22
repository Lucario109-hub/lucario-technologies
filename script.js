/* Lucario Technologies – Website-Funktionen */
(() => {
  "use strict";

  // Jahreszahl im Footer automatisch aktuell halten.
  const footerYear = document.querySelector("footer p");
  if (footerYear) {
    footerYear.textContent = "© " + new Date().getFullYear() + " Lucario Technologies";
  }

  // Navigation: markiert den aktuell sichtbaren Bereich.
  const navLinks = Array.from(document.querySelectorAll('nav a[href^="#"]'));
  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          const active = link.getAttribute("href") === "#" + entry.target.id;
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-35% 0px -55% 0px" });

    sections.forEach(section => observer.observe(section));
  }

  // Verhindert einen Sprung bei Navigation auf nicht vorhandene Ziele.
  navLinks.forEach(link => {
    link.addEventListener("click", event => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", link.getAttribute("href"));
    });
  });
})();
