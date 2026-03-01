/**
 * ═══════════════════════════════════════════════════════════
 * Horóscopo IA Contigo — App Logic
 * Dynamic greeting, audio player, cookie consent, modal, nav
 * ═══════════════════════════════════════════════════════════
 */

document.addEventListener('DOMContentLoaded', () => {
    setDynamicGreeting();
    setCurrentYear();
    initAudioPlayer();
    initCookieConsent();
    initModal();
    initMobileNav();
});

// ── Dynamic Greeting ────────────────────────────────────────
function setDynamicGreeting() {
    const el = document.getElementById('dynamic-greeting');
    if (!el) return;
    const h = new Date().getHours();
    if (h >= 6 && h < 13) {
        el.textContent = 'Buenos días. Que los astros iluminen tu jornada.';
    } else if (h >= 13 && h < 20) {
        el.textContent = 'Buenas tardes. Encuentra tu equilibrio astral.';
    } else {
        el.textContent = 'Buenas noches. Descubre lo que el universo prepara.';
    }
}

// ── Current Year ────────────────────────────────────────────
function setCurrentYear() {
    const el = document.getElementById('current-year');
    if (el) el.textContent = new Date().getFullYear();
}

// ── Audio Player (Expanded Panel) ───────────────────────────
function initAudioPlayer() {
    const panel = document.getElementById('music-panel');
    const panelToggle = document.getElementById('music-panel-toggle');
    const playBtn = document.getElementById('music-toggle');
    const audio = document.getElementById('ambient-audio');
    const iconPlay = document.getElementById('music-icon-play');
    const iconPause = document.getElementById('music-icon-pause');
    const volumeSlider = document.getElementById('volume-slider');

    if (!playBtn || !audio) return;

    audio.volume = 0.35;

    // Panel toggle (open/close)
    if (panelToggle && panel) {
        panelToggle.addEventListener('click', () => {
            panel.classList.toggle('open');
        });
    }

    // Play / Pause
    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().then(() => {
                playBtn.classList.add('playing');
                if (panel) panel.classList.add('active');
                if (iconPlay) iconPlay.style.display = 'none';
                if (iconPause) iconPause.style.display = 'block';
            }).catch(err => {
                console.warn('Audio play blocked:', err);
            });
        } else {
            audio.pause();
            playBtn.classList.remove('playing');
            if (panel) panel.classList.remove('active');
            if (iconPlay) iconPlay.style.display = 'block';
            if (iconPause) iconPause.style.display = 'none';
        }
    });

    // Volume slider
    if (volumeSlider) {
        updateVolumeTrack(volumeSlider);
        volumeSlider.addEventListener('input', () => {
            audio.volume = volumeSlider.value / 100;
            updateVolumeTrack(volumeSlider);
        });
    }
}

function updateVolumeTrack(slider) {
    const pct = slider.value + '%';
    slider.style.setProperty('--volume-pct', pct);
}

// ── Cookie Consent ──────────────────────────────────────────
function initCookieConsent() {
    const banner = document.getElementById('cookie-banner');
    const btnAccept = document.getElementById('accept-cookies');
    const btnReject = document.getElementById('reject-cookies');

    if (!banner) return;

    const consent = localStorage.getItem('horoscope_cookie_consent');
    if (!consent) {
        setTimeout(() => banner.classList.remove('hidden'), 800);
    }

    if (btnAccept) {
        btnAccept.addEventListener('click', () => {
            localStorage.setItem('horoscope_cookie_consent', 'all');
            banner.style.transition = 'opacity 0.4s';
            banner.style.opacity = '0';
            setTimeout(() => banner.classList.add('hidden'), 400);
        });
    }

    if (btnReject) {
        btnReject.addEventListener('click', () => {
            localStorage.setItem('horoscope_cookie_consent', 'technical');
            banner.style.transition = 'opacity 0.4s';
            banner.style.opacity = '0';
            setTimeout(() => banner.classList.add('hidden'), 400);
        });
    }
}

// ── Modal Logic ─────────────────────────────────────────────
function initModal() {
    const modal = document.getElementById('horoscope-modal');
    const closeBtn = document.getElementById('close-modal');
    const compatBtn = document.getElementById('check-compatibility');

    if (!modal) return;

    if (closeBtn) {
        closeBtn.addEventListener('click', () => closeHoroscopeModal());
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeHoroscopeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeHoroscopeModal();
        }
    });

    if (compatBtn) {
        compatBtn.addEventListener('click', () => {
            alert('La función de compatibilidad astral estará disponible próximamente. ¡Vuelve pronto!');
        });
    }
}

function closeHoroscopeModal() {
    const modal = document.getElementById('horoscope-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

// ── Mobile Nav Toggle ───────────────────────────────────────
function initMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');

    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        const isOpen = links.classList.toggle('active');
        toggle.setAttribute('aria-expanded', isOpen);
        toggle.textContent = isOpen ? '✕' : '☰';
    });

    // Close nav when a link is clicked
    links.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            links.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.textContent = '☰';
        });
    });
}
