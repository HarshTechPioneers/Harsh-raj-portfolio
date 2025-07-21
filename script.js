// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        this.init();
    }

    init() {
        this.applyTheme();
        this.setupToggle();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            icon.className = this.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    toggle() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }

    setupToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggle());
        }
    }
}

// Loading Manager
class LoadingManager {
    constructor() {
        this.loadingSpinner = document.getElementById('loading-spinner');
        this.init();
    }

    init() {
        // Simulate loading time
        setTimeout(() => {
            this.hideLoading();
        }, 2500);
    }

    hideLoading() {
        if (this.loadingSpinner) {
            this.loadingSpinner.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }
}

// Navigation Manager
class NavigationManager {
    constructor() {
        this.header = document.getElementById('header');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.mobileToggle = document.getElementById('mobile-menu-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.init();
    }

    init() {
        this.setupScrollEffect();
        this.setupActiveLinks();
        this.setupMobileMenu();
        this.setupSmoothScroll();
    }

    setupScrollEffect() {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Add scrolled class
            if (currentScrollY > 50) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
        });
    }

    setupActiveLinks() {
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    this.navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }

    setupMobileMenu() {
        if (this.mobileToggle && this.navMenu) {
            this.mobileToggle.addEventListener('click', () => {
                this.mobileToggle.classList.toggle('active');
                this.navMenu.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            this.navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.mobileToggle.classList.remove('active');
                    this.navMenu.classList.remove('active');
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.header.contains(e.target)) {
                    this.mobileToggle.classList.remove('active');
                    this.navMenu.classList.remove('active');
                }
            });
        }
    }

    setupSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const headerHeight = this.header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Scroll Progress
class ScrollProgress {
    constructor() {
        this.progressBar = document.getElementById('scroll-progress');
        this.init();
    }

    init() {
        if (this.progressBar) {
            window.addEventListener('scroll', () => {
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = (scrollTop / docHeight) * 100;
                this.progressBar.style.width = `${scrollPercent}%`;
            });
        }
    }
}

// Cursor Follower
class CursorFollower {
    constructor() {
        this.cursor = document.getElementById('cursor-follower');
        this.init();
    }

    init() {
        if (this.cursor && window.matchMedia('(hover: hover)').matches) {
            document.addEventListener('mousemove', (e) => {
                this.cursor.style.left = `${e.clientX - 10}px`;
                this.cursor.style.top = `${e.clientY - 10}px`;
            });

            document.addEventListener('mouseenter', () => {
                this.cursor.style.opacity = '0.6';
            });

            document.addEventListener('mouseleave', () => {
                this.cursor.style.opacity = '0';
            });
        }
    }
}

// Typewriter Effect
class TypewriterEffect {
    constructor() {
        this.element = document.getElementById('typewriter');
        this.texts = [
            'Full Stack Developer',
            'Python Enthusiast', 
            'JavaScript Developer',
            'DevOps Learner',
            'AI/ML Explorer'
        ];
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.typeSpeed = 150;
        this.deleteSpeed = 50;
        this.pauseTime = 1000;
        this.init();
    }

    init() {
        if (this.element) {
            this.type();
        }
    }

    type() {
        const currentText = this.texts[this.currentTextIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }

        let typeSpeed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

        if (!this.isDeleting && this.currentCharIndex === currentText.length) {
            typeSpeed = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Skills Animation
class SkillsAnimation {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkill(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.skillBars.forEach(bar => observer.observe(bar));
    }

    animateSkill(skillBar) {
        const width = skillBar.getAttribute('data-width');
        skillBar.style.width = `${width}%`;
    }
}

// Counter Animation
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number[data-count]');
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    }
}

// Project Filter
class ProjectFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        this.init();
    }

    init() {
        this.setupFilterButtons();
    }

    setupFilterButtons() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                this.filterProjects(filter);
                this.updateActiveButton(button);
            });
        });
    }

    filterProjects(filter) {
        this.projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.classList.add('hidden');
            }
        });
    }

    updateActiveButton(activeButton) {
        this.filterButtons.forEach(button => button.classList.remove('active'));
        activeButton.classList.add('active');
    }
}

// Certification Filter
class CertificationFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.cert-filter-btn');
        this.certCards = document.querySelectorAll('.cert-card');
        this.init();
    }

    init() {
        this.setupFilterButtons();
    }

    setupFilterButtons() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                this.filterCertifications(filter);
                this.updateActiveButton(button);
            });
        });
    }

    filterCertifications(filter) {
        this.certCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.classList.add('hidden');
            }
        });
    }

    updateActiveButton(activeButton) {
        this.filterButtons.forEach(button => button.classList.remove('active'));
        activeButton.classList.add('active');
    }
}

// Internship Tabs
class InternshipTabs {
    constructor() {
        this.tabButtons = document.querySelectorAll('.company-tab');
        this.tabContents = document.querySelectorAll('.internship-content');
        this.init();
    }

    init() {
        this.setupTabs();
    }

    setupTabs() {
        this.tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const company = button.getAttribute('data-company');
                this.showTab(company);
                this.updateActiveTab(button);
            });
        });
    }

    showTab(company) {
        this.tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === company) {
                content.classList.add('active');
            }
        });
    }

    updateActiveTab(activeButton) {
        this.tabButtons.forEach(button => button.classList.remove('active'));
        activeButton.classList.add('active');
    }
}

// Contact Form
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.status = document.getElementById('form-status');
        this.init();
    }

    init() {
        if (this.form) {
            this.setupForm();
        }
    }

    setupForm() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    async handleSubmit() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = this.form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            // Simulate form submission (replace with actual implementation)
            await this.simulateSubmission(data);
            this.showStatus('success', 'Message sent successfully! I\'ll get back to you soon.');
            this.form.reset();
        } catch (error) {
            this.showStatus('error', 'Failed to send message. Please try again.');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    simulateSubmission(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success (90% chance)
                if (Math.random() > 0.1) {
                    resolve(data);
                } else {
                    reject(new Error('Submission failed'));
                }
            }, 2000);
        });
    }

    showStatus(type, message) {
        this.status.className = `form-status ${type}`;
        this.status.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            ${message}
        `;
        this.status.style.display = 'flex';

        setTimeout(() => {
            this.status.style.display = 'none';
        }, 5000);
    }
}

// Back to Top
class BackToTop {
    constructor() {
        this.button = document.getElementById('back-to-top');
        this.init();
    }

    init() {
        if (this.button) {
            this.setupButton();
        }
    }

    setupButton() {
        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                this.button.style.opacity = '1';
                this.button.style.visibility = 'visible';
            } else {
                this.button.style.opacity = '0';
                this.button.style.visibility = 'hidden';
            }
        });
    }
}

// Resume Download
class ResumeDownload {
    constructor() {
        this.button = document.getElementById('resume-btn');
        this.init();
    }

    init() {
        if (this.button) {
            this.setupButton();
        }
    }

    setupButton() {
        this.button.addEventListener('click', () => {
            // In a real application, this would download the actual resume
            this.downloadResume();
        });
    }

    downloadResume() {
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = '#'; // Replace with actual resume URL
        link.download = 'Harsh_Raj_Resume.pdf';
        link.click();
        
        // Show notification
        this.showNotification('Resume download started!');
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-download"></i>
            ${message}
        `;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--primary-600);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 8px;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Scroll Indicator
class ScrollIndicator {
    constructor() {
        this.indicator = document.querySelector('.scroll-indicator');
        this.init();
    }

    init() {
        if (this.indicator) {
            this.setupIndicator();
        }
    }

    setupIndicator() {
        this.indicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Parallax Effect
class ParallaxEffect {
    constructor() {
        this.elements = document.querySelectorAll('.floating-shapes .shape');
        this.init();
    }

    init() {
        if (this.elements.length > 0) {
            this.setupParallax();
        }
    }

    setupParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const rate = scrolled * -0.5;

            this.elements.forEach((element, index) => {
                const speed = (index + 1) * 0.1;
                element.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
            });
        });
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        this.monitorPageLoad();
        this.monitorScrollPerformance();
    }

    monitorPageLoad() {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
            
            // Log performance metrics
            if ('getEntriesByType' in performance) {
                const navigation = performance.getEntriesByType('navigation')[0];
                console.log('Performance metrics:', {
                    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                    loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
                    totalTime: navigation.loadEventEnd - navigation.fetchStart
                });
            }
        });
    }

    monitorScrollPerformance() {
        let ticking = false;

        const updateScrollElements = () => {
            // Batch DOM updates for better performance
            requestAnimationFrame(() => {
                ticking = false;
            });
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollElements);
                ticking = true;
            }
        });
    }
}

// Accessibility Manager
class AccessibilityManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupAriaLabels();
    }

    setupKeyboardNavigation() {
        // Handle escape key for modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const modal = document.querySelector('.modal.active');
                if (modal) {
                    modal.classList.remove('active');
                }
            }
        });

        // Handle tab navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    setupFocusManagement() {
        // Ensure focus is visible for keyboard users
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                if (document.body.classList.contains('keyboard-navigation')) {
                    element.style.outline = '2px solid var(--primary-500)';
                    element.style.outlineOffset = '2px';
                }
            });

            element.addEventListener('blur', () => {
                element.style.outline = '';
                element.style.outlineOffset = '';
            });
        });
    }

    setupAriaLabels() {
        // Add aria-labels to elements that need them
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            const icon = link.querySelector('i');
            if (icon && !link.getAttribute('aria-label')) {
                const platform = this.getPlatformFromIcon(icon.className);
                link.setAttribute('aria-label', `Visit my ${platform} profile`);
            }
        });
    }

    getPlatformFromIcon(className) {
        if (className.includes('github')) return 'GitHub';
        if (className.includes('linkedin')) return 'LinkedIn';
        if (className.includes('twitter')) return 'Twitter';
        if (className.includes('envelope')) return 'Email';
        if (className.includes('instagram')) return 'Instagram';
        return 'Social Media';
    }
}

// Error Handler
class ErrorHandler {
    constructor() {
        this.init();
    }

    init() {
        this.setupGlobalErrorHandling();
        this.setupImageErrorHandling();
    }

    setupGlobalErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Global error:', e.error);
            this.logError(e.error);
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            this.logError(e.reason);
        });
    }

    setupImageErrorHandling() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('error', () => {
                img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
                img.alt = 'Image not available';
            });
        });
    }

    logError(error) {
        // In a real application, you would send this to your error tracking service
        const errorData = {
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        console.log('Error logged:', errorData);
    }
}

// Initialize Application
class App {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        try {
            // Core functionality
            new ThemeManager();
            new LoadingManager();
            new NavigationManager();
            new ScrollProgress();
            new CursorFollower();
            
            // Content animations
            new TypewriterEffect();
            new SkillsAnimation();
            new CounterAnimation();
            
            // Interactive components
            new ProjectFilter();
            new CertificationFilter();
            new InternshipTabs();
            new ContactForm();
            
            // Utility components
            new BackToTop();
            new ResumeDownload();
            new ScrollIndicator();
            new ParallaxEffect();
            
            // System components
            new PerformanceMonitor();
            new AccessibilityManager();
            new ErrorHandler();
            
            // Initialize AOS (Animate On Scroll)
            if (typeof AOS !== 'undefined') {
                AOS.init({
                    duration: 800,
                    easing: 'ease-in-out',
                    once: true,
                    offset: 100
                });
            }
            
            console.log('Portfolio application initialized successfully');
            
        } catch (error) {
            console.error('Error initializing application:', error);
        }
    }
}

// Start the application
new App();

// Add some CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-500) !important;
        outline-offset: 2px !important;
    }
    
    .notification {
        animation: slideInRight 0.3s ease;
    }
`;
document.head.appendChild(style);

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Add meta tag for mobile optimization
const viewport = document.querySelector('meta[name="viewport"]');
if (!viewport) {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0';
    document.head.appendChild(meta);
}