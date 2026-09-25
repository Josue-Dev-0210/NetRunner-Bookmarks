const searchInput = document.querySelector("#search-input");
const bookmarksGrid = document.querySelector("#bookmarks-grid");
const emptyState = document.querySelector("#empty-state");
const bookmarkCount = document.querySelector("#bookmark-count");
const boardNav = document.querySelector("#board-nav");
const bookmarksTitle = document.querySelector("#bookmarks-title");
const aiProviders = document.querySelectorAll(".ai-provider");
const settingsToggle = document.querySelector("#settings-toggle");
const settingsContent = document.querySelector("#settings-content");
const settingsPanel = document.querySelector(".settings-panel");
if (settingsPanel) document.body.append(settingsPanel);
const languageSelect = document.querySelector("#language-select");
const iconSizeInput = document.querySelector("#icon-size");
const iconSizeStatus = document.querySelector("#icon-size-status");
const themeButtons = document.querySelectorAll(".theme-button[data-theme]");
const displayNameInput = document.querySelector("#display-name-input");
const saveNameButton = document.querySelector("#save-name-button");
const resetNameButton = document.querySelector("#reset-name-button");
const brandNameInput = document.querySelector("#brand-name-input");
const saveBrandNameButton = document.querySelector("#save-brand-name-button");
const resetBrandNameButton = document.querySelector("#reset-brand-name-button");
const backgroundIntensity = document.querySelector("#background-intensity");
const backgroundFileInput = document.querySelector("#background-file-input");
const resetBackgroundButton = document.querySelector("#reset-background-button");
const backgroundFileStatus = document.querySelector("#background-file-status");
const hudToggle = document.querySelector("#hud-toggle");
const quotesToggle = document.querySelector("#quotes-toggle");
const typingSpeed = document.querySelector("#typing-speed");
const reducedMotionToggle = document.querySelector("#reduced-motion-toggle");
const customAiNameInput = document.querySelector("#custom-ai-name-input");
const customAiUrlInput = document.querySelector("#custom-ai-url-input");
const addCustomAiButton = document.querySelector("#add-custom-ai-button");
const customAiList = document.querySelector("#custom-ai-list");
const quickAddAiButton = document.querySelector("#quick-add-ai-button");
const defaultShortcutButtons = document.querySelectorAll("[data-default-shortcut]");
const hudClock = document.querySelector("#hud-clock");
const hudDate = document.querySelector("#hud-date");
const hudQuote = document.querySelector("#hud-quote");
const profileName = document.querySelector("#profile-name");
const bootOverlay = document.querySelector("#boot-overlay");
const bootLines = document.querySelector("#boot-lines");
const telemetryLinks = document.querySelector("#telemetry-links");
const telemetryIp = document.querySelector("#telemetry-ip");
const telemetryLatency = document.querySelector("#telemetry-latency");
const telemetryIntegrity = document.querySelector("#telemetry-integrity");
const telemetryBarFill = document.querySelector("#telemetry-bar-fill");
const telemetryPanel = document.querySelector(".telemetry-panel");
const aiProvidersContainer = document.querySelector(".ai-providers");
const tasksWidget = document.querySelector("#tasks-widget");
const notesWidget = document.querySelector("#notes-widget");
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const notesInput = document.querySelector("#notes-input");
const tasksWidgetToggle = document.querySelector("#tasks-widget-toggle");
const notesWidgetToggle = document.querySelector("#notes-widget-toggle");
const moveControlsToggle = document.querySelector("#move-controls-toggle");
const widgetSizeButtons = document.querySelectorAll(".widget-size-option");
const columnButtons = document.querySelectorAll(".column-option");
const glassOpacity = document.querySelector("#glass-opacity");
const glassOpacityStatus = document.querySelector("#glass-opacity-status");
const exportSettingsButton = document.querySelector("#export-settings-button");
const importSettingsButton = document.querySelector("#import-settings-button");
const importSettingsFile = document.querySelector("#import-settings-file");
const dataTransferStatus = document.querySelector("#data-transfer-status");
const profileNameInput = document.querySelector("#profile-name-input");
const saveProfileButton = document.querySelector("#save-profile-button");
const profileSelect = document.querySelector("#profile-select");
const applyProfileButton = document.querySelector("#apply-profile-button");
const deleteProfileButton = document.querySelector("#delete-profile-button");
const profileStatus = document.querySelector("#profile-status");
const keyboardShortcutsList = document.querySelector("#keyboard-shortcuts-list");
const resetShortcutsButton = document.querySelector("#reset-shortcuts-button");
const shortcutStatus = document.querySelector("#shortcut-status");
const commandPalette = document.querySelector("#command-palette");
const commandPaletteInput = document.querySelector("#command-palette-input");
const commandPaletteActions = document.querySelector("#command-palette-actions");
const commandPaletteClose = document.querySelector("#command-palette-close");
const onboardingOverlay = document.querySelector("#onboarding-overlay");
const onboardingClose = document.querySelector("#onboarding-close");
const showTutorialButton = document.querySelector("#show-tutorial-button");
const bugReportInput = document.querySelector("#bug-report-input");
const copyBugReportButton = document.querySelector("#copy-bug-report-button");
const emailBugReportButton = document.querySelector("#email-bug-report-button");
const bugReportStatus = document.querySelector("#bug-report-status");
const widgetPresetButtons = document.querySelectorAll(".widget-preset");
const densityButtons = document.querySelectorAll(".density-option");
const workspace = document.querySelector(".workspace");
const sortableWidgets = document.querySelectorAll(".widget-sortable");
const widgetElements = {
  hud: document.querySelector(".hud"),
  telemetry: document.querySelector(".telemetry-panel"),
  shortcuts: document.querySelector(".ai-providers"),
  productivity: document.querySelector(".productivity-grid"),
  bookmarks: document.querySelector(".bookmarks-section"),
};

let bookmarkTree = [];
let activeBoardId = "recent";
let recentBookmarkCount = null;
let dashboardProfiles = [];
let keyboardShortcuts = {};
let shortcutRecordingAction = null;
let activeTheme = "electric-purple";
let autoProfileName = "RUNNER";
let quoteTypingDelay = 82;
let quotesEnabled = true;
let customAiShortcuts = [];
let disabledDefaultShortcuts = [];
let localTasks = [];
const maxBackgroundSize = 2 * 1024 * 1024;
let widgetVisibility = {
  hud: true,
  telemetry: true,
  shortcuts: true,
  productivity: true,
  bookmarks: true,
};
let widgetOrder = ["hud", "shortcuts", "productivity", "bookmarks"];
let activeDensity = "balanced";
let activeWidgetSize = "balanced";
let activeColumns = "2";
let activeLanguage = "en";

const defaultShortcuts = [
  { id: "youtube", name: "YOUTUBE", url: "https://www.youtube.com/" },
  { id: "instagram", name: "INSTAGRAM", url: "https://www.instagram.com/" },
  { id: "github", name: "GITHUB", url: "https://github.com/" },
];
const shortcutScrollThreshold = 5;

if (telemetryPanel && aiProvidersContainer) {
  telemetryPanel.append(aiProvidersContainer);
}

function applyWidgetOrder(order = widgetOrder) {
  if (!workspace) return;
  const availableIds = new Set(
    [...sortableWidgets].map((widget) => widget.dataset.widgetId)
  );
  const normalizedOrder = [
    ...order.filter((id) => availableIds.has(id)),
    ...widgetOrder.filter((id) => availableIds.has(id) && !order.includes(id)),
  ];

  normalizedOrder.forEach((id) => {
    const widget = workspace.querySelector(`[data-widget-id="${id}"]`);
    if (widget) workspace.append(widget);
  });
  widgetOrder = normalizedOrder;
}

function saveWidgetOrder() {
  saveUserSettings({ widgetOrder });
}

sortableWidgets.forEach((widget) => {
  const dragHandle = widget.querySelector(".widget-drag-handle");
  if (!dragHandle) return;

  dragHandle.addEventListener("dragstart", (event) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/widget-id", widget.dataset.widgetId);
    widget.classList.add("is-dragging");
  });

  dragHandle.addEventListener("dragend", () => {
    widget.classList.remove("is-dragging");
    workspace?.querySelectorAll(".is-drag-target").forEach((target) => {
      target.classList.remove("is-drag-target");
    });
  });

  widget.addEventListener("dragover", (event) => {
    if (!event.dataTransfer.types.includes("text/widget-id")) return;
    event.preventDefault();
    widget.classList.add("is-drag-target");
  });

  widget.addEventListener("dragleave", () => {
    widget.classList.remove("is-drag-target");
  });

  widget.addEventListener("drop", (event) => {
    event.preventDefault();
    const sourceId = event.dataTransfer.getData("text/widget-id");
    const targetId = widget.dataset.widgetId;
    widget.classList.remove("is-drag-target");
    if (!sourceId || !targetId || sourceId === targetId) return;

    const source = workspace.querySelector(`[data-widget-id="${sourceId}"]`);
    if (!source) return;
    const targetRect = widget.getBoundingClientRect();
    const insertBefore = event.clientY < targetRect.top + targetRect.height / 2;
    workspace.insertBefore(source, insertBefore ? widget : widget.nextElementSibling);
    widgetOrder = [...workspace.querySelectorAll(".widget-sortable")].map(
      (item) => item.dataset.widgetId
    );
    saveWidgetOrder();
  });
});

function renderTasks() {
  if (!taskList) return;
  taskList.replaceChildren();
  localTasks.forEach((task) => {
    const item = document.createElement("li");
    const checkbox = document.createElement("input");
    const label = document.createElement("span");
    const remove = document.createElement("button");
    item.className = `task-item${task.done ? " is-complete" : ""}`;
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.setAttribute("aria-label", `Complete ${task.text}`);
    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      saveUserSettings({ localTasks });
      renderTasks();
    });
    label.textContent = task.text;
    remove.type = "button";
    remove.className = "task-remove";
    remove.textContent = "×";
    remove.setAttribute("aria-label", `Delete ${task.text}`);
    remove.addEventListener("click", () => {
      localTasks = localTasks.filter((entry) => entry.id !== task.id);
      saveUserSettings({ localTasks });
      renderTasks();
    });
    item.append(checkbox, label, remove);
    taskList.append(item);
  });
}

document.addEventListener("pointerdown", (event) => {
  if (!settingsPanel?.classList.contains("is-open")) return;
  if (
    event.target instanceof Node
    && !settingsPanel.contains(event.target)
    && !settingsToggle?.contains(event.target)
  ) {
    settingsToggle?.setAttribute("aria-expanded", "false");
    if (settingsContent) settingsContent.hidden = true;
    settingsPanel.classList.remove("is-open");
  }
});

function applyWidgetSize(size = "balanced") {
  const validSizes = ["compact", "balanced", "expanded"];
  if (!validSizes.includes(size)) return;
  activeWidgetSize = size;
  document.documentElement.dataset.widgetSize = size;
  widgetSizeButtons.forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.widgetSize === size);
  });
}

function applyColumns(columns = "2") {
  const validColumns = ["1", "2", "3"];
  if (!validColumns.includes(String(columns))) return;
  activeColumns = String(columns);
  document.documentElement.dataset.columns = activeColumns;
  columnButtons.forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.columns === activeColumns);
  });
}

function applyGlassOpacity(value = "0.58") {
  const opacity = Math.min(0.85, Math.max(0.25, Number(value) || 0.58));
  document.documentElement.style.setProperty("--glass-opacity", opacity);
  if (glassOpacity) glassOpacity.value = String(opacity);
  if (glassOpacityStatus) {
    const label = translateValue("SURFACE OPACITY", activeLanguage);
    glassOpacityStatus.textContent = `${Math.round(opacity * 100)}% ${label}`;
  }
}

function applyIconSize(value = 32) {
  const parsedSize = Number(value);
  const iconSize = Math.min(48, Math.max(16, Number.isFinite(parsedSize) ? parsedSize : 32));
  const root = document.documentElement;
  root.style.setProperty("--icon-size", `${iconSize}px`);
  root.style.setProperty("--shortcut-icon-size", `${Math.round(iconSize * 0.56)}px`);
  root.style.setProperty("--compact-icon-size", `${Math.round(iconSize * 0.625)}px`);
  if (iconSizeInput) iconSizeInput.value = String(iconSize);
  if (iconSizeStatus) iconSizeStatus.textContent = `${iconSize} PX`;
}

const translations = {
  "LOCAL DATA // EXPORT & IMPORT": "DATOS LOCALES // EXPORTAR E IMPORTAR",
  "Exports include local notes and tasks. Review the JSON before sharing it.": "Las exportaciones incluyen notas y tareas locales. Revisa el JSON antes de compartirlo.",
  "EXPORT JSON": "EXPORTAR JSON",
  "IMPORT JSON": "IMPORTAR JSON",
  "DASHBOARD PROFILES": "PERFILES DEL PANEL",
  "PROFILE NAME": "NOMBRE DEL PERFIL",
  "SAVE PROFILE": "GUARDAR PERFIL",
  "SELECT PROFILE": "SELECCIONAR PERFIL",
  "APPLY": "APLICAR",
  "KEYBOARD SHORTCUTS": "ATAJOS DE TECLADO",
  "Use Alt + Shift + a letter or number; assignments stay on this device.": "Usa Alt + Shift + una letra o número; los atajos se guardan en este dispositivo.",
  "RESTORE DEFAULTS": "RESTAURAR PREDETERMINADOS",
  "FOCUS SEARCH": "ENFOCAR BÚSQUEDA",
  "OPEN RECENT": "ABRIR RECIENTES",
  "VISUAL SYSTEM": "SISTEMA VISUAL",
  "LANGUAGE": "IDIOMA",
  "ICON SIZE": "TAMAÑO DE ICONOS",
  "CUSTOM AI SHORTCUTS": "ACCESOS PERSONALIZADOS",
  "SERVICE NAME": "NOMBRE DEL SERVICIO",
  "ADD": "AÑADIR",
  "DISPLAY NAME": "NOMBRE VISIBLE",
  "AUTO PROFILE NAME": "NOMBRE DE PERFIL AUTOMÁTICO",
  "SAVE": "GUARDAR",
  "REMOVE": "QUITAR",
  "RESTORE": "RESTAURAR",
  "USE AUTO PROFILE NAME": "USAR NOMBRE AUTOMÁTICO",
  "CUSTOM BRAND": "MARCA PERSONALIZADA",
  "RESET BRAND NAME": "RESTABLECER MARCA",
  "BACKGROUND INTENSITY": "INTENSIDAD DEL FONDO",
  "LOCAL BACKGROUND": "FONDO LOCAL",
  "RESTORE DEFAULT BACKGROUND": "RESTAURAR FONDO PREDETERMINADO",
  "DEFAULT CITY NODE": "FONDO URBANO PREDETERMINADO",
  "SHOW HUD CLOCK": "MOSTRAR RELOJ HUD",
  "SHOW NETRUNNER MESSAGES": "MOSTRAR MENSAJES NETRUNNER",
  "MESSAGE TYPING SPEED": "VELOCIDAD DE ESCRITURA",
  "REDUCE MOTION EFFECTS": "REDUCIR EFECTOS DE MOVIMIENTO",
  "SHOW TASKS WIDGET": "MOSTRAR WIDGET DE TAREAS",
  "SHOW NOTES WIDGET": "MOSTRAR WIDGET DE NOTAS",
  "EDIT LAYOUT // SHOW MOVE CONTROLS": "EDITAR DISEÑO // MOSTRAR CONTROLES",
  "WIDGET PROTOCOL": "PROTOCOLO DE WIDGETS",
  "ENABLE MOVE CONTROLS TO REORDER PANELS": "ACTIVA LOS CONTROLES PARA REORDENAR",
  "WIDGET SIZE": "TAMAÑO DE WIDGETS",
  "SMALL": "PEQUEÑO",
  "MEDIUM": "MEDIANO",
  "LARGE": "GRANDE",
  "GRID COLUMNS": "COLUMNAS DE CUADRÍCULA",
  "ONE": "UNA",
  "TWO": "DOS",
  "THREE": "TRES",
  "FULL HUD": "HUD COMPLETO",
  "FOCUS MODE": "MODO ENFOQUE",
  "COMMAND CENTER": "CENTRO DE COMANDO",
  "MINIMAL GLASS": "GLASS MÍNIMO",
  "INTERFACE DENSITY": "DENSIDAD DE INTERFAZ",
  "COMPACT": "COMPACTA",
  "BALANCED": "EQUILIBRADA",
  "EXPANDED": "AMPLIADA",
  "COLOR PROTOCOL": "PROTOCOLO DE COLOR",
  "ELECTRIC PURPLE": "PÚRPURA ELÉCTRICO",
  "NEON PINK": "ROSA NEÓN",
  "NIGHT CITY": "CIUDAD NOCTURNA",
  "BLACK ICE": "HIELO NEGRO",
  "GLASS TRANSPARENCY": "TRANSPARENCIA DEL CRISTAL",
  "ABOUT // CONTACT": "ACERCA DE // CONTACTO",
  "Found a bug, visual glitch or broken shortcut? Generate a local report, review it, then copy it to your preferred contact channel.": "¿Encontraste un error, fallo visual o acceso roto? Genera un informe local, revísalo y cópialo para compartirlo donde prefieras.",
  "COPY REPORT": "COPIAR INFORME",
  "EMAIL REPORT": "ENVIAR POR CORREO",
  "Found a bug, visual glitch or broken shortcut? Your report opens as a draft to josue.dev.0210@outlook.com. Review and send it from your email app. No bookmark data is included.": "¿Encontraste un error, fallo visual o acceso roto? El informe se abrirá como borrador para josue.dev.0210@outlook.com. Revísalo y envíalo desde tu aplicación de correo. No se incluyen datos de marcadores.",
  "EMAIL DRAFT OPENED // REVIEW AND SEND": "BORRADOR DE CORREO ABIERTO // REVÍSALO Y ENVÍALO",
  "OPENING EMAIL DRAFT // REVIEW AND SEND": "ABRIENDO BORRADOR // REVÍSALO Y ENVÍALO",
  "SHOW TUTORIAL": "VER TUTORIAL",
  "NO REPORT GENERATED": "NO SE HA GENERADO UN INFORME",
  "Describe the bug or error...": "Describe el error o problema...",
  "ADD A DESCRIPTION FIRST": "ESCRIBE UNA DESCRIPCIÓN",
  "REPORT COPIED // READY TO SEND": "INFORME COPIADO // LISTO PARA ENVIAR",
  "COPY BLOCKED // SELECT TEXT MANUALLY": "COPIA BLOQUEADA // SELECCIONA EL TEXTO",
  "ACTIVE BOARD": "TABLERO ACTIVO",
  "SCANNING...": "ESCANEANDO...",
  "No signals found in the network.": "No se encontraron resultados en la red.",
  "SYSTEM ONLINE": "SISTEMA EN LÍNEA",
  "NODE SIGNALS": "SEÑALES DEL NODO",
  "LINKS": "ENLACES",
  "NODE IP": "IP DEL NODO",
  "LATENCY": "LATENCIA",
  "INTEGRITY": "INTEGRIDAD",
  "USER:": "USUARIO:",
  "ONLINE": "EN LÍNEA",
  "ACCESS GRANTED": "ACCESO CONCEDIDO",
  "LINK ARCHIVE READY": "ARCHIVO DE ENLACES LISTO",
  "AWAITING INPUT": "ESPERANDO ENTRADA",
  "Search Google...": "Buscar en Google...",
  "Search local actions...": "Buscar acciones locales...",
  "LOCAL COMMAND // CTRL + K": "COMANDO LOCAL // CTRL + K",
  "COMMAND PALETTE": "PALETA DE COMANDOS",
  "TASKS": "TAREAS",
  "NOTES": "NOTAS",
  "Add a task...": "Añadir una tarea...",
  "Write a private note...": "Escribe una nota privada...",
  "LOCAL QUEUE": "COLA LOCAL",
  "OFFLINE // PRIVATE": "SIN CONEXIÓN // PRIVADO",
  "LOCAL BUFFER": "BÚFER LOCAL",
  "AUTOSAVE": "GUARDADO AUTOMÁTICO",
  "BOOKMARKS": "MARCADORES",
  "Recent connections": "Conexiones recientes",
  "FIRST INSTALL // LOCAL SETUP": "PRIMER INICIO // CONFIGURACIÓN LOCAL",
  "WELCOME TO THE NODE": "BIENVENIDO AL NODO",
  "Your private bookmark workspace is ready. Everything below stays on this device.": "Tu espacio privado de marcadores está listo. Todo permanece en este dispositivo.",
  "Browse and manage your Chrome bookmark network.": "Explora y administra tus marcadores de Chrome.",
  "Use TASKS, NOTES and presets from VISUAL SYSTEM.": "Usa TAREAS, NOTAS y preajustes del SISTEMA VISUAL.",
  "Launch AI and custom services with one click.": "Abre servicios de IA y accesos personalizados con un clic.",
  "ENTER DASHBOARD": "ENTRAR AL PANEL",
  "NIGHT CITY // DEMONTECH NODE": "NIGHT CITY // NODO DEMONTECH",
  "Search bookmarks...": "Buscar marcadores...",
  "OPEN LINK ↗": "ABRIR ENLACE ↗",
  "UNSAFE LINK": "ENLACE NO SEGURO",
  "EDIT": "EDITAR",
  "DELETE": "ELIMINAR",
  "RENAME": "RENOMBRAR",
  "NO LINKS // DROP A NODE HERE": "SIN ENLACES // SUELTA UN NODO AQUÍ",
  "Select a connection board": "Selecciona un tablero de conexiones",
  "Untitled board": "Tablero sin título",
  "+ NEW NODE": "+ NUEVO NODO",
  "LINK ERROR": "ERROR DE ENLACES",
  "Unable to access the bookmark network.": "No se pudo acceder a los marcadores.",
  "SURFACE OPACITY": "OPACIDAD DE SUPERFICIE",
  "Focus bookmark search": "Enfocar búsqueda de marcadores",
  "Open visual system": "Abrir sistema visual",
  "Toggle edit layout": "Activar/desactivar edición del diseño",
  "Use balanced widget size": "Usar tamaño mediano",
  "Use compact widget size": "Usar tamaño pequeño",
  "Use expanded widget size": "Usar tamaño grande",
  "Use two-column grid": "Usar cuadrícula de dos columnas",
  "Use one-column grid": "Usar cuadrícula de una columna",
  "Use three-column grid": "Usar cuadrícula de tres columnas",
  "Close command palette": "Cerrar paleta de comandos",
  "Customization settings": "Configuración de personalización",
  "Drag HUD widget to reorder": "Arrastra el widget HUD para reordenarlo",
  "Drag shortcuts widget to reorder": "Arrastra accesos para reordenarlos",
  "Drag productivity widgets to reorder": "Arrastra widgets de productividad para reordenarlos",
  "Drag bookmarks widget to reorder": "Arrastra marcadores para reordenarlos",
  "RECENT": "RECIENTES",
  "BOOKMARKS BAR": "BARRA DE MARCADORES",
  "OTHER BOOKMARKS": "OTROS MARCADORES",
  "Search results": "Resultados de búsqueda",
  "Bookmark title:": "Título del marcador:",
  "Bookmark URL:": "URL del marcador:",
  "Board name:": "Nombre del tablero:",
  "New board name:": "Nombre del nuevo tablero:",
  "Delete": "Eliminar",
  "Delete board": "Eliminar tablero",
  "and its links?": "y sus enlaces?",
  "System telemetry": "Telemetría del sistema",
  "Netrunner status": "Estado de Netrunner",
  "AI quick launch": "Accesos rápidos de IA",
  "Local productivity widgets": "Widgets de productividad local",
  "Bookmark boards": "Tableros de marcadores",
  "AI providers": "Proveedores de IA",
  "Widget presets": "Preajustes de widgets",
  "Dashboard columns": "Columnas del panel",
  "Interface density": "Densidad de interfaz",
  "Color themes": "Temas de color",
};

const additionalTranslations = {
  fr: {
    "VISUAL SYSTEM": "SYSTÈME VISUEL", LANGUAGE: "LANGUE", "ICON SIZE": "TAILLE DES ICÔNES",
    "CUSTOM AI SHORTCUTS": "RACCOURCIS IA PERSONNALISÉS", "SERVICE NAME": "NOM DU SERVICE",
    ADD: "AJOUTER", "DISPLAY NAME": "NOM AFFICHÉ", "AUTO PROFILE NAME": "NOM DE PROFIL AUTOMATIQUE",
    SAVE: "ENREGISTRER", "USE AUTO PROFILE NAME": "UTILISER LE NOM AUTOMATIQUE",
    "CUSTOM BRAND": "MARQUE PERSONNALISÉE", "RESET BRAND NAME": "RÉINITIALISER LA MARQUE",
    "BACKGROUND INTENSITY": "INTENSITÉ DE L’ARRIÈRE-PLAN", "LOCAL BACKGROUND": "ARRIÈRE-PLAN LOCAL",
    "SHOW HUD CLOCK": "AFFICHER L’HORLOGE HUD", "SHOW NETRUNNER MESSAGES": "AFFICHER LES MESSAGES NETRUNNER",
    "REDUCE MOTION EFFECTS": "RÉDUIRE LES ANIMATIONS", "SHOW TASKS WIDGET": "AFFICHER LES TÂCHES",
    "SHOW NOTES WIDGET": "AFFICHER LES NOTES", "EDIT LAYOUT // SHOW MOVE CONTROLS": "MODIFIER LA DISPOSITION",
    "WIDGET PROTOCOL": "DISPOSITION DES WIDGETS", "ENABLE MOVE CONTROLS TO REORDER PANELS": "ACTIVEZ LES COMMANDES POUR RÉORGANISER",
    "WIDGET SIZE": "TAILLE DES WIDGETS", SMALL: "PETIT", MEDIUM: "MOYEN", LARGE: "GRAND",
    "GRID COLUMNS": "COLONNES DE LA GRILLE", "INTERFACE DENSITY": "DENSITÉ DE L’INTERFACE",
    COMPACT: "COMPACT", BALANCED: "ÉQUILIBRÉ", EXPANDED: "ÉTENDU",
    "FULL HUD": "HUD COMPLET", "FOCUS MODE": "MODE CONCENTRATION", "COMMAND CENTER": "CENTRE DE COMMANDE",
    "MINIMAL GLASS": "VERRE MINIMAL", "COLOR PROTOCOL": "COULEURS",
    "ELECTRIC PURPLE": "VIOLET ÉLECTRIQUE", "NEON PINK": "ROSE NÉON",
    "NIGHT CITY": "VILLE NOCTURNE", "BLACK ICE": "GLACE NOIRE", "GLASS TRANSPARENCY": "TRANSPARENCE DU VERRE",
    "ABOUT // CONTACT": "À PROPOS // CONTACT", "COPY REPORT": "COPIER LE RAPPORT",
    "EMAIL REPORT": "ENVOYER PAR E-MAIL",
    "Found a bug, visual glitch or broken shortcut? Your report opens as a draft to josue.dev.0210@outlook.com. Review and send it from your email app. No bookmark data is included.": "Un bug ou un raccourci défectueux ? Le rapport s’ouvrira en brouillon à josue.dev.0210@outlook.com. Vérifiez-le avant l’envoi. Aucun favori n’est inclus.",
    "SHOW TUTORIAL": "AFFICHER LE TUTORIEL", "NO REPORT GENERATED": "AUCUN RAPPORT GÉNÉRÉ",
    "Describe the bug or error...": "Décrivez le problème...",
    "ADD A DESCRIPTION FIRST": "AJOUTEZ D’ABORD UNE DESCRIPTION",
    "REPORT COPIED // READY TO SEND": "RAPPORT COPIÉ // PRÊT À ENVOYER",
    "OPENING EMAIL DRAFT // REVIEW AND SEND": "BROUILLON OUVERT // VÉRIFIEZ ET ENVOYEZ",
    "FIRST INSTALL // LOCAL SETUP": "PREMIÈRE INSTALLATION // CONFIGURATION LOCALE",
    "WELCOME TO THE NODE": "BIENVENUE DANS LE NŒUD",
    "Your private bookmark workspace is ready. Everything below stays on this device.": "Votre espace privé est prêt. Toutes les données restent sur cet appareil.",
    "ENTER DASHBOARD": "ACCÉDER AU TABLEAU",
    "Search Google...": "Rechercher sur Google...", TASKS: "TÂCHES", NOTES: "NOTES",
    "Add a task...": "Ajouter une tâche...", "Write a private note...": "Écrire une note privée...",
    "Recent connections": "Connexions récentes", "ACTIVE BOARD": "TABLEAU ACTIF",
    "No signals found in the network.": "Aucun résultat trouvé.", "OPEN LINK ↗": "OUVRIR LE LIEN ↗",
    EDIT: "MODIFIER", DELETE: "SUPPRIMER", RENAME: "RENOMMER", "RECENT": "RÉCENT",
    DEFAULT: "PAR DÉFAUT", RESTORE: "RESTAURER", REMOVE: "RETIRER",
    "BOOKMARKS BAR": "BARRE DE FAVORIS", "OTHER BOOKMARKS": "AUTRES FAVORIS",
    "Search local actions...": "Rechercher une action locale...", "COMMAND PALETTE": "PALETTE DE COMMANDES",
  },
  de: {
    "VISUAL SYSTEM": "VISUELLES SYSTEM", LANGUAGE: "SPRACHE", "ICON SIZE": "SYMBOLGRÖSSE",
    "CUSTOM AI SHORTCUTS": "EIGENE KI-VERKNÜPFUNGEN", "SERVICE NAME": "DIENSTNAME",
    ADD: "HINZUFÜGEN", "DISPLAY NAME": "ANZEIGENAME", "AUTO PROFILE NAME": "AUTOMATISCHER PROFILNAME",
    SAVE: "SPEICHERN", "USE AUTO PROFILE NAME": "AUTOMATISCHEN NAMEN VERWENDEN",
    "CUSTOM BRAND": "EIGENE MARKE", "RESET BRAND NAME": "MARKE ZURÜCKSETZEN",
    "BACKGROUND INTENSITY": "HINTERGRUNDINTENSITÄT", "LOCAL BACKGROUND": "LOKALER HINTERGRUND",
    "SHOW HUD CLOCK": "HUD-UHR ANZEIGEN", "SHOW NETRUNNER MESSAGES": "NETRUNNER-MELDUNGEN ANZEIGEN",
    "REDUCE MOTION EFFECTS": "BEWEGUNGEN REDUZIEREN", "SHOW TASKS WIDGET": "AUFGABEN ANZEIGEN",
    "SHOW NOTES WIDGET": "NOTIZEN ANZEIGEN", "EDIT LAYOUT // SHOW MOVE CONTROLS": "LAYOUT BEARBEITEN",
    "WIDGET PROTOCOL": "WIDGET-ANORDNUNG", "ENABLE MOVE CONTROLS TO REORDER PANELS": "STEUERUNG ZUM NEUORDNEN AKTIVIEREN",
    "WIDGET SIZE": "WIDGET-GRÖSSE", SMALL: "KLEIN", MEDIUM: "MITTEL", LARGE: "GROSS",
    "GRID COLUMNS": "RASTERSPALTEN", "INTERFACE DENSITY": "OBERFLÄCHENDICHTE",
    COMPACT: "KOMPAKT", BALANCED: "AUSGEWOGEN", EXPANDED: "ERWEITERT",
    "FULL HUD": "VOLLES HUD", "FOCUS MODE": "FOKUSMODUS", "COMMAND CENTER": "KOMMANDOZENTRALE",
    "MINIMAL GLASS": "MINIMAL GLASS", "COLOR PROTOCOL": "FARBEN",
    "ELECTRIC PURPLE": "ELEKTRISCHES VIOLETT", "NEON PINK": "NEONPINK",
    "NIGHT CITY": "NACHTSTADT", "BLACK ICE": "BLACK ICE", "GLASS TRANSPARENCY": "GLASTRANSPARENZ",
    "ABOUT // CONTACT": "INFO // KONTAKT", "COPY REPORT": "BERICHT KOPIEREN",
    "EMAIL REPORT": "BERICHT PER E-MAIL",
    "Found a bug, visual glitch or broken shortcut? Your report opens as a draft to josue.dev.0210@outlook.com. Review and send it from your email app. No bookmark data is included.": "Fehler oder defekter Link? Der Bericht wird als Entwurf an josue.dev.0210@outlook.com geöffnet. Bitte prüfen und selbst senden. Es werden keine Lesezeichen eingefügt.",
    "SHOW TUTORIAL": "TUTORIAL ANZEIGEN", "NO REPORT GENERATED": "KEIN BERICHT ERSTELLT",
    "Describe the bug or error...": "Beschreibe den Fehler...",
    "ADD A DESCRIPTION FIRST": "ZUERST EINE BESCHREIBUNG EINGEBEN",
    "REPORT COPIED // READY TO SEND": "BERICHT KOPIERT // BEREIT ZUM SENDEN",
    "OPENING EMAIL DRAFT // REVIEW AND SEND": "E-MAIL-ENTWURF GEÖFFNET // BITTE PRÜFEN",
    "FIRST INSTALL // LOCAL SETUP": "ERSTE INSTALLATION // LOKALE EINRICHTUNG",
    "WELCOME TO THE NODE": "WILLKOMMEN IM KNOTEN",
    "Your private bookmark workspace is ready. Everything below stays on this device.": "Dein privater Lesezeichenbereich ist bereit. Alle Daten bleiben auf diesem Gerät.",
    "ENTER DASHBOARD": "ZUM DASHBOARD",
    "Search Google...": "Mit Google suchen...", TASKS: "AUFGABEN", NOTES: "NOTIZEN",
    "Add a task...": "Aufgabe hinzufügen...", "Write a private note...": "Private Notiz schreiben...",
    "Recent connections": "Letzte Verbindungen", "ACTIVE BOARD": "AKTIVES BOARD",
    "No signals found in the network.": "Keine Ergebnisse gefunden.", "OPEN LINK ↗": "LINK ÖFFNEN ↗",
    EDIT: "BEARBEITEN", DELETE: "LÖSCHEN", RENAME: "UMBENENNEN", RECENT: "NEUESTE",
    DEFAULT: "STANDARD", RESTORE: "WIEDERHERSTELLEN", REMOVE: "ENTFERNEN",
    "BOOKMARKS BAR": "LESEZEICHNENLEISTE", "OTHER BOOKMARKS": "WEITERE LESEZEICHEN",
    "Search local actions...": "Lokale Aktionen suchen...", "COMMAND PALETTE": "BEFEHLSPALETTE",
  },
  pt: {
    "VISUAL SYSTEM": "SISTEMA VISUAL", LANGUAGE: "IDIOMA", "ICON SIZE": "TAMANHO DOS ÍCONES",
    "CUSTOM AI SHORTCUTS": "ATALHOS PERSONALIZADOS DE IA", "SERVICE NAME": "NOME DO SERVIÇO",
    ADD: "ADICIONAR", "DISPLAY NAME": "NOME DE EXIBIÇÃO", "AUTO PROFILE NAME": "NOME AUTOMÁTICO DO PERFIL",
    SAVE: "SALVAR", "USE AUTO PROFILE NAME": "USAR NOME AUTOMÁTICO",
    "CUSTOM BRAND": "MARCA PERSONALIZADA", "RESET BRAND NAME": "RESTAURAR MARCA",
    "BACKGROUND INTENSITY": "INTENSIDADE DO PLANO DE FUNDO", "LOCAL BACKGROUND": "PLANO DE FUNDO LOCAL",
    "SHOW HUD CLOCK": "MOSTRAR RELÓGIO HUD", "SHOW NETRUNNER MESSAGES": "MOSTRAR MENSAGENS NETRUNNER",
    "REDUCE MOTION EFFECTS": "REDUZIR ANIMAÇÕES", "SHOW TASKS WIDGET": "MOSTRAR TAREFAS",
    "SHOW NOTES WIDGET": "MOSTRAR NOTAS", "EDIT LAYOUT // SHOW MOVE CONTROLS": "EDITAR LAYOUT",
    "WIDGET PROTOCOL": "ORGANIZAÇÃO DOS WIDGETS", "ENABLE MOVE CONTROLS TO REORDER PANELS": "ATIVE OS CONTROLES PARA REORDENAR",
    "WIDGET SIZE": "TAMANHO DOS WIDGETS", SMALL: "PEQUENO", MEDIUM: "MÉDIO", LARGE: "GRANDE",
    "GRID COLUMNS": "COLUNAS DA GRADE", "INTERFACE DENSITY": "DENSIDADE DA INTERFACE",
    COMPACT: "COMPACTA", BALANCED: "EQUILIBRADA", EXPANDED: "AMPLIADA",
    "FULL HUD": "HUD COMPLETO", "FOCUS MODE": "MODO FOCO", "COMMAND CENTER": "CENTRAL DE COMANDO",
    "MINIMAL GLASS": "VIDRO MÍNIMO", "COLOR PROTOCOL": "CORES",
    "ELECTRIC PURPLE": "ROXO ELÉTRICO", "NEON PINK": "ROSA NEON",
    "NIGHT CITY": "CIDADE NOTURNA", "BLACK ICE": "GELO NEGRO", "GLASS TRANSPARENCY": "TRANSPARÊNCIA DO VIDRO",
    "ABOUT // CONTACT": "SOBRE // CONTATO", "COPY REPORT": "COPIAR RELATÓRIO",
    "EMAIL REPORT": "ENVIAR POR E-MAIL",
    "Found a bug, visual glitch or broken shortcut? Your report opens as a draft to josue.dev.0210@outlook.com. Review and send it from your email app. No bookmark data is included.": "Encontrou um erro ou atalho quebrado? O relatório será aberto como rascunho para josue.dev.0210@outlook.com. Revise e envie pelo seu e-mail. Nenhum favorito será incluído.",
    "SHOW TUTORIAL": "MOSTRAR TUTORIAL", "NO REPORT GENERATED": "NENHUM RELATÓRIO GERADO",
    "Describe the bug or error...": "Descreva o problema...",
    "ADD A DESCRIPTION FIRST": "ESCREVA UMA DESCRIÇÃO PRIMEIRO",
    "REPORT COPIED // READY TO SEND": "RELATÓRIO COPIADO // PRONTO PARA ENVIAR",
    "OPENING EMAIL DRAFT // REVIEW AND SEND": "RASCUNHO ABERTO // REVISE E ENVIE",
    "FIRST INSTALL // LOCAL SETUP": "PRIMEIRA INSTALAÇÃO // CONFIGURAÇÃO LOCAL",
    "WELCOME TO THE NODE": "BEM-VINDO AO NÓ",
    "Your private bookmark workspace is ready. Everything below stays on this device.": "Seu espaço privado de favoritos está pronto. Tudo permanece neste dispositivo.",
    "ENTER DASHBOARD": "ENTRAR NO PAINEL",
    "Search Google...": "Pesquisar no Google...", TASKS: "TAREFAS", NOTES: "NOTAS",
    "Add a task...": "Adicionar uma tarefa...", "Write a private note...": "Escreva uma nota privada...",
    "Recent connections": "Conexões recentes", "ACTIVE BOARD": "PAINEL ATIVO",
    "No signals found in the network.": "Nenhum resultado encontrado.", "OPEN LINK ↗": "ABRIR LINK ↗",
    EDIT: "EDITAR", DELETE: "EXCLUIR", RENAME: "RENOMEAR", RECENT: "RECENTES",
    DEFAULT: "PADRÃO", RESTORE: "RESTAURAR", REMOVE: "REMOVER",
    "BOOKMARKS BAR": "BARRA DE FAVORITOS", "OTHER BOOKMARKS": "OUTROS FAVORITOS",
    "Search local actions...": "Pesquisar ações locais...", "COMMAND PALETTE": "PALETA DE COMANDOS",
  },
  it: {
    "VISUAL SYSTEM": "SISTEMA VISIVO", LANGUAGE: "LINGUA", "ICON SIZE": "DIMENSIONE ICONE",
    "CUSTOM AI SHORTCUTS": "SCORCIATOIE IA PERSONALIZZATE", "SERVICE NAME": "NOME DEL SERVIZIO",
    ADD: "AGGIUNGI", "DISPLAY NAME": "NOME VISUALIZZATO", "AUTO PROFILE NAME": "NOME PROFILO AUTOMATICO",
    SAVE: "SALVA", "USE AUTO PROFILE NAME": "USA NOME AUTOMATICO",
    "CUSTOM BRAND": "MARCHIO PERSONALIZZATO", "RESET BRAND NAME": "RIPRISTINA MARCHIO",
    "BACKGROUND INTENSITY": "INTENSITÀ SFONDO", "LOCAL BACKGROUND": "SFONDO LOCALE",
    "SHOW HUD CLOCK": "MOSTRA OROLOGIO HUD", "SHOW NETRUNNER MESSAGES": "MOSTRA MESSAGGI NETRUNNER",
    "REDUCE MOTION EFFECTS": "RIDUCI ANIMAZIONI", "SHOW TASKS WIDGET": "MOSTRA ATTIVITÀ",
    "SHOW NOTES WIDGET": "MOSTRA NOTE", "EDIT LAYOUT // SHOW MOVE CONTROLS": "MODIFICA LAYOUT",
    "WIDGET PROTOCOL": "DISPOSIZIONE WIDGET", "ENABLE MOVE CONTROLS TO REORDER PANELS": "ATTIVA I COMANDI PER RIORDINARE",
    "WIDGET SIZE": "DIMENSIONE WIDGET", SMALL: "PICCOLO", MEDIUM: "MEDIO", LARGE: "GRANDE",
    "GRID COLUMNS": "COLONNE GRIGLIA", "INTERFACE DENSITY": "DENSITÀ INTERFACCIA",
    COMPACT: "COMPATTA", BALANCED: "BILANCIATA", EXPANDED: "ESPANSA",
    "FULL HUD": "HUD COMPLETO", "FOCUS MODE": "MODALITÀ CONCENTRAZIONE", "COMMAND CENTER": "CENTRO DI COMANDO",
    "MINIMAL GLASS": "VETRO MINIMALE", "COLOR PROTOCOL": "COLORI",
    "ELECTRIC PURPLE": "VIOLA ELETTRICO", "NEON PINK": "ROSA NEON",
    "NIGHT CITY": "CITTÀ NOTTURNA", "BLACK ICE": "GHIACCIO NERO", "GLASS TRANSPARENCY": "TRASPARENZA VETRO",
    "ABOUT // CONTACT": "INFO // CONTATTI", "COPY REPORT": "COPIA SEGNALAZIONE",
    "EMAIL REPORT": "INVIA VIA E-MAIL",
    "Found a bug, visual glitch or broken shortcut? Your report opens as a draft to josue.dev.0210@outlook.com. Review and send it from your email app. No bookmark data is included.": "Hai trovato un errore o una scorciatoia non funzionante? Il rapporto sarà preparato per josue.dev.0210@outlook.com. Controllalo e invialo dalla tua e-mail. Nessun preferito sarà incluso.",
    "SHOW TUTORIAL": "MOSTRA TUTORIAL", "NO REPORT GENERATED": "NESSUNA SEGNALAZIONE CREATA",
    "Describe the bug or error...": "Descrivi il problema...",
    "ADD A DESCRIPTION FIRST": "INSERISCI PRIMA UNA DESCRIZIONE",
    "REPORT COPIED // READY TO SEND": "SEGNALAZIONE COPIATA // PRONTA",
    "OPENING EMAIL DRAFT // REVIEW AND SEND": "BOZZA E-MAIL APERTA // CONTROLLA E INVIA",
    "FIRST INSTALL // LOCAL SETUP": "PRIMA INSTALLAZIONE // CONFIGURAZIONE LOCALE",
    "WELCOME TO THE NODE": "BENVENUTO NEL NODO",
    "Your private bookmark workspace is ready. Everything below stays on this device.": "Il tuo spazio privato è pronto. Tutto rimane su questo dispositivo.",
    "ENTER DASHBOARD": "ENTRA NELLA DASHBOARD",
    "Search Google...": "Cerca con Google...", TASKS: "ATTIVITÀ", NOTES: "NOTE",
    "Add a task...": "Aggiungi un'attività...", "Write a private note...": "Scrivi una nota privata...",
    "Recent connections": "Connessioni recenti", "ACTIVE BOARD": "RACCOLTA ATTIVA",
    "No signals found in the network.": "Nessun risultato trovato.", "OPEN LINK ↗": "APRI LINK ↗",
    EDIT: "MODIFICA", DELETE: "ELIMINA", RENAME: "RINOMINA", RECENT: "RECENTI",
    DEFAULT: "PREDEFINITO", RESTORE: "RIPRISTINA", REMOVE: "RIMUOVI",
    "BOOKMARKS BAR": "BARRA DEI PREFERITI", "OTHER BOOKMARKS": "ALTRI PREFERITI",
    "Search local actions...": "Cerca azioni locali...", "COMMAND PALETTE": "PALETTE COMANDI",
  },
  ja: {
    "VISUAL SYSTEM": "ビジュアル設定", LANGUAGE: "言語", "ICON SIZE": "アイコンサイズ",
    "CUSTOM AI SHORTCUTS": "カスタムAIショートカット", "SERVICE NAME": "サービス名",
    ADD: "追加", "DISPLAY NAME": "表示名", "AUTO PROFILE NAME": "自動プロフィール名",
    SAVE: "保存", "USE AUTO PROFILE NAME": "自動名を使用",
    "CUSTOM BRAND": "カスタムブランド", "RESET BRAND NAME": "ブランドをリセット",
    "BACKGROUND INTENSITY": "背景の強さ",
    "LOCAL BACKGROUND": "ローカル背景", "SHOW HUD CLOCK": "HUD時計を表示",
    "SHOW NETRUNNER MESSAGES": "メッセージを表示", "REDUCE MOTION EFFECTS": "動きを減らす",
    "SHOW TASKS WIDGET": "タスクを表示", "SHOW NOTES WIDGET": "メモを表示",
    "EDIT LAYOUT // SHOW MOVE CONTROLS": "レイアウトを編集",     "WIDGET PROTOCOL": "ウィジェット配置", "ENABLE MOVE CONTROLS TO REORDER PANELS": "並べ替え操作を有効にする",
    "WIDGET SIZE": "ウィジェットサイズ",
    SMALL: "小", MEDIUM: "中", LARGE: "大", "GRID COLUMNS": "グリッド列数",
    "INTERFACE DENSITY": "表示密度", COMPACT: "コンパクト", BALANCED: "標準", EXPANDED: "広め",
    "FULL HUD": "フルHUD", "FOCUS MODE": "集中モード", "COMMAND CENTER": "コマンドセンター",
    "MINIMAL GLASS": "ミニマルガラス", "COLOR PROTOCOL": "カラーテーマ",
    "ELECTRIC PURPLE": "エレクトリックパープル",
    "NEON PINK": "ネオンピンク", "NIGHT CITY": "ナイトシティ", "BLACK ICE": "ブラックアイス",
    "GLASS TRANSPARENCY": "ガラスの透明度", "ABOUT // CONTACT": "情報 // お問い合わせ",
    "COPY REPORT": "レポートをコピー", "EMAIL REPORT": "メールで報告",
    "Found a bug, visual glitch or broken shortcut? Your report opens as a draft to josue.dev.0210@outlook.com. Review and send it from your email app. No bookmark data is included.": "不具合やリンク切れを見つけましたか？josue.dev.0210@outlook.com 宛ての下書きを開きます。内容を確認して送信してください。ブックマーク情報は含まれません。",
    "SHOW TUTORIAL": "チュートリアルを表示", "NO REPORT GENERATED": "レポートはまだありません",
    "Describe the bug or error...": "問題の内容を入力...",
    "ADD A DESCRIPTION FIRST": "先に問題の説明を入力してください",
    "REPORT COPIED // READY TO SEND": "レポートをコピーしました // 送信できます",
    "OPENING EMAIL DRAFT // REVIEW AND SEND": "メールの下書きを開きます // 内容を確認して送信",
    "FIRST INSTALL // LOCAL SETUP": "初回起動 // ローカル設定",
    "WELCOME TO THE NODE": "ノードへようこそ",
    "Your private bookmark workspace is ready. Everything below stays on this device.": "ブックマーク環境の準備ができました。データはこの端末内に保存されます。",
    "ENTER DASHBOARD": "ダッシュボードへ",
    "Search Google...": "Googleで検索...",
    TASKS: "タスク", NOTES: "メモ", "Add a task...": "タスクを追加...",
    "Write a private note...": "メモを入力...", "Recent connections": "最近のリンク",
    "ACTIVE BOARD": "選択中のボード", "No signals found in the network.": "結果がありません。",
    "OPEN LINK ↗": "リンクを開く ↗", EDIT: "編集", DELETE: "削除", RENAME: "名前を変更",
    DEFAULT: "デフォルト", RESTORE: "復元", REMOVE: "削除",
    RECENT: "最近", "BOOKMARKS BAR": "ブックマークバー", "OTHER BOOKMARKS": "その他のブックマーク",
    "Search local actions...": "操作を検索...", "COMMAND PALETTE": "コマンドパレット",
  },
  zh: {
    "VISUAL SYSTEM": "视觉系统", LANGUAGE: "语言", "ICON SIZE": "图标大小",
    "CUSTOM AI SHORTCUTS": "自定义 AI 快捷方式", ADD: "添加", "DISPLAY NAME": "显示名称",
    SAVE: "保存", "CUSTOM BRAND": "自定义品牌", "BACKGROUND INTENSITY": "背景强度",
    "LOCAL BACKGROUND": "本地背景", "SHOW HUD CLOCK": "显示 HUD 时钟",
    "SHOW NETRUNNER MESSAGES": "显示提示信息", "REDUCE MOTION EFFECTS": "减少动态效果",
    "SHOW TASKS WIDGET": "显示任务", "SHOW NOTES WIDGET": "显示便笺",
    "EDIT LAYOUT // SHOW MOVE CONTROLS": "编辑布局", "WIDGET SIZE": "组件大小",
    SMALL: "小", MEDIUM: "中", LARGE: "大", "GRID COLUMNS": "网格列数",
    "INTERFACE DENSITY": "界面密度", COMPACT: "紧凑", BALANCED: "均衡", EXPANDED: "宽松",
    "COLOR PROTOCOL": "配色方案", "ELECTRIC PURPLE": "电光紫", "NEON PINK": "霓虹粉",
    "NIGHT CITY": "夜之城", "BLACK ICE": "黑冰", "GLASS TRANSPARENCY": "玻璃透明度",
    "ABOUT // CONTACT": "关于 // 联系", "COPY REPORT": "复制报告", "EMAIL REPORT": "发送邮件",
    "Found a bug, visual glitch or broken shortcut? Your report opens as a draft to josue.dev.0210@outlook.com. Review and send it from your email app. No bookmark data is included.": "发现错误或快捷方式失效？报告将作为邮件草稿发送至 josue.dev.0210@outlook.com。请检查后手动发送，不会包含书签数据。",
    "SHOW TUTORIAL": "显示教程", "NO REPORT GENERATED": "尚未生成报告",
    "Describe the bug or error...": "描述遇到的问题...",
    "ADD A DESCRIPTION FIRST": "请先填写问题描述",
    "REPORT COPIED // READY TO SEND": "报告已复制 // 可以发送",
    "OPENING EMAIL DRAFT // REVIEW AND SEND": "正在打开邮件草稿 // 请检查并发送",
    "FIRST INSTALL // LOCAL SETUP": "首次安装 // 本地设置",
    "WELCOME TO THE NODE": "欢迎进入节点",
    "Your private bookmark workspace is ready. Everything below stays on this device.": "私人书签工作区已准备就绪。所有数据都保留在此设备上。",
    "ENTER DASHBOARD": "进入面板",
    "Search Google...": "搜索 Google...", TASKS: "任务",
    NOTES: "便笺", "Add a task...": "添加任务...", "Write a private note...": "写下私人便笺...",
    "Recent connections": "最近访问", "ACTIVE BOARD": "当前书签栏",
    "No signals found in the network.": "没有找到结果。", "OPEN LINK ↗": "打开链接 ↗",
    EDIT: "编辑", DELETE: "删除", RENAME: "重命名", RECENT: "最近",
    DEFAULT: "默认", RESTORE: "恢复", REMOVE: "移除",
    "BOOKMARKS BAR": "书签栏", "OTHER BOOKMARKS": "其他书签",
    "Search local actions...": "搜索操作...", "COMMAND PALETTE": "命令面板",
  },
  ko: {
    "VISUAL SYSTEM": "비주얼 시스템", LANGUAGE: "언어", "ICON SIZE": "아이콘 크기",
    "CUSTOM AI SHORTCUTS": "사용자 지정 AI 바로가기", "SERVICE NAME": "서비스 이름",
    ADD: "추가", "DISPLAY NAME": "표시 이름", "AUTO PROFILE NAME": "자동 프로필 이름",
    SAVE: "저장", "USE AUTO PROFILE NAME": "자동 이름 사용",
    "CUSTOM BRAND": "사용자 지정 브랜드", "RESET BRAND NAME": "브랜드 초기화",
    "BACKGROUND INTENSITY": "배경 강도",
    "LOCAL BACKGROUND": "로컬 배경", "SHOW HUD CLOCK": "HUD 시계 표시",
    "SHOW NETRUNNER MESSAGES": "메시지 표시", "REDUCE MOTION EFFECTS": "동작 효과 줄이기",
    "SHOW TASKS WIDGET": "작업 표시", "SHOW NOTES WIDGET": "메모 표시",
    "EDIT LAYOUT // SHOW MOVE CONTROLS": "레이아웃 편집",     "WIDGET PROTOCOL": "위젯 배치", "ENABLE MOVE CONTROLS TO REORDER PANELS": "패널 재정렬 컨트롤 사용",
    "WIDGET SIZE": "위젯 크기",
    SMALL: "작게", MEDIUM: "보통", LARGE: "크게", "GRID COLUMNS": "그리드 열",
    "INTERFACE DENSITY": "인터페이스 밀도", COMPACT: "간결하게", BALANCED: "균형 있게", EXPANDED: "넓게",
    "FULL HUD": "전체 HUD", "FOCUS MODE": "집중 모드", "COMMAND CENTER": "명령 센터",
    "MINIMAL GLASS": "미니멀 글래스", "COLOR PROTOCOL": "색상 테마",
    "ELECTRIC PURPLE": "일렉트릭 퍼플", "NEON PINK": "네온 핑크",
    "NIGHT CITY": "나이트 시티", "BLACK ICE": "블랙 아이스", "GLASS TRANSPARENCY": "유리 투명도",
    "ABOUT // CONTACT": "정보 // 연락처", "COPY REPORT": "보고서 복사", "EMAIL REPORT": "이메일 보내기",
    "Found a bug, visual glitch or broken shortcut? Your report opens as a draft to josue.dev.0210@outlook.com. Review and send it from your email app. No bookmark data is included.": "오류나 작동하지 않는 바로가기를 찾으셨나요? josue.dev.0210@outlook.com으로 보낼 이메일 초안이 열립니다. 내용을 확인한 뒤 직접 보내세요. 북마크 정보는 포함되지 않습니다.",
    "SHOW TUTORIAL": "튜토리얼 보기", "NO REPORT GENERATED": "보고서가 생성되지 않았습니다",
    "Describe the bug or error...": "문제 설명을 입력하세요...",
    "ADD A DESCRIPTION FIRST": "먼저 문제를 설명해 주세요",
    "REPORT COPIED // READY TO SEND": "보고서 복사됨 // 전송 준비 완료",
    "OPENING EMAIL DRAFT // REVIEW AND SEND": "이메일 초안 열기 // 확인 후 전송",
    "FIRST INSTALL // LOCAL SETUP": "최초 설치 // 로컬 설정",
    "WELCOME TO THE NODE": "노드에 오신 것을 환영합니다",
    "Your private bookmark workspace is ready. Everything below stays on this device.": "개인 북마크 공간이 준비되었습니다. 모든 데이터는 이 기기에 저장됩니다.",
    "ENTER DASHBOARD": "대시보드 열기",
    "Search Google...": "Google 검색...", TASKS: "작업",
    NOTES: "메모", "Add a task...": "작업 추가...", "Write a private note...": "비공개 메모 작성...",
    "Recent connections": "최근 연결", "ACTIVE BOARD": "현재 보드",
    "No signals found in the network.": "검색 결과가 없습니다.", "OPEN LINK ↗": "링크 열기 ↗",
    EDIT: "수정", DELETE: "삭제", RENAME: "이름 변경", RECENT: "최근",
    DEFAULT: "기본값", RESTORE: "복원", REMOVE: "제거",
    "BOOKMARKS BAR": "북마크바", "OTHER BOOKMARKS": "기타 북마크",
    "Search local actions...": "작업 검색...", "COMMAND PALETTE": "명령 팔레트",
  },
  ru: {
    "VISUAL SYSTEM": "ВИЗУАЛЬНАЯ СИСТЕМА", LANGUAGE: "ЯЗЫК", "ICON SIZE": "РАЗМЕР ЗНАЧКОВ",
    "CUSTOM AI SHORTCUTS": "СВОИ ССЫЛКИ НА ИИ", "SERVICE NAME": "НАЗВАНИЕ СЕРВИСА",
    ADD: "ДОБАВИТЬ", "DISPLAY NAME": "ИМЯ", "AUTO PROFILE NAME": "ИМЯ ПРОФИЛЯ ПО УМОЛЧАНИЮ",
    SAVE: "СОХРАНИТЬ", "USE AUTO PROFILE NAME": "ИСПОЛЬЗОВАТЬ ИМЯ ПО УМОЛЧАНИЮ",
    "CUSTOM BRAND": "СВОЙ БРЕНД", "RESET BRAND NAME": "СБРОСИТЬ БРЕНД",
    "BACKGROUND INTENSITY": "ЯРКОСТЬ ФОНА",
    "LOCAL BACKGROUND": "ЛОКАЛЬНЫЙ ФОН", "SHOW HUD CLOCK": "ПОКАЗЫВАТЬ ЧАСЫ HUD",
    "SHOW NETRUNNER MESSAGES": "ПОКАЗЫВАТЬ СООБЩЕНИЯ", "REDUCE MOTION EFFECTS": "УМЕНЬШИТЬ АНИМАЦИЮ",
    "SHOW TASKS WIDGET": "ПОКАЗЫВАТЬ ЗАДАЧИ", "SHOW NOTES WIDGET": "ПОКАЗЫВАТЬ ЗАМЕТКИ",
    "EDIT LAYOUT // SHOW MOVE CONTROLS": "ИЗМЕНИТЬ РАСКЛАДКУ",     "WIDGET PROTOCOL": "РАСПОЛОЖЕНИЕ ВИДЖЕТОВ", "ENABLE MOVE CONTROLS TO REORDER PANELS": "ВКЛЮЧИТЕ УПРАВЛЕНИЕ ДЛЯ ПЕРЕСТАНОВКИ",
    "WIDGET SIZE": "РАЗМЕР ВИДЖЕТА",
    SMALL: "МАЛЫЙ", MEDIUM: "СРЕДНИЙ", LARGE: "БОЛЬШОЙ", "GRID COLUMNS": "СТОЛБЦЫ СЕТКИ",
    "INTERFACE DENSITY": "ПЛОТНОСТЬ ИНТЕРФЕЙСА", COMPACT: "КОМПАКТНАЯ", BALANCED: "СБАЛАНСИРОВАННАЯ",
    EXPANDED: "РАСШИРЕННАЯ",     "FULL HUD": "ПОЛНЫЙ HUD", "FOCUS MODE": "РЕЖИМ ФОКУСА", "COMMAND CENTER": "ЦЕНТР КОМАНД",
    "MINIMAL GLASS": "МИНИМАЛЬНОЕ СТЕКЛО", "COLOR PROTOCOL": "ЦВЕТОВАЯ СХЕМА",
    "ELECTRIC PURPLE": "ЭЛЕКТРИЧЕСКИЙ ФИОЛЕТОВЫЙ", "NEON PINK": "НЕОНОВЫЙ РОЗОВЫЙ",
    "NIGHT CITY": "НОЧНОЙ ГОРОД", "BLACK ICE": "ЧЁРНЫЙ ЛЁД", "GLASS TRANSPARENCY": "ПРОЗРАЧНОСТЬ СТЕКЛА",
    "ABOUT // CONTACT": "О ПРОГРАММЕ // КОНТАКТЫ", "COPY REPORT": "КОПИРОВАТЬ ОТЧЁТ",
    "EMAIL REPORT": "ОТПРАВИТЬ ПО ПОЧТЕ",
    "Found a bug, visual glitch or broken shortcut? Your report opens as a draft to josue.dev.0210@outlook.com. Review and send it from your email app. No bookmark data is included.": "Нашли ошибку или неработающую ссылку? Черновик отчёта будет адресован josue.dev.0210@outlook.com. Проверьте его и отправьте вручную. Данные закладок не включаются.",
    "SHOW TUTORIAL": "ПОКАЗАТЬ ОБУЧЕНИЕ", "NO REPORT GENERATED": "ОТЧЁТ НЕ СОЗДАН",
    "Describe the bug or error...": "Опишите проблему...",
    "ADD A DESCRIPTION FIRST": "СНАЧАЛА ДОБАВЬТЕ ОПИСАНИЕ",
    "REPORT COPIED // READY TO SEND": "ОТЧЁТ СКОПИРОВАН // ГОТОВ К ОТПРАВКЕ",
    "OPENING EMAIL DRAFT // REVIEW AND SEND": "ОТКРЫТ ЧЕРНОВИК // ПРОВЕРЬТЕ И ОТПРАВЬТЕ",
    "FIRST INSTALL // LOCAL SETUP": "ПЕРВЫЙ ЗАПУСК // ЛОКАЛЬНАЯ НАСТРОЙКА",
    "WELCOME TO THE NODE": "ДОБРО ПОЖАЛОВАТЬ В УЗЕЛ",
    "Your private bookmark workspace is ready. Everything below stays on this device.": "Ваше личное пространство закладок готово. Все данные остаются на этом устройстве.",
    "ENTER DASHBOARD": "ОТКРЫТЬ ПАНЕЛЬ",
    "Search Google...": "Поиск Google...", TASKS: "ЗАДАЧИ", NOTES: "ЗАМЕТКИ",
    "Add a task...": "Добавить задачу...", "Write a private note...": "Написать личную заметку...",
    "Recent connections": "Недавние ссылки", "ACTIVE BOARD": "ТЕКУЩАЯ ПАПКА",
    "No signals found in the network.": "Ничего не найдено.", "OPEN LINK ↗": "ОТКРЫТЬ ССЫЛКУ ↗",
    EDIT: "ИЗМЕНИТЬ", DELETE: "УДАЛИТЬ", RENAME: "ПЕРЕИМЕНОВАТЬ", RECENT: "НЕДАВНИЕ",
    DEFAULT: "ПО УМОЛЧАНИЮ", RESTORE: "ВОССТАНОВИТЬ", REMOVE: "УБРАТЬ",
    "BOOKMARKS BAR": "ПАНЕЛЬ ЗАКЛАДОК", "OTHER BOOKMARKS": "ДРУГИЕ ЗАКЛАДКИ",
    "Search local actions...": "Поиск действий...", "COMMAND PALETTE": "ПАЛИТРА КОМАНД",
  },
};

const languageLocales = {
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
  de: "de-DE",
  pt: "pt-BR",
  it: "it-IT",
  ja: "ja-JP",
  zh: "zh-CN",
  ko: "ko-KR",
  ru: "ru-RU",
};
const supportedLanguages = ["en", "es", ...Object.keys(additionalTranslations)];
const reverseTranslations = Object.fromEntries(
  Object.entries(translations).map(([english, spanish]) => [spanish, english])
);
const reverseAdditionalTranslations = Object.fromEntries(
  Object.entries(additionalTranslations).map(([language, entries]) => [
    language,
    Object.fromEntries(Object.entries(entries).map(([english, translated]) => [translated, english])),
  ])
);
const originalTextValues = new WeakMap();
const originalAttributeValues = new WeakMap();

function translateValue(value, language) {
  const reverseDictionary = language === "es"
    ? reverseTranslations
    : reverseAdditionalTranslations[language] || {};
  const english = reverseDictionary[value] || value;
  if (language === "es") return translations[english] || english;
  if (language === "en") return english;
  return additionalTranslations[language]?.[english] || english;
}

function applyLanguage(language = "en", persist = true) {
  activeLanguage = supportedLanguages.includes(language) ? language : "en";
  document.documentElement.lang = activeLanguage;
  if (languageSelect) languageSelect.value = activeLanguage;

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let textNode = walker.nextNode();
  while (textNode) {
    const parent = textNode.parentElement;
    const dynamicContent = parent?.closest(
      "#bookmarks-grid, #board-nav, #bookmarks-title, #task-list, #notes-input, #bug-report-input, #profile-name, #custom-ai-list, .brand-title, .ai-providers"
    );
    if (parent && !dynamicContent) {
      if (!originalTextValues.has(textNode)) {
        originalTextValues.set(textNode, textNode.textContent || "");
      }
      const original = originalTextValues.get(textNode);
      const trimmed = original.trim();
      const translated = translateValue(trimmed, activeLanguage);
      textNode.textContent = original.replace(trimmed, translated);
    }
    textNode = walker.nextNode();
  }

  document.querySelectorAll("[placeholder], [aria-label], [title]").forEach((element) => {
    if (!originalAttributeValues.has(element)) originalAttributeValues.set(element, {});
    const originals = originalAttributeValues.get(element);
    for (const attribute of ["placeholder", "aria-label", "title"]) {
      const value = element.getAttribute(attribute);
      if (value && !(attribute in originals)) originals[attribute] = value;
      if (originals[attribute]) {
        element.setAttribute(attribute, translateValue(originals[attribute], activeLanguage));
      }
    }
  });
  document.querySelectorAll("[data-i18n-key]").forEach((element) => {
    element.textContent = translateValue(element.dataset.i18nKey, activeLanguage);
  });
  document.querySelectorAll(".folder-meta").forEach((element) => {
    const match = element.textContent?.match(/^(\d+)\s+(LINKS|ENLACES)$/);
    if (match) {
      const label = activeLanguage === "es" ? "ENLACES" : "LINKS";
      element.textContent = `${match[1]} ${label}`;
    }
  });
  renderBoardNavigation();
  renderCustomAiShortcuts();
  applyGlassOpacity(glassOpacity?.value || "0.58");
  const displayedCount = Number.parseInt(bookmarkCount?.textContent || "", 10);
  if (Number.isFinite(displayedCount)) updateStatus(displayedCount);
  if (bookmarksTitle && activeBoardId === "recent") {
    bookmarksTitle.textContent = translateValue("Recent connections", activeLanguage);
  } else if (bookmarksTitle && activeBoardId === null) {
    bookmarksTitle.textContent = translateValue("Select a connection board", activeLanguage);
  }
  updateHud();
  if (persist) saveUserSettings({ language: activeLanguage });
}

languageSelect?.addEventListener("change", () => {
  applyLanguage(languageSelect.value);
  if (commandPalette && !commandPalette.hidden) renderCommandActions(commandPaletteInput?.value || "");
});
iconSizeInput?.addEventListener("input", () => {
  applyIconSize(iconSizeInput.value);
  saveUserSettings({ iconSize: iconSizeInput.value });
});

taskForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;
  localTasks.unshift({ id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, text, done: false });
  taskInput.value = "";
  saveUserSettings({ localTasks });
  renderTasks();
});

notesInput?.addEventListener("input", () => {
  saveUserSettings({ localNote: notesInput.value });
});

function showOnboarding() {
  if (onboardingOverlay) onboardingOverlay.hidden = false;
  onboardingClose?.focus();
}

function hideOnboarding() {
  if (onboardingOverlay) onboardingOverlay.hidden = true;
  saveUserSettings({ onboardingComplete: true });
}

onboardingClose?.addEventListener("click", hideOnboarding);
showTutorialButton?.addEventListener("click", showOnboarding);
onboardingOverlay?.addEventListener("keydown", (event) => {
  if (event.key === "Escape") hideOnboarding();
});

function buildBugReport(description) {
  return [
    "DEMONTECH-BOOKMARKS BUG REPORT",
    `DATE: ${new Date().toISOString()}`,
    `BROWSER: ${navigator.userAgent}`,
    "",
    "DESCRIPTION:",
    description,
  ].join("\n");
}

function getBugReportDescription() {
  const description = bugReportInput?.value.trim();
  if (!description) {
    if (bugReportStatus) bugReportStatus.textContent = translateValue("ADD A DESCRIPTION FIRST", activeLanguage);
    bugReportInput?.focus();
    return "";
  }
  return description;
}

copyBugReportButton?.addEventListener("click", async () => {
  const description = getBugReportDescription();
  if (!description) return;
  const report = buildBugReport(description);

  try {
    await navigator.clipboard.writeText(report);
    if (bugReportStatus) bugReportStatus.textContent = translateValue("REPORT COPIED // READY TO SEND", activeLanguage);
  } catch {
    if (bugReportStatus) bugReportStatus.textContent = translateValue("COPY BLOCKED // SELECT TEXT MANUALLY", activeLanguage);
    bugReportInput.value = report;
    bugReportInput.select();
  }
});

emailBugReportButton?.addEventListener("click", () => {
  const description = getBugReportDescription();
  if (!description) return;

  const subject = encodeURIComponent("DEMONTECH-BOOKMARKS bug report");
  const body = encodeURIComponent(buildBugReport(description));
  const recipient = "josue.dev.0210@outlook.com";
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  if (bugReportStatus) {
    bugReportStatus.textContent = translateValue("OPENING EMAIL DRAFT // REVIEW AND SEND", activeLanguage);
  }
});
let quoteTypingTimer = null;
let quoteSequenceId = 0;

function getSafeExternalUrl(value) {
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
}

function createShortcutIcon(name) {
  const svgNamespace = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNamespace, "svg");
  const frame = document.createElementNS(svgNamespace, "path");
  const initials = document.createElementNS(svgNamespace, "text");
  const normalizedName = name.trim().split(/\s+/).filter(Boolean);
  const label = normalizedName.length > 1
    ? `${normalizedName[0][0]}${normalizedName[normalizedName.length - 1][0]}`
    : normalizedName[0]?.slice(0, 2) || "AI";

  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  frame.setAttribute("d", "M4 7 7 4h10l3 3v10l-3 3H7l-3-3V7Z");
  initials.setAttribute("x", "12");
  initials.setAttribute("y", "15");
  initials.setAttribute("text-anchor", "middle");
  initials.setAttribute("font-size", "6");
  initials.setAttribute("font-family", "Arial, sans-serif");
  initials.setAttribute("font-weight", "700");
  initials.setAttribute("fill", "currentColor");
  initials.textContent = label.toUpperCase();
  svg.append(frame, initials);
  return svg;
}

function renderCustomAiShortcuts() {
  const container = document.querySelector(".ai-providers");
  if (!container) return;

  defaultShortcutButtons.forEach((button) => {
    button.hidden = disabledDefaultShortcuts.includes(button.dataset.defaultShortcut);
  });
  container.querySelectorAll(".ai-provider--custom").forEach((button) => button.remove());
  customAiShortcuts.forEach((shortcut) => {
    const button = document.createElement("button");
    const icon = document.createElement("span");
    const arrow = document.createElement("span");
    button.className = "ai-provider ai-provider--custom";
    button.type = "button";
    icon.className = "ai-provider-icon";
    icon.append(createShortcutIcon(shortcut.name));
    arrow.className = "ai-provider-arrow";
    arrow.textContent = "↗";
    button.replaceChildren(icon, document.createTextNode(shortcut.name), arrow);
    button.addEventListener("click", () => window.open(shortcut.url, "_blank", "noopener,noreferrer"));
    container.insertBefore(button, quickAddAiButton || null);
  });
  telemetryPanel?.classList.toggle(
    "has-shortcut-overflow",
    [...container.querySelectorAll(".ai-provider")].filter((button) => !button.hidden).length > shortcutScrollThreshold
  );

  if (customAiList) {
    customAiList.replaceChildren();
    defaultShortcuts.forEach((shortcut) => {
      const row = document.createElement("div");
      const label = document.createElement("span");
      const toggle = document.createElement("button");
      const isDisabled = disabledDefaultShortcuts.includes(shortcut.id);
      row.className = "custom-ai-row";
      label.textContent = `${shortcut.name} // ${translateValue("DEFAULT", activeLanguage)}`;
      toggle.type = "button";
      toggle.className = "settings-reset";
      toggle.textContent = translateValue(isDisabled ? "RESTORE" : "REMOVE", activeLanguage);
      toggle.addEventListener("click", () => {
        disabledDefaultShortcuts = isDisabled
          ? disabledDefaultShortcuts.filter((id) => id !== shortcut.id)
          : [...disabledDefaultShortcuts, shortcut.id];
        saveUserSettings({ disabledDefaultShortcuts });
        renderCustomAiShortcuts();
      });
      row.append(label, toggle);
      customAiList.append(row);
    });

    customAiShortcuts.forEach((shortcut, index) => {
      const row = document.createElement("div");
      const label = document.createElement("span");
      const remove = document.createElement("button");
      row.className = "custom-ai-row";
      label.textContent = `${shortcut.name} // ${shortcut.url}`;
      remove.type = "button";
      remove.className = "settings-reset";
      remove.textContent = translateValue("REMOVE", activeLanguage);
      remove.addEventListener("click", () => {
        customAiShortcuts.splice(index, 1);
        saveUserSettings({ customAiShortcuts });
        renderCustomAiShortcuts();
      });
      row.append(label, remove);
      customAiList.append(row);
    });
  }
}

addCustomAiButton?.addEventListener("click", () => {
  const name = customAiNameInput.value.trim().replace(/\s+/g, " ");
  const url = getSafeExternalUrl(customAiUrlInput.value);
  if (!name || !url) return;

  customAiShortcuts.push({ name, url });
  saveUserSettings({ customAiShortcuts });
  customAiNameInput.value = "";
  customAiUrlInput.value = "";
  renderCustomAiShortcuts();
});

quickAddAiButton?.addEventListener("click", () => {
  if (settingsContent?.hidden) {
    settingsContent.hidden = false;
    settingsToggle?.setAttribute("aria-expanded", "true");
    settingsPanel?.classList.add("is-open");
  }
  customAiNameInput?.focus();
});

function setProfileName(name) {
  if (profileName) {
    profileName.textContent = name || autoProfileName;
  }
}

function applyBrandName(name) {
  const brandTitle = document.querySelector(".brand-title");
  const brandName = document.querySelector(".brand-name");
  const normalizedName = (name || "DEMONTECH-BOOKMARKS").trim() || "DEMONTECH-BOOKMARKS";

  if (brandTitle) {
    brandTitle.setAttribute("data-glitch", normalizedName);
  }

  if (brandName) {
    brandName.textContent = normalizedName;
    brandName.setAttribute("data-text", normalizedName);
  }

  if (brandNameInput) {
    brandNameInput.value = normalizedName;
  }
}

chrome.storage?.local?.get("displayName", ({ displayName }) => {
  setProfileName(displayName || autoProfileName);
  if (displayNameInput) {
    displayNameInput.value = displayName || "";
  }
});

function runBootSequence() {
  if (!bootOverlay || !bootLines) {
    return;
  }

  const bootMessages = [
    { text: "INITIALIZING NODE GRID...", kind: "warning" },
    { text: "MOUNTING /DEV/SDA1... OK", kind: "success" },
    { text: "BYPASSING FIREWALL... OK", kind: "success" },
    { text: "DECRYPTING BOOKMARKS... OK", kind: "success" },
    { text: "AUTHENTICATING SIGNALS... OK", kind: "success" },
    { text: "SYSTEM READY", kind: "warning" },
  ];

  bootLines.replaceChildren();

  bootMessages.forEach((entry, index) => {
    const line = document.createElement("div");
    line.className = `boot-line boot-line--${entry.kind}`;
    line.textContent = entry.text;
    line.style.animationDelay = `${index * 120}ms`;
    bootLines.appendChild(line);
  });

  window.setTimeout(() => {
    bootOverlay.classList.add("is-hidden");
  }, 1400);
}

runBootSequence();

function updateTelemetry() {
  const links = Math.floor(140 + Math.random() * 180);
  const octetA = Math.floor(10 + Math.random() * 90);
  const octetB = Math.floor(10 + Math.random() * 90);
  const octetC = Math.floor(1 + Math.random() * 150);
  const octetD = Math.floor(1 + Math.random() * 99);
  const latency = Math.floor(8 + Math.random() * 34);
  const integrity = (95 + Math.random() * 4).toFixed(1);

  if (telemetryLinks) telemetryLinks.textContent = String(links);
  if (telemetryIp) telemetryIp.textContent = `${octetA}.${octetB}.${octetC}.${octetD}`;
  if (telemetryLatency) telemetryLatency.textContent = `${latency}ms`;
  if (telemetryIntegrity) telemetryIntegrity.textContent = `${integrity}%`;
  if (telemetryBarFill) {
    telemetryBarFill.style.width = `${integrity}%`;
  }
}

window.setInterval(updateTelemetry, 1800);
updateTelemetry();

function applyUserSettings(settings = {}) {
  if (settings.backgroundIntensity && backgroundIntensity) {
    document.documentElement.style.setProperty(
      "--background-intensity",
      settings.backgroundIntensity
    );
    backgroundIntensity.value = settings.backgroundIntensity;
  }

  if (typeof settings.backgroundImage === "string") {
    if (settings.backgroundImage.startsWith("data:image/")) {
      document.documentElement.style.setProperty("--custom-background-image", `url("${settings.backgroundImage}")`);
      document.documentElement.classList.add("custom-background-active");
      if (backgroundFileStatus) backgroundFileStatus.textContent = "CUSTOM IMAGE ACTIVE";
    } else if (!settings.backgroundImage) {
      document.documentElement.style.removeProperty("--custom-background-image");
      document.documentElement.classList.remove("custom-background-active");
      if (backgroundFileStatus) backgroundFileStatus.textContent = "DEFAULT CITY NODE";
    }
  }

  const hudEnabled = settings.hudEnabled !== false;
  const messagesEnabled = settings.quotesEnabled !== false;
  quotesEnabled = messagesEnabled;
  quoteTypingDelay = Number(settings.typingSpeed) || 82;
  document.documentElement.classList.toggle("hud-disabled", !hudEnabled);
  document.documentElement.classList.toggle("quotes-disabled", !messagesEnabled);
  if (hudToggle) hudToggle.checked = hudEnabled;
  if (quotesToggle) quotesToggle.checked = messagesEnabled;
  if (typingSpeed) typingSpeed.value = String(quoteTypingDelay);

  const reducedMotion = Boolean(settings.reducedMotion);
  document.documentElement.classList.toggle("reduced-motion", reducedMotion);
  if (reducedMotionToggle) {
    reducedMotionToggle.checked = reducedMotion;
  }

  const tasksVisible = settings.tasksWidgetVisible !== false;
  const notesVisible = settings.notesWidgetVisible !== false;
  document.documentElement.classList.toggle("tasks-widget-hidden", !tasksVisible);
  document.documentElement.classList.toggle("notes-widget-hidden", !notesVisible);
  if (tasksWidgetToggle) tasksWidgetToggle.checked = tasksVisible;
  if (notesWidgetToggle) notesWidgetToggle.checked = notesVisible;

  const moveControlsVisible = settings.moveControlsVisible === true;
  document.documentElement.classList.toggle("move-controls-visible", moveControlsVisible);
  if (moveControlsToggle) moveControlsToggle.checked = moveControlsVisible;
  applyWidgetSize(settings.widgetSize || activeWidgetSize);
  applyColumns(settings.columns || activeColumns);
  applyGlassOpacity(settings.glassOpacity || "0.58");
  applyIconSize(settings.iconSize || 32);

  widgetVisibility = {
    ...widgetVisibility,
    ...(settings.widgetVisibility || {}),
  };
  Object.entries(widgetElements).forEach(([name, element]) => {
    if (element) {
      element.classList.toggle("widget-is-hidden", widgetVisibility[name] === false);
    }
  });
  applyDensity(settings.density || activeDensity);
  const activePreset = Object.entries(widgetPresets).find(([, preset]) =>
    Object.entries(preset).every(([name, visible]) => widgetVisibility[name] === visible)
  );
  if (activePreset) {
    document.documentElement.dataset.widgetPreset = activePreset[0];
  } else {
    delete document.documentElement.dataset.widgetPreset;
  }

  function applyDensity(density) {
    const validDensities = ["compact", "balanced", "expanded"];
    if (!validDensities.includes(density)) return;
    activeDensity = density;
    document.documentElement.dataset.density = density;
    densityButtons.forEach((button) => {
      button.classList.toggle("is-selected", button.dataset.density === density);
    });
  }
  widgetPresetButtons.forEach((button) => {
    button.classList.toggle("is-selected", activePreset?.[0] === button.dataset.preset);
  });
}

function saveUserSettings(settings) {
  if (chrome.storage?.local) {
    chrome.storage.local.set(settings);
  }
}

const exportSettingKeys = [
  "backgroundIntensity", "backgroundImage", "reducedMotion", "displayName",
  "hudEnabled", "quotesEnabled", "typingSpeed", "customBrandName",
  "customAiShortcuts", "localTasks", "localNote", "tasksWidgetVisible",
  "notesWidgetVisible", "moveControlsVisible", "widgetSize", "columns",
  "glassOpacity", "iconSize", "language", "widgetVisibility", "widgetOrder",
  "density", "onboardingComplete", "disabledDefaultShortcuts", "theme",
  "dashboardProfiles", "keyboardShortcuts",
];
const shortcutActions = [
  { id: "focusSearch", label: "FOCUS SEARCH", key: "s" },
  { id: "openRecent", label: "OPEN RECENT", key: "r" },
  { id: "openBookmarksBar", label: "BOOKMARKS BAR", key: "b" },
  { id: "openOtherBookmarks", label: "OTHER BOOKMARKS", key: "o" },
  { id: "toggleVisualSystem", label: "VISUAL SYSTEM", key: "v" },
];
const defaultKeyboardShortcuts = Object.fromEntries(shortcutActions.map(({ id, key }) => [
  id,
  { key, altKey: true, shiftKey: true, ctrlKey: false, metaKey: false },
]));
const defaultExportSettings = {
  backgroundIntensity: "1",
  backgroundImage: "",
  reducedMotion: false,
  displayName: "",
  hudEnabled: true,
  quotesEnabled: true,
  typingSpeed: "82",
  customBrandName: "DEMONTECH-BOOKMARKS",
  customAiShortcuts: [],
  localTasks: [],
  localNote: "",
  tasksWidgetVisible: true,
  notesWidgetVisible: true,
  moveControlsVisible: false,
  widgetSize: "balanced",
  columns: "2",
  glassOpacity: "0.58",
  iconSize: "32",
  language: "en",
  widgetVisibility: { hud: true, telemetry: true, shortcuts: true, productivity: true, bookmarks: true },
  widgetOrder: ["hud", "shortcuts", "productivity", "bookmarks"],
  density: "balanced",
  onboardingComplete: false,
  disabledDefaultShortcuts: [],
  theme: "electric-purple",
  dashboardProfiles: [],
  keyboardShortcuts: defaultKeyboardShortcuts,
};

function showFeatureStatus(element, message, isError = false) {
  if (!element) return;
  element.textContent = translateValue(message, activeLanguage);
  element.classList.toggle("is-error", isError);
}

function getDashboardSnapshot() {
  const snapshot = {
    backgroundIntensity: backgroundIntensity?.value,
    reducedMotion: reducedMotionToggle?.checked || false,
    hudEnabled: hudToggle?.checked !== false,
    quotesEnabled: quotesToggle?.checked !== false,
    typingSpeed: typingSpeed?.value || "82",
    tasksWidgetVisible: tasksWidgetToggle?.checked !== false,
    notesWidgetVisible: notesWidgetToggle?.checked !== false,
    moveControlsVisible: moveControlsToggle?.checked || false,
    widgetSize: activeWidgetSize,
    columns: activeColumns,
    glassOpacity: glassOpacity?.value || "0.58",
    iconSize: iconSizeInput?.value || "32",
    language: activeLanguage,
    widgetVisibility: { ...widgetVisibility },
    widgetOrder: [...widgetOrder],
    density: activeDensity,
    theme: activeTheme,
  };
  return snapshot;
}

function renderDashboardProfiles() {
  if (!profileSelect) return;
  const options = dashboardProfiles.map((profile) => {
    const option = document.createElement("option");
    option.value = profile.id;
    option.textContent = profile.name;
    return option;
  });
  profileSelect.replaceChildren(new Option(translateValue("SELECT PROFILE", activeLanguage), ""), ...options);
}

function saveDashboardProfiles() {
  saveUserSettings({ dashboardProfiles });
  renderDashboardProfiles();
}

saveProfileButton?.addEventListener("click", () => {
  const name = profileNameInput?.value.trim().replace(/\s+/g, " ");
  if (!name) {
    showFeatureStatus(profileStatus, "Enter a profile name first.", true);
    return;
  }
  const existing = dashboardProfiles.find((profile) => profile.name.toLowerCase() === name.toLowerCase());
  if (existing) {
    existing.settings = getDashboardSnapshot();
  } else {
    if (dashboardProfiles.length >= 10) {
      showFeatureStatus(profileStatus, "Profile limit reached (10). Delete one before adding another.", true);
      return;
    }
    dashboardProfiles.push({ id: crypto.randomUUID(), name, settings: getDashboardSnapshot() });
  }
  saveDashboardProfiles();
  showFeatureStatus(profileStatus, `PROFILE SAVED // ${name}`);
});

applyProfileButton?.addEventListener("click", () => {
  const profile = dashboardProfiles.find((item) => item.id === profileSelect?.value);
  if (!profile) {
    showFeatureStatus(profileStatus, "Select a profile to apply.", true);
    return;
  }
  applyUserSettings(profile.settings);
  if (profile.settings.widgetOrder) {
    widgetOrder = [...profile.settings.widgetOrder];
    applyWidgetOrder(widgetOrder);
  }
  applyTheme(profile.settings.theme || activeTheme);
  applyLanguage(profile.settings.language || activeLanguage, false);
  saveUserSettings(profile.settings);
  showFeatureStatus(profileStatus, `PROFILE ACTIVE // ${profile.name}`);
});

deleteProfileButton?.addEventListener("click", () => {
  const profileIndex = dashboardProfiles.findIndex((item) => item.id === profileSelect?.value);
  if (profileIndex < 0) {
    showFeatureStatus(profileStatus, "Select a profile to delete.", true);
    return;
  }
  dashboardProfiles.splice(profileIndex, 1);
  saveDashboardProfiles();
  showFeatureStatus(profileStatus, "PROFILE DELETED");
});

function formatShortcut(shortcut) {
  if (!shortcut) return "NOT SET";
  return [
    shortcut.ctrlKey && "Ctrl",
    shortcut.altKey && "Alt",
    shortcut.shiftKey && "Shift",
    shortcut.metaKey && "Meta",
    shortcut.key.toUpperCase(),
  ].filter(Boolean).join(" + ");
}

function renderKeyboardShortcuts() {
  if (!keyboardShortcutsList) return;
  keyboardShortcutsList.replaceChildren();
  shortcutActions.forEach(({ id, label }) => {
    const row = document.createElement("div");
    const name = document.createElement("span");
    const button = document.createElement("button");
    const shortcut = keyboardShortcuts[id];
    row.className = "keyboard-shortcut-row";
    name.className = "keyboard-shortcut-label";
    name.textContent = translateValue(label, activeLanguage);
    button.type = "button";
    button.className = "keyboard-shortcut-button";
    button.dataset.shortcutId = id;
    button.textContent = shortcutRecordingAction === id ? "PRESS KEYS..." : formatShortcut(shortcut);
    button.setAttribute("aria-label", `Set shortcut for ${label}`);
    button.addEventListener("click", () => {
      shortcutRecordingAction = id;
      showFeatureStatus(shortcutStatus, `PRESS A KEY COMBINATION FOR ${label}`);
      renderKeyboardShortcuts();
      keyboardShortcutsList.querySelector(`[data-shortcut-id="${id}"]`)?.focus();
    });
    row.append(name, button);
    keyboardShortcutsList.append(row);
  });
}

function shortcutFromEvent(event) {
  return {
    key: event.key.toLowerCase(),
    ctrlKey: event.ctrlKey,
    altKey: event.altKey,
    shiftKey: event.shiftKey,
    metaKey: event.metaKey,
  };
}

function isAllowedShortcut(shortcut) {
  return /^[a-z0-9]$/.test(shortcut.key)
    && shortcut.altKey && shortcut.shiftKey
    && !(shortcut.ctrlKey || shortcut.metaKey);
}

function shortcutMatches(event, shortcut) {
  return shortcut
    && event.key.toLowerCase() === shortcut.key
    && event.ctrlKey === shortcut.ctrlKey
    && event.altKey === shortcut.altKey
    && event.shiftKey === shortcut.shiftKey
    && event.metaKey === shortcut.metaKey;
}

function runKeyboardShortcut(actionId) {
  if (actionId === "focusSearch") {
    searchInput?.focus();
    return;
  }
  if (actionId === "toggleVisualSystem") {
    settingsToggle?.click();
    return;
  }
  const boardId = {
    openRecent: "recent",
    openBookmarksBar: "1",
    openOtherBookmarks: "2",
  }[actionId];
  if (boardId === "recent") {
    activeBoardId = boardId;
    renderBoardNavigation();
    loadRecentBookmarks();
    return;
  }
  const board = bookmarkTree.flatMap((root) => root.children || []).find((item) => item.id === boardId);
  if (board) {
    activeBoardId = board.id;
    renderBoardNavigation();
    renderBoard(board);
  }
}

exportSettingsButton?.addEventListener("click", () => {
  chrome.storage.local.get(exportSettingKeys, (settings) => {
    if (chrome.runtime.lastError) {
      showFeatureStatus(dataTransferStatus, "EXPORT FAILED // LOCAL STORAGE UNAVAILABLE", true);
      return;
    }
    const exportSettings = {
      ...defaultExportSettings,
      ...settings,
      widgetVisibility: { ...defaultExportSettings.widgetVisibility, ...settings.widgetVisibility },
      keyboardShortcuts: { ...defaultKeyboardShortcuts, ...settings.keyboardShortcuts },
    };
    const blob = new Blob([JSON.stringify({
      format: "netrunner-bookmarks-settings",
      version: 1,
      exportedAt: new Date().toISOString(),
      settings: exportSettings,
    }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `netrunner-bookmarks-settings-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showFeatureStatus(dataTransferStatus, "LOCAL JSON EXPORTED");
  });
});

function validateImportedSettings(payload) {
  if (!payload || payload.format !== "netrunner-bookmarks-settings" || payload.version !== 1
    || !payload.settings || typeof payload.settings !== "object" || Array.isArray(payload.settings)) {
    throw new Error("Unsupported or malformed settings file.");
  }
  const settings = {};
  const raw = payload.settings;
  const stringLimits = {
    backgroundIntensity: 20, displayName: 50, customBrandName: 50,
    localNote: 50000, widgetSize: 20, columns: 2, glassOpacity: 10,
    iconSize: 3, language: 5, density: 20,
  };
  Object.entries(stringLimits).forEach(([key, maxLength]) => {
    if (key in raw) {
      if (typeof raw[key] !== "string" || raw[key].length > maxLength) throw new Error(`Invalid ${key}.`);
      settings[key] = raw[key];
    }
  });
  [
    "reducedMotion", "hudEnabled", "quotesEnabled", "tasksWidgetVisible",
    "notesWidgetVisible", "moveControlsVisible", "onboardingComplete",
  ].forEach((key) => {
    if (key in raw) {
      if (typeof raw[key] !== "boolean") throw new Error(`Invalid ${key}.`);
      settings[key] = raw[key];
    }
  });
  if ("typingSpeed" in raw) {
    const value = Number(raw.typingSpeed);
    if (!Number.isFinite(value) || value < 35 || value > 180) throw new Error("Invalid typing speed.");
    settings.typingSpeed = String(value);
  }
  if ("backgroundIntensity" in settings
    && (!Number.isFinite(Number(settings.backgroundIntensity))
      || Number(settings.backgroundIntensity) < 0.35 || Number(settings.backgroundIntensity) > 1)) {
    throw new Error("Invalid background intensity.");
  }
  if ("widgetSize" in settings && !["compact", "balanced", "expanded"].includes(settings.widgetSize)) {
    throw new Error("Invalid widget size.");
  }
  if ("columns" in settings && !["1", "2", "3"].includes(settings.columns)) throw new Error("Invalid columns.");
  if ("glassOpacity" in settings
    && (!Number.isFinite(Number(settings.glassOpacity))
      || Number(settings.glassOpacity) < 0.25 || Number(settings.glassOpacity) > 0.85)) {
    throw new Error("Invalid glass opacity.");
  }
  if ("iconSize" in settings
    && (!Number.isInteger(Number(settings.iconSize))
      || Number(settings.iconSize) < 16 || Number(settings.iconSize) > 48)) {
    throw new Error("Invalid icon size.");
  }
  if ("density" in settings && !["compact", "balanced", "expanded"].includes(settings.density)) {
    throw new Error("Invalid density.");
  }
  if ("backgroundImage" in raw) {
    if (typeof raw.backgroundImage !== "string" || raw.backgroundImage.length > 3000000
      || (raw.backgroundImage && !/^data:image\/(?:png|jpeg|webp);base64,/i.test(raw.backgroundImage))) {
      throw new Error("Invalid background image.");
    }
    settings.backgroundImage = raw.backgroundImage;
  }
  if ("localTasks" in raw) {
    if (!Array.isArray(raw.localTasks) || raw.localTasks.length > 100
      || raw.localTasks.some((task) => !task || typeof task.id !== "string" || task.id.length > 100
        || typeof task.text !== "string" || task.text.length > 500 || typeof task.done !== "boolean")) {
      throw new Error("Invalid tasks data.");
    }
    settings.localTasks = raw.localTasks.map((task) => ({
      id: task.id,
      text: task.text,
      done: task.done,
    }));
  }
  if ("customAiShortcuts" in raw) {
    if (!Array.isArray(raw.customAiShortcuts) || raw.customAiShortcuts.length > 30
      || raw.customAiShortcuts.some((item) => !item || typeof item.name !== "string"
        || !item.name.trim() || item.name.length > 40 || typeof item.url !== "string"
        || !getSafeExternalUrl(item.url))) {
      throw new Error("Invalid custom shortcuts.");
    }
    settings.customAiShortcuts = raw.customAiShortcuts.map((item) => ({
      name: item.name.trim(),
      url: getSafeExternalUrl(item.url),
    }));
  }
  if ("disabledDefaultShortcuts" in raw) {
    if (!Array.isArray(raw.disabledDefaultShortcuts) || raw.disabledDefaultShortcuts.length > 30
      || raw.disabledDefaultShortcuts.some((id) =>
        typeof id !== "string" || !defaultShortcuts.some((shortcut) => shortcut.id === id))) {
      throw new Error("Invalid disabled shortcuts.");
    }
    settings.disabledDefaultShortcuts = raw.disabledDefaultShortcuts;
  }
  if ("widgetVisibility" in raw) {
    const allowedWidgets = Object.keys(widgetElements);
    if (!raw.widgetVisibility || typeof raw.widgetVisibility !== "object" || Array.isArray(raw.widgetVisibility)
      || Object.entries(raw.widgetVisibility).some(([key, value]) => !allowedWidgets.includes(key) || typeof value !== "boolean")) {
      throw new Error("Invalid widget visibility.");
    }
    settings.widgetVisibility = raw.widgetVisibility;
  }
  if ("widgetOrder" in raw) {
    const allowedWidgets = Object.keys(widgetElements);
    if (!Array.isArray(raw.widgetOrder) || raw.widgetOrder.length > allowedWidgets.length
      || raw.widgetOrder.some((key) => !allowedWidgets.includes(key))
      || new Set(raw.widgetOrder).size !== raw.widgetOrder.length) throw new Error("Invalid widget order.");
    settings.widgetOrder = raw.widgetOrder;
  }
  if ("theme" in raw) {
    if (!themeNames.includes(raw.theme)) throw new Error("Invalid theme.");
    settings.theme = raw.theme;
  }
  if ("language" in settings && !["en", "es", "fr", "de", "pt", "it", "ja", "zh", "ko", "ru"].includes(settings.language)) {
    throw new Error("Unsupported language.");
  }
  if ("keyboardShortcuts" in raw) {
    if (!raw.keyboardShortcuts || typeof raw.keyboardShortcuts !== "object" || Array.isArray(raw.keyboardShortcuts)) {
      throw new Error("Invalid keyboard shortcuts.");
    }
    const shortcuts = {};
    shortcutActions.forEach(({ id }) => {
      if (raw.keyboardShortcuts[id] === undefined) return;
      const shortcut = raw.keyboardShortcuts[id];
      if (!shortcut || typeof shortcut.key !== "string"
        || !["ctrlKey", "altKey", "shiftKey", "metaKey"].every((key) => typeof shortcut[key] === "boolean")
        || !isAllowedShortcut(shortcut)) throw new Error("Invalid keyboard shortcut.");
      shortcuts[id] = {
        key: shortcut.key,
        ctrlKey: shortcut.ctrlKey,
        altKey: shortcut.altKey,
        shiftKey: shortcut.shiftKey,
        metaKey: shortcut.metaKey,
      };
    });
    if (new Set(Object.values(shortcuts).map((item) => item.key)).size !== Object.keys(shortcuts).length) {
      throw new Error("Shortcut keys must be unique.");
    }
    settings.keyboardShortcuts = shortcuts;
  }
  if ("dashboardProfiles" in raw) {
    if (!Array.isArray(raw.dashboardProfiles) || raw.dashboardProfiles.length > 10) {
      throw new Error("Invalid dashboard profiles.");
    }
    const ids = new Set();
    const names = new Set();
    settings.dashboardProfiles = raw.dashboardProfiles.map((profile) => {
      if (!profile || typeof profile.id !== "string" || profile.id.length > 100
        || typeof profile.name !== "string" || !profile.name.trim() || profile.name.length > 24
        || !profile.settings || typeof profile.settings !== "object" || Array.isArray(profile.settings)
        || ids.has(profile.id) || names.has(profile.name.toLowerCase())) throw new Error("Invalid dashboard profile.");
      ids.add(profile.id);
      names.add(profile.name.toLowerCase());
      const profileSettingKeys = [
        "backgroundIntensity", "reducedMotion", "hudEnabled",
        "quotesEnabled", "typingSpeed", "tasksWidgetVisible", "notesWidgetVisible",
        "moveControlsVisible", "widgetSize", "columns", "glassOpacity", "iconSize",
        "language", "widgetVisibility", "widgetOrder", "density", "theme",
      ];
      const profileSettings = Object.fromEntries(Object.entries(profile.settings || {})
        .filter(([key]) => profileSettingKeys.includes(key)));
      return { id: profile.id, name: profile.name, settings: validateImportedSettings({
        format: "netrunner-bookmarks-settings",
        version: 1,
        settings: profileSettings,
      }) };
    });
  }
  return settings;
}

importSettingsButton?.addEventListener("click", () => importSettingsFile?.click());
importSettingsFile?.addEventListener("change", () => {
  const file = importSettingsFile.files?.[0];
  importSettingsFile.value = "";
  if (!file) return;
  if (file.size > 5000000) {
    showFeatureStatus(dataTransferStatus, "IMPORT REJECTED // FILE EXCEEDS 5 MB", true);
    return;
  }
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const settings = validateImportedSettings(JSON.parse(String(reader.result)));
      chrome.storage.local.set(settings, () => {
        if (chrome.runtime.lastError) {
          showFeatureStatus(dataTransferStatus, "IMPORT FAILED // LOCAL STORAGE ERROR", true);
          return;
        }
        applyUserSettings(settings);
        if (settings.widgetOrder) {
          widgetOrder = [...settings.widgetOrder];
          applyWidgetOrder(widgetOrder);
        }
        if (settings.localTasks) {
          localTasks = settings.localTasks;
          renderTasks();
        }
        if (typeof settings.localNote === "string" && notesInput) notesInput.value = settings.localNote;
        if (typeof settings.displayName === "string") {
          displayNameInput.value = settings.displayName;
          setProfileName(settings.displayName);
        }
        if (typeof settings.customBrandName === "string") applyBrandName(settings.customBrandName);
        if (settings.customAiShortcuts) customAiShortcuts = settings.customAiShortcuts;
        if (settings.disabledDefaultShortcuts) disabledDefaultShortcuts = settings.disabledDefaultShortcuts;
        if (settings.customAiShortcuts || settings.disabledDefaultShortcuts) renderCustomAiShortcuts();
        if (settings.theme) applyTheme(settings.theme);
        if (settings.language) applyLanguage(settings.language, false);
        if (settings.onboardingComplete === false) showOnboarding();
        else if (settings.onboardingComplete === true) hideOnboarding();
        if (settings.dashboardProfiles) dashboardProfiles = settings.dashboardProfiles;
        if (settings.keyboardShortcuts) keyboardShortcuts = {
          ...defaultKeyboardShortcuts, ...settings.keyboardShortcuts,
        };
        renderDashboardProfiles();
        renderKeyboardShortcuts();
        showFeatureStatus(dataTransferStatus, "LOCAL JSON IMPORTED");
      });
    } catch (error) {
      showFeatureStatus(dataTransferStatus, `IMPORT REJECTED // ${error.message}`, true);
    }
  });
  reader.addEventListener("error", () => {
    showFeatureStatus(dataTransferStatus, "IMPORT FAILED // FILE COULD NOT BE READ", true);
  });
  reader.readAsText(file);
});

keyboardShortcuts = { ...defaultKeyboardShortcuts };
renderKeyboardShortcuts();
resetShortcutsButton?.addEventListener("click", () => {
  keyboardShortcuts = { ...defaultKeyboardShortcuts };
  saveUserSettings({ keyboardShortcuts });
  renderKeyboardShortcuts();
  showFeatureStatus(shortcutStatus, "DEFAULT SHORTCUTS RESTORED");
});

saveNameButton?.addEventListener("click", () => {
  const displayName = displayNameInput.value.trim();
  saveUserSettings({ displayName });
  setProfileName(displayName || autoProfileName);
});

resetNameButton?.addEventListener("click", () => {
  displayNameInput.value = "";
  saveUserSettings({ displayName: "" });
  setProfileName(autoProfileName);
});

saveBrandNameButton?.addEventListener("click", () => {
  const customBrandName = brandNameInput.value.trim();
  const sanitizedBrandName = customBrandName || "DEMONTECH-BOOKMARKS";
  saveUserSettings({ customBrandName: sanitizedBrandName });
  applyBrandName(sanitizedBrandName);
});

resetBrandNameButton?.addEventListener("click", () => {
  const defaultBrandName = "DEMONTECH-BOOKMARKS";
  if (brandNameInput) {
    brandNameInput.value = defaultBrandName;
  }
  saveUserSettings({ customBrandName: defaultBrandName });
  applyBrandName(defaultBrandName);
});

backgroundIntensity?.addEventListener("input", () => {
  const value = backgroundIntensity.value;
  applyUserSettings({ backgroundIntensity: value });
  saveUserSettings({ backgroundIntensity: value });
});

backgroundFileInput?.addEventListener("change", () => {
  const [file] = backgroundFileInput.files || [];
  if (!file) return;
  if (!["image/png", "image/jpeg", "image/webp"].includes(file.type) || file.size > maxBackgroundSize) {
    backgroundFileInput.value = "";
    if (backgroundFileStatus) backgroundFileStatus.textContent = translateValue("INVALID FILE // MAX 2MB", activeLanguage);
    return;
  }

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    if (typeof reader.result !== "string" || !reader.result.startsWith("data:image/")) {
      if (backgroundFileStatus) backgroundFileStatus.textContent = translateValue("IMAGE READ FAILED", activeLanguage);
      return;
    }
    saveUserSettings({ backgroundImage: reader.result });
    applyUserSettings({ backgroundImage: reader.result });
  });
  reader.addEventListener("error", () => {
    if (backgroundFileStatus) backgroundFileStatus.textContent = translateValue("IMAGE READ FAILED", activeLanguage);
  });
  reader.readAsDataURL(file);
});

resetBackgroundButton?.addEventListener("click", () => {
  document.documentElement.style.removeProperty("--custom-background-image");
  document.documentElement.classList.remove("custom-background-active");
  if (backgroundFileInput) backgroundFileInput.value = "";
  if (backgroundFileStatus) backgroundFileStatus.textContent = translateValue("DEFAULT CITY NODE", activeLanguage);
  if (chrome.storage?.local) chrome.storage.local.remove("backgroundImage");
});

reducedMotionToggle?.addEventListener("change", () => {
  const reducedMotion = reducedMotionToggle.checked;
  applyUserSettings({ reducedMotion });
  saveUserSettings({ reducedMotion });
});

hudToggle?.addEventListener("change", () => {
  const hudEnabled = hudToggle.checked;
  applyUserSettings({ hudEnabled });
  saveUserSettings({ hudEnabled });
});

quotesToggle?.addEventListener("change", () => {
  const quotesEnabled = quotesToggle.checked;
  applyUserSettings({ quotesEnabled });
  saveUserSettings({ quotesEnabled });
  if (quotesEnabled) rotateHudQuote();
});

typingSpeed?.addEventListener("input", () => {
  const value = typingSpeed.value;
  applyUserSettings({ typingSpeed: value });
  saveUserSettings({ typingSpeed: value });
});

tasksWidgetToggle?.addEventListener("change", () => {
  const tasksWidgetVisible = tasksWidgetToggle.checked;
  applyUserSettings({ tasksWidgetVisible });
  saveUserSettings({ tasksWidgetVisible });
});

notesWidgetToggle?.addEventListener("change", () => {
  const notesWidgetVisible = notesWidgetToggle.checked;
  applyUserSettings({ notesWidgetVisible });
  saveUserSettings({ notesWidgetVisible });
});

moveControlsToggle?.addEventListener("change", () => {
  const moveControlsVisible = moveControlsToggle.checked;
  document.documentElement.classList.toggle("move-controls-visible", moveControlsVisible);
  saveUserSettings({ moveControlsVisible });
});

widgetSizeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyWidgetSize(button.dataset.widgetSize);
    saveUserSettings({ widgetSize: button.dataset.widgetSize });
  });
});

columnButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyColumns(button.dataset.columns);
    saveUserSettings({ columns: button.dataset.columns });
  });
});

glassOpacity?.addEventListener("input", () => {
  applyGlassOpacity(glassOpacity.value);
  saveUserSettings({ glassOpacity: glassOpacity.value });
});

const widgetPresets = {
  full: { hud: true, telemetry: true, shortcuts: true, productivity: true, bookmarks: true },
  focus: { hud: true, telemetry: false, shortcuts: false, productivity: true, bookmarks: true },
  command: { hud: true, telemetry: true, shortcuts: true, productivity: true, bookmarks: false },
  minimal: { hud: false, telemetry: false, shortcuts: false, productivity: false, bookmarks: true },
};

function applyWidgetPreset(name) {
  const preset = widgetPresets[name];
  if (!preset) return;
  widgetVisibility = { ...preset };
  document.documentElement.dataset.widgetPreset = name;
  const productivityVisible = preset.productivity;
  applyUserSettings({
    widgetVisibility,
    tasksWidgetVisible: productivityVisible,
    notesWidgetVisible: productivityVisible,
  });
  saveUserSettings({
    widgetVisibility,
    tasksWidgetVisible: productivityVisible,
    notesWidgetVisible: productivityVisible,
  });
  widgetPresetButtons.forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.preset === name);
  });
}

widgetPresetButtons.forEach((button) => {
  button.addEventListener("click", () => applyWidgetPreset(button.dataset.preset));
});

densityButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyDensity(button.dataset.density);
    saveUserSettings({ density: button.dataset.density });
  });
});

chrome.storage?.local?.get(
  [
    "backgroundIntensity",
    "backgroundImage",
    "reducedMotion",
    "displayName",
    "hudEnabled",
    "quotesEnabled",
    "typingSpeed",
    "customBrandName",
    "customAiShortcuts",
    "localTasks",
    "localNote",
    "tasksWidgetVisible",
    "notesWidgetVisible",
    "moveControlsVisible",
    "widgetSize",
    "columns",
    "glassOpacity",
    "iconSize",
    "language",
    "widgetVisibility",
    "widgetOrder",
    "density",
    "onboardingComplete",
    "theme",
    "dashboardProfiles",
    "keyboardShortcuts",
  ],
  (settings) => {
    applyUserSettings(settings);
    widgetOrder = Array.isArray(settings.widgetOrder)
      ? settings.widgetOrder
      : widgetOrder;
    applyWidgetOrder(widgetOrder);
    localTasks = Array.isArray(settings.localTasks)
      ? settings.localTasks.filter((task) => task?.id && task?.text).slice(0, 100)
      : [];
    renderTasks();
    if (notesInput) notesInput.value = typeof settings.localNote === "string" ? settings.localNote : "";
    if (!settings.onboardingComplete) showOnboarding();
    if (settings.displayName) {
      displayNameInput.value = settings.displayName;
      setProfileName(settings.displayName);
    }
    if (settings.customBrandName) {
      applyBrandName(settings.customBrandName);
    } else {
      applyBrandName("DEMONTECH-BOOKMARKS");
    }
    customAiShortcuts = Array.isArray(settings.customAiShortcuts)
      ? settings.customAiShortcuts.filter((shortcut) => shortcut?.name && getSafeExternalUrl(shortcut.url))
      : [];
    disabledDefaultShortcuts = Array.isArray(settings.disabledDefaultShortcuts)
      ? settings.disabledDefaultShortcuts.filter((id) =>
          defaultShortcuts.some((shortcut) => shortcut.id === id)
        )
      : [];
    dashboardProfiles = Array.isArray(settings.dashboardProfiles)
      ? settings.dashboardProfiles.filter((profile) => profile?.id && profile?.name && profile?.settings).slice(0, 10)
      : [];
    keyboardShortcuts = { ...defaultKeyboardShortcuts };
    shortcutActions.forEach(({ id }) => {
      const shortcut = settings.keyboardShortcuts?.[id];
      if (shortcut && isAllowedShortcut(shortcut)
        && ["ctrlKey", "altKey", "shiftKey", "metaKey"].every((key) => typeof shortcut[key] === "boolean")) {
        keyboardShortcuts[id] = shortcut;
      }
    });
    renderCustomAiShortcuts();
    renderDashboardProfiles();
    renderKeyboardShortcuts();
    applyLanguage(settings.language || "en", false);
    if (settings.theme) applyTheme(settings.theme);
  }
);

const themeNames = ["electric-purple", "neon-pink", "night-city", "black-ice"];

if (settingsToggle && settingsContent) {
  settingsToggle.addEventListener("click", () => {
    const isExpanded = settingsToggle.getAttribute("aria-expanded") === "true";
    settingsToggle.setAttribute("aria-expanded", String(!isExpanded));
    settingsContent.hidden = isExpanded;
    settingsPanel?.classList.toggle("is-open", !isExpanded);
  });
}

function applyTheme(theme) {
  if (!themeNames.includes(theme)) {
    return;
  }

  activeTheme = theme;
  document.documentElement.dataset.theme = theme;
  themeButtons.forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.theme === theme);
  });
  if (chrome.storage?.local) {
    chrome.storage.local.set({ theme });
  }
}

themeButtons.forEach((button) => {
  button.addEventListener("click", () => applyTheme(button.dataset.theme));
});

if (chrome.storage?.local) {
  chrome.storage.local.get("theme", ({ theme }) => {
    applyTheme(theme || activeTheme);
  });
} else {
  applyTheme(activeTheme);
}

const commandActions = [
  { label: "Focus bookmark search", run: () => searchInput?.focus() },
  {
    label: "Open visual system",
    run: () => {
      settingsToggle?.setAttribute("aria-expanded", "true");
      if (settingsContent) settingsContent.hidden = false;
      settingsPanel?.classList.add("is-open");
    },
  },
  {
    label: "Toggle edit layout",
    run: () => {
      if (!moveControlsToggle) return;
      moveControlsToggle.checked = !moveControlsToggle.checked;
      moveControlsToggle.dispatchEvent(new Event("change"));
    },
  },
  {
    label: "Use balanced widget size",
    run: () => {
      applyWidgetSize("balanced");
      saveUserSettings({ widgetSize: "balanced" });
    },
  },
  {
    label: "Use compact widget size",
    run: () => {
      applyWidgetSize("compact");
      saveUserSettings({ widgetSize: "compact" });
    },
  },
  {
    label: "Use expanded widget size",
    run: () => {
      applyWidgetSize("expanded");
      saveUserSettings({ widgetSize: "expanded" });
    },
  },
  {
    label: "Use two-column grid",
    run: () => {
      applyColumns("2");
      saveUserSettings({ columns: "2" });
    },
  },
  {
    label: "Use one-column grid",
    run: () => {
      applyColumns("1");
      saveUserSettings({ columns: "1" });
    },
  },
  {
    label: "Use three-column grid",
    run: () => {
      applyColumns("3");
      saveUserSettings({ columns: "3" });
    },
  },
];

function renderCommandActions(query = "") {
  if (!commandPaletteActions) return;
  const normalizedQuery = query.trim().toLowerCase();
  commandPaletteActions.replaceChildren();
  commandActions
    .filter((action) => translateValue(action.label, activeLanguage).toLowerCase().includes(normalizedQuery))
    .forEach((action) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "command-action";
      button.textContent = translateValue(action.label, activeLanguage);
      button.addEventListener("click", () => {
        action.run();
        closeCommandPalette();
      });
      commandPaletteActions.append(button);
    });
}

function openCommandPalette() {
  if (!commandPalette) return;
  commandPalette.hidden = false;
  renderCommandActions();
  commandPaletteInput?.focus();
}

function closeCommandPalette() {
  if (commandPalette) commandPalette.hidden = true;
}

commandPaletteInput?.addEventListener("input", () => {
  renderCommandActions(commandPaletteInput.value);
});
commandPaletteClose?.addEventListener("click", closeCommandPalette);
commandPalette?.addEventListener("click", (event) => {
  if (event.target === commandPalette) closeCommandPalette();
});
commandPalette?.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeCommandPalette();
});

const netrunnerQuotes = [
  "The net remembers everything.",
  "Wake up, Samurai. We have links to burn.",
  "No gods. No masters. Just better shortcuts.",
  "Every node is a door. Choose your breach.",
  "Stay sharp. The city is always watching.",
];

function updateHud() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  hudClock.textContent = `${hours}:${minutes}`;
  hudClock.dateTime = now.toISOString();
  hudDate.textContent = now
    .toLocaleDateString(languageLocales[activeLanguage] || "en-US", {
      weekday: "long",
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
    .toUpperCase();
}

function rotateHudQuote() {
  if (!quotesEnabled) {
    if (quoteTypingTimer) {
      window.clearTimeout(quoteTypingTimer);
      quoteTypingTimer = null;
    }
    return;
  }

  if (quoteTypingTimer) {
    window.clearTimeout(quoteTypingTimer);
    quoteTypingTimer = null;
  }

  const sequenceId = ++quoteSequenceId;
  const quoteIndex = Math.floor(Date.now() / 8000) % netrunnerQuotes.length;
  const quote = `“${netrunnerQuotes[quoteIndex]}”`;
  hudQuote.dataset.text = quote;
  hudQuote.classList.remove("is-glitching");
  hudQuote.textContent = "";

  let characterIndex = 0;
  const typeNextCharacter = () => {
    if (sequenceId !== quoteSequenceId) {
      return;
    }

    if (characterIndex >= quote.length) {
      hudQuote.classList.add("is-glitching");
      quoteTypingTimer = null;
      return;
    }

    hudQuote.textContent += quote[characterIndex];
    characterIndex += 1;
    quoteTypingTimer = window.setTimeout(typeNextCharacter, quoteTypingDelay);
  };

  typeNextCharacter();
}

updateHud();
rotateHudQuote();
window.setInterval(updateHud, 1000);
window.setInterval(rotateHudQuote, 8000);

const aiEndpoints = {
  google: "https://www.google.com/search?q=",
  chatgpt: "https://chatgpt.com/",
  gemini: "https://gemini.google.com/app",
  claude: "https://claude.ai/new",
};

aiProviders.forEach((providerButton) => {
  providerButton.addEventListener("click", () => {
    const provider = providerButton.dataset.provider;
    const defaultShortcut = defaultShortcuts.find(
      (shortcut) => shortcut.id === providerButton.dataset.defaultShortcut
    );
    const endpoint = defaultShortcut?.url || aiEndpoints[provider];

    if (!endpoint) {
      selectedAiLabel.textContent = translateValue("AI UNAVAILABLE", activeLanguage);
      return;
    }

    window.open(endpoint, "_blank", "noopener,noreferrer");
  });
});

// OBTENCIÓN PRIVADA DE FAVICONS (Sin pings a Google)
function getFaviconUrl(url) {
  try {
    const urlObject = new URL(url);
    if (!["http:", "https:"].includes(urlObject.protocol)) {
      return "assets/images/default-icon.svg";
    }

    // Utilizamos la URL especial interna de Chrome para obtener el favicon de su caché local
    // Requiere el permiso "favicon" en el manifest.json (que ya tienes)
    return `chrome-extension://${chrome.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(urlObject.origin)}&size=32`;
  } catch {
    return "assets/images/default-icon.svg";
  }
}

// VALIDACIÓN ESTRICTA DE URLs PARA PREVENIR XSS
function getSafeBookmarkUrl(value) {
  try {
    const url = new URL(value);
    // Solo permitimos esquemas seguros web y locales básicos.
    // ESTRICTAMENTE PROHIBIDO: javascript:, data:, vbscript:
    if (!["http:", "https:", "ftp:"].includes(url.protocol)) {
      console.warn(`[SECURITY] URL scheme blocked: ${url.protocol}`);
      return "";
    }
    return url.href;
  } catch {
    return "";
  }
}

function getDomain(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "unknown node";
  }
}

function getDomainMark(url) {
  return getDomain(url).slice(0, 1).toUpperCase();
}

function updateStatus(count) {
  const unit = activeLanguage === "es" ? "SEÑALES" : "SIGNALS";
  bookmarkCount.textContent = `${String(count).padStart(2, "0")} ${unit}`;
  emptyState.hidden = count > 0;
  if (count === 0) {
    emptyState.textContent = translateValue("No signals found in the network.", activeLanguage);
  }
}

function getFolderIcon(title) {
  return title.trim().slice(0, 1).toUpperCase() || "#";
}

function attachCardTilt(card) {
  if (!card) {
    return;
  }

  const maxTilt = 8;

  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * maxTilt * 2;
    const rotateX = (0.5 - y) * maxTilt * 2;

    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
    card.style.setProperty("--glow-x", `${(x * 100).toFixed(2)}%`);
    card.style.setProperty("--glow-y", `${(y * 100).toFixed(2)}%`);
    card.style.setProperty("--glow-opacity", "1");
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
    card.style.setProperty("--glow-opacity", "0");
  });
}

function createBookmarkCard(bookmark) {
  const card = document.createElement("article");
  const trigger = document.createElement("button");
  const summary = document.createElement("div");
  const content = document.createElement("div");
  const title = document.createElement("h3");
  const domain = document.createElement("span");
  const favicon = document.createElement("img");
  const faviconFallback = document.createElement("span");
  const details = document.createElement("div");
  const url = document.createElement("p");
  const openLink = document.createElement("a");
  const actions = document.createElement("div");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const expandMark = document.createElement("span");
  const safeUrl = getSafeBookmarkUrl(bookmark.url);

  card.className = "bookmark-card";
  card.classList.add("bookmark-item");
  card.dataset.bookmarkId = bookmark.id;
  card.draggable = true;
  attachCardTilt(card);
  card.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/bookmark-id", bookmark.id);
    event.dataTransfer.effectAllowed = "move";
  });

  trigger.className = "bookmark-trigger";
  trigger.type = "button";
  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-controls", `bookmark-details-${bookmark.id}`);
  trigger.addEventListener("click", () => {
    const isExpanded = card.classList.toggle("is-expanded");
    trigger.setAttribute("aria-expanded", String(isExpanded));
  });

  summary.className = "bookmark-summary";
  favicon.className = "bookmark-icon";
  favicon.alt = "";
  favicon.loading = "lazy";
  favicon.src = getFaviconUrl(bookmark.url);
  favicon.addEventListener("error", () => {
    favicon.hidden = true;
    faviconFallback.hidden = false;
  });
  faviconFallback.className = "bookmark-icon-fallback";
  faviconFallback.hidden = true;
  faviconFallback.textContent = getDomainMark(bookmark.url);

  title.className = "bookmark-title";
  title.textContent = bookmark.title || bookmark.url;

  domain.className = "bookmark-domain";
  domain.textContent = getDomain(bookmark.url);

  expandMark.className = "expand-mark";
  expandMark.setAttribute("aria-hidden", "true");
  expandMark.textContent = "+";

  details.className = "bookmark-details";
  details.id = `bookmark-details-${bookmark.id}`;
  url.className = "bookmark-url";
  url.textContent = bookmark.url;
  openLink.className = "bookmark-open";
  if (safeUrl) {
    openLink.href = safeUrl;
    openLink.target = "_blank";
    openLink.rel = "noopener noreferrer";
    openLink.dataset.i18nKey = "OPEN LINK ↗";
    openLink.textContent = translateValue(openLink.dataset.i18nKey, activeLanguage);
  } else {
    openLink.dataset.i18nKey = "UNSAFE LINK";
    openLink.textContent = translateValue(openLink.dataset.i18nKey, activeLanguage);
    openLink.setAttribute("aria-disabled", "true");
    openLink.tabIndex = -1;
  }

  actions.className = "bookmark-actions";
  editButton.className = "bookmark-action";
  editButton.type = "button";
  editButton.dataset.i18nKey = "EDIT";
  editButton.textContent = translateValue(editButton.dataset.i18nKey, activeLanguage);
  editButton.addEventListener("click", (event) => {
    event.stopPropagation();
    const title = window.prompt(translateValue("Bookmark title:", activeLanguage), bookmark.title);
    if (title === null) return;
    const url = window.prompt(translateValue("Bookmark URL:", activeLanguage), bookmark.url);
    if (url === null || !isValidBookmarkUrl(url.trim())) return;
    chrome.bookmarks.update(
      bookmark.id,
      { title: title.trim() || bookmark.title, url: url.trim() },
      () => refreshAfterMutation()
    );
  });

  deleteButton.className = "bookmark-action bookmark-action--danger";
  deleteButton.type = "button";
  deleteButton.dataset.i18nKey = "DELETE";
  deleteButton.textContent = translateValue(deleteButton.dataset.i18nKey, activeLanguage);
  deleteButton.addEventListener("click", (event) => {
    event.stopPropagation();
    const confirmation = activeLanguage === "es"
      ? `¿Eliminar "${bookmark.title || bookmark.url}"?`
      : `Delete "${bookmark.title || bookmark.url}"?`;
    if (!window.confirm(confirmation)) return;
    chrome.bookmarks.remove(bookmark.id, () => refreshAfterMutation());
  });
  actions.append(editButton, deleteButton);

  content.append(title, domain);
  summary.append(favicon, faviconFallback, content, expandMark);
  trigger.append(summary);
  details.append(url, openLink, actions);
  card.append(trigger, details);

  return card;
}

function isValidBookmarkUrl(value) {
  return Boolean(getSafeBookmarkUrl(value));
}

function createFolderCard(folder, { canReceiveBookmarks = true } = {}) {
  const card = document.createElement("article");
  const heading = document.createElement("button");
  const sectionLine = document.createElement("div");
  const icon = document.createElement("span");
  const title = document.createElement("h3");
  const folderMeta = document.createElement("span");
  const expandMark = document.createElement("span");
  const links = document.createElement("div");
  const folderActions = document.createElement("div");
  const editFolderButton = document.createElement("button");
  const deleteFolderButton = document.createElement("button");
  const folderLinks = folder.children.filter((bookmark) => bookmark.url);
  const linkCount = flattenBookmarks([folder]).length;

  card.className = "bookmark-card folder-card netlink-section";
  card.dataset.folderId = folder.id;
  card.draggable = canReceiveBookmarks;

  if (canReceiveBookmarks) {
    card.addEventListener("dragover", (event) => {
      if (event.dataTransfer.types.includes("text/bookmark-id")) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
      }
    });
    card.addEventListener("drop", (event) => {
      event.preventDefault();
      const bookmarkId = event.dataTransfer.getData("text/bookmark-id");

      if (!bookmarkId || bookmarkId === folder.id) {
        return;
      }

      chrome.bookmarks.move(bookmarkId, { parentId: folder.id }, () => {
        if (chrome.runtime.lastError) {
          handleBookmarkError();
          return;
        }

        loadBookmarkTree();
      });
    });
  }

  heading.className = "folder-heading";
  heading.type = "button";
  heading.setAttribute("aria-expanded", "false");
  heading.setAttribute("aria-controls", `folder-links-${folder.id}`);
  heading.addEventListener("click", () => {
    const isExpanded = card.classList.toggle("is-expanded");
    heading.setAttribute("aria-expanded", String(isExpanded));
    links.hidden = !isExpanded;
  });

  icon.className = "folder-icon";
  icon.textContent = getFolderIcon(folder.title);
  title.className = "folder-title";
  title.textContent = folder.title || translateValue("Untitled board", activeLanguage);

  folderMeta.className = "folder-meta";
  const linksLabel = activeLanguage === "es" ? "ENLACES" : "LINKS";
  folderMeta.textContent = `${String(linkCount).padStart(2, "0")} ${linksLabel}`;

  folderActions.className = "folder-actions";
  if (canReceiveBookmarks) {
    editFolderButton.className = "bookmark-action";
    editFolderButton.type = "button";
      editFolderButton.dataset.i18nKey = "RENAME";
      editFolderButton.textContent = translateValue(editFolderButton.dataset.i18nKey, activeLanguage);
    editFolderButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const title = window.prompt(translateValue("Board name:", activeLanguage), folder.title);
      if (title === null || !title.trim()) return;
      chrome.bookmarks.update(folder.id, { title: title.trim() }, () => refreshAfterMutation());
    });

    deleteFolderButton.className = "bookmark-action bookmark-action--danger";
    deleteFolderButton.type = "button";
    deleteFolderButton.dataset.i18nKey = "DELETE";
    deleteFolderButton.textContent = translateValue(deleteFolderButton.dataset.i18nKey, activeLanguage);
    deleteFolderButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const confirmation = activeLanguage === "es"
        ? `¿Eliminar el tablero "${folder.title}" y sus enlaces?`
        : `Delete board "${folder.title}" and its links?`;
      if (!window.confirm(confirmation)) return;
      chrome.bookmarks.removeTree(folder.id, () => refreshAfterMutation());
    });
    folderActions.append(editFolderButton, deleteFolderButton);
  }

  expandMark.className = "folder-expand-mark";
  expandMark.setAttribute("aria-hidden", "true");
  expandMark.textContent = "+";
  heading.append(icon, title, folderMeta, expandMark);

  links.className = "folder-links";
  links.id = `folder-links-${folder.id}`;
  links.hidden = true;
  if (folderLinks.length) {
    folderLinks.forEach((bookmark) => links.append(createBookmarkCard(bookmark)));
  } else {
    const emptyFolder = document.createElement("p");
    emptyFolder.className = "folder-empty";
    emptyFolder.dataset.i18nKey = "NO LINKS // DROP A NODE HERE";
    emptyFolder.textContent = translateValue(emptyFolder.dataset.i18nKey, activeLanguage);
    links.append(emptyFolder);
  }

  sectionLine.className = "netlink-line";
  sectionLine.setAttribute("aria-hidden", "true");
  card.append(sectionLine, heading, folderActions, links);
  return card;
}

function flattenBookmarks(nodes) {
  return nodes.flatMap((node) =>
    node.url ? [node] : flattenBookmarks(node.children || [])
  );
}

function getBoardFolders(board) {
  return (board.children || []).filter((node) => !node.url);
}

function getBoardLabel(board) {
  if (board.id === "1") return translateValue("BOOKMARKS BAR", activeLanguage);
  if (board.id === "2") return translateValue("OTHER BOOKMARKS", activeLanguage);
  return board.title;
}

function createBoardButton(board, label, isActive = false) {
  const button = document.createElement("button");
  const icon = document.createElement("span");
  const labelNode = document.createElement("span");
  const count = document.createElement("span");
  const boardId = board.id;

  button.className = "board-tab";
  button.type = "button";
  button.dataset.boardId = boardId;
  button.setAttribute("role", "tab");
  button.setAttribute("aria-selected", String(isActive));
  button.setAttribute("aria-controls", "bookmarks-grid");
  button.tabIndex = isActive ? 0 : -1;
  icon.className = "board-tab-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = boardId === "recent" ? "◷" : boardId === "1" ? "▤" : "▦";
  labelNode.className = "board-tab-label";
  labelNode.textContent = label;
  count.className = "board-tab-count";
  count.setAttribute("aria-hidden", "true");
  count.textContent = boardId === "recent"
    ? "··"
    : String(flattenBookmarks([board]).length).padStart(2, "0");
  button.append(icon, labelNode, count);
  button.addEventListener("click", () => {
    activeBoardId = board.id;
    renderBoardNavigation();
    renderBoard(board);
  });
  button.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const tabs = [...boardNav.querySelectorAll('[role="tab"]')];
    const currentIndex = tabs.indexOf(button);
    const nextIndex = event.key === "Home"
      ? 0
      : event.key === "End"
        ? tabs.length - 1
        : (currentIndex + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    tabs[nextIndex]?.focus();
  });
  return button;
}

function renderBoardNavigation() {
  boardNav.replaceChildren();
  const recentBoard = { id: "recent", children: [] };
  const recentButton = createBoardButton(
    recentBoard,
    translateValue("RECENT", activeLanguage),
    activeBoardId === "recent"
  );
  if (recentBookmarkCount !== null) {
    const recentCount = recentButton.querySelector(".board-tab-count");
    if (recentCount) recentCount.textContent = String(recentBookmarkCount).padStart(2, "0");
  }
  boardNav.append(recentButton);

  bookmarkTree.forEach((root) => {
    (root.children || [])
      .filter((node) => !node.url)
      .forEach((board) => boardNav.append(
        createBoardButton(board, getBoardLabel(board), activeBoardId === board.id)
      ));
  });
}

function renderBookmarks(bookmarks, title = "Search results") {
  const validBookmarks = bookmarks.filter((bookmark) => bookmark.url);
  bookmarksGrid.replaceChildren(...validBookmarks.map(createBookmarkCard));
  bookmarksTitle.textContent = translateValue(title, activeLanguage);
  updateStatus(validBookmarks.length);
}

function renderRecentBookmarks(bookmarks) {
  const validBookmarks = bookmarks.filter((bookmark) => bookmark.url);
  const recentGrid = document.createElement("div");
  recentGrid.className = "recent-bookmark-grid";
  recentGrid.setAttribute("aria-label", translateValue("Recent connections", activeLanguage));
  validBookmarks.forEach((bookmark, index) => {
    const card = createBookmarkCard(bookmark);
    card.classList.add("recent-bookmark-card");
    card.style.setProperty("--recent-order", String(index));
    recentGrid.append(card);
  });
  bookmarksGrid.replaceChildren(createBoardControls({ id: "recent", children: [] }), recentGrid);
  bookmarksTitle.textContent = translateValue("Recent connections", activeLanguage);
  updateStatus(validBookmarks.length);
}

function createBoardControls(board) {
  const controls = document.createElement("div");
  const createButton = document.createElement("button");
  const addBookmarkButton = document.createElement("button");
  const status = document.createElement("span");
  controls.className = "board-controls";
  createButton.className = "create-folder-button";
  createButton.type = "button";
  createButton.textContent = translateValue("+ NEW NODE", activeLanguage);
  createButton.addEventListener("click", () => {
    const title = window.prompt(translateValue("New board name:", activeLanguage));
    if (!title || !title.trim()) return;
    const parentId = board.id === "recent" ? "1" : board.id;
    chrome.bookmarks.create({ parentId, title: title.trim() }, () => refreshAfterMutation());
  });
  addBookmarkButton.className = "create-folder-button";
  addBookmarkButton.type = "button";
  addBookmarkButton.textContent = "+ ADD BOOKMARK";
  status.className = "bookmark-create-status";
  status.setAttribute("aria-live", "polite");
  addBookmarkButton.addEventListener("click", () => {
    const title = window.prompt("Bookmark title:");
    if (title === null) return;
    const url = window.prompt("Bookmark URL (http, https, or ftp):");
    if (url === null) return;
    const cleanTitle = title.trim();
    const cleanUrl = url.trim();
    let parsedUrl;
    try {
      parsedUrl = new URL(cleanUrl);
    } catch {
      parsedUrl = null;
    }
    if (!cleanTitle || cleanTitle.length > 256 || cleanUrl.length > 2048
      || !isValidBookmarkUrl(cleanUrl) || parsedUrl?.username || parsedUrl?.password) {
      status.textContent = "Use a title under 257 characters and a valid URL without embedded credentials.";
      status.classList.add("is-error");
      return;
    }
    const parentId = board.id === "recent" ? "1" : board.id;
    chrome.bookmarks.create({ parentId, title: cleanTitle, url: cleanUrl }, () => {
      if (chrome.runtime.lastError) {
        status.textContent = "Bookmark could not be created.";
        status.classList.add("is-error");
        return;
      }
      refreshAfterMutation();
    });
  });
  controls.append(createButton, addBookmarkButton, status);
  return controls;
}

function renderBoard(board) {
  if (board.id === "recent") {
    loadRecentBookmarks();
    return;
  }

  const folders = getBoardFolders(board);
  const directLinks = (board.children || []).filter((node) => node.url);
  const cards = folders.map(createFolderCard);

  if (directLinks.length) {
    const quickLinks = document.createElement("div");
    const useRecentCardStyle = board.id === "1";
    quickLinks.className = useRecentCardStyle
      ? "recent-bookmark-grid bookmarks-bar-grid"
      : "direct-links";
    directLinks.forEach((bookmark, index) => {
      const card = createBookmarkCard(bookmark);
      if (useRecentCardStyle) {
        card.classList.add("recent-bookmark-card");
        card.style.setProperty("--recent-order", String(index));
      }
      quickLinks.append(card);
    });
    cards.unshift(quickLinks);
  }

  bookmarksGrid.replaceChildren(...cards);
  bookmarksGrid.prepend(createBoardControls(board));
  bookmarksTitle.textContent = getBoardLabel(board) || "Untitled board";
  updateStatus(folders.reduce((total, folder) => total + flattenBookmarks([folder]).length, directLinks.length));
}

function refreshAfterMutation() {
  if (chrome.runtime.lastError) {
    handleBookmarkError();
    return;
  }

  loadBookmarkTree();
}

function handleBookmarkError() {
  bookmarksGrid.replaceChildren();
  bookmarkCount.textContent = translateValue("LINK ERROR", activeLanguage);
  emptyState.hidden = false;
  emptyState.textContent = translateValue("Unable to access the bookmark network.", activeLanguage);
}

function loadRecentBookmarks() {
  chrome.bookmarks.getRecent(20, (bookmarks) => {
    if (chrome.runtime.lastError) {
      handleBookmarkError();
      return;
    }

    recentBookmarkCount = bookmarks.length;
    const recentCount = boardNav?.querySelector('[data-board-id="recent"] .board-tab-count');
    if (recentCount) recentCount.textContent = String(recentBookmarkCount).padStart(2, "0");
    renderRecentBookmarks(bookmarks);
  });
}

function loadBookmarkTree() {
  chrome.bookmarks.getTree((tree) => {
    if (chrome.runtime.lastError) {
      handleBookmarkError();
      return;
    }

    bookmarkTree = tree;
    renderBoardNavigation();
    loadRecentBookmarks();
  });
}

searchInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") {
    return;
  }

  const query = searchInput.value.trim();

  if (!query) {
    return;
  }

  event.preventDefault();
  window.open(
    `${aiEndpoints.google}${encodeURIComponent(query)}`,
    "_blank",
    "noopener,noreferrer"
  );
});

document.addEventListener("keydown", (event) => {
  if (shortcutRecordingAction) {
    if (event.key === "Escape") {
      shortcutRecordingAction = null;
      renderKeyboardShortcuts();
      showFeatureStatus(shortcutStatus, "SHORTCUT ASSIGNMENT CANCELLED");
      return;
    }
    event.preventDefault();
    const shortcut = shortcutFromEvent(event);
    if (!isAllowedShortcut(shortcut)) {
      showFeatureStatus(shortcutStatus, "USE ALT + SHIFT + A LETTER OR NUMBER");
      return;
    }
    const conflict = shortcutActions.find(({ id }) => id !== shortcutRecordingAction
      && shortcutMatches(shortcut, keyboardShortcuts[id]));
    if (conflict) {
      showFeatureStatus(shortcutStatus, `SHORTCUT ALREADY ASSIGNED // ${conflict.label}`, true);
      return;
    }
    keyboardShortcuts[shortcutRecordingAction] = shortcut;
    shortcutRecordingAction = null;
    saveUserSettings({ keyboardShortcuts });
    renderKeyboardShortcuts();
    showFeatureStatus(shortcutStatus, "SHORTCUT SAVED");
    return;
  }

  const target = event.target;
  const isEditable = target instanceof HTMLElement
    && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
  if (!isEditable) {
    const action = shortcutActions.find(({ id }) => shortcutMatches(event, keyboardShortcuts[id]));
    if (action) {
      event.preventDefault();
      runKeyboardShortcut(action.id);
      return;
    }
  }

  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openCommandPalette();
    return;
  }

  if (event.key === "Escape" && settingsPanel?.classList.contains("is-open")) {
    settingsToggle?.setAttribute("aria-expanded", "false");
    if (settingsContent) settingsContent.hidden = true;
    settingsPanel.classList.remove("is-open");
  }
});

loadBookmarkTree();
