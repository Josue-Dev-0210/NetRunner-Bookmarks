const searchInput = document.querySelector("#search-input");
const bookmarksGrid = document.querySelector("#bookmarks-grid");
const emptyState = document.querySelector("#empty-state");
const bookmarkCount = document.querySelector("#bookmark-count");
const boardNav = document.querySelector("#board-nav");
const bookmarksTitle = document.querySelector("#bookmarks-title");
const aiProviders = document.querySelectorAll(".ai-provider");
const settingsToggle = document.querySelector("#settings-toggle");
const settingsContent = document.querySelector("#settings-content");
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
const commandPalette = document.querySelector("#command-palette");
const commandPaletteInput = document.querySelector("#command-palette-input");
const commandPaletteActions = document.querySelector("#command-palette-actions");
const commandPaletteClose = document.querySelector("#command-palette-close");
const onboardingOverlay = document.querySelector("#onboarding-overlay");
const onboardingClose = document.querySelector("#onboarding-close");
const showTutorialButton = document.querySelector("#show-tutorial-button");
const bugReportInput = document.querySelector("#bug-report-input");
const copyBugReportButton = document.querySelector("#copy-bug-report-button");
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
let widgetOrder = ["hud", "shortcuts", "productivity", "bookmarks", "settings"];
let activeDensity = "balanced";
let activeWidgetSize = "balanced";
let activeColumns = "2";

const defaultShortcuts = [
  { id: "youtube", name: "YOUTUBE", url: "https://www.youtube.com/" },
  { id: "instagram", name: "INSTAGRAM", url: "https://www.instagram.com/" },
  { id: "github", name: "GITHUB", url: "https://github.com/" },
];

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
  if (glassOpacityStatus) glassOpacityStatus.textContent = `${Math.round(opacity * 100)}% SURFACE OPACITY`;
}

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

copyBugReportButton?.addEventListener("click", async () => {
  const description = bugReportInput?.value.trim();
  if (!description) {
    if (bugReportStatus) bugReportStatus.textContent = "ADD A DESCRIPTION FIRST";
    bugReportInput?.focus();
    return;
  }

  const report = [
    "DEMONTECH-BOOKMARKS BUG REPORT",
    `DATE: ${new Date().toISOString()}`,
    `BROWSER: ${navigator.userAgent}`,
    "",
    "DESCRIPTION:",
    description,
  ].join("\n");

  try {
    await navigator.clipboard.writeText(report);
    if (bugReportStatus) bugReportStatus.textContent = "REPORT COPIED // READY TO SEND";
  } catch {
    if (bugReportStatus) bugReportStatus.textContent = "COPY BLOCKED // SELECT TEXT MANUALLY";
    bugReportInput.value = report;
    bugReportInput.select();
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

  if (customAiList) {
    customAiList.replaceChildren();
    defaultShortcuts.forEach((shortcut) => {
      const row = document.createElement("div");
      const label = document.createElement("span");
      const toggle = document.createElement("button");
      const isDisabled = disabledDefaultShortcuts.includes(shortcut.id);
      row.className = "custom-ai-row";
      label.textContent = `${shortcut.name} // DEFAULT`;
      toggle.type = "button";
      toggle.className = "settings-reset";
      toggle.textContent = isDisabled ? "RESTORE" : "REMOVE";
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
      remove.textContent = "REMOVE";
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

  if (typeof settings.backgroundImage === "string" && settings.backgroundImage.startsWith("data:image/")) {
    document.documentElement.style.setProperty("--custom-background-image", `url("${settings.backgroundImage}")`);
    document.documentElement.classList.add("custom-background-active");
    if (backgroundFileStatus) backgroundFileStatus.textContent = "CUSTOM IMAGE ACTIVE";
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
    if (backgroundFileStatus) backgroundFileStatus.textContent = "INVALID FILE // MAX 2MB";
    return;
  }

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    if (typeof reader.result !== "string" || !reader.result.startsWith("data:image/")) {
      if (backgroundFileStatus) backgroundFileStatus.textContent = "IMAGE READ FAILED";
      return;
    }
    saveUserSettings({ backgroundImage: reader.result });
    applyUserSettings({ backgroundImage: reader.result });
  });
  reader.addEventListener("error", () => {
    if (backgroundFileStatus) backgroundFileStatus.textContent = "IMAGE READ FAILED";
  });
  reader.readAsDataURL(file);
});

resetBackgroundButton?.addEventListener("click", () => {
  document.documentElement.style.removeProperty("--custom-background-image");
  document.documentElement.classList.remove("custom-background-active");
  if (backgroundFileInput) backgroundFileInput.value = "";
  if (backgroundFileStatus) backgroundFileStatus.textContent = "DEFAULT CITY NODE";
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
    "widgetVisibility",
    "widgetOrder",
    "density",
    "onboardingComplete",
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
    renderCustomAiShortcuts();
  }
);

const themeNames = ["electric-purple", "neon-pink", "night-city", "black-ice"];

if (settingsToggle && settingsContent) {
  settingsToggle.addEventListener("click", () => {
    const isExpanded = settingsToggle.getAttribute("aria-expanded") === "true";
    settingsToggle.setAttribute("aria-expanded", String(!isExpanded));
    settingsContent.hidden = isExpanded;
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
    .filter((action) => action.label.toLowerCase().includes(normalizedQuery))
    .forEach((action) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "command-action";
      button.textContent = action.label;
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
    .toLocaleDateString("en-US", {
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
      selectedAiLabel.textContent = "AI UNAVAILABLE";
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
  bookmarkCount.textContent = `${String(count).padStart(2, "0")} SIGNALS`;
  emptyState.hidden = count > 0;
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
    openLink.textContent = "OPEN LINK ↗";
  } else {
    openLink.textContent = "UNSAFE LINK";
    openLink.setAttribute("aria-disabled", "true");
    openLink.tabIndex = -1;
  }

  actions.className = "bookmark-actions";
  editButton.className = "bookmark-action";
  editButton.type = "button";
  editButton.textContent = "EDIT";
  editButton.addEventListener("click", (event) => {
    event.stopPropagation();
    const title = window.prompt("Bookmark title:", bookmark.title);
    if (title === null) return;
    const url = window.prompt("Bookmark URL:", bookmark.url);
    if (url === null || !isValidBookmarkUrl(url.trim())) return;
    chrome.bookmarks.update(
      bookmark.id,
      { title: title.trim() || bookmark.title, url: url.trim() },
      () => refreshAfterMutation()
    );
  });

  deleteButton.className = "bookmark-action bookmark-action--danger";
  deleteButton.type = "button";
  deleteButton.textContent = "DELETE";
  deleteButton.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!window.confirm(`Delete "${bookmark.title || bookmark.url}"?`)) return;
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
  title.textContent = folder.title || "Untitled board";

  folderMeta.className = "folder-meta";
  folderMeta.textContent = `${String(linkCount).padStart(2, "0")} LINKS`;

  folderActions.className = "folder-actions";
  if (canReceiveBookmarks) {
    editFolderButton.className = "bookmark-action";
    editFolderButton.type = "button";
    editFolderButton.textContent = "RENAME";
    editFolderButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const title = window.prompt("Board name:", folder.title);
      if (title === null || !title.trim()) return;
      chrome.bookmarks.update(folder.id, { title: title.trim() }, () => refreshAfterMutation());
    });

    deleteFolderButton.className = "bookmark-action bookmark-action--danger";
    deleteFolderButton.type = "button";
    deleteFolderButton.textContent = "DELETE";
    deleteFolderButton.addEventListener("click", (event) => {
      event.stopPropagation();
      if (!window.confirm(`Delete board "${folder.title}" and its links?`)) return;
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
    emptyFolder.textContent = "NO LINKS // DROP A NODE HERE";
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
  if (board.id === "1") return "BOOKMARKS BAR";
  if (board.id === "2") return "OTHER BOOKMARKS";
  return board.title;
}

function createBoardButton(board, label, isActive = false) {
  const button = document.createElement("button");
  button.className = "board-tab";
  button.type = "button";
  button.dataset.boardId = board.id;
  button.textContent = label;
  button.setAttribute("aria-selected", String(isActive));
  button.setAttribute("aria-expanded", String(isActive));
  button.addEventListener("click", () => {
    activeBoardId = activeBoardId === board.id ? null : board.id;
    renderBoardNavigation();
    if (activeBoardId === null) {
      bookmarksGrid.replaceChildren();
      bookmarksTitle.textContent = "Select a connection board";
      updateStatus(0);
      return;
    }

    renderBoard(board);
  });
  return button;
}

function renderBoardNavigation() {
  boardNav.replaceChildren();
  const recentBoard = { id: "recent", children: [] };
  boardNav.append(createBoardButton(recentBoard, "RECENT", activeBoardId === "recent"));

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
  bookmarksTitle.textContent = title;
  updateStatus(validBookmarks.length);
}

function renderRecentBookmarks(bookmarks) {
  const validBookmarks = bookmarks.filter((bookmark) => bookmark.url);
  const recentPanel = createFolderCard(
    {
      id: "recent-links",
      title: "Recent connections",
      children: validBookmarks,
    },
    { canReceiveBookmarks: false }
  );

  bookmarksGrid.replaceChildren(recentPanel);
  bookmarksTitle.textContent = "Recent connections";
  updateStatus(validBookmarks.length);
}

function createBoardControls(board) {
  const controls = document.createElement("div");
  const createButton = document.createElement("button");
  controls.className = "board-controls";
  createButton.className = "create-folder-button";
  createButton.type = "button";
  createButton.textContent = "+ NEW NODE";
  createButton.addEventListener("click", () => {
    const title = window.prompt("New board name:");
    if (!title || !title.trim()) return;
    const parentId = board.id === "recent" ? "1" : board.id;
    chrome.bookmarks.create({ parentId, title: title.trim() }, () => refreshAfterMutation());
  });
  controls.append(createButton);
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
    quickLinks.className = "direct-links";
    directLinks.forEach((bookmark) => quickLinks.append(createBookmarkCard(bookmark)));
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
  bookmarkCount.textContent = "LINK ERROR";
  emptyState.hidden = false;
  emptyState.textContent = "Unable to access the bookmark network.";
}

function loadRecentBookmarks() {
  chrome.bookmarks.getRecent(20, (bookmarks) => {
    if (chrome.runtime.lastError) {
      handleBookmarkError();
      return;
    }

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
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openCommandPalette();
  }
});

loadBookmarkTree();
