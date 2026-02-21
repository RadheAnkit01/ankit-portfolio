import { renderProjects } from "./renderProjects.js";
import { skills } from "../data/skills.js";
import { initScrollReveal } from "./animation.js";
import "../js/projectModal.js";



// script for skills section

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();

  const skillsContainer = document.getElementById("skills-container");

  if (!skillsContainer) {
    console.error("skills-container not found");
    return;
  }

  skills.forEach(skill => {
    const card = document.createElement("div");
    card.className = `skill-card ${skill.colorClass}`;

    card.innerHTML = `
      <div class="skill-icon">
        <img src="${skill.icon}" alt="${skill.title}" />
      </div>
      <div class="skill-content">
        <h3>${skill.title}</h3>
        <div class="skill-tags">
          ${skill.items.map(item => `<span>${item}</span>`).join("")}
        </div>
      </div>
    `;

    skillsContainer.appendChild(card);
  });

  initScrollReveal();
});





// script for hero images
const heroImages = [
  "assets/images/profile.png",
  "assets/images/profile-2.png",
];

let currentHeroIndex = 0;
const heroImg = document.getElementById("hero-image");

if (heroImg) {
  setInterval(() => {
    // rotate out
    heroImg.classList.add("hero-flip-hide");

    setTimeout(() => {
      // swap image while hidden
      currentHeroIndex = (currentHeroIndex + 1) % heroImages.length;
      heroImg.src = heroImages[currentHeroIndex];

      // force reflow (important)
      heroImg.offsetHeight;

      // rotate back in (same direction)
      heroImg.classList.remove("hero-flip-hide");
    }, 400);
  }, 4500);
}






// script for nav bar links

const navLinks = document.querySelectorAll(".navbar nav a");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});



