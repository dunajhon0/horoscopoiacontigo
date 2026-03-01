---
trigger: always_on
---

1. Introducción
1.1 Propósito

Este documento especifica los requisitos funcionales y técnicos del sistema Horóscopo IA Contigo, una plataforma web de horóscopo diario basada en contenido generado dinámicamente y orientada a usuarios provenientes de asistentes conversacionales.

El sistema debe proporcionar información astrológica diaria, contenido educativo y consejos prácticos, manteniendo un enfoque serio, cercano y creíble.

1.2 Alcance

La plataforma ofrecerá:

Horóscopo diario actualizado automáticamente.

Información educativa sobre astrología.

Consejos personalizados bajo petición.

Sección de preguntas frecuentes.

Cumplimiento legal europeo y políticas de privacidad.

Datos legales del sitio:

Titular: Dunajhon

Email: dunajhon0@gmail.com

Web: https://www.dunajhon.com

1.3 Definiciones

Usuario: visitante de la web.

Horóscopo: contenido interpretativo diario.

SEO: optimización para motores de búsqueda.

IA: generación dinámica de contenido.

2. Requisitos Generales del Sistema
2.1 Plataforma

El sistema será:

Web estática.

Compatible con GitHub Pages.

Distribuido mediante CDN de Cloudflare.

Compatible con navegadores modernos.

2.2 Arquitectura

Arquitectura Jamstack:

HTML → estructura.

CSS → estilo.

JavaScript → lógica.

JSON → contenido diario.

No se requiere backend persistente.

3. Requisitos Funcionales
RF1 — Mostrar Horóscopo Diario

El sistema debe:

Mostrar horóscopo actualizado diariamente.

Incluir 12 signos zodiacales.

Contener:

Amor

Trabajo

Salud

Energía

Consejo práctico

Frase motivacional

Longitud mínima:
200 palabras por signo.

RF2 — Actualización Automática

La actualización se realizará mediante:

GitHub Actions.

Script automatizado.

Frecuencia:

Aproximadamente nocturna (23:00 UTC).

El sistema generará:

/data/horoscope.json
RF3 — Interacción del Usuario

El usuario podrá:

Seleccionar su signo.

Expandir la tarjeta de horóscopo.

Leer contenido completo.

Cerrar vista ampliada.

Animaciones deben ser suaves y modernas.

RF4 — Sección Educativa

Debe incluir contenido sobre:

Historia del horóscopo.

Diferencia entre entretenimiento y ciencia.

Cómo se interpretan los signos.

RF5 — Consejos Personalizados

Si el usuario solicita consejo:

Generar respuesta coherente.

Mantener tono serio y cercano.

Evitar promesas esotéricas extremas.

4. Requisitos No Funcionales
4.1 Rendimiento

Tiempo de carga < 3 segundos.

Imágenes optimizadas.

Lazy loading obligatorio.

4.2 Seguridad

Uso obligatorio de HTTPS.

Protección contra scripts maliciosos.

Validación de datos en frontend.

4.3 Usabilidad

Diseño responsive.

Compatible con dispositivos móviles.

Navegación simple.

5. Requisitos Legales
5.1 Políticas del sitio

Se deben incluir:

Privacidad

Titular: Dunajhon
Email: dunajhon0@gmail.com

Web: https://www.dunajhon.com

Debe especificarse:

Datos recolectados.

Finalidad.

Derechos del usuario.

Conservación de datos.

Cookies

Debe existir:

Banner de consentimiento.

No cargar cookies analíticas o publicitarias antes del consentimiento.

Aviso Legal

Debe incluir:

Identificación del titular.

Condiciones de uso.

Responsabilidad limitada del contenido.

Cumplimiento RGPD

La web debe cumplir:

Reglamento UE 2016/679.

LSSI-CE española.

6. SEO (Muy Importante para el Proyecto)
SEO On Page

Obligatorio incluir:

Meta title optimizado.

Meta description.

Open Graph.

Schema.org markup.

Palabras clave objetivo

Horóscopo diario

Horóscopo IA

Astrología diaria

Horóscopo hoy

Predicción horóscopo

SEO Técnico

Sitemap.xml.

URLs limpias.

H1 único por página.

Texto indexable.

7. Interfaz de Usuario
Diseño visual

Estilo moderno y elegante.

Fondo espacial sutil.

Colores suaves.

Tipografía profesional.

No usar estética infantil o caricaturas excesivas.

Animaciones

Hover effects.

Transiciones suaves.

Expansión de tarjetas.

8. Sección FAQ

Debe incluir preguntas como:

¿Es el horóscopo científicamente exacto?
Respuesta: No, se trata de contenido interpretativo y de entretenimiento informativo.

¿Se guardan mis datos?
Solo datos técnicos anónimos.

¿El contenido se actualiza diariamente?
Sí, mediante automatización.

¿Necesito registrarme?
No.

¿Es gratuito?
Sí.

9. Monetización

Preparación para:

Google AdSense.

Requisitos:

No contenido engañoso.

No clickbait agresivo.

Espacios publicitarios definidos.

10. Accesibilidad

Debe incluir:

ARIA labels.

Navegación por teclado.

Buen contraste.

11. Estrategia de Crecimiento

Se recomienda implementar:

Blog sobre astrología.

Compatibilidad entre signos.

Contenido educativo largo.

12. Riesgos

Exceso de contenido automático.

Baja retención de usuarios.

Problemas SEO si el texto es genérico.

13. Métricas de Éxito

Tiempo de permanencia.

Retorno de usuarios.

CTR en contenido.

Posicionamiento SEO.

14. Recomendaciones Técnicas (Extra — Muy Importante)

Se recomienda:

Cache de recursos.

Preload de fuentes.

CDN.

Optimización de imágenes.

Dark mode por defecto.

15. Conclusión

Horóscopo IA Contigo es una plataforma de horóscopo moderna, educativa y monetizable, diseñada bajo arquitectura estática, optimizada para SEO, legalmente segura y con experiencia de usuario premium.