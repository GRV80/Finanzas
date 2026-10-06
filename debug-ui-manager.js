/**
 * DEBUG UI MANAGER - INFRAESTRUCTURA DE DEBUG Y ESTABILIDAD
 * Sistema permanente de diagnóstico y protección del DOM
 */

// Crear namespace global de debug
window.__UI_DEBUG__ = {
    overlays: new Map(),
    listeners: new Map(),
    headerWatchdog: null,
    
    // A) REGISTRO GLOBAL DE OVERLAYS
    registry: {
        created: [],
        removed: [],
        active: []
    },

    // B) REGISTRO GLOBAL DE LISTENERS
    listenerRegistry: new Map(),
    
    // C) PANEL GLOBAL DE DEBUG
    init() {
        console.log('[UI-DEBUG] Inicializando sistema de debug UI...');
        this.patchDocumentCreateElement();
        this.patchEventListeners();
        this.startHeaderWatchdog();
        this.setupConsoleCommands();
        console.log('[UI-DEBUG] Sistema de debug UI inicializado completamente');
    },

    // A) INTERCEPTAR DOCUMENT.CREATEELEMENT
    patchDocumentCreateElement() {
        const originalCreateElement = document.createElement;
        const self = this;
        
        document.createElement = function(tagName, options) {
            const element = originalCreateElement.call(this, tagName, options);
            
            // Detectar overlays potenciales
            if (tagName.toLowerCase() === 'div') {
                const observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                            self.checkForOverlay(element);
                        }
                    });
                });
                
                observer.observe(element, { attributes: true });
            }
            
            return element;
        };
        
        console.log('[UI-DEBUG] document.createElement parchado');
    },

    // A) DETECTAR OVERLAYS
    checkForOverlay(element) {
        const style = window.getComputedStyle(element);
        const isOverlay = (
            style.position === 'fixed' &&
            (style.zIndex > 1000 || style.zIndex === '9999' || style.zIndex === '10000')
        );
        
        if (isOverlay && !this.overlays.has(element)) {
            const overlayInfo = {
                element: element,
                timestamp: Date.now(),
                caller: this.getCaller(),
                classes: Array.from(element.classList),
                zIndex: style.zIndex,
                width: style.width,
                height: style.height,
                removed: false
            };
            
            this.overlays.set(element, overlayInfo);
            this.registry.created.push(overlayInfo);
            this.registry.active.push(overlayInfo);
            
            console.log('[OVERLAY] Overlay detectado:', overlayInfo);
        }
    },

    // A) OBTENER CALLER
    getCaller() {
        const stack = new Error().stack;
        const lines = stack.split('\n');
        for (let i = 2; i < lines.length; i++) {
            const line = lines[i];
            if (line && !line.includes('debug-ui-manager.js')) {
                const match = line.match(/at\s+.*\((.*):(\d+):(\d+)\)/);
                if (match) {
                    return `${match[1]}:${match[2]}`;
                }
            }
        }
        return 'unknown';
    },

    // B) PATCH DE EVENT LISTENERS
    patchEventListeners() {
        const originalAdd = EventTarget.prototype.addEventListener;
        const originalRemove = EventTarget.prototype.removeEventListener;
        const self = this;
        
        EventTarget.prototype.addEventListener = function(type, listener, options) {
            const listenerInfo = {
                target: this,
                type: type,
                listener: listener,
                options: options,
                timestamp: Date.now(),
                caller: self.getCaller(),
                id: Math.random().toString(36).substr(2, 9)
            };
            
            if (!self.listenerRegistry.has(this)) {
                self.listenerRegistry.set(this, []);
            }
            
            self.listenerRegistry.get(this).push(listenerInfo);
            
            // Detectar listeners duplicados
            const duplicates = self.listenerRegistry.get(this).filter(
                l => l.type === type && l.target === this
            );
            
            if (duplicates.length > 1) {
                console.log('[LISTENER] Listener duplicado detectado:', {
                    target: this,
                    type: type,
                    count: duplicates.length,
                    listeners: duplicates.map(l => ({ id: l.id, caller: l.caller }))
                });
            }
            
            return originalAdd.call(this, type, listener, options);
        };
        
        EventTarget.prototype.removeEventListener = function(type, listener, options) {
            const registry = self.listenerRegistry.get(this);
            if (registry) {
                const index = registry.findIndex(l => l.listener === listener && l.type === type);
                if (index !== -1) {
                    const removed = registry.splice(index, 1)[0];
                    console.log('[LISTENER] Listener removido:', removed);
                }
            }
            
            return originalRemove.call(this, type, listener, options);
        };
        
        console.log('[UI-DEBUG] EventTarget.prototype parchado');
    },

    // C) MÉTODOS DEL PANEL DE DEBUG
    listOverlays() {
        console.log('[UI-DEBUG] Overlays registrados:');
        this.overlays.forEach((info, element) => {
            console.log(`  - ${info.zIndex} (${info.classes.join(', ')}) - ${info.removed ? 'REMOVED' : 'ACTIVE'}`);
        });
        return Array.from(this.overlays.values());
    },

    activeListeners() {
        console.log('[UI-DEBUG] Listeners activos:');
        this.listenerRegistry.forEach((listeners, target) => {
            listeners.forEach(listener => {
                console.log(`  - ${listener.type} on ${target.tagName || target} (${listener.caller})`);
            });
        });
        return Array.from(this.listenerRegistry.values()).flat();
    },

    detectFullscreenBlocks() {
        const overlays = Array.from(this.overlays.values());
        const fullscreenBlocks = overlays.filter(o => 
            o.zIndex > 1000 && 
            (o.width === '100vw' || o.width === '100%') &&
            (o.height === '100vh' || o.height === '100%')
        );
        
        console.log('[UI-DEBUG] Bloques fullscreen detectados:', fullscreenBlocks.length);
        fullscreenBlocks.forEach(block => {
            console.log(`  - ${block.zIndex} (${block.caller})`);
        });
        
        return fullscreenBlocks;
    },

    detectDuplicateListeners() {
        const duplicates = [];
        this.listenerRegistry.forEach((listeners, target) => {
            const typeGroups = {};
            listeners.forEach(listener => {
                if (!typeGroups[listener.type]) {
                    typeGroups[listener.type] = [];
                }
                typeGroups[listener.type].push(listener);
            });
            
            Object.entries(typeGroups).forEach(([type, group]) => {
                if (group.length > 1) {
                    duplicates.push({
                        target,
                        type,
                        count: group.length,
                        listeners: group
                    });
                }
            });
        });
        
        console.log('[UI-DEBUG] Listeners duplicados:', duplicates.length);
        duplicates.forEach(dup => {
            console.log(`  - ${dup.type} on ${dup.target.tagName || dup.target}: ${dup.count} veces`);
        });
        
        return duplicates;
    },

    inspectHeaderState() {
        const actionsBtn = document.getElementById('actionsBtn');
        const optionsBtn = document.getElementById('optionsBtn');
        const moreOptionsMenu = document.getElementById('moreOptionsMenu');
        const actionsMenu = document.getElementById('actionsMenu');
        const optionsMenu = document.getElementById('optionsMenu');
        
        const state = {
            actionsBtn: {
                exists: !!actionsBtn,
                visible: actionsBtn ? actionsBtn.offsetParent !== null : false,
                hasClickListener: actionsBtn ? this.hasClickListener(actionsBtn) : false,
                pointerEvents: actionsBtn ? window.getComputedStyle(actionsBtn).pointerEvents : 'none'
            },
            optionsBtn: {
                exists: !!optionsBtn,
                visible: optionsBtn ? optionsBtn.offsetParent !== null : false,
                hasClickListener: optionsBtn ? this.hasClickListener(optionsBtn) : false,
                pointerEvents: optionsBtn ? window.getComputedStyle(optionsBtn).pointerEvents : 'none'
            },
            menus: {
                moreOptionsMenu: {
                    exists: !!moreOptionsMenu,
                    display: moreOptionsMenu ? window.getComputedStyle(moreOptionsMenu).display : 'none'
                },
                actionsMenu: {
                    exists: !!actionsMenu,
                    display: actionsMenu ? window.getComputedStyle(actionsMenu).display : 'none'
                },
                optionsMenu: {
                    exists: !!optionsMenu,
                    display: optionsMenu ? window.getComputedStyle(optionsMenu).display : 'none'
                }
            }
        };
        
        console.log('[UI-DEBUG] Estado del header:', state);
        return state;
    },

    hasClickListener(element) {
        const listeners = this.listenerRegistry.get(element);
        return listeners ? listeners.some(l => l.type === 'click') : false;
    },

    emergencyCleanup() {
        console.log('[UI-DEBUG] Iniciando cleanup de emergencia...');
        
        // Remover overlays activos
        this.overlays.forEach((info, element) => {
            if (!info.removed && element.parentNode) {
                console.log('[UI-DEBUG] Removiendo overlay de emergencia:', info);
                element.remove();
                info.removed = true;
            }
        });
        
        // Limpiar registros
        this.registry.removed = [...this.registry.active];
        this.registry.active = [];
        
        console.log('[UI-DEBUG] Cleanup de emergencia completado');
    },

    // D) PROTECCIÓN DEL HEADER CON WATCHDOG
    startHeaderWatchdog() {
        if (this.headerWatchdog) {
            clearInterval(this.headerWatchdog);
        }
        
        this.headerWatchdog = setInterval(() => {
            this.checkHeaderHealth();
        }, 2000);
        
        console.log('[UI-DEBUG] Watchdog del header iniciado (cada 2 segundos)');
    },

    checkHeaderHealth() {
        const actionsBtn = document.getElementById('actionsBtn');
        const optionsBtn = document.getElementById('optionsBtn');
        
        if (!actionsBtn || !optionsBtn) {
            console.warn('[HEADER-WATCHDOG] Botones del header no encontrados');
            return;
        }
        
        const actionsBlock = this.findElementBlocking(actionsBtn);
        const optionsBlock = this.findElementBlocking(optionsBtn);
        
        if (actionsBlock) {
            console.warn('[HEADER-WATCHDOG] Botón Acciones bloqueado:', actionsBlock);
        }
        
        if (optionsBlock) {
            console.warn('[HEADER-WATCHDOG] Botón Opciones bloqueado:', optionsBlock);
        }
        
        // Verificar listeners activos
        if (!this.hasClickListener(actionsBtn)) {
            console.warn('[HEADER-WATCHDOG] Botón Acciones sin click listener');
        }
        
        if (!this.hasClickListener(optionsBtn)) {
            console.warn('[HEADER-WATCHDOG] Botón Opciones sin click listener');
        }
    },

    // E) DETECTOR DE OVERLAY BLOQUEANTE
    findElementBlocking(element) {
        if (!element || !element.getBoundingClientRect) {
            return null;
        }
        
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const topElement = document.elementFromPoint(centerX, centerY);
        
        if (topElement === element) {
            return null; // No hay bloqueo
        }
        
        // Analizar elemento bloqueante
        const style = window.getComputedStyle(topElement);
        return {
            element: topElement,
            tagName: topElement.tagName,
            classes: Array.from(topElement.classList),
            zIndex: style.zIndex,
            position: style.position,
            pointerEvents: style.pointerEvents,
            rect: topElement.getBoundingClientRect()
        };
    },

    // F) MODO SAFE CLEANUP
    safeCleanupModals() {
        console.log('[UI-DEBUG] Iniciando cleanup seguro de modales...');
        
        const removed = [];
        
        // SOLO remover overlays registrados
        this.overlays.forEach((info, element) => {
            if (!info.removed && element.parentNode) {
                // NO eliminar elementos del header
                const isHeaderElement = 
                    element.id === 'actionsBtn' ||
                    element.id === 'optionsBtn' ||
                    element.id === 'moreOptionsMenu' ||
                    element.id === 'actionsMenu' ||
                    element.id === 'optionsMenu' ||
                    element.classList.contains('header-btn') ||
                    element.classList.contains('dropdown-menu');
                
                if (!isHeaderElement) {
                    element.remove();
                    info.removed = true;
                    removed.push(info);
                    console.log('[UI-DEBUG] Overlay removido safely:', info);
                }
            }
        });
        
        console.log('[UI-DEBUG] Cleanup seguro completado. Overlays removidos:', removed.length);
        return removed;
    },

    // G) CONFIGURAR COMANDOS DE CONSOLA
    setupConsoleCommands() {
        window.__UI_DEBUG__.listOverlays = this.listOverlays.bind(this);
        window.__UI_DEBUG__.activeListeners = this.activeListeners.bind(this);
        window.__UI_DEBUG__.detectFullscreenBlocks = this.detectFullscreenBlocks.bind(this);
        window.__UI_DEBUG__.detectDuplicateListeners = this.detectDuplicateListeners.bind(this);
        window.__UI_DEBUG__.inspectHeaderState = this.inspectHeaderState.bind(this);
        window.__UI_DEBUG__.emergencyCleanup = this.emergencyCleanup.bind(this);
        window.__UI_DEBUG__.safeCleanupModals = this.safeCleanupModals.bind(this);
        window.__UI_DEBUG__.findElementBlocking = this.findElementBlocking.bind(this);
        
        console.log('[UI-DEBUG] Comandos de consola configurados');
        console.log('[UI-DEBUG] Ejemplos de uso:');
        console.log('  __UI_DEBUG__.listOverlays()');
        console.log('  __UI_DEBUG__.detectFullscreenBlocks()');
        console.log('  __UI_DEBUG__.inspectHeaderState()');
    }
};

// Inicializar automáticamente cuando se carga el script
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.__UI_DEBUG__.init();
    });
} else {
    window.__UI_DEBUG__.init();
}
