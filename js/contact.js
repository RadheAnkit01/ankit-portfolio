const contactContainer = document.getElementById("contact-container");

contactData.forEach((item) => {
  const card = document.createElement("div");

  card.className = "contact-card";

  card.innerHTML = `
      <div class="contact-icon">${item.icon}</div>

      <div class="contact-info">
          <p class="contact-label">${item.name}</p>
          <p class="contact-username">${item.username}</p>

          <a href="${item.link}"
             target="_blank"
             class="contact-link">
             ${item.buttonText}
          </a>
      </div>
  `;

  contactContainer.appendChild(card);
});