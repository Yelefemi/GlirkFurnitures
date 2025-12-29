document.addEventListener('DOMContentLoaded', () => {
  const animatedItems = document.querySelectorAll('.animate');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  animatedItems.forEach(item => {
    observer.observe(item);

    // 👇 Fallback for items already in view
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      item.classList.add('show');
    }
  });
});
