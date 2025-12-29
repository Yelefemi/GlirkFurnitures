// Filter products by category - only for products page
const filterButtons = document.querySelectorAll('.filter-btn');
const productsGrid = document.getElementById('products-grid');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active from all buttons
    filterButtons.forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    });
    // Add active to clicked button
    button.classList.add('active');
    button.setAttribute('aria-selected', 'true');

    const filter = button.getAttribute('data-filter');

    // Show/hide product cards
    const products = productsGrid.querySelectorAll('.product-card');
    products.forEach(product => {
      if (filter === 'all' || product.dataset.category === filter) {
        product.style.display = '';
      } else {
        product.style.display = 'none';
      }
    });

    // Move focus back to products grid for accessibility
    productsGrid.focus();
  });
});
// Quick View Modal
const modal = document.getElementById('product-modal');
const modalImg = document.getElementById('modal-img');
const modalName = document.getElementById('modal-name');
const modalDesc = document.getElementById('modal-desc');
const modalInfo = document.getElementById('modal-info');
const closeModal = document.querySelector('.close-modal');

document.querySelectorAll('.quick-view-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const card = e.target.closest('.product-card');

    modalImg.src = card.dataset.image;
    modalName.textContent = card.dataset.name;
    modalDesc.textContent = card.dataset.desc;
    modalInfo.textContent =
      `${card.dataset.material} · ${card.dataset.delivery}`;

    modal.classList.add('show');
  });
});

closeModal.addEventListener('click', () =>
  modal.classList.remove('show')
);

modal.addEventListener('click', e => {
  if (e.target === modal) modal.classList.remove('show');
});
const searchInput = document.getElementById('productSearch');
const sortSelect = document.getElementById('productSort');
const productGrid = document.getElementById('productGrid');
let productCards = Array.from(
  document.querySelectorAll('.product-card')
);

/* 🔍 SEARCH */
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();

  productCards.forEach(card => {
    const name = card.dataset.name.toLowerCase();
    const desc = card.dataset.desc.toLowerCase();

    const match = name.includes(query) || desc.includes(query);
    card.style.display = match ? 'block' : 'none';
  });
});

/* ↕️ SORT */
sortSelect.addEventListener('change', () => {
  let sortedCards = [...productCards];

  if (sortSelect.value === 'name-asc') {
    sortedCards.sort((a, b) =>
      a.dataset.name.localeCompare(b.dataset.name)
    );
  }

  if (sortSelect.value === 'name-desc') {
    sortedCards.sort((a, b) =>
      b.dataset.name.localeCompare(a.dataset.name)
    );
  }

  // Reset grid
  productGrid.innerHTML = '';
  sortedCards.forEach(card => productGrid.appendChild(card));
});
const emptyState = document.getElementById('emptyState');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  let visibleCount = 0;

  productCards.forEach(card => {
    const match =
      card.dataset.name.toLowerCase().includes(query) ||
      card.dataset.desc.toLowerCase().includes(query);

    card.style.display = match ? 'block' : 'none';
    if (match) visibleCount++;
  });

  emptyState.hidden = visibleCount !== 0;
});
