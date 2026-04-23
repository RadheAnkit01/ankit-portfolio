const certContainer = document.getElementById("certContainer");
const modal = document.getElementById("certModal");
const modalImg = document.getElementById("certImage");
const fallback = document.getElementById("certFallback");
const closeBtn = document.getElementById("certClose");

// create cards
certifications.forEach(cert => {
  const card = document.createElement("div");
  card.className = "cert-card";

  card.innerHTML = `
    <div class="cert-title">${cert.title}</div>
    <div class="cert-org">${cert.org}</div>
    <div class="cert-date">${cert.date}</div>
    <button class="cert-btn">View Certificate</button>
  `;

  card.querySelector(".cert-btn").addEventListener("click", () => {
    // 🔥 FULL RESET (IMPORTANT)
    fallback.classList.add("hidden");
    modalImg.style.display = "block";

    modalImg.onerror = null;  // reset old error
    modalImg.src = "";        // clear old src

    // assign new image
    modalImg.src = cert.link;

    modal.classList.remove("hidden");
  });

  certContainer.appendChild(card);
});

// handle error (ONLY toggles UI, no DOM creation)
modalImg.onerror = () => {
  modalImg.style.display = "none";
  fallback.classList.remove("hidden");
};

// close button
closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// click outside
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});