const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function clearProjectTransitionNames() {
  for (const element of document.querySelectorAll('[style*="view-transition-name"]')) {
    element.style.removeProperty("view-transition-name");
  }
}

function prepareProjectTransition(link) {
  if (!("startViewTransition" in document) || reducedMotion.matches) return;

  clearProjectTransitionNames();

  const title = link.querySelector("h3");
  const mark = link.querySelector(".project-mark");

  title?.style.setProperty("view-transition-name", "project-title");
  mark?.style.setProperty("view-transition-name", "project-mark");
}

for (const link of document.querySelectorAll('a[data-project][href^="/projects/"]')) {
  link.addEventListener("click", () => prepareProjectTransition(link));
}

if (!reducedMotion.matches && "IntersectionObserver" in window) {
  const revealed = new WeakSet();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || revealed.has(entry.target)) continue;

        revealed.add(entry.target);
        entry.target.animate(
          [
            { opacity: 0.001, transform: "translateY(1.15rem)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          {
            duration: 520,
            delay: Math.min(entry.target.getBoundingClientRect().top / 30, 140),
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            fill: "both",
          },
        );
        observer.unobserve(entry.target);
      }
    },
    {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.08,
    },
  );

  for (const element of document.querySelectorAll("[data-reveal]")) {
    observer.observe(element);
  }
}

window.addEventListener("pageshow", () => {
  requestAnimationFrame(clearProjectTransitionNames);
});
