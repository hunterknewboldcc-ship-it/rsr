/**
 * RSR Contracting - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const headerActions = document.querySelector('.header-actions');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      
      // Toggle visibility classes (we'll need to add these to CSS if we want animation, 
      // for now just toggle display style or use a class)
      navLinks.style.display = isExpanded ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.backgroundColor = 'var(--color-neutral-white)';
      navLinks.style.padding = 'var(--spacing-4)';
      navLinks.style.boxShadow = 'var(--shadow-md)';
      
      if (headerActions) {
        headerActions.style.display = isExpanded ? 'none' : 'flex';
        headerActions.style.flexDirection = 'column';
        headerActions.style.padding = 'var(--spacing-4)';
        headerActions.style.paddingTop = '0';
        headerActions.style.backgroundColor = 'var(--color-neutral-white)';
      }
    });

    // Reset styles on window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) {
        navLinks.style.display = '';
        navLinks.style.flexDirection = '';
        navLinks.style.position = '';
        navLinks.style.top = '';
        navLinks.style.left = '';
        navLinks.style.width = '';
        navLinks.style.backgroundColor = '';
        navLinks.style.padding = '';
        navLinks.style.boxShadow = '';
        
        if (headerActions) {
          headerActions.style.display = '';
          headerActions.style.flexDirection = '';
          headerActions.style.padding = '';
          headerActions.style.backgroundColor = '';
        }
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      } else if (mobileMenuBtn.getAttribute('aria-expanded') === 'false') {
        navLinks.style.display = '';
        if (headerActions) headerActions.style.display = '';
      }
    });
  }

  // Scroll Animations (Intersection Observer)
  const fadeElements = document.querySelectorAll('.fade-in');
  
  if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Only animate once
        }
      });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver
    fadeElements.forEach(el => el.classList.add('visible'));
  }
});
