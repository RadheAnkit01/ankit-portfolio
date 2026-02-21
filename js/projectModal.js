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




const canvas = document.getElementById("cursor-canvas");
const ctx = canvas.getContext("2d");

let w, h;
let smoke = [];
let lastX = null;
let lastY = null;
let lastTime = null;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

window.addEventListener("mousemove", e => {
  const now = performance.now();

  if (lastX === null) {
    lastX = e.clientX;
    lastY = e.clientY;
    lastTime = now;
    return;
  }

  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  const dt = Math.max(now - lastTime, 1);

  const speed = Math.sqrt(dx * dx + dy * dy) / dt;

  lastX = e.clientX;
  lastY = e.clientY;
  lastTime = now;

  /* 🔥 CONTROLLED intensity */
  const intensity = Math.min(Math.max(speed * 10, 0.4), 3);

  for (let i = 0; i < intensity; i++) {
    smoke.push({
      x: e.clientX + (Math.random() - 0.5) * 10,
      y: e.clientY + (Math.random() - 0.5) * 10,
      radius: 14 + Math.random() * 12,
      alpha: 0.12 + speed * 0.1,
      decay: 0.015 + speed * 0.01
    });
  }

  /* HARD LIMIT */
  if (smoke.length > 140) smoke.splice(0, smoke.length - 140);
});

function draw() {
  ctx.clearRect(0, 0, w, h);
  ctx.globalCompositeOperation = "lighter";

  smoke.forEach(p => {
    const gradient = ctx.createRadialGradient(
      p.x,
      p.y,
      0,
      p.x,
      p.y,
      p.radius
    );

    gradient.addColorStop(0, `rgba(56,189,248,${p.alpha})`);
    gradient.addColorStop(0.6, `rgba(56,189,248,${p.alpha * 0.35})`);
    gradient.addColorStop(1, "rgba(56,189,248,0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();

    /* 🔧 tighter behavior */
    p.radius += 0.15;      // was too big before
    p.alpha -= p.decay;   // faster fade when fast
    p.y -= 0.02;          // subtle lift only
  });

  smoke = smoke.filter(p => p.alpha > 0);
  requestAnimationFrame(draw);
}

draw();