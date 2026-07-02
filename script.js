/*==================== SHOW MENU ====================*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/* Menu Show */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/* Menu Hide */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
    const header = document.getElementById('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 80) {
        document.querySelector('.header').classList.add('scroll-header');
    } else {
        document.querySelector('.header').classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader)

/*==================== TYPING ANIMATION ====================*/
const typingSpan = document.querySelector('.typing-text');
const roles = ["Full-Stack Developer", "Mobile App Developer", "AI/ML Enthusiast", "MCA Student"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typingSpan.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingSpan.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        // Pause at the end of word
        typeSpeed = 1500;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start typing animation once DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
    if (typingSpan) {
        setTimeout(typeEffect, 1000);
    }
});

/*==================== PROJECTS FILTER ====================*/
const filterBtns = document.querySelectorAll('.projects__filter-btn');
const projectCards = document.querySelectorAll('.project__card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Remove active class from other buttons
        filterBtns.forEach(b => b.classList.remove('active-filter'));
        e.target.classList.add('active-filter');

        const filterValue = e.target.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all') {
                card.classList.remove('hide-project');
            } else {
                if (card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hide-project');
                } else {
                    card.classList.add('hide-project');
                }
            }
        });
    });
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 350) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
} else {
    // Default to Dark Theme because it matches the requested rich aesthetics best
    document.body.classList.add(darkTheme)
    themeButton.classList.add(iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*==================== DYNAMIC YEAR ====================*/
const yearSpan = document.getElementById('current-year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

/*==================== CONTACT FORM SUBMISSION ====================*/
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameVal = document.getElementById('form-name').value;
        const emailVal = document.getElementById('form-email').value;
        const messageVal = document.getElementById('form-message').value;

        // Simple client side response feedback
        alert(`Thank you, ${nameVal}! Your message has been sent successfully. I'll get back to you at ${emailVal} as soon as possible.`);

        // Reset form
        contactForm.reset();
    });
}

/*==================== PROJECT DETAILS DATA & MODAL CONTROLLER ====================*/
const projectsData = {
    bactoscan: {
        title: "BactoScan AI – Automated Bacterial Colony Counter",
        subtitle: "Mobile Application & AI",
        image: "assets/image/projects/bactoscan.png",
        overview: "BactoScan AI is an AI-powered mobile application developed to automate bacterial colony detection and counting from Petri dish images. The platform helps microbiology researchers, laboratory technicians, educators, and students perform colony analysis within seconds, significantly reducing manual effort and human counting errors.",
        features: [
            "🧠 AI-Powered Colony Detection: Automatic bacterial colony detection using a custom-trained YOLOv8 model.",
            "✏️ Manual Correction Mode: Add or remove detected colonies manually to improve final accuracy when required.",
            "💾 Detection History: Save previous scans and access historical records anytime.",
            "🔍 Interactive Image Viewer: Zoom and pan support for detailed inspection.",
            "💳 Premium Subscription System: Integrated Razorpay payment gateway with subscription-based scan packages.",
            "📱 Secure User Authentication: Firebase Phone Authentication with OTP verification."
        ],
        contribution: "As the sole developer of BactoScan AI, I was responsible for designing and developing the complete Flutter application, training and integrating the YOLOv8 AI model, building backend services using Django, implementing Firebase Authentication, and deploying the Hugging Face Spaces cloud inference infrastructure.",
        tech: ["Flutter", "Dart", "Django", "Python", "YOLOv8", "PyTorch", "Firebase", "Razorpay"],
        apkLink: "assets/docs/app-arm64-v8a-release.apk",
        githubLink: "https://github.com/sahilpatel80"
    },
    homeservice: {
        title: "Home Service Provider System",
        subtitle: "Full-Stack Web Application",
        image: "assets/image/projects/homeservice.png",
        overview: "Home Service Provider System is a full-stack web application designed to connect customers with verified service professionals through a centralized online platform. The system simplifies the process of finding, booking, managing, and paying for household services like electricians, plumbers, carpenters, and appliance repair.",
        features: [
            "👤 User Management: Account profiles, booking histories, and secure role authorizations.",
            "🛠 Service Provider Management: Worker registration, verification checklists, availability, and earnings dashboards.",
            "📅 Online Service Booking: Search services by category, check rating/availability, and schedule appointments in real-time.",
            "💳 Integrated Digital Wallet: Automatic payment deduction during booking, deposits, refunds, and transaction logs.",
            "📊 Admin Management Panel: Worker approval flows, booking monitors, revenue analytics, and complaint tracking."
        ],
        contribution: "I independently designed and developed the complete system, including the MySQL database schema design, ASP.NET/C# backend business logic, session-based role authorization, wallet system workflows, and admin dashboards.",
        tech: ["ASP.NET", "C#", "MySQL", "Bootstrap", "HTML5", "CSS3", "JavaScript"],
        githubLink: "https://github.com/sahilpatel80"
    },
    iotwaste: {
        title: "IoT Smart Waste Segregation System",
        subtitle: "IoT & Embedded Systems",
        image: "assets/image/projects/iotwaste.png",
        overview: "Smart Dustbin Using IoT is an intelligent waste management system designed to automate the process of waste identification, classification, and segregation. The system uses multiple sensors and motorized mechanisms to sort waste into wet, dry, and metallic categories without requiring human intervention.",
        features: [
            "♻️ Automatic Waste Segregation: Classifies waste into Wet, Dry, and Metallic compartments at the source.",
            "🔍 Multi-Sensor Detection: IR sensor for presence, Proximity sensor for metals, and Raindrop sensor for moisture analysis.",
            "⚙️ Automated Mechanical Sorting: Stepper motor aligns the compartment, and servo motor controls the trapdoor disposal.",
            "☁️ IoT Cloud Monitoring: ESP8266/ESP32 Wi-Fi module sends fill levels, stats, and alerts in real-time to a cloud dashboard.",
            "🚨 Overflow Prevention: Alerts administrators when a compartment approaches its maximum limit."
        ],
        contribution: "I designed the complete system architecture, integrated the hardware sensors and motors with the Arduino Uno microcontroller, wrote the embedded C++ classification algorithms, configured cloud Wi-Fi dashboards, and optimized the routing speeds.",
        tech: ["C++", "Arduino", "ESP8266/ESP32", "Sensors", "MQTT", "WebSockets", "Robotics"],
        githubLink: "https://github.com/sahilpatel80"
    },
    hotel: {
        title: "Hotel Management Application",
        subtitle: "Mobile & API Integration",
        image: "assets/image/projects/hotel.png",
        overview: "Hotel Management App is a cross-platform mobile application developed to simplify hotel room discovery, booking, and reservation management. Through REST API integration and real-time database syncing, users can access updated room details, pricing, and availability.",
        features: [
            "🏨 Hotel & Room Listings: Browse available hotels, dynamic room categories, details, amenities, and image galleries.",
            "📅 Online Room Booking: Real-time room availability checking, instant reservations, and upcoming bookings tracking.",
            "🔍 Advanced Search & Filter: Filter room listings based on availability, categories, and pricing.",
            "🔄 REST API Integration: Secure JSON-based communication between the mobile app and the backend server.",
            "🔐 User Authentication: Secure login/registration, session handling, and user profile management."
        ],
        contribution: "I designed the system architecture, built the cross-platform frontend using Flutter and Dart, developed the PHP backend API services, and designed and optimized the underlying MySQL reservation database.",
        tech: ["Flutter", "Dart", "PHP", "MySQL", "REST API", "JSON"],
        githubLink: "https://github.com/sahilpatel80"
    },
    rimpro: {
        title: "Rimpro India Corporate Web Portal",
        subtitle: "B2B Web Application",
        image: "assets/image/projects/rimpro.png",
        overview: "Rimpro India is a corporate business website developed for a leading manufacturer and exporter of specialty chemicals, surfactants, oilfield chemicals, cosmetic waxes, and demulsifiers. The website showcases their extensive industrial catalog and captures B2B inquiries from global distributors.",
        features: [
            "🏭 Industrial Product Showcase: Detailed catalog categorizing specialty chemicals, surfactants, waxes, and ethoxylates.",
            "🌍 Export-Oriented Platform: Showcases manufacturing capabilities, export portfolios, and global distribution workflows.",
            "📞 Lead Generation System: Integrated technical product query forms and direct sales inquiry routing.",
            "⚡ SEO & Performance: Clean semantic markup, optimized load speeds, and keywords targetting corporate procurement buyers."
        ],
        contribution: "I served as the lead web developer responsible for full-cycle design, responsive HTML/CSS layout execution, product navigation structures, B2B contact form integration, hosting setup, domain configuration, and technical SEO.",
        tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "SEO", "Hosting & Deployment"],
        githubLink: "https://github.com/sahilpatel80"
    },
    rovar: {
        title: "Rovar Cosmetics B2B Manufacturing Web",
        subtitle: "Corporate Web Design",
        image: "assets/image/projects/rovar.png",
        overview: "Rovar Cosmetics is a professional corporate website developed for a leading manufacturer and exporter of luxury hotel amenities. It presents luxury guest toiletries and corporate capabilities to premium hotel chains, resorts, and distributors worldwide.",
        features: [
            "🏨 Luxury Product Showcase: Elegant guest amenity collections, toiletries catalog, and high-quality product galleries.",
            "🌍 Global Supply Presentation: Highlights production standards, laboratory checks, custom formulations, and export pathways.",
            "📞 Lead Capture Frameworks: Seamless corporate business inquiry forms for distributors, purchasing managers, and hoteliers.",
            "🎨 Premium Corporate UI: Luxury-inspired minimal aesthetics matching the brand identity of premium hospitality."
        ],
        contribution: "I designed the responsive user interface and developed the entire website, focusing on elegant CSS layouts, catalog browsing transitions, contact modules, server deployment, and load time performance optimizations.",
        tech: ["HTML5", "CSS3", "JavaScript", "UI/UX Design", "B2B Lead Generation", "Deployment"],
        liveLink: "https://rovarcosmetics.com",
        githubLink: "https://github.com/sahilpatel80"
    }
};

const modal = document.getElementById('project-modal'),
    modalClose = document.getElementById('project-modal-close'),
    openModalBtns = document.querySelectorAll('.open-modal-btn');

const modalTitle = document.getElementById('modal-title'),
    modalSubtitle = document.getElementById('modal-subtitle'),
    modalOverview = document.getElementById('modal-overview'),
    modalFeatures = document.getElementById('modal-features'),
    modalContribution = document.getElementById('modal-contribution'),
    modalTech = document.getElementById('modal-tech'),
    modalImgBox = document.querySelector('.project-modal__img-box'),
    modalLinks = document.getElementById('modal-links');

function openModal(projectId) {
    const project = projectsData[projectId];
    if (!project) return;

    modalTitle.textContent = project.title;
    modalSubtitle.textContent = project.subtitle;
    modalOverview.textContent = project.overview;
    modalContribution.textContent = project.contribution;

    // Tech list
    modalTech.innerHTML = '';
    project.tech.forEach(techName => {
        const pill = document.createElement('span');
        pill.className = 'project-modal__tech-pill';
        pill.textContent = techName;
        modalTech.appendChild(pill);
    });

    // Features list
    modalFeatures.innerHTML = '';
    project.features.forEach(featureText => {
        const li = document.createElement('li');
        li.textContent = featureText;
        modalFeatures.appendChild(li);
    });

    // Dynamic Image Loading / Placeholder Fallback
    if (project.image) {
        modalImgBox.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-modal__img" style="width: 100%; height: 100%; object-fit: cover;" onerror="showModalImgPlaceholder(this, '${project.image}')">
        `;
    } else {
        showModalImgPlaceholder(null, '');
    }

    // Dynamic Links inside Modal
    modalLinks.innerHTML = '';
    if (project.liveLink) {
        const liveBtn = document.createElement('a');
        liveBtn.href = project.liveLink;
        liveBtn.target = '_blank';
        liveBtn.className = 'button';
        liveBtn.style.padding = '0.5rem 1rem';
        liveBtn.style.fontSize = 'var(--small-font-size)';
        liveBtn.style.borderRadius = 'var(--radius-sm)';
        liveBtn.innerHTML = `<i class="ri-external-link-line"></i> Visit Website`;
        modalLinks.appendChild(liveBtn);
    }
    if (project.apkLink) {
        const apkBtn = document.createElement('a');
        apkBtn.href = project.apkLink;
        apkBtn.download = '';
        apkBtn.className = 'button';
        apkBtn.style.padding = '0.5rem 1rem';
        apkBtn.style.fontSize = 'var(--small-font-size)';
        apkBtn.style.borderRadius = 'var(--radius-sm)';
        apkBtn.innerHTML = `<i class="ri-download-line"></i> Download APK`;
        modalLinks.appendChild(apkBtn);
    }
    if (project.githubLink) {
        const githubBtn = document.createElement('a');
        githubBtn.href = project.githubLink;
        githubBtn.target = '_blank';
        githubBtn.className = 'button button--ghost';
        githubBtn.style.padding = '0.5rem 1rem';
        githubBtn.style.fontSize = 'var(--small-font-size)';
        githubBtn.style.borderRadius = 'var(--radius-sm)';
        githubBtn.style.borderWidth = '1px';
        githubBtn.innerHTML = `<i class="ri-github-line"></i> GitHub`;
        modalLinks.appendChild(githubBtn);
    }

    modal.classList.add('active-modal');
    document.body.style.overflow = 'hidden'; // Stop background scrolling
}

function showModalImgPlaceholder(imgElement, imagePath) {
    if (imgElement) {
        imgElement.style.display = 'none';
    }
    modalImgBox.innerHTML = `
        <div class="project-modal__placeholder">
            <i class="ri-image-add-line"></i>
            <p>Replace with Project Screenshot</p>
            <span>Add image at: <strong>${imagePath || 'assets/image/projects/filename.png'}</strong></span>
        </div>
    `;
}

function closeModal() {
    modal.classList.remove('active-modal');
    document.body.style.overflow = ''; // Restore background scrolling
}

// Add event listeners to cards
openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Prevent click if we are clicking a link inside the card overlay (like Github link)
        if (e.target.closest('a')) return;

        const projectId = btn.getAttribute('data-project-id');
        openModal(projectId);
    });
});

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

// Close when clicking outside of content box
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active-modal')) {
            closeModal();
        }
    });
}
