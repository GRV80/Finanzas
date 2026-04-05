/**
 * Master AI Engineer - Script de Prueba para Eliminación por Rango
 * Verifica que la eliminación por rango funcione correctamente
 */

console.log('🧪 INICIANDO PRUEBA DE ELIMINACIÓN POR RANGO - MASTER AI');

// Función para crear registros de prueba
function crearRegistrosPrueba() {
  const registros = [];
  
  // Crear registros de prueba de abril a diciembre 2026
  const meses = ['04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const nombres = ['Test Abril', 'Test Mayo', 'Test Junio', 'Test Julio', 'Test Agosto', 'Test Septiembre', 'Test Octubre', 'Test Noviembre', 'Test Diciembre'];
  
  meses.forEach((mes, index) => {
    registros.push({
      id: `test-${index + 1}`,
      tipo: 'Gasto',
      fecha: `2026-${mes}-15T10:00`,
      nombre: nombres[index],
      categoria: 'TEST',
      descripcion: `Registro de prueba para ${mes}/2026`,
      cantidad: 100
    });
  });
  
  // Agregar registros de 2027
  registros.push({
    id: 'test-2027-1',
    tipo: 'Gasto',
    fecha: '2027-01-15T10:00',
    nombre: 'Test Enero 2027',
    categoria: 'TEST',
    descripcion: 'Registro de prueba para enero 2027',
    cantidad: 100
  });
  
  registros.push({
    id: 'test-2027-2',
    tipo: 'Gasto',
    fecha: '2027-12-15T10:00',
    nombre: 'Test Diciembre 2027',
    categoria: 'TEST',
    descripcion: 'Registro de prueba para diciembre 2027',
    cantidad: 100
  });
  
  return registros;
}

// Función para simular eliminación por rango
function simularEliminacionPorRango(registros, fechaInicio, fechaFin) {
  console.log('\n🔍 SIMULANDO ELIMINACIÓN POR RANGO');
  console.log(`📅 Rango: ${fechaInicio} hasta ${fechaFin}`);
  console.log(`📊 Total registros antes: ${registros.length}`);
  
  const eliminados = [];
  const restantes = [];
  
  registros.forEach(registro => {
    const fechaRegistro = registro.fecha.slice(0, 10);
    
    if (fechaRegistro >= fechaInicio && fechaRegistro <= fechaFin) {
      eliminados.push(registro);
      console.log(`🗑️ ELIMINAR: ${registro.fecha} - ${registro.nombre}`);
    } else {
      restantes.push(registro);
      console.log(`✅ MANTENER: ${registro.fecha} - ${registro.nombre}`);
    }
  });
  
  console.log(`\n📊 RESULTADO:`);
  console.log(`  Registros eliminados: ${eliminados.length}`);
  console.log(`  Registros restantes: ${restantes.length}`);
  
  eliminados.forEach(reg => {
    console.log(`    🗑️ ${reg.fecha} - ${reg.nombre}`);
  });
  
  return { eliminados, restantes };
}

// Ejecutar pruebas
console.log('\n📋 CREANDO REGISTROS DE PRUEBA...');
const registrosPrueba = crearRegistrosPrueba();

console.log('\n📊 REGISTROS CREADOS:');
registrosPrueba.forEach((reg, index) => {
  console.log(`  ${index + 1}. ${reg.fecha} - ${reg.nombre} (${reg.tipo})`);
});

// Prueba 1: Eliminar de mayo a diciembre 2026
console.log('\n🧪 PRUEBA 1: Eliminar de mayo a diciembre 2026');
const resultado1 = simularEliminacionPorRango(registrosPrueba, '2026-05-01', '2026-12-31');

// Prueba 2: Eliminar todo 2027
console.log('\n🧪 PRUEBA 2: Eliminar todo 2027');
const resultado2 = simularEliminacionPorRango(resultado1.restantes, '2027-01-01', '2027-12-31');

console.log('\n✅ PRUEBAS COMPLETADAS');
console.log('🔍 REVISA LA CONSOLA PARA VER LOS RESULTADOS DETALLADOS');
console.log('💡 ESTOS RESULTADOS DEBEN COINCIDIR CON LOS DE LA APP');

// Exportar para referencia
window.pruebaEliminacion = {
  registrosPrueba,
  resultado1,
  resultado2,
  simularEliminacionPorRango
};

console.log('\n📦 Para usar en la consola:');
console.log('  window.pruebaEliminacion.registrosPrueba');
console.log('  window.pruebaEliminacion.resultado1');
console.log('  window.pruebaEliminacion.resultado2');
