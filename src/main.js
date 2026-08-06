/* ==========================================================================
   DR. RAFAEL GIORGETO - INTERACTIVE JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* 1. NAVBAR SCROLL & MOBILE TOGGLE */
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* SCROLLSPY (Destaque automático da seção visível no menu) */
    const sections = document.querySelectorAll('section[id]');
    
    function activateScrollSpy() {
        const scrollPosition = window.scrollY + 130; // Compensação de offset da navbar fixa

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const targetNavLink = document.querySelector(`.nav-list a[href="#${sectionId}"]`);

            if (targetNavLink) {
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    targetNavLink.classList.add('active');
                }
            }
        });
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });
    }

    /* LENIS ULTRA SMOOTH SCROLL INITIALIZATION */
    let lenis = null;
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }

    window.addEventListener('scroll', activateScrollSpy);
    activateScrollSpy(); // Chamada inicial ao carregar a página

    /* Clique suave universal em todos os links da página */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetHref = anchor.getAttribute('href');
            if (targetHref && targetHref.length > 1 && targetHref.startsWith('#')) {
                const targetSection = document.querySelector(targetHref);
                if (targetSection) {
                    e.preventDefault();
                    const navbarHeight = 75;

                    if (lenis) {
                        lenis.scrollTo(targetSection, { offset: -navbarHeight, duration: 1.2 });
                    } else {
                        const targetPosition = targetSection.offsetTop - navbarHeight;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }

                    // Se for um link da navbar, atualiza a classe ativa
                    if (anchor.classList.contains('nav-link')) {
                        navLinks.forEach(l => l.classList.remove('active'));
                        anchor.classList.add('active');
                    }

                    // Fecha o menu mobile se aberto
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        if (mobileToggle) mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
                    }
                }
            }
        });
    });

    /* 2. ENHANCED FILTERABLE SPECIALTIES TABS */
    const filterBtns = document.querySelectorAll('.tab-btn');
    const specCards = document.querySelectorAll('.spec-card');
    let isFiltering = false;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (isFiltering || btn.classList.contains('active')) return;
            isFiltering = true;

            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            // Phase 1: Animate all current cards out (fade & scale down)
            specCards.forEach(card => {
                card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.94) translateY(12px)';
            });

            // Phase 2: After fade out, filter display and stagger animate matching cards in
            setTimeout(() => {
                let visibleIndex = 0;

                specCards.forEach(card => {
                    const matches = (filterValue === 'all' || card.getAttribute('data-category') === filterValue);

                    if (matches) {
                        card.style.display = 'flex';
                        const delay = visibleIndex * 70; // 70ms stagger effect per card
                        visibleIndex++;

                        setTimeout(() => {
                            card.style.transition = 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1) translateY(0)';
                        }, delay + 30);
                    } else {
                        card.style.display = 'none';
                    }
                });

                // Reset lock after total stagger animation duration
                const totalAnimationDuration = (visibleIndex * 70) + 400;
                setTimeout(() => {
                    isFiltering = false;
                }, totalAnimationDuration);

            }, 260);
        });
    });

    /* 3. INTERACTIVE BOOKING WIDGET FORM */
    const bookingForm = document.getElementById('bookingForm');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const consultType = document.getElementById('consultType').value;
            const patientName = document.getElementById('patientName').value;
            const patientPhone = document.getElementById('patientPhone').value;
            const preferredTime = document.getElementById('preferredTime').value;
            const patientNotes = document.getElementById('patientNotes').value;

            let message = `*SOLICITAÇÃO DE AGENDAMENTO - SITE OFICIAL*\n\n`;
            message += `👤 *Nome:* ${patientName}\n`;
            message += `📞 *WhatsApp:* ${patientPhone}\n`;
            message += `🏥 *Tipo de Atendimento:* ${consultType}\n`;
            message += `⏰ *Preferência de Horário:* ${preferredTime}\n`;
            
            if (patientNotes.trim()) {
                message += `📝 *Observação/Sintomas:* ${patientNotes}\n`;
            }

            message += `\n_Aguardando confirmação de horários disponíveis!_`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappNumber = "5511940653734";
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

            window.open(whatsappUrl, '_blank');
        });
    }

    /* 4. GALLERY LIGHTBOX MODAL */
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.getAttribute('data-src') || item.querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightboxModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });
    }

    function closeLightbox() {
        if (lightboxModal) {
            lightboxModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('active')) {
            closeLightbox();
        }
    });

    /* 5. FAQ ACCORDION */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));

            // Toggle clicked item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

});
