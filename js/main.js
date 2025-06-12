document.addEventListener('DOMContentLoaded', () => {
    // Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                navLinks.classList.remove('active');
            }
        });
    });

    // Schedule tabs
    const scheduleData = {
        1: [
            { time: '9:00 AM', title: 'Opening Keynote: The Future of Technology', speaker: 'Sarah Johnson' },
            { time: '10:30 AM', title: 'AI and Machine Learning Revolution', speaker: 'Dr. Michael Chen' },
            { time: '1:00 PM', title: 'Blockchain Technology in 2025', speaker: 'Alex Rivera' },
            { time: '3:00 PM', title: 'Panel: Ethics in AI', speaker: 'Multiple Speakers' },
            { time: '4:30 PM', title: 'Networking Session', speaker: '' }
        ],
        2: [
            { time: '9:00 AM', title: 'Quantum Computing Breakthroughs', speaker: 'Dr. Emily Watson' },
            { time: '10:30 AM', title: 'Future of Cloud Computing', speaker: 'James Wilson' },
            { time: '1:00 PM', title: 'Cybersecurity in the Digital Age', speaker: 'Maria Garcia' },
            { time: '3:00 PM', title: 'Workshop: Building AI Models', speaker: 'David Kim' },
            { time: '4:30 PM', title: 'Innovation Showcase', speaker: 'Various Presenters' }
        ],
        3: [
            { time: '9:00 AM', title: 'IoT and Smart Cities', speaker: 'Robert Taylor' },
            { time: '10:30 AM', title: '5G and Beyond', speaker: 'Lisa Anderson' },
            { time: '1:00 PM', title: 'Future of Work', speaker: 'Tom Bradley' },
            { time: '3:00 PM', title: 'Closing Panel: Tech Predictions', speaker: 'Industry Leaders' },
            { time: '4:30 PM', title: 'Closing Remarks', speaker: 'Conference Chair' }
        ]
    };

    function updateSchedule(day) {
        const scheduleContent = document.querySelector('.schedule-content');
        const schedule = scheduleData[day];
        
        let html = '<div class="schedule-grid">';
        schedule.forEach(item => {
            html += `
                <div class="schedule-item">
                    <div class="schedule-time">${item.time}</div>
                    <div class="schedule-details">
                        <h3>${item.title}</h3>
                        ${item.speaker ? `<p class="speaker">${item.speaker}</p>` : ''}
                    </div>
                </div>
            `;
        });
        html += '</div>';
        
        scheduleContent.innerHTML = html;
    }

    // Initialize schedule
    updateSchedule(1);

    // Schedule tab buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            updateSchedule(parseInt(button.dataset.day));
        });
    });

    // Enhanced Form Validation
    const contactForm = document.querySelector('.contact-form');
    const formInputs = contactForm.querySelectorAll('input, textarea');

    formInputs.forEach(input => {
        // Add validation styling
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.classList.add('invalid');
                input.classList.remove('valid');
            } else {
                input.classList.add('valid');
                input.classList.remove('invalid');
            }
        });

        // Remove validation styling on focus
        input.addEventListener('focus', () => {
            input.classList.remove('invalid');
        });
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        formInputs.forEach(input => {
            if (input.value.trim() === '') {
                input.classList.add('invalid');
                isValid = false;
            }
        });

        if (isValid) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            
            contactForm.insertBefore(successMessage, contactForm.firstChild);
            contactForm.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        }
    });

    // Add scroll animation for elements
    function reveal() {
        const reveals = document.querySelectorAll('.highlight-item, .speaker-card, .pricing-card');
        
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    window.addEventListener('scroll', reveal);
    reveal(); // Initial check

    // Add speakers dynamically
    const speakers = [
        {
            name: 'Sarah Johnson',
            role: 'AI Research Director, TechCorp',
            talk: 'Keynote: The Future of AI in 2025 and Beyond',
            image: 'images/speaker1.jpg'
        },
        {
            name: 'Dr. Michael Chen',
            role: 'Chief Innovation Officer, Future Labs',
            talk: 'AI and Machine Learning Revolution',
            image: 'images/speaker2.jpg'
        },
        {
            name: 'Dr. Emily Watson',
            role: 'Quantum Computing Researcher',
            talk: 'Quantum Computing Breakthroughs',
            image: 'images/speaker3.jpg'
        },
        {
            name: 'Alex Rivera',
            role: 'Blockchain Strategist',
            talk: 'Blockchain Technology in 2025',
            image: 'images/speaker4.jpg'
        }
    ];

    const speakerGrid = document.querySelector('.speaker-grid');
    speakers.forEach(speaker => {
        const speakerCard = document.createElement('div');
        speakerCard.className = 'speaker-card';
        speakerCard.innerHTML = `
            <div class="speaker-image">
                <img src="${speaker.image}" alt="${speaker.name}">
            </div>
            <div class="speaker-info">
                <h3>${speaker.name}</h3>
                <p class="speaker-role">${speaker.role}</p>
                <p class="speaker-talk">${speaker.talk}</p>
            </div>
        `;
        speakerGrid.appendChild(speakerCard);
    });
});
