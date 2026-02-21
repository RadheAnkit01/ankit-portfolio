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

  img.addEventListener("click", () => {
    openImageViewer(src);
  });

  gallery.appendChild(img);
  });

  document.getElementById("modal-tech").textContent =
    "Technologies: " + project.tech.join(", ");

  renderModalButtons(project.buttons);

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






const imageViewer = document.getElementById("image-viewer");
const viewerImg = document.getElementById("viewer-img");
const closeBtn = document.querySelector(".image-close");

function openImageViewer(src) {
  viewerImg.src = src;
  imageViewer.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeImageViewer() {
  imageViewer.classList.add("hidden");
  viewerImg.src = "";
  document.body.style.overflow = "";
}

closeBtn.addEventListener("click", closeImageViewer);

// Close on background tap
imageViewer.addEventListener("click", e => {
  if (e.target === imageViewer) closeImageViewer();
});

// Optional: ESC key support
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !imageViewer.classList.contains("hidden")) {
    closeImageViewer();
  }
});




function renderModalButtons(buttons) {
  const container = document.getElementById("modal-links");
  container.innerHTML = "";

  if (!buttons || buttons.length === 0) return;

  buttons.forEach(btn => {
    const a = document.createElement("a");
    a.textContent = btn.label;
    a.href = btn.link;
    a.target = "_blank";
    a.rel = "noopener noreferrer";

    container.appendChild(a);
  });
}