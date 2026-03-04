/**
 * ═══════════════════════════════════════════════════════════
 * Horóscopo IA Contigo — Interactive Modules
 * 1. Zodiac Personality Test
 * 2. Love Compatibility Calculator
 * 3. Daily Luck Generator
 * ═══════════════════════════════════════════════════════════
 */

document.addEventListener('DOMContentLoaded', () => {
    initZodiacTest();
    initLoveCompat();
    initDailyLuck();
});

/* ══════════════════════════════════════════════════════════════
   UTILITY: Seeded Hash (same as horoscope.js)
   ══════════════════════════════════════════════════════════════ */
function interactiveHash(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) {
        h = ((h << 5) - h + str.charCodeAt(i)) | 0;
    }
    return Math.abs(h);
}

function todayStr() {
    return new Date().toISOString().split('T')[0];
}

/* ══════════════════════════════════════════════════════════════
   1. ZODIAC PERSONALITY TEST
   ══════════════════════════════════════════════════════════════ */
const QUIZ_QUESTIONS = [
    {
        q: '¿Cómo reaccionas ante un desafío inesperado?',
        opts: [
            { text: 'Lo afronto de inmediato con determinación', elem: 'fuego' },
            { text: 'Analizo la situación con calma antes de actuar', elem: 'tierra' },
            { text: 'Busco consejo y diferentes perspectivas', elem: 'aire' },
            { text: 'Confío en mi intuición para guiarme', elem: 'agua' }
        ]
    },
    {
        q: '¿Qué valoras más en una relación?',
        opts: [
            { text: 'La pasión y la aventura compartida', elem: 'fuego' },
            { text: 'La lealtad y la estabilidad a largo plazo', elem: 'tierra' },
            { text: 'La comunicación y la conexión intelectual', elem: 'aire' },
            { text: 'La profundidad emocional y la empatía', elem: 'agua' }
        ]
    },
    {
        q: '¿Cuál es tu ambiente ideal para relajarte?',
        opts: [
            { text: 'Una hoguera bajo las estrellas', elem: 'fuego' },
            { text: 'Un jardín tranquilo y ordenado', elem: 'tierra' },
            { text: 'Una terraza con vistas y buena conversación', elem: 'aire' },
            { text: 'La orilla del mar al atardecer', elem: 'agua' }
        ]
    },
    {
        q: '¿Cómo tomas decisiones importantes?',
        opts: [
            { text: 'Siguiendo mi impulso y energía del momento', elem: 'fuego' },
            { text: 'Evaluando pros y contras con método', elem: 'tierra' },
            { text: 'Consultando información y opiniones diversas', elem: 'aire' },
            { text: 'Dejando que mi corazón me guíe', elem: 'agua' }
        ]
    },
    {
        q: '¿Qué te motiva a levantarte cada mañana?',
        opts: [
            { text: 'Conquistar nuevos retos y metas', elem: 'fuego' },
            { text: 'Construir algo sólido y duradero', elem: 'tierra' },
            { text: 'Aprender algo nuevo y conectar con otros', elem: 'aire' },
            { text: 'Cuidar de las personas que quiero', elem: 'agua' }
        ]
    },
    {
        q: '¿Cómo manejas un conflicto con alguien cercano?',
        opts: [
            { text: 'Lo enfrento directamente, sin rodeos', elem: 'fuego' },
            { text: 'Busco una solución práctica y justa', elem: 'tierra' },
            { text: 'Dialogo y busco un punto medio racional', elem: 'aire' },
            { text: 'Intento comprender sus sentimientos primero', elem: 'agua' }
        ]
    },
    {
        q: '¿Qué tipo de viaje te atrae más?',
        opts: [
            { text: 'Aventura extrema y deportes de riesgo', elem: 'fuego' },
            { text: 'Turismo rural y gastronomía local', elem: 'tierra' },
            { text: 'Ciudades cosmopolitas y culturales', elem: 'aire' },
            { text: 'Retiro espiritual junto al agua', elem: 'agua' }
        ]
    },
    {
        q: '¿Cuál es tu mayor fortaleza personal?',
        opts: [
            { text: 'Mi valentía y capacidad de liderar', elem: 'fuego' },
            { text: 'Mi constancia y sentido de la responsabilidad', elem: 'tierra' },
            { text: 'Mi adaptabilidad y mente abierta', elem: 'aire' },
            { text: 'Mi sensibilidad y conexión emocional', elem: 'agua' }
        ]
    }
];

const ELEMENT_SIGNS = {
    fuego: [
        { id: 'aries', name: 'Aries', icon: '♈' },
        { id: 'leo', name: 'Leo', icon: '♌' },
        { id: 'sagitario', name: 'Sagitario', icon: '♐' }
    ],
    tierra: [
        { id: 'tauro', name: 'Tauro', icon: '♉' },
        { id: 'virgo', name: 'Virgo', icon: '♍' },
        { id: 'capricornio', name: 'Capricornio', icon: '♑' }
    ],
    aire: [
        { id: 'geminis', name: 'Géminis', icon: '♊' },
        { id: 'libra', name: 'Libra', icon: '♎' },
        { id: 'acuario', name: 'Acuario', icon: '♒' }
    ],
    agua: [
        { id: 'cancer', name: 'Cáncer', icon: '♋' },
        { id: 'escorpio', name: 'Escorpio', icon: '♏' },
        { id: 'piscis', name: 'Piscis', icon: '♓' }
    ]
};

const SIGN_PROFILES = {
    aries: { desc: 'Eres una persona audaz, llena de iniciativa y con un espíritu competitivo natural. Tu energía arrolladora inspira a quienes te rodean y tu valentía te impulsa a ser pionero en todo lo que emprendes.', msg: 'Tu determinación moverá montañas. Confía en esa llama interior que te hace único.' },
    tauro: { desc: 'Posees una naturaleza perseverante y leal. Valoras la estabilidad, el confort y las relaciones duraderas. Tu sentido práctico y tu paciencia te convierten en un pilar de confianza para los demás.', msg: 'Tu constancia es tu mayor tesoro. Lo que construyes con paciencia perdura para siempre.' },
    geminis: { desc: 'Tu mente es tu superpoder: ágil, curiosa y siempre en movimiento. La comunicación fluye en ti de forma natural y tu versatilidad te permite adaptarte a cualquier entorno con facilidad.', msg: 'Tu capacidad de adaptación es infinita. Cada conversación es una puerta a un nuevo mundo.' },
    cancer: { desc: 'Profundamente empático y protector, tu mundo gira alrededor de los vínculos emocionales. Tu intuición es extraordinaria y tu capacidad de cuidar a los demás te convierte en un refugio para quienes te quieren.', msg: 'Tu sensibilidad es tu fortaleza más hermosa. El amor que das siempre regresa multiplicado.' },
    leo: { desc: 'Irradias carisma, creatividad y una generosidad desbordante. Tu presencia natural de líder y tu capacidad para brillar con luz propia hacen que atraigas admiración y respeto allá donde vas.', msg: 'Tu luz interior es inextinguible. El mundo necesita tu creatividad y tu generosidad.' },
    virgo: { desc: 'Metódico, analítico y con un sentido del detalle excepcional. Tu eficiencia y tu deseo de mejorar constantemente te convierten en alguien imprescindible para cualquier equipo o proyecto.', msg: 'Tu capacidad de perfeccionar el mundo es un regalo. Recuerda también celebrar lo que ya has logrado.' },
    libra: { desc: 'Buscas la armonía en todo lo que haces. Tu diplomacia, tu sentido estético y tu capacidad de ver todos los ángulos de una situación te hacen un mediador nato y un alma extraordinariamente equilibrada.', msg: 'Tu búsqueda de equilibrio embellece todo lo que tocas. La paz que irradias transforma tu entorno.' },
    escorpio: { desc: 'Intenso, apasionado y profundamente transformador. Tu determinación es inigualable y tu capacidad de reinventarte después de las adversidades te convierte en un símbolo de resiliencia y poder interior.', msg: 'Tu profundidad emocional es tu mayor poder. De cada transformación renaces más fuerte y sabio.' },
    sagitario: { desc: 'Optimista, aventurero y con una sed insaciable de conocimiento. Tu espíritu libre y tu filosófica visión del mundo te impulsan a explorar nuevos horizontes con una sonrisa contagiosa.', msg: 'Tu optimismo ilumina los caminos más oscuros. Nunca dejes de explorar y soñar en grande.' },
    capricornio: { desc: 'Disciplinado, ambicioso y con una ética de trabajo admirable. Tu perseverancia y tu visión a largo plazo te llevan a alcanzar cimas que otros consideran imposibles, siempre con integridad y esfuerzo.', msg: 'Tu disciplina escala montañas. Cada paso firme te acerca más a la cumbre que mereces.' },
    acuario: { desc: 'Original, visionario y con un compromiso genuino con la innovación. Tu mente independiente y tu espíritu humanitario te impulsan a crear un mundo mejor con ideas que están adelantadas a su tiempo.', msg: 'Tu originalidad es un faro para el futuro. Las ideas que hoy parecen utopías mañana serán realidad.' },
    piscis: { desc: 'Profundamente intuitivo, compasivo y con una conexión especial con el mundo emocional y espiritual. Tu imaginación sin límites y tu empatía natural te convierten en un artista del alma.', msg: 'Tu compasión sana al mundo. La belleza que percibes en todo es un don extraordinario.' }
};

let quizStep = 0;
let quizScores = { fuego: 0, tierra: 0, aire: 0, agua: 0 };

function initZodiacTest() {
    const container = document.getElementById('quiz-container');
    if (!container) return;
    renderQuizQuestion(container);
}

function renderQuizQuestion(container) {
    if (quizStep >= QUIZ_QUESTIONS.length) {
        showQuizResult(container);
        return;
    }
    const q = QUIZ_QUESTIONS[quizStep];
    const progress = Math.round(((quizStep) / QUIZ_QUESTIONS.length) * 100);

    let html = '<div class="quiz-progress"><div class="quiz-progress-bar" style="width:' + progress + '%"></div></div>';
    html += '<div class="quiz-counter">Pregunta ' + (quizStep + 1) + ' de ' + QUIZ_QUESTIONS.length + '</div>';
    html += '<h3 class="quiz-question">' + q.q + '</h3>';
    html += '<div class="quiz-options">';
    q.opts.forEach(function (opt, i) {
        html += '<button class="quiz-option" data-elem="' + opt.elem + '" data-idx="' + i + '">' + opt.text + '</button>';
    });
    html += '</div>';

    container.innerHTML = html;

    container.querySelectorAll('.quiz-option').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var elem = this.getAttribute('data-elem');
            quizScores[elem]++;
            quizStep++;
            // Brief delay for visual feedback
            this.classList.add('selected');
            setTimeout(function () { renderQuizQuestion(container); }, 300);
        });
    });
}

function showQuizResult(container) {
    // Find dominant element
    var maxElem = 'fuego';
    var maxScore = 0;
    for (var elem in quizScores) {
        if (quizScores[elem] > maxScore) {
            maxScore = quizScores[elem];
            maxElem = elem;
        }
    }

    // Pick sign within element deterministically
    var signs = ELEMENT_SIGNS[maxElem];
    var total = quizScores.fuego + quizScores.tierra + quizScores.aire + quizScores.agua;
    var signIdx = total % signs.length;
    var sign = signs[signIdx];
    var profile = SIGN_PROFILES[sign.id];

    var elemNames = { fuego: '🔥 Fuego', tierra: '🌍 Tierra', aire: '💨 Aire', agua: '🌊 Agua' };

    var html =
        '<div class="quiz-result">' +
        '<div class="quiz-result-icon">' + sign.icon + '</div>' +
        '<h3 class="gold-text quiz-result-sign">' + sign.name + '</h3>' +
        '<div class="quiz-result-element">Elemento dominante: ' + elemNames[maxElem] + '</div>' +
        '<div class="quiz-result-desc">' + profile.desc + '</div>' +
        '<div class="quote-block">«' + profile.msg + '»</div>' +
        '<button class="btn btn-ghost quiz-restart" id="quiz-restart">✦ Repetir test</button>' +
        '</div>';

    container.innerHTML = html;

    document.getElementById('quiz-restart').addEventListener('click', function () {
        quizStep = 0;
        quizScores = { fuego: 0, tierra: 0, aire: 0, agua: 0 };
        renderQuizQuestion(container);
    });
}

/* ══════════════════════════════════════════════════════════════
   2. LOVE COMPATIBILITY CALCULATOR
   ══════════════════════════════════════════════════════════════ */
const ALL_SIGNS = [
    { id: 'aries', name: 'Aries', icon: '♈' },
    { id: 'tauro', name: 'Tauro', icon: '♉' },
    { id: 'geminis', name: 'Géminis', icon: '♊' },
    { id: 'cancer', name: 'Cáncer', icon: '♋' },
    { id: 'leo', name: 'Leo', icon: '♌' },
    { id: 'virgo', name: 'Virgo', icon: '♍' },
    { id: 'libra', name: 'Libra', icon: '♎' },
    { id: 'escorpio', name: 'Escorpio', icon: '♏' },
    { id: 'sagitario', name: 'Sagitario', icon: '♐' },
    { id: 'capricornio', name: 'Capricornio', icon: '♑' },
    { id: 'acuario', name: 'Acuario', icon: '♒' },
    { id: 'piscis', name: 'Piscis', icon: '♓' }
];

const LOVE_NARRATIVES = {
    alta: [
        'Vuestra conexión es especialmente intensa y armónica. Los astros señalan una afinidad natural que favorece tanto la pasión como la comprensión mutua. Juntos podéis construir una relación profunda y duradera.',
        'La energía entre estos dos signos fluye con naturalidad. Existe una complementariedad instintiva que fortalece el vínculo emocional y crea un espacio de crecimiento compartido.',
        'Los tránsitos planetarios favorecen esta unión de forma notable. Compartís valores fundamentales y vuestra comunicación emocional es fluida, lo que genera un lazo sólido y enriquecedor.'
    ],
    media: [
        'Vuestra combinación tiene un potencial interesante que requiere dedicación consciente. Las diferencias entre ambos signos pueden ser un motor de crecimiento si se gestionan con empatía y diálogo.',
        'Esta conexión ofrece un equilibrio entre desafío y complementariedad. Con comunicación abierta y paciencia, podéis transformar las diferencias en fortaleza para la relación.',
        'Los astros sugieren que esta relación necesita trabajo conjunto para florecer, pero las recompensas pueden ser muy gratificantes. La clave está en respetar el espacio y los tiempos del otro.'
    ],
    baja: [
        'Esta combinación presenta desafíos significativos que invitan a la reflexión. Las diferencias fundamentales entre ambos signos pueden generar fricciones, pero la voluntad mutua de comprender al otro puede transformar los obstáculos en lecciones valiosas.',
        'Los astros señalan un camino que requerirá esfuerzo y adaptación. Sin embargo, las relaciones que superan estos retos suelen desarrollar una fortaleza extraordinaria.',
        'Las energías de estos dos signos no siempre se alinean fácilmente, pero eso no significa que no puedan funcionar. El secreto está en la paciencia, el respeto y la voluntad genuina de crecer juntos.'
    ]
};

const LOVE_ADVICE = {
    alta: [
        'Cultivad esa conexión natural con momentos de calidad compartidos.',
        'No deis por sentada la armonía; seguid sorprendiéndoos mutuamente.',
        'Vuestra afinidad es un regalo; nutridla con comunicación y agradecimiento.'
    ],
    media: [
        'La paciencia y el diálogo honesto serán vuestras mejores herramientas.',
        'Celebrad las diferencias; en ellas reside vuestro potencial de crecimiento.',
        'Buscad actividades compartidas que refuercen vuestro vínculo emocional.'
    ],
    baja: [
        'Escucha activa y empatía: los pilares para superar las diferencias.',
        'No intentéis cambiar al otro; la aceptación genuina es más poderosa.',
        'Estableced espacios de comunicación seguros donde ambos os sintáis valorados.'
    ]
};

let loveCompatData = null;

function initLoveCompat() {
    const btn = document.getElementById('love-compat-btn');
    if (!btn) return;

    btn.addEventListener('click', async function () {
        const s1 = document.getElementById('love-sign-1');
        const s2 = document.getElementById('love-sign-2');
        if (!s1 || !s2) return;

        const sign1 = s1.value;
        const sign2 = s2.value;
        if (!sign1 || !sign2) {
            showLoveResult('⚠️ Selecciona ambos signos para ver la compatibilidad.');
            return;
        }

        // Load compatibility data
        if (!loveCompatData) {
            try {
                const res = await fetch('data/compatibility.json');
                loveCompatData = await res.json();
            } catch (e) {
                showLoveResult('No se pudo cargar los datos de compatibilidad.');
                return;
            }
        }

        calcLoveCompat(sign1, sign2);
    });
}

function calcLoveCompat(sign1Id, sign2Id) {
    var matrix = loveCompatData.matrix;
    if (!matrix[sign1Id]) return;

    // Determine level
    var level = 'baja';
    if (matrix[sign1Id].alta.indexOf(sign2Id) !== -1) level = 'alta';
    else if (matrix[sign1Id].media.indexOf(sign2Id) !== -1) level = 'media';

    var stars = level === 'alta' ? 5 : level === 'media' ? 3 : 2;
    var starsHtml = '';
    for (var i = 0; i < 5; i++) {
        starsHtml += i < stars ? '★' : '☆';
    }

    var levelLabels = { alta: 'Alta', media: 'Media', baja: 'En desarrollo' };

    // Pick narrative and advice deterministically
    var seed = sign1Id + ':' + sign2Id + ':love';
    var h = interactiveHash(seed);
    var narrative = LOVE_NARRATIVES[level][h % LOVE_NARRATIVES[level].length];
    var advice = LOVE_ADVICE[level][h % LOVE_ADVICE[level].length];

    var sign1 = ALL_SIGNS.find(function (s) { return s.id === sign1Id; });
    var sign2 = ALL_SIGNS.find(function (s) { return s.id === sign2Id; });

    var html =
        '<div class="love-result-pair">' +
        '<span class="love-sign-display">' + sign1.icon + ' ' + sign1.name + '</span>' +
        '<span class="love-heart">❤️</span>' +
        '<span class="love-sign-display">' + sign2.icon + ' ' + sign2.name + '</span>' +
        '</div>' +
        '<div class="love-stars">' + starsHtml + '</div>' +
        '<div class="love-level">Compatibilidad: <strong>' + levelLabels[level] + '</strong></div>' +
        '<div class="love-gauge"><div class="love-gauge-fill" style="width:' + (stars * 20) + '%"></div></div>' +
        '<p class="love-narrative">' + narrative + '</p>' +
        '<div class="quote-block">«' + advice + '»</div>';

    showLoveResult(html);
}

function showLoveResult(html) {
    var el = document.getElementById('love-result');
    if (el) {
        el.innerHTML = html;
        el.style.display = 'block';
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

/* ══════════════════════════════════════════════════════════════
   3. DAILY LUCK GENERATOR — Personalized (userSeed + sign + date)
   ══════════════════════════════════════════════════════════════ */
const LUCK_CATEGORIES = [
    { id: 'general', emoji: '🍀', label: 'Suerte General' },
    { id: 'economica', emoji: '💰', label: 'Suerte Económica' },
    { id: 'amorosa', emoji: '❤️', label: 'Suerte Amorosa' },
    { id: 'energia', emoji: '⚡', label: 'Energía del Día' },
    { id: 'consejo', emoji: '🧠', label: 'Consejo Psicológico' }
];

const LUCK_LEVELS = [
    { level: 1, label: 'Moderada', color: '#8B8B8B' },
    { level: 2, label: 'Favorable', color: '#66bb6a' },
    { level: 3, label: 'Buena', color: '#42a5f5' },
    { level: 4, label: 'Muy Buena', color: '#ab47bc' },
    { level: 5, label: 'Excelente', color: '#c9a84c' }
];

const LUCK_MESSAGES = {
    general: [
        'Las energías del día te acompañan favorablemente. Mantén una actitud abierta y receptiva.',
        'Los astros sugieren un día de transición. Avanza con calma y sin prisas.',
        'Hoy la suerte te sonríe. Aprovecha para dar pasos importantes.',
        'Jornada propicia para sembrar nuevos proyectos. El universo apoya tu iniciativa.',
        'Las circunstancias se alinean a tu favor. Confía en el fluir natural de los acontecimientos.'
    ],
    economica: [
        'Prudencia en gastos innecesarios. Buen momento para planificar tus finanzas.',
        'Las oportunidades económicas están presentes si las sabes identificar.',
        'Día favorable para inversiones moderadas y ahorro consciente.',
        'Los astros favorecen una jornada estable económicamente. Evita riesgos innecesarios.',
        'Una sorpresa económica positiva podría llegar cuando menos lo esperes.'
    ],
    amorosa: [
        'El amor requiere tu atención hoy. Un gesto sincero fortalecerá tus vínculos.',
        'La comunicación emocional fluye con naturalidad. Exprésate sin reservas.',
        'Día especialmente positivo para las conexiones sentimentales profundas.',
        'Si buscas amor, mantén el corazón abierto. Las señales están ahí.',
        'La armonía afectiva te envuelve. Dedica tiempo de calidad a quien amas.'
    ],
    energia: [
        'Tu nivel de vitalidad es estable. Mantén hábitos saludables para potenciarlo.',
        'Energía en ascenso. Ideal para actividad física y proyectos que requieran esfuerzo.',
        'Hoy tu fuerza interior está en su punto álgido. Canalízala productivamente.',
        'Equilibra actividad y descanso. Tu cuerpo necesita ambos para rendir al máximo.',
        'La energía cósmica refuerza tu bienestar. Un buen día para cuidar cuerpo y mente.'
    ],
    consejo: [
        'Practica la gratitud al despertar. Reconocer lo bueno atrae más abundancia a tu vida.',
        'Hoy es un día ideal para soltar lo que ya no te sirve. Libérate de cargas innecesarias.',
        'Escucha activamente a quienes te rodean. La sabiduría a veces llega de fuentes inesperadas.',
        'Dedica unos minutos a la introspección. La respuesta que buscas ya está dentro de ti.',
        'No temas al cambio. Cada transformación es una oportunidad de crecimiento personal.'
    ]
};

const LUCK_SIGN_OPTIONS = [
    { id: 'aries', name: 'Aries', icon: '♈' },
    { id: 'tauro', name: 'Tauro', icon: '♉' },
    { id: 'geminis', name: 'Géminis', icon: '♊' },
    { id: 'cancer', name: 'Cáncer', icon: '♋' },
    { id: 'leo', name: 'Leo', icon: '♌' },
    { id: 'virgo', name: 'Virgo', icon: '♍' },
    { id: 'libra', name: 'Libra', icon: '♎' },
    { id: 'escorpio', name: 'Escorpio', icon: '♏' },
    { id: 'sagitario', name: 'Sagitario', icon: '♐' },
    { id: 'capricornio', name: 'Capricornio', icon: '♑' },
    { id: 'acuario', name: 'Acuario', icon: '♒' },
    { id: 'piscis', name: 'Piscis', icon: '♓' }
];

/* ── User seed: unique identifier per browser/user ── */
function getUserSeed() {
    var seed = localStorage.getItem('userSeed');
    if (!seed) {
        seed = Math.random().toString(36).substring(2) + Date.now().toString(36);
        localStorage.setItem('userSeed', seed);
    }
    return seed;
}

/* ── Personalized deterministic hash ── */
function luckPersonalHash(seed, max) {
    var hash = 0;
    for (var i = 0; i < seed.length; i++) {
        hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % max;
}

/* ── Generate luck results for a given date + sign + userSeed ── */
function generateLuckResults(fecha, signoId, userSeed) {
    var results = {};
    LUCK_CATEGORIES.forEach(function (cat) {
        var semilla = fecha + signoId + userSeed + cat.id;
        var h = luckPersonalHash(semilla, 1000);
        var levelIdx = h % 5;
        var luckLevel = LUCK_LEVELS[levelIdx];
        var message = LUCK_MESSAGES[cat.id][h % LUCK_MESSAGES[cat.id].length];
        results[cat.id] = {
            levelIdx: levelIdx,
            level: luckLevel,
            message: message,
            emoji: cat.emoji,
            label: cat.label
        };
    });
    return results;
}

/* ── Save to history (max 7 days) ── */
function saveLuckHistory(fecha, signoId, signoName, results) {
    var historial = {};
    try {
        historial = JSON.parse(localStorage.getItem('suerteHistorial')) || {};
    } catch (e) {
        historial = {};
    }

    // Build a summary for the day
    var resumen = [];
    LUCK_CATEGORIES.forEach(function (cat) {
        var r = results[cat.id];
        resumen.push({
            emoji: r.emoji,
            label: r.label,
            levelLabel: r.level.label,
            levelColor: r.level.color,
            levelIdx: r.levelIdx,
            message: r.message
        });
    });

    historial[fecha] = {
        signo: signoName,
        signoId: signoId,
        resumen: resumen
    };

    // Keep only last 7 days
    var fechasOrdenadas = Object.keys(historial).sort().reverse();
    var ultimos7 = fechasOrdenadas.slice(0, 7);
    var historialFiltrado = {};
    ultimos7.forEach(function (f) {
        historialFiltrado[f] = historial[f];
    });

    localStorage.setItem('suerteHistorial', JSON.stringify(historialFiltrado));
    return historialFiltrado;
}

/* ── Render the luck grid cards ── */
function renderLuckGrid(results) {
    var html = '<div class="luck-grid">';

    LUCK_CATEGORIES.forEach(function (cat) {
        var r = results[cat.id];
        var dotsHtml = '';
        for (var i = 0; i < 5; i++) {
            dotsHtml += '<span class="luck-dot' + (i <= r.levelIdx ? ' active' : '') + '" style="' + (i <= r.levelIdx ? 'background:' + r.level.color : '') + '"></span>';
        }

        html +=
            '<div class="luck-card">' +
            '<span class="luck-emoji">' + r.emoji + '</span>' +
            '<h4 class="luck-label">' + r.label + '</h4>' +
            '<div class="luck-dots">' + dotsHtml + '</div>' +
            '<div class="luck-level-text" style="color:' + r.level.color + '">' + r.level.label + '</div>' +
            '<p class="luck-message">' + r.message + '</p>' +
            '</div>';
    });

    html += '</div>';
    return html;
}

/* ── Render history section ── */
function renderLuckHistory(historial, todayDate) {
    var fechas = Object.keys(historial).sort().reverse();
    // Exclude today from history (it's already shown above)
    var pastDates = fechas.filter(function (f) { return f !== todayDate; });
    if (pastDates.length === 0) return '';

    var html = '<div class="luck-history">';
    html += '<h4 class="luck-history-title">📅 Historial de los últimos días</h4>';

    pastDates.forEach(function (fecha) {
        var entry = historial[fecha];
        var signInfo = LUCK_SIGN_OPTIONS.find(function (s) { return s.id === entry.signoId; });
        var signIcon = signInfo ? signInfo.icon : '✦';

        html += '<details class="luck-history-day">';
        html += '<summary class="luck-history-summary">';
        html += '<span class="luck-history-date">' + formatDateES(fecha) + '</span>';
        html += '<span class="luck-history-sign">' + signIcon + ' ' + entry.signo + '</span>';
        html += '</summary>';
        html += '<div class="luck-history-detail">';

        entry.resumen.forEach(function (cat) {
            var miniDots = '';
            for (var i = 0; i < 5; i++) {
                miniDots += '<span class="luck-dot-mini' + (i <= cat.levelIdx ? ' active' : '') + '" style="' + (i <= cat.levelIdx ? 'background:' + cat.levelColor : '') + '"></span>';
            }
            html +=
                '<div class="luck-history-item">' +
                '<span class="luck-history-emoji">' + cat.emoji + '</span>' +
                '<span class="luck-history-label">' + cat.label + '</span>' +
                '<span class="luck-history-dots">' + miniDots + '</span>' +
                '<span class="luck-history-level" style="color:' + cat.levelColor + '">' + cat.levelLabel + '</span>' +
                '</div>';
        });

        html += '</div></details>';
    });

    html += '</div>';
    return html;
}

/* ── Main initialization ── */
function initDailyLuck() {
    var container = document.getElementById('luck-container');
    if (!container) return;

    var userSeed = getUserSeed();
    var today = todayStr();

    // Recover previously selected sign or default
    var savedSign = localStorage.getItem('suerteSigno') || '';

    // Build sign selector
    var selectorHtml = '<div class="luck-sign-selector">';
    selectorHtml += '<label for="luck-sign-select" class="luck-sign-label">Selecciona tu signo para personalizar tu suerte</label>';
    selectorHtml += '<select id="luck-sign-select" class="sign-select luck-select">';
    selectorHtml += '<option value="">✦ Elige tu signo</option>';
    LUCK_SIGN_OPTIONS.forEach(function (s) {
        selectorHtml += '<option value="' + s.id + '"' + (s.id === savedSign ? ' selected' : '') + '>' + s.icon + ' ' + s.name + '</option>';
    });
    selectorHtml += '</select>';
    selectorHtml += '</div>';

    // Results placeholder
    selectorHtml += '<div id="luck-results-area"></div>';

    container.innerHTML = selectorHtml;

    // If a sign was previously saved, render immediately
    if (savedSign) {
        renderPersonalizedLuck(today, savedSign, userSeed);
    }

    // Listen for sign changes
    var select = document.getElementById('luck-sign-select');
    if (select) {
        select.addEventListener('change', function () {
            var signoId = this.value;
            if (signoId) {
                localStorage.setItem('suerteSigno', signoId);
                renderPersonalizedLuck(today, signoId, userSeed);
            } else {
                localStorage.removeItem('suerteSigno');
                var area = document.getElementById('luck-results-area');
                if (area) area.innerHTML = '';
            }
        });
    }
}

/* ── Render personalized luck + save history ── */
function renderPersonalizedLuck(fecha, signoId, userSeed) {
    var area = document.getElementById('luck-results-area');
    if (!area) return;

    var signInfo = LUCK_SIGN_OPTIONS.find(function (s) { return s.id === signoId; });
    var signoName = signInfo ? signInfo.name : signoId;

    // Generate results
    var results = generateLuckResults(fecha, signoId, userSeed);

    // Save to history
    var historial = saveLuckHistory(fecha, signoId, signoName, results);

    // Render luck grid
    var html = renderLuckGrid(results);

    // Date note
    html += '<p class="luck-date-note">🔮 Resultado basado en la energía cósmica del <strong>' + formatDateES(fecha) + '</strong> para <strong>' + signInfo.icon + ' ' + signoName + '</strong>. Se actualiza cada día.</p>';

    // Render history
    html += renderLuckHistory(historial, fecha);

    area.innerHTML = html;

    // Smooth scroll to results
    area.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function formatDateES(dateStr) {
    var d = new Date(dateStr + 'T00:00:00');
    var opts = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    var s = d.toLocaleDateString('es-ES', opts);
    return s.charAt(0).toUpperCase() + s.slice(1);
}
