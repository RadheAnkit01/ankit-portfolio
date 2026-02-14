import { projects } from "../data/projects.js";
import { openProjectModal } from "./projectModal.js";

export function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  projects.forEach(project => {
    const card = document.createElement("div");
    card.className = "project-card";

    card.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.shortDescription}</p>
      <small>${project.tech.join(" • ")}</small>
    `;

    card.addEventListener("click", () => openProjectModal(project));
    grid.appendChild(card);
  });
}
