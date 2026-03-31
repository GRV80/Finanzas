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

// Prueba
console.log("🔥 Firebase conectado correctamente");

// Función para guardar gastos en Firestore SIN modificar la lógica actual
function guardarGastoEnFirebase(gasto) {
  // No guardar si ya viene de Firebase (tiene firebaseId)
  if (gasto.firebaseId) {
    console.log('📋 Gasto ya existe en Firebase, omitiendo...');
    return;
  }
  
  // Crear una copia del gasto con metadatos de Firebase
  const gastoConMetadata = {
    ...gasto,
    firebaseTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
    userId: auth.currentUser ? auth.currentUser.uid : 'anonymous',
    sincronizado: true
  };

  // Guardar en Firestore de forma asíncrona (no bloquea la app)
  db.collection('gastos').add(gastoConMetadata)
    .then(docRef => {
      console.log('✅ Gasto guardado en Firebase con ID:', docRef.id);
      
      // Añadir el ID de Firebase al gasto original
      gasto.firebaseId = docRef.id;
    })
    .catch(error => {
      console.error('❌ Error guardando gasto en Firebase:', error);
    });
}

// Función para obtener gastos desde Firebase (opcional)
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

// Hacer funciones globales para uso en app.js
window.guardarGastoEnFirebase = guardarGastoEnFirebase;
window.obtenerGastosDesdeFirebase = obtenerGastosDesdeFirebase;

// Función para verificar estado de sincronización
window.verificarEstadoFirebase = function() {
  return {
    conectado: !!firebase.apps.length,
    usuario: auth.currentUser,
    userId: auth.currentUser ? auth.currentUser.uid : 'anonymous',
    sincronizado: true
  };
};

// Mostrar estado en consola para depuración
console.log("🔥 Estado Firebase:", window.verificarEstadoFirebase());

// Función para migrar datos locales a Firebase (ejecutar una sola vez)
window.migrarDatosLocalesAFirebase = async function() {
  try {
    console.log("🔍 Verificando estado de Firebase...");
    console.log("📊 Firebase apps:", firebase.apps.length);
    console.log("📊 DB disponible:", !!db);
    console.log("📊 Auth disponible:", !!auth);
    
    // Verificar si Firebase está disponible
    if (!db || !auth) {
      console.error("❌ Firebase no está inicializado correctamente");
      console.log("💡 Asegúrate de que firebase-init.js se cargó antes que app.js");
      return false;
    }

    console.log("🚀 Iniciando migración de datos locales a Firebase...");
    
    // Verificar acceso a la colección
    try {
      const testSnapshot = await db.collection('gastos').limit(1).get();
      console.log("✅ Acceso a Firestore verificado");
    } catch (testError) {
      console.error("❌ Error de acceso a Firestore:", testError);
      console.log("💡 Verifica las reglas de Firebase en la consola");
      return false;
    }
    
    // Obtener todos los gastos existentes en Firebase para evitar duplicados
    console.log("📋 Obteniendo gastos existentes en Firebase...");
    const snapshot = await db.collection('gastos').get();
    const gastosExistentes = new Set();
    snapshot.forEach(doc => {
      const data = doc.data();
      // Usar combinación de campos únicos para identificar duplicados
      const claveUnica = `${data.tipo}-${data.nombre}-${data.categoria}-${data.cantidad}-${data.fecha}`;
      gastosExistentes.add(claveUnica);
    });
    
    console.log(`📊 Gastos existentes en Firebase: ${gastosExistentes.size}`);
    
    // Obtener gastos del array global
    console.log("📋 Obteniendo gastos locales...");
    const gastosLocales = window.gastos || [];
    console.log(`📊 Gastos locales encontrados: ${gastosLocales.length}`);
    
    if (gastosLocales.length === 0) {
      console.log("📂 No hay gastos locales para migrar");
      return true;
    }
    
    // Mostrar primeros gastos para depuración
    console.log("📝 Ejemplo de gastos locales:");
    gastosLocales.slice(0, 3).forEach((gasto, index) => {
      console.log(`  ${index + 1}. ${gasto.nombre} - ${gasto.cantidad}€ (${gasto.tipo})`);
    });
    
    let migrados = 0;
    let duplicados = 0;
    let errores = 0;
    
    // Procesar cada gasto local
    console.log("🔄 Iniciando proceso de migración...");
    for (let i = 0; i < gastosLocales.length; i++) {
      const gasto = gastosLocales[i];
      
      try {
        // Crear clave única para este gasto
        const claveUnica = `${gasto.tipo}-${gasto.nombre}-${gasto.categoria}-${gasto.cantidad}-${gasto.fecha}`;
        
        // Verificar si ya existe
        if (gastosExistentes.has(claveUnica)) {
          duplicados++;
          console.log(`⏭️  Duplicado omitido (${i + 1}/${gastosLocales.length}): ${gasto.nombre} - ${gasto.cantidad}€`);
          continue;
        }
        
        // Preparar datos para Firebase
        const gastoParaFirebase = {
          ...gasto,
          firebaseTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
          userId: auth.currentUser ? auth.currentUser.uid : 'anonymous',
          sincronizado: true,
          migrado: true, // Marcar como migrado
          fechaMigracion: new Date().toISOString()
        };
        
        // Guardar en Firebase
        const docRef = await db.collection('gastos').add(gastoParaFirebase);
        migrados++;
        
        console.log(`✅ Migrado (${i + 1}/${gastosLocales.length}): ${gasto.nombre} - ${gasto.cantidad}€ (ID: ${docRef.id})`);
        
        // Añadir a gastos existentes para evitar duplicados en esta misma migración
        gastosExistentes.add(claveUnica);
        
        // Pequeña pausa para no sobrecargar Firebase
        if (i % 10 === 0) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
      } catch (error) {
        errores++;
        console.error(`❌ Error migrando gasto ${gasto.nombre}:`, error);
      }
    }
    
    // Resumen de la migración
    console.log("\n📋 RESUMEN DE MIGRACIÓN:");
    console.log(`📊 Total gastos locales: ${gastosLocales.length}`);
    console.log(`✅ Gastos migrados: ${migrados}`);
    console.log(`⏭️  Duplicados omitidos: ${duplicados}`);
    console.log(`❌ Errores: ${errores}`);
    console.log(`🎉 Migración completada!`);
    
    // Verificar resultados
    if (migrados > 0) {
      console.log("💡 Verificando migración...");
      const finalSnapshot = await db.collection('gastos').get();
      console.log(`📊 Total documentos en Firebase después de migración: ${finalSnapshot.size}`);
      console.log("💡 Sugerencia: Recarga la página para cargar los datos actualizados desde Firebase");
    }
    
    return {
      total: gastosLocales.length,
      migrados,
      duplicados,
      errores,
      exito: errores === 0
    };
    
  } catch (error) {
    console.error("❌ Error crítico en migración:", error);
    console.log("💡 Verifica:");
    console.log("   1. Que Firebase esté inicializado");
    console.log("   2. Que las reglas de Firestore permitan escritura");
    console.log("   3. Que tengas conexión a internet");
    return false;
  }
};

// Instrucciones de uso
console.log("💡 Para migrar datos locales a Firebase, ejecuta:");
console.log("   migrarDatosLocalesAFirebase()");

// Función de emergencia para recuperar datos locales si se borran
window.recuperarDatosLocales = function() {
  try {
    console.log("🚨 RECUPERACIÓN DE EMERGENCIA");
    console.log("📋 Intentando recuperar datos de localStorage...");
    
    // Intentar recuperar de localStorage
    const datosGuardados = localStorage.getItem('app-gastos_records');
    if (datosGuardados) {
      const datosRecuperados = JSON.parse(datosGuardados);
      console.log(`✅ Se encontraron ${datosRecuperados.length} registros en localStorage`);
      
      // Restaurar al array global
      window.gastos.length = 0;
      window.gastos.push(...datosRecuperados);
      
      console.log("🔄 Datos restaurados al array gastos");
      console.log("💡 Ejecuta render() para actualizar la vista");
      
      return datosRecuperados;
    } else {
      console.log("❌ No se encontraron datos en localStorage");
      return null;
    }
  } catch (error) {
    console.error("❌ Error recuperando datos:", error);
    return null;
  }
};

// Función para forzar guardado de datos actuales
window.forzarGuardadoLocal = function() {
  try {
    console.log("💾 Forzando guardado de datos actuales...");
    localStorage.setItem('app-gastos_records', JSON.stringify(window.gastos));
    console.log(`✅ Guardados ${window.gastos.length} registros en localStorage`);
    return true;
  } catch (error) {
    console.error("❌ Error guardando datos:", error);
    return false;
  }
};

// Función de recuperación automática al iniciar
window.recuperacionAutomatica = function() {
  console.log("🚨 INICIANDO RECUPERACIÓN AUTOMÁTICA");
  
  // 1. Verificar si hay datos en el array global
  if (window.gastos && window.gastos.length > 0) {
    console.log(`✅ Ya hay ${window.gastos.length} registros en el array global`);
    return true;
  }
  
  // 2. Intentar recuperar de localStorage
  const datosGuardados = localStorage.getItem('app-gastos_records');
  if (datosGuardados) {
    try {
      const datosRecuperados = JSON.parse(datosGuardados);
      console.log(`🔄 Recuperando ${datosRecuperados.length} registros de localStorage`);
      
      // Restaurar al array global
      window.gastos.length = 0;
      window.gastos.push(...datosRecuperados);
      
      console.log("✅ Datos recuperados automáticamente");
      return true;
    } catch (error) {
      console.error("❌ Error recuperando datos:", error);
    }
  }

// 1. Verificar si hay datos en el array global
if (window.gastos && window.gastos.length > 0) {
console.log(`✅ Ya hay ${window.gastos.length} registros en el array global`);
return true;
}

// 2. Intentar recuperar de localStorage
const datosGuardados = localStorage.getItem('app-gastos_records');
if (datosGuardados) {
try {
const datosRecuperados = JSON.parse(datosGuardados);
console.log(`🔄 Recuperando ${datosRecuperados.length} registros de localStorage`);

// Restaurar al array global
window.gastos.length = 0;
window.gastos.push(...datosRecuperados);

console.log("✅ Datos recuperados automáticamente");
return true;
} catch (error) {
console.error("❌ Error recuperando datos:", error);
}
}

console.log("❌ No se pudieron recuperar datos automáticamente");
return false;
};

// Ejecutar recuperación inmediata - SIN ESPERA
console.log("🚨 RECUPERACIÓN INMEDIATA - SIN ESPERA");

// Función de recuperación forzada
window.recuperacionForzada = function() {
console.log("🔥 INICIANDO RECUPERACIÓN FORZADA");

try {
// 1. Verificar localStorage directamente
console.log("📋 Verificando localStorage...");
const datosRaw = localStorage.getItem('app-gastos_records');
console.log("📊 Datos en localStorage:", datosRaw ? "EXISTEN" : "NO EXISTEN");

if (datosRaw) {
const datos = JSON.parse(datosRaw);
console.log(`📊 Encontrados ${datos.length} registros en localStorage`);

// 2. Forzar array global
if (!window.gastos) window.gastos = [];
window.gastos.length = 0;
window.gastos.push(...datos);

console.log(`✅ ${window.gastos.length} registros RESTAURADOS al array global`);

// 3. Forzar render si existe
if (typeof render === 'function') {
console.log("🔄 Ejecutando render()...");
setTimeout(() => render(), 100);
}

// 4. Verificar resultado
setTimeout(() => {
console.log(`📋 Verificación final: ${window.gastos.length} registros en array`);
console.log("📋 Tabla actualizada:", document.querySelectorAll('#tabla-body tr').length);
}, 500);

return true;
} else {
console.log("❌ NO HAY DATOS en localStorage");
return false;
}

} catch (error) {
console.error("❌ ERROR CRÍTICO en recuperación:", error);
return false;
}
};

// Ejecutar inmediatamente
window.recuperacionForzada();