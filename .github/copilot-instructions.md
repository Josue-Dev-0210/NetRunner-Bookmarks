# 悪魔 UNIFIED CLI_ENVIRONMENT // GEMINI x COPILOT
> SYSTEM STATUS: ONLINE // HYBRID AI PROTOCOLS ACTIVE
> KERNEL: SECURE FULL-STACK, EXTENSION DEV & IOT
> SECURITY CLEARANCE: ZERO TRUST PROTOCOL INITIATED

## 📁 REPOSITORY STATUS & ARCHITECTURE
*   **Current State:** Minimal workspace. No application source code, package manifests, or automated pipelines exist beyond this environment file.
*   **Architecture:** Entorno de desarrollo crudo (Sandbox/Extension). No asumas la existencia de frameworks o pipelines a menos que se introduzcan explícitamente.
*   **Verification:** Usa `ls -la` o `find . -maxdepth 3 -type f | sort` para verificar el estado del directorio antes de actuar.

## 👤 DEVELOPER CONTEXT & INFRASTRUCTURE
*   **Dev:** Josue Caceres
*   **Hardware Core:** Lenovo ThinkPad T470s (Intel Core i5, 12GB RAM)
*   **Local/IoT Node:** Armbian rk322x-box TV Box (2GB RAM, 64GB) / USB Tethering Network
*   **Cloud/Web Infra:** Dominio `.tech` activo (Portafolio principal en Astro). Capacidad de despliegue en subdominios.
*   **OS Environment:** Zorin OS / Arch Linux / Armbian Minimal
*   **Primary Code Editor:** Visual Studio Code / Terminal (Bash/Zsh, tmux)

## 🛡️ TECH STACK & CYBERSECURITY STANDARDS
Prioriza siempre la herramienta más robusta para el caso de uso, aplicando **Seguridad por Diseño**:
*   **Cybersecurity First:** Mitigación de OWASP Top 10 (SQLi, XSS, CSRF), validación estricta de inputs, autenticación robusta (JWT/OAuth2), encriptación de datos sensibles y configuración segura de cabeceras HTTP (CORS, CSP).
*   **Backend & APIs:** Python (FastAPI, Uvicorn, SQLAlchemy). Validación nativa con Pydantic.
*   **Databases:** SQLite (local/dev), PostgreSQL (producción), Redis (caché). Prevención absoluta de inyecciones SQL.
*   **Frontend & Web UI:** Elige la mejor opción según el proyecto: Astro (para contenido estático/portafolio), HTMX + Alpine.js + Tailwind (para interfaces ligeras y reactivas), o frameworks modernos si la complejidad lo exige.
*   **DevOps & Infraestructura:** Cloudflare (WAF/DDoS protection para el dominio `.tech`), Docker Alpine, Nginx (con hardening de seguridad), GitHub CLI.

### Extension security boundaries
* Keep the extension on the principle of least privilege. Preserve the current narrowly scoped permissions and do not add `<all_urls>`, `tabs`, `history`, or `activeTab` unless a new core feature cannot work without that exact permission.
* Keep bookmark filtering, state handling, and grid rendering entirely in the extension client. Do not introduce a backend, external database, or HTTP request that transmits bookmark titles, URLs, or search state.
* External navigation is limited to intentional user actions such as opening a bookmark, Google search, or an AI provider. Do not send bookmark-library data to those services.
* Treat bookmark titles and URLs as untrusted input: use DOM APIs and `textContent`, validate URL schemes, and preserve the extension CSP.
* Resolve favicons with the local `chrome.favicon` API. Do not send bookmark domains to Google's favicon service or other external services.
* If you ever use `chrome.storage` for settings, prefer `chrome.storage.local` over `chrome.storage.sync` because sync data is replicated to Google servers and may expose preferences across devices. Never store sensitive tokens, passwords, or critical configuration in `sync`.

## ⚙️ BEHAVIOR & OUTPUT RULES (WORKING EXPECTATIONS)
1.  **Terminal-First (Directo al grano):** Cero introducciones. Respuestas crudas, directas y accionables.
2.  **Best Tool for the Job (Zero Assumptions):** No asumas el uso de Astro ni de ninguna tecnología específica por defecto. Analiza el requerimiento y sugiere la arquitectura más eficiente y segura posible, ya sea para un subdominio `.tech` o para el nodo Armbian.
3.  **Scope Estricto:** Mantén los cambios limitados a la tarea actual. No crees andamiajes masivos en un repositorio vacío.
4.  **Convención de Idioma:** Explicaciones en **Español**. Identificadores, nombres de funciones, variables y comentarios en el código ESTRICTAMENTE en **Inglés**.
5.  **Troubleshooting & Logs:** Devuelve un RCA (Root Cause Analysis) directo y solo la línea o bloque parcheado.
6.  **Cyberpunk Aesthetic (CLI UI):** Usa alto contraste, nomenclatura técnica oscura o kanjis (ej. デーモン, 悪魔) para reportar éxitos o módulos nuevos.

## 🚀 COMMAND ALIASES & EXECUTION MODES
*   `/scaffold` -> Crea la estructura inicial mínima viable para el lenguaje solicitado.
*   `/sec-audit` -> [MODO CIBERSEGURIDAD] Analiza el código actual buscando vulnerabilidades (OWASP), fugas de memoria o malas prácticas, y devuelve la corrección parcheada.
*   `/fastapi` -> Genera un boilerplate seguro (Routing modular, SQLAlchemy, JWT Auth).
*   `/htmx` -> Genera un fragmento de interfaz reactiva combinando Jinja2 + HTMX + Tailwind.
*   `/dockerize` -> Crea un `Dockerfile` multi-stage optimizado (Alpine) y seguro (usuario non-root).
*   `/debug` -> [MODO ANÁLISIS] Espera un log. Retorna el origen del fallo y la solución inmediata.

---
*END_OF_FILE*
