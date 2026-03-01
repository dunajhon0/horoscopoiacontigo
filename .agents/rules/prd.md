---
trigger: always_on
---

Nombre del producto: Horóscopo IA Contigo
Tipo de producto: Web informativa + experiencia interactiva de horóscopo diario
Plataformas de despliegue:

GitHub Pages

Cloudflare (CDN + seguridad + caching)

Google AdSense (monetización publicitaria)

Objetivo principal:
Ofrecer un servicio de horóscopo diario basado en inteligencia artificial, con contenido creíble, serio, útil y cercano al usuario, evitando el tono excesivamente humorístico o absurdo.

El producto debe sentirse como un acompañante digital de consulta diaria, alineado con el concepto “…Contigo”.

2. Público Objetivo

Personas interesadas en astrología con enfoque práctico.

Usuarios provenientes de un GPT redirigido.

Público general entre 18 y 55 años.

Usuarios que buscan:

Orientación personal ligera.

Lectura diaria rápida.

Contenido explicativo sobre astrología.

No se orienta a astrología esotérica profunda ni a predicciones extremas.

3. Propuesta de Valor

El producto ofrece:

✅ Horóscopo diario actualizado automáticamente.
✅ Consejos prácticos y razonables.
✅ Información educativa sobre astrología.
✅ Experiencia visual moderna pero seria.
✅ Interacción simple y elegante.
✅ Preparación para monetización publicitaria futura.

4. Arquitectura Técnica
4.1 Enfoque General

Arquitectura Jamstack estática:

Frontend estático.

Generación automática de contenido.

Sin backend permanente.

Ventajas:

Compatible con GitHub Pages.

Fácil mantenimiento.

Mejor indexación SEO.

Menor riesgo de fallos de servidor.

4.2 Estructura del Proyecto
/horoscopo-ia-contigo
│
├── index.html
├── privacidad.html
├── cookies.html
├── aviso-legal.html
├── contacto.html
├── sitemap.xml
├── ads.txt
│
├── /assets
│   ├── css/styles.css
│   ├── js/app.js
│   ├── js/horoscope.js
│   ├── images/
│
├── /data
│   └── horoscope.json
│
└── /.github/workflows
    └── update-horoscope.yml
5. Sistema de Horóscopo Diario
Generación

El horóscopo debe actualizarse diariamente mediante:

GitHub Actions.

Script automatizado.

Generación de archivo JSON estático.

Actualización aproximada nocturna:

~23:00 UTC (horario aproximado España nocturno).

Contenido del Horóscopo

Cada signo debe incluir:

Resumen del día.

Amor.

Trabajo o estudios.

Energía personal.

Consejo práctico realista.

Advertencia opcional.

Frase motivacional.

Longitud recomendada:

200–300 palabras por signo.

El estilo debe ser:

Creíble.

Profesional.

Cercano.

No exageradamente místico.

6. Diseño Visual
Estética

Diseño limpio.

Estilo moderno minimalista.

Tema con inspiración espacial suave.

Colores elegantes, no saturados.

Tipografías profesionales.

No usar estética infantil o caricaturesca.

Animaciones

Transiciones suaves.

Microinteracciones en botones.

Hover elegante.

Expansión de tarjetas al hacer clic.

Al seleccionar un signo:

La tarjeta se agranda.

Se centra en pantalla.

Fondo se oscurece ligeramente.

7. Información Educativa

La web debe incluir una sección educativa con contenido como:

Historia de la astrología.

Qué es el horóscopo.

Cómo se interpreta.

Diferencia entre entretenimiento y predicción científica.

El tono debe ser informativo y respetuoso con diferentes creencias.

8. Legalidad y Cumplimiento RGPD

Debe cumplir normativa europea:

Política de privacidad clara.

Política de cookies con consentimiento real.

Aviso legal con titularidad.

No recopilar datos sensibles.

Solo se pueden almacenar:

Cookies técnicas.

Métricas anónimas.

Antes de cargar publicidad o analytics → pedir consentimiento.

9. Monetización (AdSense)

Preparación para:

Espacios publicitarios estratégicos.

Contenido suficiente para evitar rechazo.

Diseño que no engañe al usuario con anuncios.

Se deben evitar:

Clickbait agresivo.

Contenido automático sin valor.

10. SEO

Implementar:

Meta tags.

OpenGraph.

Schema.org.

Sitemap.

URLs limpias.

Ejemplo de palabras clave:

horóscopo diario

horóscopo IA

astrología diaria

predicción horóscopo hoy

11. Experiencia de Usuario

La web debe sentirse como un asistente personal.

Debe incluir:

Mensaje de bienvenida dinámico según hora del día.

Botones claros.

Lectura rápida.

Navegación intuitiva.

12. Seguridad

Uso de HTTPS obligatorio.

Protección contra inyección de scripts.

Validación de datos.

13. Objetivos de Futuro

Versión móvil optimizada.

Sistema de recomendaciones.

Versión premium.

Integración con GPT para redirecciones inteligentes.

14. Métricas de Éxito

Tiempo medio de sesión.

Retención diaria.

Tráfico orgánico.

CTR de contenido.

15. Riesgos

Generación automática excesiva de contenido.

Problemas SEO por baja calidad textual.

Rechazo de AdSense si el contenido es demasiado automático.

16. Conclusión

Horóscopo IA Contigo busca ser una plataforma de horóscopo moderna, seria, útil y monetizable, equilibrando entretenimiento y valor informativo real, manteniendo un tono cercano al usuario.