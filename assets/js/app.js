/**
 * ═══════════════════════════════════════════════════════════
 * Horóscopo IA Contigo — App Logic
 * Dynamic greeting, audio player, cookie consent, modal, nav
 * ═══════════════════════════════════════════════════════════
 */

document.addEventListener('DOMContentLoaded', () => {
    // Scroll to top immediately on page load to avoid browser restoring
    // scroll position to a mid-page section (e.g. horoscopo)
    scrollToTop();
    setDynamicGreeting();
    setCurrentYear();
    initAudioPlayer();
    initCookieConsent();
    initModal();
    initMobileNav();
    initLogoLink();
});

// Scroll to very top of page — called both at DOMContentLoaded and at load
// to override the browser's scroll-restoration which fires after the DOM is ready
function scrollToTop() {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}

// Also block any late scroll-restoration fires (e.g. after images load)
window.addEventListener('load', () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
});

// Belt-and-suspenders: block browser's beforeunload scroll save
window.addEventListener('beforeunload', () => {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
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
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeHoroscopeModal();
        });
        closeBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeHoroscopeModal();
        });
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
            showCompatibility();
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

// ── Compatibility Feature ───────────────────────────────────
let compatData = null;

async function showCompatibility() {
    // currentSignId is set by horoscope.js when a modal is opened
    if (typeof currentSignId === 'undefined' || !currentSignId) return;

    // Remove previous compatibility result if any
    const existing = document.getElementById('compat-result');
    if (existing) {
        existing.remove();
        return; // Toggle off
    }

    // Load compatibility data on first use
    if (!compatData) {
        try {
            const res = await fetch('data/compatibility.json');
            if (!res.ok) throw new Error('HTTP ' + res.status);
            compatData = await res.json();
        } catch (err) {
            console.error('Error cargando compatibilidad:', err);
            return;
        }
    }

    const signData = compatData.matrix[currentSignId];
    if (!signData) return;

    // Use same hash function from horoscope.js for determinism
    const todayStr = typeof getTodayStr === 'function' ? getTodayStr() : new Date().toISOString().split('T')[0];
    const seed = todayStr + ':compat:' + currentSignId;
    var h = 0;
    for (var i = 0; i < seed.length; i++) {
        h = ((h << 5) - h + seed.charCodeAt(i)) | 0;
    }
    h = Math.abs(h);

    // Pick from high-compatibility signs
    const compatibleSignId = signData.alta[h % signData.alta.length];
    const compatibleName = compatData.signNames[compatibleSignId] || compatibleSignId;
    const compatibleIcon = compatData.signIcons[compatibleSignId] || '';
    const consejo = compatData.consejos[h % compatData.consejos.length];

    // Determine compatibility level label
    const levelSeed = todayStr + ':level:' + currentSignId;
    var lh = 0;
    for (var j = 0; j < levelSeed.length; j++) {
        lh = ((lh << 5) - lh + levelSeed.charCodeAt(j)) | 0;
    }
    const levels = ['Alta', 'Muy Alta', 'Excelente'];
    const level = levels[Math.abs(lh) % levels.length];

    // Create result element
    const resultDiv = document.createElement('div');
    resultDiv.id = 'compat-result';
    resultDiv.className = 'compat-result';
    resultDiv.innerHTML =
        '<div class="reading-block">' +
        '<h4>💫 Compatibilidad del Día</h4>' +
        '<p>Tu signo más compatible hoy es <strong>' + compatibleIcon + ' ' + compatibleName + '</strong> — Afinidad: <em>' + level + '</em></p>' +
        '</div>' +
        '<div class="quote-block">' +
        consejo +
        '</div>';

    // Insert before the footer actions in the modal
    const modalBody = document.getElementById('modal-body');
    if (modalBody) {
        modalBody.appendChild(resultDiv);
        // Smooth scroll to result
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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

// ── Logo Link — always scroll to top ────────────────────────
function initLogoLink() {
    const logoLink = document.getElementById('logo-link');
    if (!logoLink) return;

    logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        // Smooth scroll to the very top / hero
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        // Update URL hash cleanly
        if (history.pushState) {
            history.pushState(null, null, '#hero');
        }
    });
}
