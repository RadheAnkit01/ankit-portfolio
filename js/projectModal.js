export function openProjectModal(project) {
  const modal = document.getElementById("project-modal");

  document.getElementById("modal-title").textContent = project.title;
  document.getElementById("modal-description").textContent =
    project.description;

  const gallery = document.getElementById("modal-gallery");
  gallery.innerHTML = "";

  project.images.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = project.title;
    gallery.appendChild(img);
  });

  document.getElementById("modal-tech").textContent =
    "Technologies: " + project.tech.join(", ");

  document.getElementById("modal-github").href = project.github;
  document.getElementById("modal-live").href = project.live;

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("project-modal").classList.add("hidden");
  document.body.style.overflow = "";
}

document.addEventListener("click", e => {
  if (
    e.target.classList.contains("modal") ||
    e.target.classList.contains("modal-close")
  ) {
    closeModal();
  }
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});
