/**
 * ═══════════════════════════════════════════════════════════
 * Horóscopo IA Contigo — Horoscope Data & Rendering
 * Fetches horoscope.json, renders zodiac cards, opens modal
 * ═══════════════════════════════════════════════════════════
 */

const ZODIAC_SIGNS = [
    { id: 'aries', name: 'Aries', icon: '♈', dates: '21 Mar – 19 Abr' },
    { id: 'tauro', name: 'Tauro', icon: '♉', dates: '20 Abr – 20 May' },
    { id: 'geminis', name: 'Géminis', icon: '♊', dates: '21 May – 20 Jun' },
    { id: 'cancer', name: 'Cáncer', icon: '♋', dates: '21 Jun – 22 Jul' },
    { id: 'leo', name: 'Leo', icon: '♌', dates: '23 Jul – 22 Ago' },
    { id: 'virgo', name: 'Virgo', icon: '♍', dates: '23 Ago – 22 Sep' },
    { id: 'libra', name: 'Libra', icon: '♎', dates: '23 Sep – 22 Oct' },
    { id: 'escorpio', name: 'Escorpio', icon: '♏', dates: '23 Oct – 21 Nov' },
    { id: 'sagitario', name: 'Sagitario', icon: '♐', dates: '22 Nov – 21 Dic' },
    { id: 'capricornio', name: 'Capricornio', icon: '♑', dates: '22 Dic – 19 Ene' },
    { id: 'acuario', name: 'Acuario', icon: '♒', dates: '20 Ene – 18 Feb' },
    { id: 'piscis', name: 'Piscis', icon: '♓', dates: '19 Feb – 20 Mar' }
];

let dailyData = null;

document.addEventListener('DOMContentLoaded', loadHoroscope);

async function loadHoroscope() {
    const grid = document.getElementById('zodiac-grid');
    if (!grid) return;

    try {
        const cacheBust = new Date().toISOString().split('T')[0];
        const res = await fetch('data/horoscope.json?v=' + cacheBust);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        dailyData = await res.json();
        renderGrid(grid);
    } catch (err) {
        console.error('Error cargando horóscopo:', err);
        grid.innerHTML = '<div class="loading-text">No se pudo conectar con los astros. Comprueba que <code>data/horoscope.json</code> existe.</div>';
    }
}

function renderGrid(container) {
    container.innerHTML = '';

    ZODIAC_SIGNS.forEach(sign => {
        const card = document.createElement('article');
        card.className = 'zodiac-card';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', 'Ver horóscopo de ' + sign.name);

        card.innerHTML =
            '<span class="card-icon">' + sign.icon + '</span>' +
            '<h3 class="card-name">' + sign.name + '</h3>' +
            '<p class="card-dates">' + sign.dates + '</p>' +
            '<span class="card-cta">Descubrir predicción ✦</span>';

        card.addEventListener('click', function () { openModal(sign); });
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(sign); }
        });

        container.appendChild(card);
    });
}

function openModal(sign) {
    var data = dailyData ? dailyData[sign.id] : null;
    if (!data) {
        alert('Los astros aún no han revelado la información para ' + sign.name + '.');
        return;
    }

    var modal = document.getElementById('horoscope-modal');
    var iconEl = document.getElementById('modal-icon');
    var nameEl = document.getElementById('modal-sign-name');
    var dateEl = document.getElementById('modal-date');
    var bodyEl = document.getElementById('modal-body');

    if (!modal || !bodyEl) return;

    // Header
    if (iconEl) iconEl.textContent = sign.icon;
    if (nameEl) nameEl.textContent = sign.name;

    // Date
    if (dateEl && dailyData.date) {
        var opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var ds = new Date(dailyData.date + 'T00:00:00').toLocaleDateString('es-ES', opts);
        dateEl.textContent = ds.charAt(0).toUpperCase() + ds.slice(1);
    }

    // Body content
    bodyEl.innerHTML =
        '<div class="reading-block">' +
        '<h4>✦ Visión General</h4>' +
        '<p>' + data.resumen + '</p>' +
        '</div>' +
        '<div class="reading-block">' +
        '<h4>❤️ Amor</h4>' +
        '<p>' + data.amor + '</p>' +
        '</div>' +
        '<div class="reading-block">' +
        '<h4>💼 Trabajo y Estudios</h4>' +
        '<p>' + data.trabajo + '</p>' +
        '</div>' +
        '<div class="reading-block">' +
        '<h4>⚡ Energía y Salud</h4>' +
        '<p>' + data.energia + '</p>' +
        '</div>' +
        '<div class="reading-block">' +
        '<h4>🌟 Consejo Práctico</h4>' +
        '<p><strong>' + data.consejo + '</strong></p>' +
        '</div>' +
        '<div class="quote-block">' +
        '«' + data.frase + '»' +
        '</div>';

    // Show
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button for a11y
    setTimeout(function () {
        var closeBtn = document.getElementById('close-modal');
        if (closeBtn) closeBtn.focus();
    }, 100);
}
