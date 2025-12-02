document.addEventListener('DOMContentLoaded', () => {

    // Intersection Observer for fade-in animations
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

    const animatedElements = document.querySelectorAll('.listing-card');
    animatedElements.forEach(el => observer.observe(el));

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Custom Validation Messages (Force English)
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('invalid', function () {
            if (input.validity.valueMissing) {
                input.setCustomValidity('Please fill out this field.');
            } else if (input.validity.typeMismatch && input.type === 'email') {
                input.setCustomValidity('Please enter a valid email address.');
            }
        });

        input.addEventListener('input', function () {
            input.setCustomValidity('');
        });
    });

    // Simple form submission handler (prevent default for demo)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'Message Sent!';
            btn.style.backgroundColor = '#28a745';
            btn.style.borderColor = '#28a745';

            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = '';
                btn.style.borderColor = '';
                form.reset();
            }, 3000);
        });
    });
});
