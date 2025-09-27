// Language Toggle Functionality
let currentLanguage = 'en';

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
    updateLanguage();
    updateDirection();
    saveLanguagePreference();
}

function updateLanguage() {
    // Update all elements with data-en and data-ar attributes
    document.querySelectorAll('[data-en]').forEach(element => {
        const englishText = element.getAttribute('data-en');
        const arabicText = element.getAttribute('data-ar');
        
        if (currentLanguage === 'ar') {
            element.textContent = arabicText || englishText;
        } else {
            element.textContent = englishText;
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-placeholder-en]').forEach(element => {
        const englishPlaceholder = element.getAttribute('data-placeholder-en');
        const arabicPlaceholder = element.getAttribute('data-placeholder-ar');
        
        if (currentLanguage === 'ar') {
            element.placeholder = arabicPlaceholder || englishPlaceholder;
        } else {
            element.placeholder = englishPlaceholder;
        }
    });

    // Update select options
    document.querySelectorAll('select option[data-en]').forEach(option => {
        const englishText = option.getAttribute('data-en');
        const arabicText = option.getAttribute('data-ar');
        
        if (currentLanguage === 'ar') {
            option.textContent = arabicText || englishText;
        } else {
            option.textContent = englishText;
        }
    });

    // Update language toggle button
    const langToggle = document.querySelector('.lang-toggle .lang-text');
    if (langToggle) {
        langToggle.textContent = currentLanguage === 'en' ? 'AR' : 'EN';
    }

    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;
}

function updateDirection() {
    if (currentLanguage === 'ar') {
        document.body.classList.add('rtl');
        document.documentElement.dir = 'rtl';
    } else {
        document.body.classList.remove('rtl');
        document.documentElement.dir = 'ltr';
    }
}

function saveLanguagePreference() {
    localStorage.setItem('preferredLanguage', currentLanguage);
}

function loadLanguagePreference() {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && savedLanguage !== currentLanguage) {
        currentLanguage = savedLanguage;
        updateLanguage();
        updateDirection();
    }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    // Load language preference
    loadLanguagePreference();

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // Active Navigation Link Highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightActiveSection() {
        const scrollY = window.pageYOffset;
        const navHeight = document.querySelector('.navbar').offsetHeight;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection();

    // Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    
    function updateNavbarOnScroll() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 1)';
            navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }
    }

    window.addEventListener('scroll', updateNavbarOnScroll);

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };

            // Validate form
            if (!validateForm(formData)) {
                return;
            }

            // Show success message (in production, this would send to a server)
            showSuccessMessage();
            
            // Reset form
            contactForm.reset();
        });
    }

    // Form Validation
    function validateForm(data) {
        let isValid = true;
        const errors = [];

        // Name validation
        if (!data.name || data.name.length < 2) {
            errors.push(currentLanguage === 'en' ? 'Please enter a valid name' : 'يرجى إدخال اسم صالح');
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            errors.push(currentLanguage === 'en' ? 'Please enter a valid email' : 'يرجى إدخال بريد إلكتروني صالح');
            isValid = false;
        }

        // Phone validation
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/;
        if (!phoneRegex.test(data.phone.replace(/\s/g, ''))) {
            errors.push(currentLanguage === 'en' ? 'Please enter a valid phone number' : 'يرجى إدخال رقم هاتف صالح');
            isValid = false;
        }

        // Service validation
        if (!data.service || data.service === '') {
            errors.push(currentLanguage === 'en' ? 'Please select a service' : 'يرجى اختيار خدمة');
            isValid = false;
        }

        // Message validation
        if (!data.message || data.message.length < 10) {
            errors.push(currentLanguage === 'en' ? 'Message must be at least 10 characters' : 'يجب أن تكون الرسالة 10 أحرف على الأقل');
            isValid = false;
        }

        if (!isValid) {
            showErrors(errors);
        }

        return isValid;
    }

    // Show Success Message
    function showSuccessMessage() {
        const successMessage = currentLanguage === 'en' 
            ? 'Thank you for your message! We will contact you soon.' 
            : 'شكرا لرسالتك! سنتصل بك قريبا.';
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'success-message';
        messageDiv.textContent = successMessage;
        messageDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #28A745;
            color: white;
            padding: 1rem 2rem;
            border-radius: 4px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;

        if (currentLanguage === 'ar') {
            messageDiv.style.right = 'auto';
            messageDiv.style.left = '20px';
        }

        document.body.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(messageDiv);
            }, 300);
        }, 5000);
    }

    // Show Error Messages
    function showErrors(errors) {
        const errorContainer = document.createElement('div');
        errorContainer.className = 'error-messages';
        errorContainer.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #DC3545;
            color: white;
            padding: 1rem 2rem;
            border-radius: 4px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 9999;
            max-width: 300px;
            animation: slideIn 0.3s ease;
        `;

        if (currentLanguage === 'ar') {
            errorContainer.style.right = 'auto';
            errorContainer.style.left = '20px';
        }

        const errorList = document.createElement('ul');
        errorList.style.cssText = 'margin: 0; padding-left: 20px;';
        
        errors.forEach(error => {
            const errorItem = document.createElement('li');
            errorItem.textContent = error;
            errorList.appendChild(errorItem);
        });

        errorContainer.appendChild(errorList);
        document.body.appendChild(errorContainer);

        setTimeout(() => {
            errorContainer.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(errorContainer)) {
                    document.body.removeChild(errorContainer);
                }
            }, 300);
        }, 5000);
    }

    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }

        .nav-link.active {
            background: var(--light-gray);
            color: var(--accent-color);
        }

        .rtl @keyframes slideIn {
            from {
                transform: translateX(-100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        .rtl @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(-100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Lazy Loading for Images (placeholder for future implementation)
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
        });
    }

    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .stat');
    
    if ('IntersectionObserver' in window) {
        const elementObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.5s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                    
                    elementObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(element => {
            elementObserver.observe(element);
        });
    }

    // Form field animations
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const navMenu = document.querySelector('.nav-menu');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        }
    });

    // Detect user's preferred language from browser
    if (!localStorage.getItem('preferredLanguage')) {
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('ar')) {
            currentLanguage = 'ar';
            updateLanguage();
            updateDirection();
        }
    }

    // Performance monitoring (basic implementation)
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
            
            // Send to analytics in production
            if (loadTime > 3000) {
                console.warn('Page load time exceeds 3 seconds');
            }
        });
    }
});

// Service Worker Registration (for PWA support)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // In production, you would register a service worker here
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll event handlers
const debouncedScroll = debounce(() => {
    // Scroll-related functions
}, 10);

window.addEventListener('scroll', debouncedScroll, { passive: true });