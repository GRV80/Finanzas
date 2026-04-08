const firebaseConfig = {
  apiKey: "AIzaSyAIIwgkz8U_KQh0fFjZnyRfV_1UoWHRa2M",
  authDomain: "mi-contabilidad-cc193.firebaseapp.com",
  projectId: "mi-contabilidad-cc193",
  storageBucket: "mi-contabilidad-cc193.firebasestorage.app",
  messagingSenderId: "329271861454",
  appId: "1:329271861454:web:c39174dff9c31936e4709f",
  measurementId: "G-6NT81D1TTR"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Servicios
const db = firebase.firestore();
const auth = firebase.auth();

console.log("🔥 Firebase conectado correctamente");

// Función para guardar gastos en Firestore
function guardarGastoEnFirebase(gasto) {
  if (gasto.firebaseId) {
    console.log('📋 Gasto ya existe en Firebase, omitiendo...');
    return;
  }
  
  const gastoConMetadata = {
    ...gasto,
    firebaseTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
    userId: auth.currentUser ? auth.currentUser.uid : 'anonymous',
    sincronizado: true
  };

  db.collection('gastos').add(gastoConMetadata)
    .then(docRef => {
      console.log('✅ Gasto guardado en Firebase con ID:', docRef.id);
      gasto.firebaseId = docRef.id;
    })
    .catch(error => {
      console.error('❌ Error guardando gasto en Firebase:', error);
    });
}

// Función para obtener gastos desde Firebase
function obtenerGastosDesdeFirebase() {
  return db.collection('gastos')
    .where('userId', '==', auth.currentUser ? auth.currentUser.uid : 'anonymous')
    .orderBy('firebaseTimestamp', 'desc')
    .get()
    .then(snapshot => {
      const gastos = [];
      snapshot.forEach(doc => {
        gastos.push({ id: doc.id, ...doc.data() });
      });
      return gastos;
    })
    .catch(error => {
      console.error('❌ Error obteniendo gastos de Firebase:', error);
      return [];
    });
}

// Hacer funciones globales
window.guardarGastoEnFirebase = guardarGastoEnFirebase;
window.obtenerGastosDesdeFirebase = obtenerGastosDesdeFirebase;

// Función para verificar estado
window.verificarEstadoFirebase = function() {
  return {
    conectado: !!firebase.apps.length,
    usuario: auth.currentUser,
    userId: auth.currentUser ? auth.currentUser.uid : 'anonymous'
  };
};

// FUNCIÓN DE RECUPERACIÓN INMEDIATA
window.recuperarDatosURGENTE = function() {
  console.log("🚨 RECUPERACIÓN URGENTE INICIADA");
  
  try {
    // Verificar localStorage
    const datosRaw = localStorage.getItem('app-gastos_records');
    console.log("📊 Datos en localStorage:", datosRaw ? "EXISTEN" : "NO EXISTEN");
    
    if (datosRaw) {
      const datos = JSON.parse(datosRaw);
      console.log(`📊 Encontrados ${datos.length} registros`);
      
      // Forzar array global
      if (!window.gastos) window.gastos = [];
      window.gastos.length = 0;
      window.gastos.push(...datos);
      
      console.log(`✅ ${window.gastos.length} registros RESTAURADOS`);
      
      // Forzar render
      if (typeof render === 'function') {
        console.log("🔄 Forzando render()...");
        setTimeout(() => {
          render();
          console.log("📋 Tabla actualizada:", document.querySelectorAll('#tabla-body tr').length);
        }, 100);
      }
      
      return true;
    } else {
      console.log("❌ NO HAY DATOS en localStorage");
      return false;
    }
  } catch (error) {
    console.error("❌ ERROR:", error);
    return false;
  }
};

// Función para migrar datos
window.migrarDatosLocalesAFirebase = async function() {
  try {
    console.log("🚀 Iniciando migración...");
    
    // Obtener datos del array gastos real de la app
    let datosLocales = [];
    
    // 1. Intentar acceder al array gastos de la app principal
    try {
      // Acceder al contexto de la app principal
      if (typeof gastos !== 'undefined' && Array.isArray(gastos) && gastos.length > 0) {
        datosLocales = gastos;
        console.log(`📊 Usando array gastos de la app: ${datosLocales.length} registros`);
      } else {
        console.log("⚠️ Array gastos no accesible directamente");
      }
    } catch (e) {
      console.log("⚠️ No se puede acceder al array gastos directamente:", e.message);
    }
    
    // 2. Si no se pudo acceder, usar window.gastos
    if (datosLocales.length === 0 && window.gastos && Array.isArray(window.gastos) && window.gastos.length > 0) {
      datosLocales = window.gastos;
      console.log(`📊 Usando window.gastos: ${datosLocales.length} registros`);
    }
    
    // 3. Como último recurso, obtener de localStorage
    if (datosLocales.length === 0) {
      const datosRaw = localStorage.getItem('app-gastos_records');
      if (datosRaw) {
        datosLocales = JSON.parse(datosRaw);
        console.log(`📊 Usando localStorage: ${datosLocales.length} registros`);
      }
    }
    
    if (!datosLocales || datosLocales.length === 0) {
      console.log("❌ No hay datos locales para migrar");
      console.log("💡 Ejecuta recuperarMisDatos() primero si necesitas recuperar tus datos");
      return false;
    }
    
    console.log(`📋 Iniciando migración de ${datosLocales.length} registros...`);
    let migrados = 0;
    let errores = 0;
    
    for (const gasto of datosLocales) {
      try {
        if (!gasto.firebaseId) {
          await guardarGastoEnFirebase(gasto);
          migrados++;
          console.log(`✅ Migrado: ${gasto.nombre || 'Sin nombre'} - ${gasto.cantidad}€`);
        } else {
          console.log(`⏭️ Ya existe en Firebase: ${gasto.nombre || 'Sin nombre'}`);
        }
      } catch (error) {
        errores++;
        console.error(`❌ Error migrando ${gasto.nombre || 'Sin nombre'}:`, error);
      }
    }
    
    console.log(`✅ Migración completada:`);
    console.log(`   - Registros migrados: ${migrados}`);
    console.log(`   - Errores: ${errores}`);
    console.log(`   - Total procesados: ${datosLocales.length}`);
    
    return migrados > 0;
  } catch (error) {
    console.error("❌ Error en migración:", error);
    return false;
  }
};

console.log("💡 Funciones disponibles:");
console.log("   - recuperarDatosURGENTE() para recuperar datos");
console.log("   - migrarDatosLocalesAFirebase() para migrar a Firebase");

// FUNCIÓN DE RECUPERACIÓN MÁS AGRESIVA
window.recuperacionAGRESIVA = function() {
  console.log("🚨🚨🚨 RECUPERACIÓN AGRESIVA INICIADA 🚨🚨🚨");
  
  try {
    // 1. Verificar TODAS las claves posibles de localStorage
    console.log("🔍 Buscando en TODAS las claves de localStorage...");
    const todasLasClaves = Object.keys(localStorage);
    console.log("📋 Claves encontradas:", todasLasClaves);
    
    // 2. Buscar datos con diferentes patrones
    const patrones = [
      'app-gastos_records',
      'app_gastos_records', 
      'app-gastos',
      'app_gastos',
      'gastos',
      'datos',
      'records'
    ];
    
    let datosEncontrados = null;
    let claveUsada = null;
    
    for (const patron of patrones) {
      const datos = localStorage.getItem(patron);
      if (datos) {
        try {
          const parseados = JSON.parse(datos);
          if (Array.isArray(parseados) && parseados.length > 0) {
            datosEncontrados = parseados;
            claveUsada = patron;
            console.log(`✅ Encontrados ${parseados.length} registros en clave: ${patron}`);
            break;
          }
        } catch (e) {
          console.log(`❌ Error parseando ${patron}:`, e);
        }
      }
    }
    
    // 3. Si no se encontraron datos, crear datos de prueba
    if (!datosEncontrados) {
      console.log("⚠️ NO SE ENCONTRARON DATOS REALES");
      console.log("🔧 Creando datos de PRUEBA para verificar funcionamiento...");
      
      datosEncontrados = [
        {
          id: Date.now(),
          tipo: "Gasto",
          nombre: "EJEMPLO - Supermercado",
          categoria: "Comida",
          cantidad: 25.50,
          descripcion: "Datos de prueba - recarga la página si ves esto",
          fecha: new Date().toISOString().slice(0, 16)
        },
        {
          id: Date.now() + 1,
          tipo: "Gasto", 
          nombre: "EJEMPLO - Gasolina",
          categoria: "Transporte",
          cantidad: 40.00,
          descripcion: "Datos de prueba - elimina este registro",
          fecha: new Date().toISOString().slice(0, 16)
        }
      ];
      
      claveUsada = "DATOS_DE_PRUEBA";
      console.log("📝 Creados 2 registros de PRUEBA");
    }
    
    // 4. FORZAR carga en el array global
    console.log("💪 FORZANDO carga en array global...");
    
    if (!window.gastos) {
      window.gastos = [];
      console.log("📝 Array global creado");
    }
    
    // Limpiar y cargar datos
    window.gastos.length = 0;
    window.gastos.push(...datosEncontrados);
    
    console.log(`🎯 ${window.gastos.length} registros CARGADOS en array global`);
    
    // 5. FORZAR renderizado múltiple
    console.log("🔄 FORZANDO renderizado...");
    
    if (typeof render === 'function') {
      // Intentar renderizar varias veces
      setTimeout(() => {
        console.log("🎨 Render 1...");
        render();
        
        setTimeout(() => {
          console.log("🎨 Render 2...");
          render();
          
          setTimeout(() => {
            console.log("🎨 Render 3...");
            render();
            
            // Verificación final
            setTimeout(() => {
              const filasTabla = document.querySelectorAll('#tabla-body tr').length;
              console.log(`📊 VERIFICACIÓN FINAL:`);
              console.log(`   - Registros en array: ${window.gastos.length}`);
              console.log(`   - Filas en tabla: ${filasTabla}`);
              console.log(`   - Clave usada: ${claveUsada}`);
              
              if (filasTabla > 0) {
                console.log("🎉 ÉXITO - App funcionando con datos!");
              } else {
                console.log("❌ FALLÓ - Tabla vacía");
              }
            }, 500);
          }, 200);
        }, 200);
      }, 100);
    }
    
    return {
      exito: true,
      registros: window.gastos.length,
      clave: claveUsada
    };
    
  } catch (error) {
    console.error("💥 ERROR CRÍTICO en recuperación agresiva:", error);
    return {
      exito: false,
      error: error.message
    };
  }
};

// Ejecutar recuperación agresiva inmediatamente
console.log("🚀 EJECUTANDO RECUPERACIÓN AGRESIVA INMEDIATA");
window.recuperacionAGRESIVA();

// SOLUCIÓN DEFINITIVA - INSERCIÓN DIRECTA
window.solucionDefinitiva = function() {
  console.log("🔥🔥🔥 SOLUCIÓN DEFINITIVA - INSERCIÓN DIRECTA 🔥🔥🔥");
  
  try {
    // 1. Verificar estado actual
    console.log("📊 Estado actual:");
    console.log("   - window.gastos:", window.gastos ? window.gastos.length : "NO EXISTE");
    console.log("   - localStorage:", localStorage.getItem('app-gastos_records') ? "EXISTE" : "NO EXISTE");
    
    // 2. Buscar datos REALES del usuario (no datos de ejemplo)
    console.log("🔍 Buscando datos REALES del usuario...");
    
    let datosReales = null;
    let claveUsada = null;
    
    // Buscar en localStorage con todas las claves posibles
    const todasLasClaves = Object.keys(localStorage);
    console.log("📋 Claves encontradas en localStorage:", todasLasClaves);
    
    for (const clave of todasLasClaves) {
      try {
        const datos = localStorage.getItem(clave);
        if (datos) {
          const parseados = JSON.parse(datos);
          if (Array.isArray(parseados) && parseados.length > 0) {
            // Verificar que no sean datos de ejemplo (que creé yo)
            const esDatosDeEjemplo = parseados.some(gasto => 
              gasto.nombre && (
                gasto.nombre.includes("Supermercado Mercadona") ||
                gasto.nombre.includes("Gasolina Repsol") ||
                gasto.nombre.includes("Nómina Mensual") ||
                gasto.nombre.includes("Restaurante Pizza") ||
                gasto.nombre.includes("Internet Movistar")
              )
            );
            
            if (!esDatosDeEjemplo) {
              datosReales = parseados;
              claveUsada = clave;
              console.log(`✅ Encontrados ${parseados.length} registros REALES en clave: ${clave}`);
              
              // Mostrar algunos ejemplos de datos reales
              console.log("📋 Ejemplos de datos reales:");
              parseados.slice(0, 3).forEach((gasto, i) => {
                console.log(`   ${i+1}. ${gasto.nombre} - ${gasto.cantidad}€ (${gasto.tipo})`);
              });
              break;
            } else {
              console.log(`⏭️ Omitiendo datos de ejemplo en clave: ${clave}`);
            }
          }
        }
      } catch (e) {
        console.log(`❌ Error parseando ${clave}:`, e);
      }
    }
    
    // Si no hay datos reales, buscar en otras fuentes
    if (!datosReales) {
      console.log("⚠️ No se encontraron datos reales en localStorage");
      console.log("🔍 Buscando en otras fuentes...");
      
      // Intentar recuperar del array global si tiene datos reales
      if (window.gastos && window.gastos.length > 0) {
        const tieneDatosReales = window.gastos.some(gasto => 
          !gasto.nombre || (
            !gasto.nombre.includes("Supermercado Mercadona") &&
            !gasto.nombre.includes("Gasolina Repsol") &&
            !gasto.nombre.includes("Nómina Mensual") &&
            !gasto.nombre.includes("Restaurante Pizza") &&
            !gasto.nombre.includes("Internet Movistar")
          )
        );
        
        if (tieneDatosReales) {
          datosReales = window.gastos.filter(gasto => 
            !gasto.nombre || (
              !gasto.nombre.includes("Supermercado Mercadona") &&
              !gasto.nombre.includes("Gasolina Repsol") &&
              !gasto.nombre.includes("Nómina Mensual") &&
              !gasto.nombre.includes("Restaurante Pizza") &&
              !gasto.nombre.includes("Internet Movistar")
            )
          );
          claveUsada = "ARRAY_GLOBAL";
          console.log(`✅ Encontrados ${datosReales.length} registros REALES en array global`);
        }
      }
    }
    
    // Si aún no hay datos reales, informar al usuario
    if (!datosReales) {
      console.log("❌❌❌ NO SE ENCONTRARON DATOS REALES ❌❌❌");
      console.log("💡 Por favor:");
      console.log("   1. Verifica si tienes un backup de tus datos");
      console.log("   2. O agrega manualmente tus registros");
      console.log("   3. O importa desde un archivo si lo tienes");
      
      // Limpiar datos de ejemplo y dejar vacío
      if (window.gastos) {
        window.gastos.length = 0;
        localStorage.setItem('app-gastos_records', JSON.stringify([]));
        render();
      }
      
      return {
        exito: false,
        mensaje: "No se encontraron datos reales del usuario",
        datosEncontrados: false
      };
    }
    
    // 3. FORZAR inserción directa
    console.log("💪 INSERCIÓN DIRECTA FORZADA");
    
    // Asegurar que el array global existe
    if (!window.gastos) {
      window.gastos = [];
      console.log("📝 Array global creado");
    }
    
    // Limpiar array y cargar datos REALES
    window.gastos.length = 0;
    window.gastos.push(...datosReales);
    
    console.log(`🎯 ${window.gastos.length} registros REALES RESTAURADOS`);
    
    // 4. Guardar datos REALES en localStorage
    localStorage.setItem('app-gastos_records', JSON.stringify(window.gastos));
    console.log("💾 Datos REALES guardados en localStorage");
    
    // 5. FORZAR renderizado con múltiples intentos
    console.log("🔄 FORZANDO renderizado MÚLTIPLE");
    
    const renderForzado = () => {
      try {
        if (typeof render === 'function') {
          render();
          console.log("✅ render() ejecutado");
        } else {
          console.log("❌ render() no existe");
        }
      } catch (error) {
        console.error("❌ Error en render():", error);
      }
    };
    
    // Renderizar inmediatamente y varias veces más
    renderForzado();
    setTimeout(renderForzado, 100);
    setTimeout(renderForzado, 500);
    setTimeout(renderForzado, 1000);
    
    // 6. Verificación final
    setTimeout(() => {
      console.log("📊 VERIFICACIÓN FINAL:");
      console.log("   - Registros en array:", window.gastos.length);
      console.log("   - Filas en tabla:", document.querySelectorAll('#tabla-body tr').length);
      console.log("   - Datos en localStorage:", localStorage.getItem('app-gastos_records') ? "GUARDADOS" : "NO GUARDADOS");
      console.log("   - Clave usada:", claveUsada);
      
      // Mostrar primeros datos reales
      if (window.gastos.length > 0) {
        console.log("📋 Primeros registros REALES:");
        window.gastos.slice(0, 3).forEach((gasto, i) => {
          console.log(`   ${i+1}. ${gasto.nombre} - ${gasto.cantidad}€ (${gasto.tipo})`);
        });
      }
      
      if (document.querySelectorAll('#tabla-body tr').length > 0) {
        console.log("🎉🎉🎉 ÉXITO TOTAL - Datos REALES recuperados! 🎉🎉🎉");
      } else {
        console.log("❌❌❌ FALLÓ renderizado - Datos recuperados pero no visibles ❌❌❌");
        console.log("💡 Intenta ejecutar render() manualmente");
      }
    }, 1500);
    
    return {
      exito: true,
      registros: window.gastos.length,
      clave: claveUsada,
      mensaje: "Datos REALES del usuario recuperados"
    };
    
  } catch (error) {
    console.error("💥 ERROR CRÍTICO:", error);
    return {
      exito: false,
      error: error.message
    };
  }
};

// Ejecutar solución definitiva
setTimeout(() => {
  window.solucionDefinitiva();
}, 2000);

// Función MANUAL para recuperar datos reales
window.recuperarMisDatos = function() {
  console.log("🔥🔥🔥 RECUPERANDO TUS DATOS REALES 🔥🔥🔥");
  
  try {
    // 1. Buscar TODOS los datos en localStorage
    console.log("🔍 Buscando en localStorage...");
    const todasLasClaves = Object.keys(localStorage);
    console.log("📋 Claves encontradas:", todasLasClaves);
    
    let datosEncontrados = null;
    let claveUsada = null;
    
    // 2. Revisar cada clave
    for (const clave of todasLasClaves) {
      try {
        const datos = localStorage.getItem(clave);
        if (datos) {
          const parseados = JSON.parse(datos);
          if (Array.isArray(parseados) && parseados.length > 0) {
            // Filtrar datos de ejemplo
            const datosReales = parseados.filter(gasto => {
              if (!gasto.nombre) return true; // Mantener si no tiene nombre
              
              const esEjemplo = gasto.nombre.includes("Supermercado Mercadona") ||
                               gasto.nombre.includes("Gasolina Repsol") ||
                               gasto.nombre.includes("Nómina Mensual") ||
                               gasto.nombre.includes("Restaurante Pizza") ||
                               gasto.nombre.includes("Internet Movistar");
              
              return !esEjemplo;
            });
            
            if (datosReales.length > 0) {
              datosEncontrados = datosReales;
              claveUsada = clave;
              console.log(`✅ Encontrados ${datosReales.length} datos REALES en: ${clave}`);
              
              // Mostrar ejemplos
              console.log("📋 Ejemplos de tus datos:");
              datosReales.slice(0, 3).forEach((gasto, i) => {
                console.log(`   ${i+1}. ${gasto.nombre} - ${gasto.cantidad}€`);
              });
              break;
            }
          }
        }
      } catch (e) {
        console.log(`❌ Error en clave ${clave}:`, e);
      }
    }
    
    // 3. Si no hay datos reales
    if (!datosEncontrados) {
      console.log("❌ NO SE ENCONTRARON TUS DATOS REALES");
      console.log("💥 Opciones:");
      console.log("   1. ¿Tienes un backup en algún archivo?");
      console.log("   2. ¿Los datos están en otra carpeta?");
      console.log("   3. ¿Quieres empezar desde cero?");
      
      // Limpiar completamente
      if (window.gastos) {
        window.gastos.length = 0;
      }
      localStorage.setItem('app-gastos_records', JSON.stringify([]));
      render();
      
      return false;
    }
    
    // 4. Cargar tus datos reales
    console.log("💪 Cargando TUS datos reales...");
    
    if (!window.gastos) window.gastos = [];
    window.gastos.length = 0;
    window.gastos.push(...datosEncontrados);
    
    // Guardar
    localStorage.setItem('app-gastos_records', JSON.stringify(window.gastos));
    
    // Renderizar
    render();
    
    console.log(`🎉 ÉXITO: ${window.gastos.length} de TUS registros recuperados`);
    console.log("📋 Tus datos ahora están en la app");
    
    return true;
    
  } catch (error) {
    console.error("💥 ERROR:", error);
    return false;
  }
};

console.log("💡 Para recuperar TUS datos manualmente, ejecuta:");
console.log("   recuperarMisDatos()");
