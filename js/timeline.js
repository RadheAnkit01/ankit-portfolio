const container = document.getElementById("timelineContainer");

if (container && Array.isArray(timelineData)) {
  timelineData.forEach(item => {
    const div = document.createElement("div");
    div.className = "timeline-item";

    div.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <div class="timeline-date">${item.date}</div>
        <div class="timeline-sem">${item.semester}</div>
        <ul>
          ${item.skills.map(skill => `<li>${skill}</li>`).join("")}
        </ul>
      </div>
    `;

    container.appendChild(div);
  });
}



// js for improving scroll

const slider = document.querySelector(".timeline-wrapper");

if (slider) {
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();

    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5;
    slider.scrollLeft = scrollLeft - walk;
  });
}