/**
 * Master AI Engineer - Diagnóstico Node.js para Eliminación por Rango
 * Versión para ejecutar en Node.js y analizar el problema
 */

// Simular el array de gastos (necesitamos los datos reales)
let gastos = [];

// Función para cargar datos desde localStorage (simulado)
function cargarDatosDesdeArchivo() {
  const fs = require('fs');
  
  try {
    // Intentar leer desde un archivo de datos si existe
    if (fs.existsSync('app-data.json')) {
      const data = fs.readFileSync('app-data.json', 'utf8');
      gastos = JSON.parse(data);
      console.log(`✅ Cargados ${gastos.length} registros desde archivo`);
    } else {
      console.log('❌ No se encontró archivo de datos');
      console.log('💡 Ejecuta este script desde la app de escritorio con los datos cargados');
      return false;
    }
  } catch (error) {
    console.log('❌ Error cargando datos:', error.message);
    return false;
  }
  
  return true;
}

// Función para buscar el registro específico
function buscarRegistroQueralt() {
  console.log('🔍 BÚSQUEDA ESPECÍFICA - REGISTRO "queralt, Alquiler, 250"');
  
  const registrosEncontrados = gastos.filter(g => {
    const nombre = (g.nombre || '').toLowerCase().trim();
    const categoria = (g.categoria || '').toLowerCase().trim();
    const cantidad = String(g.cantidad || '').trim();
    
    return nombre.includes('queralt') || 
           categoria.includes('alquiler') || 
           cantidad === '250';
  });
  
  console.log(`📊 Registros encontrados: ${registrosEncontrados.length}`);
  
  if (registrosEncontrados.length === 0) {
    console.log('❌ No se encontraron registros que coincidan con "queralt, Alquiler, 250"');
    
    // Mostrar todos los registros para análisis
    console.log('\n📋 TODOS LOS REGISTROS DISPONIBLES:');
    gastos.forEach((reg, index) => {
      if (index < 10) { // Solo mostrar primeros 10 para no saturar
        console.log(`  ${index + 1}. ID: ${reg.id}`);
        console.log(`     Nombre: "${reg.nombre}"`);
        console.log(`     Categoría: "${reg.categoria}"`);
        console.log(`     Cantidad: ${reg.cantidad}`);
        console.log(`     Fecha: ${reg.fecha}`);
        console.log(`     Tipo: ${reg.tipo}`);
        console.log('');
      }
    });
    
    if (gastos.length > 10) {
      console.log(`... y ${gastos.length - 10} registros más`);
    }
    
  } else {
    console.log('✅ Registros encontrados:');
    registrosEncontrados.forEach((reg, index) => {
      console.log(`  ${index + 1}. ID: ${reg.id}`);
      console.log(`     Nombre: "${reg.nombre}"`);
      console.log(`     Categoría: "${reg.categoria}"`);
      console.log(`     Cantidad: ${reg.cantidad}`);
      console.log(`     Fecha: ${reg.fecha}`);
      console.log(`     Tipo: ${reg.tipo}`);
      console.log('');
    });
  }
  
  return registrosEncontrados;
}

// Función para simular la eliminación con el rango específico
function simularEliminacionEspecifica() {
  console.log('\n🧪 SIMULACIÓN DE ELIMINACIÓN ESPECÍFICA');
  console.log('📅 Rango: 30/06/2026 hasta 31/12/2026');
  
  // Convertir fechas del rango
  const fechaInicio = '2026-06-30';
  const fechaFin = '2026-12-31';
  
  console.log(`🔍 Fechas convertidas: ${fechaInicio} hasta ${fechaFin}`);
  
  // Buscar registros en el rango
  const registrosEnRango = gastos.filter(g => {
    if (!g.fecha) return false;
    
    const fechaRegistro = g.fecha.slice(0, 10);
    const enRango = fechaRegistro >= fechaInicio && fechaRegistro <= fechaFin;
    
    if (enRango) {
      console.log(`📋 Registro en rango: ${fechaRegistro} - ${g.nombre} (${g.categoria}) - ${g.cantidad}`);
    }
    
    return enRango;
  });
  
  console.log(`📊 Total registros en rango: ${registrosEnRango.length}`);
  
  // Ahora aplicar filtros específicos
  const nombreFiltro = 'queralt';
  const categoriaFiltro = 'Alquiler';
  const montoFiltro = '250';
  
  console.log('\n🔍 Aplicando filtros específicos:');
  console.log(`  Nombre: "${nombreFiltro}"`);
  console.log(`  Categoría: "${categoriaFiltro}"`);
  console.log(`  Monto: "${montoFiltro}"`);
  
  const registrosCoincidentes = registrosEnRango.filter(g => {
    const nombre = (g.nombre || '').toLowerCase().trim();
    const categoria = (g.categoria || '').toLowerCase().trim();
    const cantidad = String(g.cantidad || '').trim();
    
    // 🔴 MASTER AI: Comparación flexible
    const coincideNombre = !nombreFiltro || nombre.includes(nombreFiltro.toLowerCase());
    const coincideCategoria = !categoriaFiltro || categoria === categoriaFiltro.toLowerCase();
    const coincideMonto = !montoFiltro || cantidad === montoFiltro || parseFloat(cantidad) === parseFloat(montoFiltro);
    
    const coincide = coincideNombre && coincideCategoria && coincideMonto;
    
    if (coincide) {
      console.log(`✅ REGISTRO COINCIDENTE: ${g.fecha} - ${g.nombre} (${g.categoria}) - ${g.cantidad}`);
    } else {
      console.log(`❌ Registro no coincide: ${g.fecha} - ${g.nombre} (${g.categoria}) - ${g.cantidad}`);
      console.log(`    Nombre: "${nombre}" vs "${nombreFiltro}" → ${coincideNombre}`);
      console.log(`    Categoría: "${categoria}" vs "${categoriaFiltro}" → ${coincideCategoria}`);
      console.log(`    Cantidad: "${cantidad}" vs "${montoFiltro}" → ${coincideMonto}`);
    }
    
    return coincide;
  });
  
  console.log(`\n📊 RESULTADO FINAL:`);
  console.log(`  Registros que se eliminarían: ${registrosCoincidentes.length}`);
  
  if (registrosCoincidentes.length === 0) {
    console.log('\n❌ DIAGNÓSTICO: No se encontraron registros coincidentes');
    console.log('🔍 Posibles causas:');
    console.log('  • El nombre no coincide exactamente');
    console.log('  • La categoría no coincide exactamente');
    console.log('  • El monto no coincide exactamente');
    console.log('  • La fecha no está en el rango especificado');
    console.log('  • El registro no existe en la base de datos');
  }
  
  return registrosCoincidentes;
}

// Función principal de diagnóstico
function diagnosticarEliminacion() {
  console.log('🚀 DIAGNÓSTICO COMPLETO - ELIMINACIÓN "queralt, Alquiler, 250"');
  console.log('=' .repeat(60));
  
  // Paso 1: Cargar datos
  if (!cargarDatosDesdeArchivo()) {
    console.log('\n💡 Para obtener datos reales:');
    console.log('1. Abre la app de escritorio');
    console.log('2. Presiona F12 para abrir la consola');
    console.log('3. Ejecuta: localStorage.getItem("app-gastos_records")');
    console.log('4. Copia el resultado y guárdalo como app-data.json');
    return;
  }
  
  // Paso 2: Buscar el registro específico
  const registrosQueralt = buscarRegistroQueralt();
  
  // Paso 3: Simular eliminación con el rango
  const registrosAEliminar = simularEliminacionEspecifica();
  
  // Paso 4: Verificar estado actual
  console.log('\n📊 ESTADO ACTUAL DE LA BASE DE DATOS:');
  console.log(`  Total registros: ${gastos.length}`);
  
  // Paso 5: Recomendaciones
  console.log('\n💡 RECOMENDACIONES:');
  if (registrosQueralt.length === 0) {
    console.log('  1. Verifica que el registro exista realmente');
    console.log('  2. Revisa la ortografía exacta del nombre y categoría');
    console.log('  3. Confirma el monto exacto');
  } else if (registrosAEliminar.length === 0) {
    console.log('  1. Verifica que la fecha del registro esté en el rango');
    console.log('  2. Revisa que los filtros coincidan exactamente');
    console.log('  3. Prueba con filtros más amplios');
  } else {
    console.log('  1. El registro debería eliminarse correctamente');
    console.log('  2. Si no funciona, el problema está en la UI');
  }
  
  return {
    registrosQueralt,
    registrosAEliminar,
    totalRegistros: gastos.length
  };
}

// Ejecutar diagnóstico
diagnosticarEliminacion();
