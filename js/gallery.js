(() => {

    const galleryGrid = document.getElementById("gallery-grid");

    const galleryModal = document.getElementById("gallery-modal");
    const galleryMainImage = document.getElementById("gallery-main-image");
    const galleryNote = document.getElementById("gallery-note");
    const galleryThumbs = document.getElementById("gallery-thumbnails");

    const galleryCloseBtn = document.querySelector(".gallery-close");
    const galleryPrevBtn = document.querySelector(".gallery-prev");
    const galleryNextBtn = document.querySelector(".gallery-next");

    let currentIndex = 0;

    // all gallery code here
    function renderGallery() {  

        galleryGrid.innerHTML = "";

        window.galleryData.forEach((item, index) => {

            const card = document.createElement("div");
            card.className = "gallery-card";

            card.innerHTML = `
                <img src="${item.image}" alt="">
            `;

            card.addEventListener("click", () => openGallery(index));

            galleryGrid.appendChild(card);
        });
    }

    function openGallery(index) {

        currentIndex = index;

        updateViewer();

        galleryModal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
    }

    function closeGallery() {

        galleryModal.classList.add("hidden");
        document.body.style.overflow = "";
    }

    function updateViewer() {

        const item = window.galleryData[currentIndex];

        galleryMainImage.src = item.image;

        galleryNote.textContent = item.note || "";

        renderThumbnails();
    }

    function renderThumbnails() {

        galleryThumbs.innerHTML = "";

        const visibleCount = 7;

        let start = currentIndex - Math.floor(visibleCount / 2);
        let end = currentIndex + Math.floor(visibleCount / 2);

        if (start < 0) {
            start = 0;
            end = visibleCount - 1;
        }

        if (end >= window.galleryData.length) {
            end = window.galleryData.length - 1;
            start = Math.max(0, end - visibleCount + 1);
        }

        for (let i = start; i <= end; i++) {

            const thumb = document.createElement("img");

            thumb.src = window.galleryData[i].image;

            if (i === currentIndex) {
                thumb.classList.add("active");
            }

            thumb.addEventListener("click", () => {
                currentIndex = i;
                updateViewer();
            });

            galleryThumbs.appendChild(thumb);
        }
    }   

    function nextImage() {

        currentIndex++;

        if (currentIndex >= window.galleryData.length) {
            currentIndex = 0;
        }

        updateViewer();
    }

    function prevImage() {

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = window.galleryData.length - 1;
        }

        updateViewer();
    }

    galleryNextBtn.addEventListener("click", nextImage);
    galleryPrevBtn.addEventListener("click", prevImage);
    galleryCloseBtn.addEventListener("click", closeGallery);

    document.addEventListener("keydown", (e) => {

        if (galleryModal.classList.contains("hidden")) return;

        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "Escape") closeGallery();
    });

    renderGallery();

})();

