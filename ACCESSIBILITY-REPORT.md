# Informe de accesibilidad

**Fecha:** 2026-10-12  
**Resultado tras las correcciones:** Axe no detecta violaciones en los estados comprobados de dashboard y tutorial. No se puede declarar conformidad WCAG 2.2 AA porque quedan verificaciones manuales pendientes.

## Alcance y método

- Extensión ejecutada en Brave 155.1.97.56 con perfil aislado.
- Axe-core 4.10.3, reglas WCAG 2.0 A/AA, WCAG 2.1 A/AA, WCAG 2.2 AA y buenas prácticas.
- Inspección de teclado, foco, Escape, controles del dock y Visual System, búsqueda sin enviarla, diseño de escritorio (1440 px) y estrecho (390 px).
- Se ejecutó una primera sesión de cinco minutos; las interacciones funcionales ocuparon unos 78 segundos y el tiempo restante fue observación pasiva. Una segunda pasada intentó distribuir interacciones durante cinco minutos, pero se detuvo a los 154 segundos porque un control de tema quedó fuera del área visible tras el desplazamiento. Por tanto, **no se completó una prueba interactiva continua de cinco minutos**.
- No se usaron lectores de pantalla ni se realizó una medición manual de contraste. Por tanto, este informe no constituye una certificación formal WCAG.

## Hallazgos

| Prioridad | Hallazgo | Evidencia |
|---|---|---|
| Corregido | El diálogo carecía de nombre accesible. Se movió `aria-labelledby` al elemento con `role="dialog"`. | Axe ya no informa `aria-dialog-name` en tutorial. |
| Corregido | Faltaba un encabezado de nivel 1. Se agregó un `<h1>` con clase visualmente oculta para mantener la jerarquía accesible sin mostrar un título grande en pantalla. | Axe ya no informa `page-has-heading-one`; `style.css` define `.visually-hidden`. |
| Corregido | El foco podía salir del tutorial y Escape no cerraba el diálogo cuando el foco estaba fuera. Se añadió contención de Tab/Shift+Tab, inert al fondo, Escape global y restauración del foco. | Prueba de teclado: el foco permanece en el diálogo; al cerrarlo se restauran inert y el foco previo. |
| Corregido | El reloj tenía `aria-label` en un `div` genérico. Se añadió `role="group"` para exponer el nombre accesible. | `index.html`, `.hud-clock-card`. |
| Corregido | Se insertaba una etiqueta `<style>` en línea incompatible con `style-src 'self'`. Las reglas se trasladaron a `style.css`; no se relajó la CSP. | Ya no se crea la etiqueta dinámica desde `app.js`; `manifest.json` conserva la política estricta. |
| Pendiente de verificación | Axe no pudo calcular contraste por fondos con imagen, gradientes y superposición. No es un fallo confirmado, pero tampoco se ha demostrado que todos los textos alcancen las relaciones requeridas. | `color-contrast` continúa como resultado incompleto. |

## Resultados de ejecución tras las correcciones

- Axe-core 4.10.3: cero violaciones en dashboard, menú SECTIONS, Visual System y tutorial; `color-contrast` sigue incompleto en los cuatro estados.
- Pruebas del tutorial: nombre accesible `onboarding-title`, foco inicial en el botón de cierre, fondo inerte, Tab confinado, Escape cierra el diálogo y restaura el foco.
- Tras recargar y operar la extensión en Brave, no se registraron errores de consola relacionados con CSP.
- Sintaxis JavaScript, parseo de `manifest.json` y `git diff --check` pasan.
- El reloj ahora usa un grupo nombrado; axe no reporta `aria-prohibited-attr` en los estados reprobados anteriormente.
- La navegación y las pruebas se realizaron en un perfil de Brave aislado; no se alteraron los datos locales habituales.
- La auditoría reparada cubrió los estados principales, pero no se considera una repetición completa de todos los recorridos anteriores ni una simulación interactiva continua de cinco minutos.

## Límites

La automatización no sustituye pruebas con Orca/NVDA/VoiceOver, una medición de contraste sobre las combinaciones reales de fondos, ni pruebas manuales completas de ampliación, zoom, movimiento reducido y operación con tecnologías de asistencia. Los errores detectados deben corregirse y volver a probarse antes de afirmar conformidad.
