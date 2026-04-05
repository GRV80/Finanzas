/**
 * Master AI Engineer - Diagnóstico Específico para Registro "queralt, Alquiler, 250"
 * Función para depurar y encontrar el problema específico de eliminación
 */

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
    
    // Buscar registros similares
    console.log('\n🔍 Buscando registros similares...');
    
    const similares = gastos.filter(g => {
      const nombre = (g.nombre || '').toLowerCase();
      const categoria = (g.categoria || '').toLowerCase();
      const cantidad = String(g.cantidad || '');
      
      return nombre.includes('quer') || 
             nombre.includes('alq') || 
             categoria.includes('alq') ||
             cantidad === '250';
    });
    
    console.log(`📊 Registros similares encontrados: ${similares.length}`);
    similares.forEach((reg, index) => {
      console.log(`  ${index + 1}. ID: ${reg.id}`);
      console.log(`     Nombre: "${reg.nombre}"`);
      console.log(`     Categoría: "${reg.categoria}"`);
      console.log(`     Cantidad: ${reg.cantidad}`);
      console.log(`     Fecha: ${reg.fecha}`);
      console.log(`     Tipo: ${reg.tipo}`);
      console.log('');
    });
    
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
    
    const coincideNombre = !nombreFiltro || nombre === nombreFiltro.toLowerCase();
    const coincideCategoria = !categoriaFiltro || categoria === categoriaFiltro.toLowerCase();
    const coincideMonto = !montoFiltro || cantidad === montoFiltro;
    
    const coincide = coincideNombre && coincideCategoria && coincideMonto;
    
    if (coincide) {
      console.log(`✅ REGISTRO COINCIDENTE: ${g.fecha} - ${g.nombre} (${g.categoria}) - ${g.cantidad}`);
    }
    
    return coincide;
  });
  
  console.log(`\n📊 RESULTADO FINAL:`);
  console.log(`  Registros que se eliminarían: ${registrosCoincidentes.length}`);
  
  if (registrosCoincidentes.length === 0) {
    console.log('\n❌ DIAGNÓSTICO: No se encontraron registros coincidentes');
    console.log('🔍 Posibles causas:');
    console.log('  • El nombre no coincide exactamente ("queralt" vs "Queralt")');
    console.log('  • La categoría no coincide exactamente ("alquiler" vs "Alquiler")');
    console.log('  • El monto no coincide exactamente ("250" vs "250.00")');
    console.log('  • La fecha no está en el rango especificado');
    console.log('  • El registro no existe en la base de datos');
    
    // Mostrar todos los registros para comparación
    console.log('\n📋 TODOS LOS REGISTROS EN EL RANGO:');
    registrosEnRango.forEach((reg, index) => {
      console.log(`  ${index + 1}. ${reg.fecha} - "${reg.nombre}" - "${reg.categoria}" - ${reg.cantidad}`);
    });
  }
  
  return registrosCoincidentes;
}

// Función principal de diagnóstico
function diagnosticarEliminacionQueralt() {
  console.log('🚀 DIAGNÓSTICO COMPLETO - ELIMINACIÓN "queralt, Alquiler, 250"');
  console.log('=' .repeat(60));
  
  // Paso 1: Buscar el registro específico
  const registrosQueralt = buscarRegistroQueralt();
  
  // Paso 2: Simular eliminación con el rango
  const registrosAEliminar = simularEliminacionEspecifica();
  
  // Paso 3: Verificar estado actual
  console.log('\n📊 ESTADO ACTUAL DE LA BASE DE DATOS:');
  console.log(`  Total registros: ${gastos.length}`);
  
  // Paso 4: Recomendaciones
  console.log('\n💡 RECOMENDACIONES:');
  if (registrosQueralt.length === 0) {
    console.log('  1. Verifica que el registro exista realmente');
    console.log('  2. Revisa la ortografía exacta del nombre y categoría');
    console.log('  3. Confirma el monto exacto (puede ser "250.00")');
  } else if (registrosAEliminar.length === 0) {
    console.log('  1. Verifica que la fecha del registro esté en el rango');
    console.log('  2. Revisa que los filtros coincidan exactamente');
    console.log('  3. Prueba con filtros más amplios');
  } else {
    console.log('  1. El registro debería eliminarse correctamente');
    console.log('  2. Si no funciona, revisa la función executeDeleteRange');
  }
  
  return {
    registrosQueralt,
    registrosAEliminar,
    totalRegistros: gastos.length
  };
}

// Exportar para uso en la consola
window.diagnosticarQueralt = {
  buscarRegistroQueralt,
  simularEliminacionEspecifica,
  diagnosticarEliminacionQueralt
};

console.log('🔧 Herramienta de diagnóstico para "queralt, Alquiler, 250" cargada');
console.log('💡 Para usar en la consola:');
console.log('  window.diagnosticarQueralt.diagnosticarEliminacionQueralt()');
console.log('  window.diagnosticarQueralt.buscarRegistroQueralt()');
console.log('  window.diagnosticarQueralt.simularEliminacionEspecifica()');
