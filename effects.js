/* ==========================================================================
   UniPortal — Enhanced Spatial Visual Effects JavaScript
   Features: 3D Spatial Tilt, Dynamic Mouse Specular Lighting, Fluid Particles,
             Smooth Staggered Page Transitions, Animated Number Roll-ups, Ripples
   ========================================================================== */

(function () {
    'use strict';

    // =============================================
    // 1. SPLASH SCREEN WITH SMOOTH DISSOLVE
    // =============================================
    const splash = document.getElementById('splashScreen');
    if (splash) {
        const dismissSplash = () => {
            splash.classList.add('hidden');
            document.body.classList.add('loaded');
        };

        window.addEventListener('load', () => {
            setTimeout(dismissSplash, 1800);
        });

        // Fallback — hide after 3.5s
        setTimeout(dismissSplash, 3500);
    }

    // =============================================
    // 2. INTERACTIVE FLUID PARTICLE ENGINE
    // =============================================
    const canvas = document.getElementById('particlesCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: -1000, y: -1000, radius: 140 };
        let animFrameId;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        document.addEventListener('mousemove', e => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        document.addEventListener('mouseleave', () => {
            mouse.x = -1000;
            mouse.y = -1000;
        });

        class CosmicParticle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2.2 + 0.6;
                this.speedX = (Math.random() - 0.5) * 0.45;
                this.speedY = (Math.random() - 0.5) * 0.45;
                this.opacity = Math.random() * 0.45 + 0.15;
                this.hue = Math.random() > 0.4 ? 199 : 255; // 199 = Electric Cyan (#38bdf8), 255 = Violet (#818cf8)
                this.pulse = Math.random() * Math.PI * 2;
                this.pulseSpeed = Math.random() * 0.02 + 0.008;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.pulse += this.pulseSpeed;

                const currentOpacity = this.opacity + Math.sin(this.pulse) * 0.12;

                // Mouse interaction (Fluid gentle magnetic deflection)
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.x -= dx * force * 0.03;
                    this.y -= dy * force * 0.03;
                }

                // Wrap-around screen bounds
                if (this.x < -15) this.x = canvas.width + 15;
                if (this.x > canvas.width + 15) this.x = -15;
                if (this.y < -15) this.y = canvas.height + 15;
                if (this.y > canvas.height + 15) this.y = -15;

                return Math.max(0.05, Math.min(0.8, currentOpacity));
            }

            draw(alpha) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${this.hue}, 85%, 68%, ${alpha})`;
                ctx.shadowColor = `hsla(${this.hue}, 85%, 68%, 0.4)`;
                ctx.shadowBlur = 6;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 14000), 75);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new CosmicParticle());
        }

        function drawConnections() {
            const maxDist = 135;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDist) {
                        const alpha = (1 - dist / maxDist) * 0.16;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                const alpha = p.update();
                p.draw(alpha);
            });

            drawConnections();
            animFrameId = requestAnimationFrame(animateParticles);
        }

        animateParticles();

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                cancelAnimationFrame(animFrameId);
            } else {
                animateParticles();
            }
        });
    }

    // =========================================================================
    // 3. 3D SPATIAL TILT & DYNAMIC MOUSE LIGHTING ACROSS ALL CARDS
    // =========================================================================
    function applySpatialGlassEffects() {
        const glassElements = document.querySelectorAll(
            '.card, .stat-card, .class-card, .pyq-card, .quiz-card, .subject-bar-item'
        );

        glassElements.forEach(card => {
            if (card.dataset.tiltInitialized) return;
            card.dataset.tiltInitialized = 'true';

            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Update CSS custom property for dynamic specular light
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);

                // 3D Spatial Tilt Physics
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -4.5;
                const rotateY = ((x - centerX) / centerX) * 4.5;

                card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)';
                card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease';
            });

            card.addEventListener('mouseenter', () => {
                card.style.transition = 'transform 0.1s ease-out';
            });
        });
    }

    applySpatialGlassEffects();

    // Re-apply whenever dynamic content renders
    const pageObserver = new MutationObserver(() => {
        applySpatialGlassEffects();
    });
    pageObserver.observe(document.querySelector('.content-area') || document.body, {
        childList: true,
        subtree: true
    });

    // =============================================
    // 4. SMOOTH SCROLL PROGRESS BAR
    // =============================================
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
            scrollProgress.style.width = progress + '%';
        }, { passive: true });
    }

    // =============================================
    // 5. FLUID RIPPLE EFFECT ON BUTTONS & TABS
    // =============================================
    document.addEventListener('click', function (e) {
        const target = e.target.closest('.btn, .nav-link, .quick-link, .day-tab, .sem-tab, .filter-pill');
        if (!target) return;

        const ripple = document.createElement('span');
        const rect = target.getBoundingClientRect();
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
            background: radial-gradient(circle, rgba(56, 189, 248, 0.35) 0%, rgba(129, 140, 248, 0.15) 60%, transparent 80%);
            transform: scale(0);
            animation: spatialRipple 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            pointer-events: none;
            z-index: 10;
        `;

        target.style.position = target.style.position || 'relative';
        target.style.overflow = 'hidden';
        target.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });

    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes spatialRipple {
            to { transform: scale(3.5); opacity: 0; }
        }
    `;
    document.head.appendChild(rippleStyle);

    // =============================================
    // 6. LIVE HEADER CLOCK WITH ACCURATE TICKING
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
