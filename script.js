document.addEventListener('DOMContentLoaded', () => {
  
  // --- Sticky Header Scrolled State ---
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Mobile Hamburger Navigation ---
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = mobileMenu.querySelectorAll('.nav-link');

  const toggleMenu = () => {
    menuToggle.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  };

  menuToggle.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Close menu when a link is clicked
      menuToggle.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  // --- Scrollspy: Highlight Active Section in Navigation ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link, .mobile-nav .nav-link');

  const highlightNav = () => {
    let scrollPos = window.scrollY + 120; // offset for sticky header

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav);
  highlightNav(); // run once on load

  // --- Services Tab Filter ---
  const serviceTabs = document.querySelectorAll('.tab-btn');
  const serviceBlocks = document.querySelectorAll('.service-category-block');

  serviceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      serviceTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.getAttribute('data-target');

      serviceBlocks.forEach(block => {
        const category = block.getAttribute('data-category');
        if (target === 'all' || category === target) {
          block.style.display = 'grid';
          // Force a reflow for animations
          setTimeout(() => {
            block.style.opacity = '1';
            block.style.transform = 'translateY(0)';
          }, 50);
        } else {
          block.style.opacity = '0';
          block.style.transform = 'translateY(20px)';
          // Hide after transition
          setTimeout(() => {
            block.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // --- Gallery Filters ---
  const galleryFilterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // --- Gallery Lightbox ---
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.style.display = 'flex';
    });
  });

  const closeLightbox = () => {
    lightbox.style.display = 'none';
    lightboxImg.src = '';
  };

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close lightbox on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') {
      closeLightbox();
    }
  });

  // --- FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    const answer = item.querySelector('.faq-answer');

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other open FAQ items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-answer').style.maxHeight = '0';
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = '0';
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // --- Booking Form Handler ---
  const formWrapper = document.getElementById('booking-form-wrapper');
  const successMessage = document.getElementById('booking-success');
  const reservationForm = document.getElementById('reservation-form');
  const backBtn = document.getElementById('success-back-btn');

  reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get input values (can be used for integrations later)
    const name = document.getElementById('form-name').value.trim();
    const phone = document.getElementById('form-phone').value.trim();
    const service = document.getElementById('form-service').value;
    const message = document.getElementById('form-message').value.trim();

    if (name && phone && service) {
      // Trigger smooth transitions to success display
      formWrapper.style.display = 'none';
      successMessage.style.display = 'flex';
    }
  });

  backBtn.addEventListener('click', () => {
    // Reset form and show it again
    reservationForm.reset();
    successMessage.style.display = 'none';
    formWrapper.style.display = 'block';
  });

  // --- Reveal-on-Scroll Animations ---
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once revealed, no need to track it anymore
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1, // trigger when 10% of element is in viewport
    rootMargin: '0px 0px -50px 0px' // offset bottom slightly
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
  
});
