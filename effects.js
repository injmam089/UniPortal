/* ============================================
   UniPortal — Enhanced Visual Effects JavaScript
   Particles, splash screen, scroll progress,
   typing effect, tooltips, micro-interactions
   ============================================ */

(function () {
    'use strict';

    // =============================================
    // SPLASH SCREEN
    // =============================================

    const splash = document.getElementById('splashScreen');
    if (splash) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                splash.classList.add('hidden');
                // Trigger entrance animations after splash
                document.body.classList.add('loaded');
            }, 2200);
        });

        // Fallback — hide after 4s no matter what
        setTimeout(() => {
            splash.classList.add('hidden');
            document.body.classList.add('loaded');
        }, 4000);
    }

    // =============================================
    // PARTICLE SYSTEM
    // =============================================

    const canvas = document.getElementById('particlesCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: -1000, y: -1000 };
        let animFrameId;

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        // Track mouse for interaction
        document.addEventListener('mousemove', e => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random() * 0.4 + 0.1;
                this.hue = Math.random() > 0.5 ? 230 : 270; // blue or purple
                this.pulse = Math.random() * Math.PI * 2;
                this.pulseSpeed = Math.random() * 0.02 + 0.005;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.pulse += this.pulseSpeed;

                // Subtle pulse opacity
                const pulseOpacity = this.opacity + Math.sin(this.pulse) * 0.1;

                // Mouse repulsion
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    const force = (120 - dist) / 120;
                    this.x -= dx * force * 0.02;
                    this.y -= dy * force * 0.02;
                }

                // Wrap around edges
                if (this.x < -10) this.x = canvas.width + 10;
                if (this.x > canvas.width + 10) this.x = -10;
                if (this.y < -10) this.y = canvas.height + 10;
                if (this.y > canvas.height + 10) this.y = -10;

                return pulseOpacity;
            }

            draw(opacity) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${this.hue}, 70%, 70%, ${Math.max(0, opacity)})`;
                ctx.fill();
            }
        }

        // Create particles — fewer for performance
        const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 80);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 130) {
                        const opacity = (1 - dist / 130) * 0.12;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(102, 126, 234, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                const opacity = p.update();
                p.draw(opacity);
            });

            drawConnections();

            animFrameId = requestAnimationFrame(animate);
        }

        animate();

        // Pause when tab not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                cancelAnimationFrame(animFrameId);
            } else {
                animate();
            }
        });
    }

    // =============================================
    // SCROLL PROGRESS BAR
    // =============================================

    const scrollProgress = document.getElementById('scrollProgress');
    const contentArea = document.querySelector('.content-area');

    if (scrollProgress && contentArea) {
        contentArea.addEventListener('scroll', () => {
            const scrollTop = contentArea.scrollTop;
            const scrollHeight = contentArea.scrollHeight - contentArea.clientHeight;
            const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
            scrollProgress.style.width = progress + '%';
        });

        // Also check window scroll (for non-nested layouts)
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
            scrollProgress.style.width = progress + '%';
        });
    }

    // =============================================
    // TYPING EFFECT FOR WELCOME MESSAGE
    // =============================================

    function typeText(element, text, speed = 40) {
        if (!element) return;
        element.textContent = '';
        let i = 0;
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        element.parentNode.appendChild(cursor);

        function type() {
            if (i < text.length) {
                element.textContent += text[i];
                i++;
                setTimeout(type, speed);
            } else {
                // Remove cursor after a moment
                setTimeout(() => cursor.remove(), 2000);
            }
        }

        // Start after splash
        setTimeout(type, 2500);
    }

    const welcomeP = document.querySelector('#page-dashboard .page-title p');
    if (welcomeP) {
        const originalText = welcomeP.textContent;
        typeText(welcomeP, originalText, 35);
    }

    // =============================================
    // TILT EFFECT ON STAT CARDS
    // =============================================

    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -5;
            const rotateY = (x - centerX) / centerX * 5;

            card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateY(0)';
            card.style.transition = 'transform 0.4s ease';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease';
        });
    });

    // =============================================
    // RIPPLE EFFECT ON BUTTONS
    // =============================================

    document.querySelectorAll('.btn, .nav-link, .quick-link').forEach(el => {
        el.addEventListener('click', function (e) {
            // Create ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.15);
                transform: scale(0);
                animation: rippleEffect 0.6s ease forwards;
                pointer-events: none;
                z-index: 10;
            `;

            this.style.position = this.style.position || 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple keyframe dynamically
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes rippleEffect {
            to { transform: scale(4); opacity: 0; }
        }
    `;
    document.head.appendChild(rippleStyle);

    // =============================================
    // COUNTER RE-ANIMATION ON SCROLL VISIBILITY
    // =============================================

    const observerOptions = { threshold: 0.3 };
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stat-card, .class-card, .card').forEach(el => {
        animationObserver.observe(el);
    });

    // =============================================
    // ENHANCED NOTIFICATION BELL — BADGE BOUNCE
    // =============================================

    const notifCount = document.getElementById('notificationCount');
    if (notifCount && notifCount.textContent !== '0') {
        setInterval(() => {
            notifCount.style.animation = 'none';
            notifCount.offsetHeight; // reflow
            notifCount.style.animation = 'badgeBounce 0.5s ease';
        }, 8000);
    }

    const bounceStyle = document.createElement('style');
    bounceStyle.textContent = `
        @keyframes badgeBounce {
            0%, 100% { transform: scale(1); }
            30% { transform: scale(1.3); }
            60% { transform: scale(0.9); }
        }
    `;
    document.head.appendChild(bounceStyle);

    // =============================================
    // SMOOTH NUMBER HOVER ON STAT CARDS
    // =============================================

    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.stat-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(-5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.stat-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
    });

    // =============================================
    // KEYBOARD SHORTCUTS
    // =============================================

    document.addEventListener('keydown', e => {
        // Ctrl+K or / to focus search
        if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && document.activeElement.tagName !== 'INPUT')) {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) searchInput.focus();
        }

        // Escape to close dropdowns/modals
        if (e.key === 'Escape') {
            document.getElementById('notificationsDropdown')?.classList.remove('show');
            document.getElementById('searchSuggestions')?.classList.remove('show');
            document.getElementById('paymentModal')?.classList.remove('show');
        }

        // Number keys 1-7 to navigate pages
        if (!e.ctrlKey && !e.altKey && document.activeElement.tagName !== 'INPUT') {
            const pages = ['dashboard', 'attendance', 'schedule', 'classes', 'fees', 'results', 'profile'];
            const num = parseInt(e.key);
            if (num >= 1 && num <= 7) {
                const navLink = document.querySelector(`.nav-link[data-page="${pages[num - 1]}"]`);
                if (navLink) navLink.click();
            }
        }
    });

    // =============================================
    // THEME-AWARE TIME GREETING
    // =============================================

    function getGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 17) return 'Good afternoon';
        return 'Good evening';
    }

    const welcomeTitle = document.querySelector('#page-dashboard .page-title p');
    if (welcomeTitle) {
        const greeting = getGreeting();
        // Will be typed by the typing effect above
        welcomeTitle.dataset.text = `${greeting}, Injmam ! Here's your overview.`;
    }

    // =============================================
    // LIVE CLOCK IN HEADER
    // =============================================

    function updateLiveClock() {
        const dateEl = document.getElementById('headerDate');
        if (dateEl) {
            const now = new Date();
            const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
            dateEl.textContent = `${dateStr} • ${timeStr}`;
        }
    }

    updateLiveClock();
    setInterval(updateLiveClock, 10000);

})();
