// Initialize EmailJS
(function() {
    emailjs.init("-1BkWsSJhJW8B_p1H"); // Replace with your EmailJS public key
})();

// Mobile menu toggle
document.getElementById('mobile-menu-btn').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('show');
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.remove('show');
        mobileMenu.classList.add('hidden');
    });
});

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
    submitBtn.disabled = true;
    
    const formData = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Send email using EmailJS
    emailjs.send('service_b99412o', 'template_5bzfvhe', formData)
        .then(function(response) {
            // Success
            showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            document.getElementById('contactForm').reset();
        }, function(error) {
            // Error
            console.log('FAILED...', error);
            showMessage('Oops! Something went wrong. Please try again.', 'error');
        })
        .finally(function() {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
});

// Show form message
function showMessage(text, type) {
    const messageDiv = document.getElementById('form-message');
    const messageText = document.getElementById('message-text');
    
    messageText.textContent = text;
    messageDiv.className = `mt-4 ${type === 'success' ? 'text-green-600' : 'text-red-600'}`;
    messageDiv.classList.remove('hidden');
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        messageDiv.classList.add('hidden');
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 100) {
        navbar.classList.add('bg-white/95', 'shadow-sm');
        navbar.classList.remove('bg-white/50');
    } else {
        navbar.classList.remove('bg-white/95', 'shadow-sm');
        navbar.classList.add('bg-white/50');
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in-up class to initial visible sections
    document.querySelector('#home').classList.add('fade-in-up');
    
    // Set focus styles for better accessibility
    const inputs = document.querySelectorAll('input, textarea, button');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('ring-2', 'ring-blue-500', 'ring-opacity-25');
        });
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('ring-2', 'ring-blue-500', 'ring-opacity-25');
        });
    });

});
