/**
 * APP EVENTS - Event Bus simple para sincronización entre módulos
 * Proporciona comunicación desacoplada entre componentes
 */

const eventListeners = new Map();
let debugMode = false;

// Habilitar modo debug
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    debugMode = true;
}

/**
 * Event Bus principal para comunicación entre módulos
 */
window.AppEvents = {
    
    /**
     * Suscribirse a un evento
     * @param {string} event - Nombre del evento
     * @param {function} callback - Función a ejecutar
     * @param {object} options - Opciones { once: false, priority: 0 }
     * @returns {function} Función para unsuscribir
     */
    on(event, callback, options = {}) {
        if (debugMode) {
            console.log(`[EVENTS] ON ${event}`, { callback: callback.name, options });
        }
        
        if (!eventListeners.has(event)) {
            eventListeners.set(event, []);
        }
        
        const listener = {
            callback,
            id: Math.random().toString(36).substr(2, 9),
            once: options.once || false,
            priority: options.priority || 0,
            created: Date.now()
        };
        
        eventListeners.get(event).push(listener);
        
        // Ordenar por prioridad (mayor prioridad primero)
        eventListeners.get(event).sort((a, b) => b.priority - a.priority);
        
        // Devolver función para unsuscribir
        return () => this.off(event, listener.id);
    },
    
    /**
     * Emitir un evento
     * @param {string} event - Nombre del evento
     * @param {*} data - Datos a pasar a los listeners
     * @param {object} options - Opciones { async: false, target: null }
     */
    emit(event, data, options = {}) {
        if (debugMode) {
            console.log(`[EVENTS] EMIT ${event}`, { data, options });
        }
        
        const listeners = eventListeners.get(event);
        if (!listeners || listeners.length === 0) {
            if (debugMode) {
                console.log(`[EVENTS] No listeners para ${event}`);
            }
            return;
        }
        
        const eventData = {
            type: event,
            data: data,
            timestamp: Date.now(),
            source: options.source || 'unknown',
            target: options.target || null
        };
        
        // Ejecutar listeners en orden de prioridad
        const listenersToExecute = options.once ? 
            listeners.slice(0, 1) : 
            [...listeners];
        
        if (options.async) {
            // Ejecución asíncrona
            setTimeout(() => {
                listenersToExecute.forEach(listener => {
                    this.executeListener(listener, eventData);
                });
            }, 0);
        } else {
            // Ejecución síncrona
            listenersToExecute.forEach(listener => {
                this.executeListener(listener, eventData);
            });
        }
        
        // Limpiar listeners con once: true
        if (options.once) {
            eventListeners.set(event, listeners.filter(l => !l.once));
        }
    },
    
    /**
     * Eliminar suscripción a un evento
     * @param {string} event - Nombre del evento
     * @param {string|function} listenerId - ID del listener o función
     */
    off(event, listenerId) {
        if (debugMode) {
            console.log(`[EVENTS] OFF ${event}`, { listenerId });
        }
        
        const listeners = eventListeners.get(event);
        if (!listeners) {
            return;
        }
        
        const toRemove = typeof listenerId === 'string' ?
            listeners.find(l => l.id === listenerId) :
            listeners.find(l => l.callback === listenerId);
        
        if (toRemove) {
            const index = listeners.indexOf(toRemove);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
    },
    
    /**
     * Eliminar todos los listeners de un evento
     * @param {string} event - Nombre del evento
     */
    removeAll(event) {
        if (debugMode) {
            console.log(`[EVENTS] REMOVE ALL ${event}`);
        }
        
        eventListeners.delete(event);
    },
    
    /**
     * Eliminar todos los listeners de todos los eventos
     */
    clear() {
        if (debugMode) {
            console.log('[EVENTS] CLEAR ALL');
        }
        
        eventListeners.clear();
    },
    
    /**
     * Obtener estadísticas de los eventos
     * @returns {object} Información sobre listeners registrados
     */
    getStats() {
        const stats = {
            totalEvents: eventListeners.size,
            totalListeners: Array.from(eventListeners.values())
                .reduce((total, listeners) => total + listeners.length, 0),
            events: {}
        };
        
        eventListeners.forEach((listeners, event) => {
            stats.events[event] = {
                count: listeners.length,
                priorities: listeners.map(l => l.priority),
                onceListeners: listeners.filter(l => l.once).length
            };
        });
        
        return stats;
    },
    
    /**
     * Ejecutar un listener individual con manejo de errores
     * @param {object} listener - Objeto listener
     * @param {object} eventData - Datos del evento
     */
    executeListener(listener, eventData) {
        try {
            listener.callback(eventData.data, eventData);
        } catch (error) {
            console.error(`[EVENTS] Error en listener de ${eventData.type}:`, error);
        }
        
        // Eliminar listeners con once: true
        if (listener.once) {
            const listeners = eventListeners.get(eventData.type);
            if (listeners) {
                const index = listeners.indexOf(listener);
                if (index > -1) {
                    listeners.splice(index, 1);
                }
            }
        }
    },
    
    /**
     * Crear un espacio de nombres para eventos
     * @param {string} namespace - Namespace (ej: "ui", "data", "auth")
     * @returns {object} Métodos del namespace
     */
    namespace(namespace) {
        return {
            on: (event, callback, options) => {
                return this.on(`${namespace}.${event}`, callback, options);
            },
            emit: (event, data, options) => {
                return this.emit(`${namespace}.${event}`, data, options);
            },
            off: (event, listenerId) => {
                return this.off(`${namespace}.${event}`, listenerId);
            },
            removeAll: (event) => {
                return this.removeAll(`${namespace}.${event}`);
            }
        };
    },
    
    /**
     * Esperar a que un evento ocurra
     * @param {string} event - Nombre del evento a esperar
     * @param {number} timeout - Timeout en milisegundos
     * @returns {Promise} Promise que resuelve cuando ocurre el evento
     */
    waitFor(event, timeout = 5000) {
        return new Promise((resolve, reject) => {
            let timeoutId;
            
            const unsubscribe = this.on(event, (data) => {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                unsubscribe();
                resolve(data);
            });
            
            timeoutId = setTimeout(() => {
                unsubscribe();
                reject(new Error(`Timeout esperando evento ${event}`));
            }, timeout);
        });
    },
    
    /**
     * Encadenar eventos (uno después del otro)
     * @param {string[]} events - Array de nombres de eventos
     * @param {function} callback - Callback final
     * @returns {function} Función para cancelar
     */
    chain(events, callback) {
        if (debugMode) {
            console.log(`[EVENTS] CHAIN ${events.join(' -> ')}`);
        }
        
        const completedEvents = new Set();
        const unsubscribers = [];
        
        events.forEach((event, index) => {
            const unsubscribe = this.on(event, (data) => {
                completedEvents.add(event);
                
                // Si todos los eventos anteriores completados, ejecutar callback
                if (completedEvents.size === events.length) {
                    unsubscribers.forEach(unsub => unsub());
                    callback(data);
                }
            });
            unsubscribers.push(unsubscribe);
        });
        
        return () => {
            unsubscribers.forEach(unsub => unsub());
        };
    }
};

// Eventos predefinidos comunes
window.AppEvents.Events = {
    // UI Events
    UI: {
        MODAL_OPEN: 'ui.modal.open',
        MODAL_CLOSE: 'ui.modal.close',
        MENU_TOGGLE: 'ui.menu.toggle',
        FILTER_CHANGE: 'ui.filter.change',
        THEME_CHANGE: 'ui.theme.change',
        NAVIGATION: 'ui.navigation.change'
    },
    
    // Data Events
    DATA: {
        GASTOS_LOAD: 'data.gastos.load',
        GASTOS_ADD: 'data.gastos.add',
        GASTOS_UPDATE: 'data.gastos.update',
        GASTOS_DELETE: 'data.gastos.delete',
        INGRESOS_LOAD: 'data.ingresos.load',
        INGRESOS_ADD: 'data.ingresos.add',
        INGRESOS_UPDATE: 'data.ingresos.update',
        INGRESOS_DELETE: 'data.ingresos.delete',
        FILTER_UPDATE: 'data.filter.update',
        EXPORT_REQUEST: 'data.export.request',
        IMPORT_REQUEST: 'data.import.request'
    },
    
    // Auth Events
    AUTH: {
        LOGIN: 'auth.login',
        LOGOUT: 'auth.logout',
        SESSION_EXPIRED: 'auth.session.expired'
    },
    
    // System Events
    SYSTEM: {
        ERROR: 'system.error',
        WARNING: 'system.warning',
        READY: 'system.ready',
        DEBUG_MODE: 'system.debug.mode'
    }
};

// Inicialización
if (debugMode) {
    console.log('[EVENTS] Event Bus inicializado en modo debug');
    console.log('[EVENTS] Comandos disponibles:');
    console.log('  AppEvents.on("evento", callback)');
    console.log('  AppEvents.emit("evento", data)');
    console.log('  AppEvents.off("evento", listenerId)');
    console.log('  AppEvents.removeAll("evento")');
    console.log('  AppEvents.getStats()');
    console.log('  AppEvents.namespace("ui")');
    console.log('  AppEvents.waitFor("evento", timeout)');
    console.log('  AppEvents.chain(["evento1", "evento2"], callback)');
    console.log('  AppEvents.Events.UI.MODAL_OPEN');
}
