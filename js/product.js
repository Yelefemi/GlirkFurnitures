document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     SEARCH
  ========================= */
  const searchInput = document.getElementById("productSearch");
  const emptyState = document.getElementById("emptyState");
  const productCards = Array.from(document.querySelectorAll(".product-card"));

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      let visible = 0;

      productCards.forEach(card => {
        const name = card.dataset.name.toLowerCase();
        const match = name.includes(query);
        card.style.display = match ? "" : "none";
        if (match) visible++;
      });

      if (emptyState) {
        emptyState.hidden = visible !== 0;
      }
    });
  }

  /* =========================
     SORT
  ========================= */
  const sortSelect = document.getElementById("productSort");
  const productGrid = document.querySelector(".product-grid");

  if (sortSelect && productGrid) {
    sortSelect.addEventListener("change", () => {
      const sorted = [...productCards];

      if (sortSelect.value === "name-asc") {
        sorted.sort((a, b) =>
          a.dataset.name.localeCompare(b.dataset.name)
        );
      }

      if (sortSelect.value === "name-desc") {
        sorted.sort((a, b) =>
          b.dataset.name.localeCompare(a.dataset.name)
        );
      }

      productGrid.innerHTML = "";
      sorted.forEach(card => productGrid.appendChild(card));
    });
  }

  /* =========================
     MODAL + CAROUSEL + WHATSAPP
  ========================= */
  const modal = document.getElementById("productModal");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const whatsappBtn = document.getElementById("whatsappBtn");
  const closeBtn = document.querySelector(".close-modal");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  const phone = "2348028367079";
  let images = [];
  let index = 0;
  let productName = "";

  document.querySelectorAll(".quick-view-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const card = e.target.closest(".product-card");

      images = card.dataset.images.split(",");
      index = 0;
      productName = card.dataset.name;

      modalImg.src = images[index];
      modalTitle.textContent = productName;

      whatsappBtn.onclick = () => {
        const msg = `Hello Glirk Furniture 👋

I’d like to request a quote for:
Product: ${productName}
Image: ${location.origin}/${images[index]}`;

        window.open(
          `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,
          "_blank"
        );
      };

      modal.classList.add("show");
    });
  });

  if (prevBtn) {
    prevBtn.onclick = () => {
      index = (index - 1 + images.length) % images.length;
      modalImg.src = images[index];
    };
  }

  if (nextBtn) {
    nextBtn.onclick = () => {
      index = (index + 1) % images.length;
      modalImg.src = images[index];
    };
  }

  if (closeBtn) {
    closeBtn.onclick = () => modal.classList.remove("show");
  }

  if (modal) {
    modal.onclick = e => {
      if (e.target === modal) modal.classList.remove("show");
    };
  }

});
