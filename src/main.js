/*
 * WhatsApp Desktop Client
 *
 * A sleek, unofficial desktop client for WhatsApp built with Electron.
 * Provides a native experience for WhatsApp Web on Linux desktops.
 *
 * @author Waseem Akram (@evildevill)
 * @license MIT
 * @version 1.2.0
 * @repository https://github.com/evildevill/whatsapp-desktop-linux
 *
 * For educational purposes only.
 * Not affiliated with WhatsApp Inc.
 */

import fs from 'fs';
import { app, BrowserWindow, shell, screen } from 'electron';
import path from 'path';
import { config } from './config/index.js';
import { fileURLToPath } from 'url';

// Define path for storing window state
const stateFilePath = path.join(app.getPath('userData'), 'window-state.json');

/**
 * Loads saved window state and ensures it fits within screen bounds.
 * @returns {Object} Window state with position, size, and display info
 */
function loadWindowState() {
    try {
        if (!fs.existsSync(stateFilePath)) {
            console.log('Window state file not found, using defaults.');
            return getCenteredWindowState(800, 600);
        }

        const rawData = fs.readFileSync(stateFilePath, 'utf-8');
        const state = JSON.parse(rawData);

        if (!state.width || !state.height || isNaN(state.x) || isNaN(state.y)) {
            throw new Error('Invalid window state data');
        }

        const displays = screen.getAllDisplays();
        const display = displays.find(d => d.id === state.displayId);

        if (!display) {
            console.log('Previous display not found, using primary display.');
            return getCenteredWindowState(state.width, state.height);
        }

        // Check if window is within display bounds
        const { x, y, width, height } = state;
        const { x: dx, y: dy, width: dw, height: dh } = display.bounds;

        if (x < dx || y < dy || x + width > dx + dw || y + height > dy + dh) {
            console.log('Window out of bounds, repositioning...');
            return getCenteredWindowState(width, height, display.bounds);
        }

        return state;
    } catch (error) {
        console.error('Error loading window state:', error);
        return getCenteredWindowState(800, 600);
    }
}

/**
 * Saves current window state to disk for persistence.
 * @param {BrowserWindow} win - The main application window
 */
function saveWindowState(win) {
    if (!win.isMinimized() && !win.isFullScreen()) {
        try {
            const bounds = win.getBounds();
            const display = screen.getDisplayMatching(bounds);

            const state = {
                ...bounds,
                displayId: display.id
            };

            fs.writeFileSync(stateFilePath, JSON.stringify(state));
            console.log('Window state saved successfully');
        } catch (error) {
            console.error('Error saving window state:', error);
        }
    }
}

/**
 * Calculates centered window position on the given display.
 * @param {number} width - Window width
 * @param {number} height - Window height
 * @param {Object} bounds - Display bounds (optional)
 * @returns {Object} Window state object
 */
function getCenteredWindowState(width, height, bounds = screen.getPrimaryDisplay().bounds) {
    return {
        width,
        height,
        x: Math.max(bounds.x, Math.floor(bounds.x + (bounds.width - width) / 2)),
        y: Math.max(bounds.y, Math.floor(bounds.y + (bounds.height - height) / 2)),
        displayId: screen.getPrimaryDisplay().id
    };
}

// Initialize context menu for better UX
import('electron-context-menu').then(({ default: contextMenu }) => {
    contextMenu({
        showSaveImageAs: true,
        showInspectElement: false
    });
});

const WHATSAPP_WEB_URL = 'https://web.whatsapp.com';

/**
 * @type {BrowserWindow | null}
 */
let mainWindow = null;

/**
 * Handles new window requests by opening them in external browser.
 * @param {Electron.HandlerDetails} details
 * @returns {{ action: 'deny' }}
 */
function handleNewWindow(details) {
    shell.openExternal(details.url);
    return { action: 'deny' };
}

// Calculate __dirname for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Creates and configures the main application window.
 */
const createWindow = () => {
    const windowState = loadWindowState();

    mainWindow = new BrowserWindow({
        width: windowState.width,
        height: windowState.height,
        x: windowState.x,
        y: windowState.y,
        icon: path.join(__dirname, '../assets/icon.png'),
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    mainWindow.loadURL(WHATSAPP_WEB_URL, { userAgent: config.userAgent });
    mainWindow.webContents.setWindowOpenHandler(handleNewWindow);
    mainWindow.on('close', () => saveWindowState(mainWindow));
};

// Handle single instance lock
const gotLock = app.requestSingleInstanceLock();

const PROTOCOL = 'whatsapp';
if (!app.isDefaultProtocolClient(PROTOCOL, process.execPath)) {
    app.setAsDefaultProtocolClient(PROTOCOL, process.execPath);
}

if (!gotLock) {
    app.quit();
} else {
    app.on('second-instance', handleSecondInstance);
    app.on('ready', createWindow);
}

/**
 * Processes command line arguments for WhatsApp links.
 * @param {string[]} args - Command line arguments
 * @returns {string | null} Processed URL or null
 */
function processArgs(args) {
    const httpsRegex = /^https:\/\/web\.whatsapp\.com\/.*/;
    const whatsappRegex = /^whatsapp:.*/;

    for (const arg of args) {
        if (httpsRegex.test(arg)) {
            return arg;
        }
        if (whatsappRegex.test(arg)) {
            return WHATSAPP_WEB_URL + arg.substring(10);
        }
    }
    return null;
}

/**
 * Handles second instance launch, focusing existing window and processing args.
 * @param {Event} event
 * @param {string[]} args
 */
function handleSecondInstance(event, args) {
    console.debug('Second instance detected');
    if (mainWindow) {
        event.preventDefault();
        const url = processArgs(args);
        if (url) {
            mainWindow.loadURL(url, { userAgent: config.chromeUserAgent });
        }
        mainWindow.focus();
    }
}
