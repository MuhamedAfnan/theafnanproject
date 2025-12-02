// ===== SIMPLIFIED AND WORKING JAVASCRIPT =====
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

function initializePortfolio() {
    initNavigation();
    initThemeToggle();
    initContactForm();
    initSkillAnimations();
    initScrollAnimations();
    initResumeModal();
    initImageModal();
    
    console.log('🎯 Portfolio initialized successfully!');
}

// ===== FIXED NAVIGATION =====
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const progressDots = document.querySelectorAll('.progress-dot');
    const sections = document.querySelectorAll('.section');
    const ctaButtons = document.querySelectorAll('.cta-btn[data-section]');

    // Function to show section
    function showSection(sectionId) {
        // Remove active class from all
        navLinks.forEach(link => link.classList.remove('active'));
        progressDots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current
        const correspondingNavLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
        const correspondingProgressDot = document.querySelector(`.progress-dot[data-section="${sectionId}"]`);
        
        if (correspondingNavLink) correspondingNavLink.classList.add('active');
        if (correspondingProgressDot) correspondingProgressDot.classList.add('active');
        
        // Smooth scroll to section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            showSection(targetSection);
        });
    });

    // Progress dots
    progressDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            showSection(targetSection);
        });
    });

    // CTA buttons
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            showSection(targetSection);
        });
    });

    // Scroll-based section activation
    let isScrolling;
    window.addEventListener('scroll', function() {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(function() {
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    const sectionId = section.id;
                    
                    // Remove active class from all
                    navLinks.forEach(link => link.classList.remove('active'));
                    progressDots.forEach(dot => dot.classList.remove('active'));
                    
                    // Add active class to current
                    const correspondingNavLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
                    const correspondingProgressDot = document.querySelector(`.progress-dot[data-section="${sectionId}"]`);
                    
                    if (correspondingNavLink) correspondingNavLink.classList.add('active');
                    if (correspondingProgressDot) correspondingProgressDot.classList.add('active');
                }
            });
        }, 100);
    });
}

// ===== THEME TOGGLE =====
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        
        if (document.body.classList.contains('light-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
}

// ===== SKILL ANIMATIONS =====
function initSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Animate skill bars when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = `${progress}%`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        bar.style.width = '0%';
        observer.observe(bar);
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    // Check if GSAP is available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate elements on scroll
        gsap.utils.toArray('.highlight-item, .stat-card, .project-card, .timeline-content').forEach(element => {
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            });
        });
    }
}

// ===== RESUME MODAL =====
function initResumeModal() {
    const resumeIcon = document.getElementById('resumeIcon');
    const resumeModal = document.getElementById('resumeModal');
    const resumeModalClose = document.getElementById('resumeModalClose');
    const downloadResume = document.getElementById('downloadResume');
    
    if (resumeIcon && resumeModal) {
        // Open resume modal
        resumeIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            openResumeModal();
        });
        
        // Profile image also opens resume modal
        const profileImage = document.querySelector('.profile-image');
        if (profileImage) {
            profileImage.addEventListener('click', function(e) {
                if (e.target === this || e.target.classList.contains('profile-image')) {
                    openResumeModal();
                }
            });
        }
        
        // Close resume modal
        resumeModalClose.addEventListener('click', function() {
            closeResumeModal();
        });
        
        // Close on overlay click
        resumeModal.addEventListener('click', function(e) {
            if (e.target === resumeModal) {
                closeResumeModal();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
                closeResumeModal();
            }
        });
        
        // Download resume button
        if (downloadResume) {
            downloadResume.addEventListener('click', function() {
                alert('Resume download would start here! In a real implementation, this would download your PDF resume.');
                // You can replace this with actual download logic:
                // window.open('path/to/your/resume.pdf', '_blank');
            });
        }
    }
}

function openResumeModal() {
    const resumeModal = document.getElementById('resumeModal');
    document.body.style.overflow = 'hidden';
    resumeModal.classList.add('active');
    
    // Animate modal content
    if (typeof gsap !== 'undefined') {
        gsap.from('.resume-modal', {
            y: 50,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
    }
}

function closeResumeModal() {
    const resumeModal = document.getElementById('resumeModal');
    resumeModal.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== IMAGE MODAL =====
function initImageModal() {
    const imageModal = document.getElementById('imageModal');
    const modalClose = document.getElementById('modalClose');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Collect all clickable images
    const projectImages = document.querySelectorAll('.project-image, .achievement-image, .profile-image img');
    let currentImageIndex = 0;
    let images = [];
    
    // Prepare images array with src and alt text
    projectImages.forEach((imgContainer, index) => {
        const img = imgContainer.querySelector('img');
        if (img) {
            images.push({
                src: img.src,
                alt: img.alt,
                container: imgContainer
            });
            
            // Add click event to each image
            imgContainer.addEventListener('click', function(e) {
                e.stopPropagation();
                currentImageIndex = index;
                openImageModal(currentImageIndex);
            });
        }
    });
    
    // Open modal with specific image
    function openImageModal(index) {
        if (images[index]) {
            modalImage.src = images[index].src;
            modalCaption.textContent = images[index].alt;
            imageModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Animate modal
            if (typeof gsap !== 'undefined') {
                gsap.from('.modal-content', {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'back.out(1.7)'
                });
            }
        }
    }
    
    // Close modal
    modalClose.addEventListener('click', function() {
        closeImageModal();
    });
    
    // Close on overlay click
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            closeImageModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageModal.classList.contains('active')) {
            closeImageModal();
        }
    });
    
    // Navigation buttons
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateModalImage();
    });
    
    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateModalImage();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (imageModal.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                updateModalImage();
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                updateModalImage();
            }
        }
    });
    
    // Update modal image with transition
    function updateModalImage() {
        if (images[currentImageIndex]) {
            // Fade out current image
            if (typeof gsap !== 'undefined') {
                gsap.to(modalImage, {
                    opacity: 0,
                    duration: 0.2,
                    onComplete: () => {
                        modalImage.src = images[currentImageIndex].src;
                        modalCaption.textContent = images[currentImageIndex].alt;
                        gsap.to(modalImage, {
                            opacity: 1,
                            duration: 0.3
                        });
                    }
                });
            } else {
                modalImage.src = images[currentImageIndex].src;
                modalCaption.textContent = images[currentImageIndex].alt;
            }
        }
    }
    
    function closeImageModal() {
        imageModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Make scrollToSection globally available
window.scrollToSection = function(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
        target.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
};