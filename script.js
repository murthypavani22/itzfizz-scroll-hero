/* =========================================================
   ITZFIZZ SCROLL-DRIVEN HERO
   GSAP + ScrollTrigger
   ========================================================= */

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const headlineLines = document.querySelectorAll(".headline-line");
const intro = document.querySelector(".intro");
const stats = document.querySelectorAll(".stat");
const scrollHint = document.querySelector(".scroll-hint");
const statNumbers = document.querySelectorAll(".stat strong");

if (!prefersReducedMotion) {
  // -------------------------------------------------------
  // 1. INITIAL LOAD ANIMATION
  // -------------------------------------------------------
  const introTimeline = gsap.timeline({
    defaults: {
      ease: "power3.out"
    }
  });

  introTimeline
    .to(headlineLines, {
      y: "0%",
      opacity: 1,
      duration: 1.0,
      stagger: 0.12
    })
    .to(intro, {
      y: 0,
      opacity: 1,
      duration: 0.7
    }, "-=0.55")
    .to(stats, {
      y: 0,
      opacity: 1,
      duration: 0.55,
      stagger: 0.1
    }, "-=0.35")
    .to(scrollHint, {
      opacity: 1,
      duration: 0.5
    }, "-=0.2");

  // -------------------------------------------------------
  // 2. STAT COUNTERS
  // -------------------------------------------------------
  statNumbers.forEach((number) => {
    const target = Number(number.dataset.value);

    gsap.to(number, {
      innerText: target,
      duration: 1.2,
      delay: 0.8,
      ease: "power2.out",
      snap: {
        innerText: 1
      }
    });
  });

  // -------------------------------------------------------
  // 3. SCROLL-DRIVEN HERO ANIMATION
  // -------------------------------------------------------
  const scrollTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2,
      invalidateOnRefresh: true
    }
  });

  scrollTimeline
    // Main object: move, scale and rotate with scroll.
    .to(".main-object", {
      x: 115,
      y: -40,
      scale: 0.58,
      rotation: 165,
      ease: "none",
      duration: 1
    }, 0)

    // Glow expands.
    .to(".visual-glow", {
      scale: 1.55,
      opacity: 0.25,
      ease: "none",
      duration: 1
    }, 0)

    // Orbital rings move in different directions.
    .to(".orbital-one", {
      rotation: 110,
      scale: 1.25,
      ease: "none",
      duration: 1
    }, 0)

    .to(".orbital-two", {
      rotation: -80,
      scale: 0.8,
      ease: "none",
      duration: 1
    }, 0)

    // Floating cards move independently.
    .to(".card-one", {
      x: -70,
      y: -80,
      rotation: -10,
      ease: "none",
      duration: 1
    }, 0)

    .to(".card-two", {
      x: 75,
      y: 35,
      rotation: 8,
      ease: "none",
      duration: 1
    }, 0)

    .to(".card-three", {
      x: -45,
      y: 55,
      rotation: -6,
      ease: "none",
      duration: 1
    }, 0)

    // Copy subtly moves away as the visual takes focus.
    .to(".hero-copy", {
      y: -45,
      opacity: 0.45,
      ease: "none",
      duration: 1
    }, 0);

  // -------------------------------------------------------
  // 4. PROGRESS INDICATOR
  // -------------------------------------------------------
  gsap.to(".progress-bar", {
    width: "100%",
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom bottom",
      scrub: true
    }
  });

} else {
  // Accessible fallback for users who prefer reduced motion.
  gsap.set(headlineLines, { y: "0%", opacity: 1 });
  gsap.set(intro, { y: 0, opacity: 1 });
  gsap.set(stats, { y: 0, opacity: 1 });
  gsap.set(scrollHint, { opacity: 1 });

  statNumbers.forEach((number) => {
    number.textContent = number.dataset.value;
  });
}

// ---------------------------------------------------------
// Small safety refresh after fonts/images/layout settle.
// ---------------------------------------------------------
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
