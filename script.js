// Smooth scroll for anchor links
document.querySelectorAll(‘a[href^=”#”]’).forEach(anchor => {
anchor.addEventListener(‘click’, function (e) {
e.preventDefault();
const target = document.querySelector(this.getAttribute(‘href’));
if (target) {
target.scrollIntoView({
behavior: ‘smooth’,
block: ‘start’
});
}
});
});
// Form submission handling
const contactForm = document.getElementById(‘contactForm’);
if (contactForm) {
contactForm.addEventListener(‘submit’, function(e) {
e.preventDefault();
```
   // Get form data
   const formData = new FormData(contactForm);
   const data = Object.fromEntries(formData);
   // In a real implementation, you would send this to your backend
   // For now, we'll just show a success message
   // Create success message
   const successMessage = document.createElement('div');
   successMessage.style.cssText = `
       background: linear-gradient(135deg, #4a7c2a, #2d5016);
       color: white;
       padding: 24px 32px;
       border-radius: 12px;
       text-align: center;
       margin-top: 24px;
       animation: slideIn 0.5s ease-out;
   `;
   successMessage.innerHTML = `
<h3 style="margin: 0 0 8px 0; font-size: 22px;">Thanks for reaching out!</h3>
<p style="margin: 0; font-size: 16px; opacity: 0.95;">I'll get back to you within 24 hours, usually much sooner. Check your phone for a call or text from (123) 456-7890.</p>
   `;
   // Replace form with success message
   contactForm.parentElement.insertBefore(successMessage, contactForm);
   contactForm.style.display = 'none';
   // Log form data (in production, send to backend)
   console.log('Form submitted:', data);
   // In production, you would do something like:
   /*
   fetch('/api/contact', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
       },
       body: JSON.stringify(data)
   })
   .then(response => response.json())
   .then(data => {
       // Show success message
   })
   .catch(error => {
       // Show error message
       console.error('Error:', error);
   });
   */
});
```
}
// Add animation for elements on scroll
const observerOptions = {
threshold: 0.1,
rootMargin: ‘0px 0px -50px 0px’
};
const observer = new IntersectionObserver(function(entries) {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.style.opacity = ‘1’;
entry.target.style.transform = ‘translateY(0)’;
}
});
}, observerOptions);
// Observe elements that should animate in
document.addEventListener(‘DOMContentLoaded’, function() {
const animateElements = document.querySelectorAll(’.service-card, .reason-card, .timeline-item, .faq-item’);
```
animateElements.forEach(el => {
   el.style.opacity = '0';
   el.style.transform = 'translateY(20px)';
   el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
   observer.observe(el);
});
```
});
// Phone number formatting
const phoneInput = document.getElementById(‘phone’);
if (phoneInput) {
phoneInput.addEventListener(‘input’, function(e) {
let value = e.target.value.replace(/\D/g, ‘’);
if (value.length > 0) {
if (value.length <= 3) {
value = `(${value}`;
} else if (value.length <= 6) {
value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
} else {
value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
}
}
e.target.value = value;
});
}
// Add active state to navigation based on current page
const currentPage = window.location.pathname.split(’/’).pop() || ‘index.html’;
document.querySelectorAll(’.nav-link’).forEach(link => {
if (link.getAttribute(‘href’) === currentPage) {
link.classList.add(‘active’);
}
});
// Mobile menu toggle (basic implementation)
const createMobileMenu = () => {
const nav = document.querySelector(’.nav-container’);
const navLinks = document.querySelector(’.nav-links’);
```
// Only create mobile menu on smaller screens
if (window.innerWidth <= 768) {
   const menuButton = document.createElement('button');
   menuButton.className = 'mobile-menu-toggle';
   menuButton.innerHTML = '☰';
   menuButton.style.cssText = `
       display: block;
       background: none;
       border: none;
       font-size: 24px;
       color: var(--color-primary);
       cursor: pointer;
       padding: 8px;
   `;
   menuButton.addEventListener('click', () => {
       navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
       navLinks.style.flexDirection = 'column';
       navLinks.style.position = 'absolute';
       navLinks.style.top = '72px';
       navLinks.style.left = '0';
       navLinks.style.right = '0';
       navLinks.style.background = 'white';
       navLinks.style.padding = '20px';
       navLinks.style.boxShadow = '0 4px 16px rgba(45, 80, 22, 0.12)';
   });
   const existingButton = nav.querySelector('.mobile-menu-toggle');
   if (!existingButton) {
       nav.insertBefore(menuButton, navLinks);
   }
}
```
};
// Initialize mobile menu on load and resize
window.addEventListener(‘load’, createMobileMenu);
window.addEventListener(‘resize’, createMobileMenu);
