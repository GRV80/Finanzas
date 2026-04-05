/**
 * Master AI Engineer - Función de Depuración para Consola de App Escritorio
 * Copia y pega este código directamente en la consola (F12) de la app
 */

// Función de depuración inmediata
function depurarEliminacionQueralt() {
  console.log('🚀 DEPURACIÓN INMEDIATA - ELIMINACIÓN "queralt, Alquiler, 250"');
  console.log('=' .repeat(60));
  
  // Paso 1: Mostrar todos los registros disponibles
  console.log('\n📊 TODOS LOS REGISTROS DISPONIBLES:');
  console.log(`Total: ${gastos.length} registros`);
  
  // Buscar registros que puedan coincidir
  const registrosSimilares = gastos.filter(g => {
    const nombre = (g.nombre || '').toLowerCase();
    const categoria = (g.categoria || '').toLowerCase();
    const cantidad = String(g.cantidad || '');
    
    return nombre.includes('quer') || 
           nombre.includes('alt') || 
           categoria.includes('alq') ||
           cantidad.includes('250');
  });
  
  console.log(`\n🔍 Registros SIMILARES encontrados: ${registrosSimilares.length}`);
  
  registrosSimilares.forEach((reg, index) => {
    console.log(`\n  ${index + 1}. ID: ${reg.id}`);
    console.log(`     Nombre completo: "${reg.nombre}"`);
    console.log(`     Categoría completa: "${reg.categoria}"`);
    console.log(`     Cantidad: ${reg.cantidad}`);
    console.log(`     Fecha: ${reg.fecha}`);
    console.log(`     Tipo: ${reg.tipo}`);
  });
  
  // Paso 2: Simular eliminación con el rango específico
  console.log('\n🧪 SIMULACIÓN DE ELIMINACIÓN');
  console.log('📅 Rango: 30/06/2026 hasta 31/12/2026');
  
  const fechaInicio = '2026-06-30';
  const fechaFin = '2026-12-31';
  
  const registrosEnRango = gastos.filter(g => {
    if (!g.fecha) return false;
    const fechaRegistro = g.fecha.slice(0, 10);
    const enRango = fechaRegistro >= fechaInicio && fechaRegistro <= fechaFin;
    return enRango;
  });
  
  console.log(`📊 Registros en rango: ${registrosEnRango.length}`);
  
  // Paso 3: Aplicar filtros específicos
  const nombreFiltro = 'queralt';
  const categoriaFiltro = 'Alquiler';
  const montoFiltro = '250';
  
  console.log('\n🔍 Aplicando filtros:');
  console.log(`  Nombre: "${nombreFiltro}"`);
  console.log(`  Categoría: "${categoriaFiltro}"`);
  console.log(`  Monto: "${montoFiltro}"`);
  
  const registrosCoincidentes = registrosEnRango.filter(g => {
    const nombre = (g.nombre || '').toLowerCase().trim();
    const categoria = (g.categoria || '').toLowerCase().trim();
    const cantidad = String(g.cantidad || '').trim();
    
    const coincideNombre = !nombreFiltro || nombre.includes(nombreFiltro.toLowerCase());
    const coincideCategoria = !categoriaFiltro || categoria === categoriaFiltro.toLowerCase();
    const coincideMonto = !montoFiltro || cantidad === montoFiltro || parseFloat(cantidad) === parseFloat(montoFiltro);
    
    const coincide = coincideNombre && coincideCategoria && coincideMonto;
    
    console.log(`\n🔍 Analizando registro: ${g.fecha} - ${g.nombre} (${g.categoria}) - ${g.cantidad}`);
    console.log(`  Nombre: "${nombre}" vs "${nombreFiltro}" → ${coincideNombre}`);
    console.log(`  Categoría: "${categoria}" vs "${categoriaFiltro}" → ${coincideCategoria}`);
    console.log(`  Cantidad: "${cantidad}" vs "${montoFiltro}" → ${coincideMonto}`);
    console.log(`  RESULTADO: ${coincide ? '✅ ELIMINAR' : '❌ MANTENER'}`);
    
    return coincide;
  });
  
  console.log(`\n📊 RESULTADO FINAL:`);
  console.log(`  Registros que se eliminarían: ${registrosCoincidentes.length}`);
  
  if (registrosCoincidentes.length > 0) {
    console.log('\n✅ REGISTROS A ELIMINAR:');
    registrosCoincidentes.forEach((reg, index) => {
      console.log(`  ${index + 1}. ${reg.fecha} - ${reg.nombre} (${reg.categoria}) - ${reg.cantidad}`);
    });
  } else {
    console.log('\n❌ NO SE ENCONTRARON REGISTROS PARA ELIMINAR');
    console.log('💡 Revisa:');
    console.log('  • Que el registro exista realmente');
    console.log('  • Que la fecha esté en el rango correcto');
    console.log('  • Que los filtros coincidan exactamente');
  }
  
  return {
    totalRegistros: gastos.length,
    registrosSimilares,
    registrosEnRango,
    registrosCoincidentes
  };
}

// Función para probar la eliminación manualmente
function probarEliminacionManual() {
  console.log('\n🧪 PRUEBA DE ELIMINACIÓN MANUAL');
  
  // Buscar el registro específico
  const registro = gastos.find(g => {
    const nombre = (g.nombre || '').toLowerCase();
    const categoria = (g.categoria || '').toLowerCase();
    const cantidad = String(g.cantidad || '');
    
    return nombre.includes('queralt') && 
           categoria.includes('alquiler') && 
           cantidad.includes('250');
  });
  
  if (registro) {
    console.log('✅ Registro encontrado:', registro);
    
    // Simular eliminación
    const index = gastos.indexOf(registro);
    if (index > -1) {
      gastos.splice(index, 1);
      console.log('✅ Registro eliminado manualmente');
      console.log('📊 Registros restantes:', gastos.length);
      
      // Restaurar para no afectar datos reales
      gastos.push(registro);
      console.log('🔄 Registro restaurado para no afectar datos');
    }
  } else {
    console.log('❌ Registro no encontrado');
  }
}

// Ejecutar diagnóstico inmediatamente
console.log('🔧 Herramienta de depuración cargada. Ejecuta:');
console.log('  depurarEliminacionQueralt()');
console.log('  probarEliminacionManual()');

// Ejecutar automáticamente
depurarEliminacionQueralt();
