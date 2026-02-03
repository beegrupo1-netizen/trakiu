document.addEventListener('DOMContentLoaded', function(){
  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  
  navToggle && navToggle.addEventListener('click', ()=>{
    mainNav.classList.toggle('show');
  });

  // Close nav when link clicked
  document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('show');
    });
  });

  // Lightbox gallery
  const lightbox = document.getElementById('lightbox');
  const lbImage = document.getElementById('lbImage');
  const lbClose = document.getElementById('lbClose');
  
  document.querySelectorAll('.mockup-item').forEach(img => {
    img && img.addEventListener('click', (e) => {
      lbImage.src = e.currentTarget.src;
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.setAttribute('aria-hidden', 'true');
    lbImage.src = '';
    document.body.style.overflow = '';
  };

  lbClose && lbClose.addEventListener('click', closeLightbox);
  lightbox && lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox) closeLightbox();
  });

  // Close lightbox with Escape key
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && lightbox.getAttribute('aria-hidden') === 'false') {
      closeLightbox();
    }
  });

  // Contact form handler
  const contactForm = document.getElementById('contactForm');
  contactForm && contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Mock success message
    alert(`Obrigado, ${data.name}! Receberemos sua mensagem em ${data.email}`);
    contactForm.reset();
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if(href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if(target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});
