 const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const menuIcon = navToggle.querySelector('.menu-icon');
    const cancelIcon = navToggle.querySelector('.cancel-icon');

    navToggle.addEventListener('click', () => {
      const isActive = navLinks.classList.toggle('active');
      
      // Toggle aria-expanded for accessibility
      navToggle.setAttribute('aria-expanded', isActive);

      // Toggle icons visibility
      if (isActive) {
        menuIcon.style.display = 'none';
        cancelIcon.style.display = 'inline';
      } else {
        menuIcon.style.display = 'inline';
        cancelIcon.style.display = 'none';
      }
    });
    (function() {
  const testimonials = document.querySelectorAll('.testimonial-slider .testimonial');
  let currentIndex = 0;
  const slideInterval = 5000; // 5 seconds

  function showTestimonial(index) {
    testimonials.forEach((t, i) => {
      t.classList.toggle('active', i === index);
    });
  }

  function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  }

  // Initialize first testimonial visible
  showTestimonial(currentIndex);

  // Auto slide interval
  setInterval(nextTestimonial, slideInterval);
})();

