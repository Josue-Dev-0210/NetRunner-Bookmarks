霓 Netrunner Bookmarks (Demontech Node)

A lightweight, smart bookmark and shortcut manager built in pure JavaScript with a dark, neon-inspired visual design. This project is designed to replace your browser’s “New Tab” page with a productive, cyberpunk-style workspace.

## Key Features
- **Node Management (Bookmarks):** Explore and organize your browser’s local bookmark network with a terminal-style interface.
- **Local Productivity Widgets:** Includes a built-in task queue manager and notepad that save information locally (autosave).
- **Premium Navigation Dock:** A bottom glass dock keeps service shortcuts in view; its Sections menu groups workspace navigation, bookmark boards, and Visual System controls.
- **Node Signals Panel:** System telemetry starts hidden and can be shown or hidden from the Sections menu; visibility is saved with local widget preferences.
- **Clock Display Controls:** Clock-side labels, seconds, timezone, date, system status, and HUD signals (ACCESS GRANTED, LINK ARCHIVE READY, AWAITING INPUT, USER / ONLINE) start hidden and can be enabled individually; choose a shared color for auxiliary text. Netrunner messages are off by default.
- **Built-in AI Launcher:** Clickable shortcuts for ChatGPT, Gemini, Claude, and other services; add up to 60 custom HTTPS shortcuts from Visual System.
- **Customizable Visual System:** Use the bundled abstract wallpaper or choose a local image (PNG, JPG, or WEBP, up to 2 MB); restore the bundled default at any time. Adjust wallpaper intensity, pick from 4 color schemes, or customize the primary and accent neon colors. Custom colors tint the glass borders and accents without changing translucent panel surfaces. Wallpaper and preferences stay in local extension storage.
- **Vanilla JavaScript:** All logic is implemented without heavy frameworks, ensuring optimal performance.

## Technologies
- HTML5
- CSS3 (Native variables and animations)
- JavaScript (ES6+, Vanilla)

### Preview

<img width="1888" height="943" alt="Captura desde 2026-09-25 10-01-11" src="https://github.com/user-attachments/assets/f449de92-d027-45ef-820d-97c8015d4103" />

## Installation and Use

### Option A: As a Browser Extension (Recommended)
To have it automatically replace your new tab and give you full access to your actual bookmarks:
1. Clone this repository or download the `.zip` file.
2. Go to `chrome://extensions/` (or `brave://extensions/`) in your browser.
3. Enable **Developer Mode** (top right).
4. Click **Load unpacked** and select the project folder.
5. Open a new tab, and the system will launch.
