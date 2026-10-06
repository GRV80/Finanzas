/**
 * STATE MANAGER CENTRALIZADO - Infraestructura base para crecimiento futuro
 * Proporciona gestión de estado reactiva y centralizada
 */

// Crear objeto global seguro
window.AppState = {
    ui: {},
    filters: {},
    gastos: {},
    ingresos: {},
    tareas: {},
    reuniones: {},
    notificaciones: {},
    settings: {}
};

// Sistema de subscripción reactiva
const subscribers = new Map();
let debugMode = false;

// Habilitar modo debug
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    debugMode = true;
}

/**
 * Obtener valor del estado por path
 * @param {string} path - Path separado por puntos (ej: "filters.search")
 * @returns {*} Valor encontrado o undefined
 */
window.AppState.get = function(path) {
    if (debugMode) {
        console.log(`[STATE] GET ${path}`);
    }
    
    const keys = path.split('.');
    let current = this;
    
    for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
            current = current[key];
        } else {
            if (debugMode) {
                console.warn(`[STATE] Path no encontrado: ${path}`);
            }
            return undefined;
        }
    }
    
    return current;
};

/**
 * Establecer valor en el estado por path
 * @param {string} path - Path separado por puntos (ej: "filters.search")
 * @param {*} value - Valor a establecer
 */
window.AppState.set = function(path, value) {
    if (debugMode) {
        console.log(`[STATE] SET ${path} =`, value);
    }
    
    const keys = path.split('.');
    const lastKey = keys.pop();
    let current = this;
    
    // Navegar al objeto padre
    for (const key of keys) {
        if (!(key in current) || typeof current[key] !== 'object') {
            current[key] = {};
        }
        current = current[key];
    }
    
    // Establecer valor y emitir cambio
    const oldValue = current[lastKey];
    current[lastKey] = value;
    
    // Emitir cambio a subscriptores
    this.emit(path, value, oldValue);
};

/**
 * Suscribirse a cambios en un path
 * @param {string} path - Path a observar (ej: "filters.search")
 * @param {function} callback - Función a ejecutar cuando cambie
 * @returns {function} Función para unsuscribir
 */
window.AppState.subscribe = function(path, callback) {
    if (debugMode) {
        console.log(`[STATE] SUBSCRIBE ${path}`);
    }
    
    if (!subscribers.has(path)) {
        subscribers.set(path, new Set());
    }
    
    const subscription = { callback, id: Math.random().toString(36).substr(2, 9) };
    subscribers.get(path).add(subscription);
    
    // Devolver función para unsuscribir
    return () => this.unsubscribe(path, subscription.id);
};

/**
 * Eliminar suscripción
 * @param {string} path - Path del que eliminar suscripción
 * @param {string} subscriptionId - ID de la suscripción
 */
window.AppState.unsubscribe = function(path, subscriptionId) {
    if (debugMode) {
        console.log(`[STATE] UNSUBSCRIBE ${path} (${subscriptionId})`);
    }
    
    const pathSubscribers = subscribers.get(path);
    if (pathSubscribers) {
        const toRemove = Array.from(pathSubscribers).find(sub => sub.id === subscriptionId);
        if (toRemove) {
            pathSubscribers.delete(toRemove);
        }
    }
};

/**
 * Emitir cambio a todos los subscriptores de un path
 * @param {string} path - Path que cambió
 * @param {*} newValue - Nuevo valor
 * @param {*} oldValue - Valor anterior
 */
window.AppState.emit = function(path, newValue, oldValue) {
    if (debugMode) {
        console.log(`[STATE] EMIT ${path}`, { newValue, oldValue });
    }
    
    const pathSubscribers = subscribers.get(path);
    if (pathSubscribers) {
        pathSubscribers.forEach(subscription => {
            try {
                subscription.callback(newValue, oldValue, path);
            } catch (error) {
                console.error(`[STATE] Error en callback de ${path}:`, error);
            }
        });
    }
    
    // También emitir a paths padre (wildcard subscriptions)
    const pathParts = path.split('.');
    for (let i = pathParts.length - 1; i > 0; i--) {
        const parentPath = pathParts.slice(0, i).join('.');
        const parentSubscribers = subscribers.get(parentPath + '.*');
        if (parentSubscribers) {
            parentSubscribers.forEach(subscription => {
                try {
                    subscription.callback(newValue, oldValue, path);
                } catch (error) {
                    console.error(`[STATE] Error en callback de ${parentPath}.*:`, error);
                }
            });
        }
    }
};

/**
 * Suscribirse a múltiples paths
 * @param {string[]} paths - Array de paths a observar
 * @param {function} callback - Función a ejecutar cuando cambie cualquiera
 * @returns {function} Función para unsuscribir todos
 */
window.AppState.subscribeMultiple = function(paths, callback) {
    const unsubscribers = paths.map(path => this.subscribe(path, callback));
    
    return () => {
        unsubscribers.forEach(unsubscribe => unsubscribe());
    };
};

/**
 * Obtener snapshot completo del estado
 * @returns {object} Copia profunda del estado actual
 */
window.AppState.getSnapshot = function() {
    if (debugMode) {
        console.log('[STATE] GET SNAPSHOT');
    }
    
    return JSON.parse(JSON.stringify(this));
};

/**
 * Restaurar estado desde snapshot
 * @param {object} snapshot - Snapshot a restaurar
 */
window.AppState.restoreSnapshot = function(snapshot) {
    if (debugMode) {
        console.log('[STATE] RESTORE SNAPSHOT');
    }
    
    // Limpiar estado actual
    Object.keys(this).forEach(key => {
        if (key !== 'get' && key !== 'set' && key !== 'subscribe' && 
            key !== 'unsubscribe' && key !== 'emit' && key !== 'subscribeMultiple' &&
            key !== 'getSnapshot' && key !== 'restoreSnapshot') {
            delete this[key];
        }
    });
    
    // Restaurar desde snapshot
    Object.assign(this, snapshot);
    
    // Emitir cambios a todos los paths modificados
    Object.keys(snapshot).forEach(section => {
        if (typeof snapshot[section] === 'object') {
            Object.keys(snapshot[section]).forEach(key => {
                this.emit(`${section}.${key}`, snapshot[section][key]);
            });
        }
    });
};

/**
 * Limpiar todas las suscripciones
 */
window.AppState.clearAllSubscriptions = function() {
    if (debugMode) {
        console.log('[STATE] CLEAR ALL SUBSCRIPTIONS');
    }
    
    subscribers.clear();
};

/**
 * Obtener estadísticas del estado
 * @returns {object} Información sobre el estado actual
 */
window.AppState.getStats = function() {
    const totalSubscriptions = Array.from(subscribers.values())
        .reduce((total, set) => total + set.size, 0);
    
    const pathCounts = {};
    Object.keys(this).forEach(section => {
        if (typeof this[section] === 'object') {
            pathCounts[section] = Object.keys(this[section]).length;
        } else {
            pathCounts[section] = 1;
        }
    });
    
    return {
        totalSubscriptions,
        pathsCount: subscribers.size,
        pathCounts,
        debugMode
    };
};

// Inicialización
if (debugMode) {
    console.log('[STATE] State Manager inicializado en modo debug');
    console.log('[STATE] Comandos disponibles:');
    console.log('  AppState.get("path")');
    console.log('  AppState.set("path", value)');
    console.log('  AppState.subscribe("path", callback)');
    console.log('  AppState.unsubscribe("path", id)');
    console.log('  AppState.emit("path", newValue, oldValue)');
    console.log('  AppState.getSnapshot()');
    console.log('  AppState.restoreSnapshot(snapshot)');
    console.log('  AppState.getStats()');
}
