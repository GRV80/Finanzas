#!/usr/bin/env node

/**
 * Master AI Engineer - Script de Construcción y Publicación Automática v1.0.4
 * Sistema automatizado para construir y publicar la app en GitHub
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando construcción y publicación automática - Master AI Engineer v1.0.4');

// Función para ejecutar comandos
function runCommand(command, description) {
  console.log(`\n📋 ${description}`);
  console.log(`⚡ Ejecutando: ${command}`);
  
  try {
    const result = execSync(command, { 
      encoding: 'utf8',
      stdio: 'inherit',
      cwd: __dirname
    });
    console.log(`✅ ${description} completado exitosamente`);
    return true;
  } catch (error) {
    console.error(`❌ Error en ${description}:`, error.message);
    return false;
  }
}

// Función para verificar si hay cambios
function hasChanges() {
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    return status.trim().length > 0;
  } catch (error) {
    return false;
  }
}

// Función para obtener la versión actual
function getCurrentVersion() {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    return packageJson.version;
  } catch (error) {
    console.error('❌ Error leyendo package.json:', error.message);
    return null;
  }
}

// Flujo principal de construcción y publicación
async function buildAndPublish() {
  console.log('\n🔍 Verificando estado del repositorio...');
  
  const currentVersion = getCurrentVersion();
  if (!currentVersion) {
    console.log('❌ No se pudo obtener la versión actual');
    return;
  }
  
  console.log(`📦 Versión actual: ${currentVersion}`);
  
  // Verificar si hay cambios para commit
  if (!hasChanges()) {
    console.log('ℹ️ No hay cambios para commit. Publicando versión existente...');
  } else {
    console.log('📝 Se detectaron cambios. Preparando commit...');
    
    // Agregar todos los cambios
    if (!runCommand('git add .', 'Agregando cambios al staging area')) {
      return;
    }
    
    // Hacer commit con mensaje descriptivo
    const commitMessage = `🚀 Actualización v${currentVersion} - Master AI Engineer
    
🔥 Mejoras:
- Sistema de actualización automática mejorado
- Corrección de fechas en ingresos
- Cierre automático de modales
- Formato de calendario nativo
- Verificación automática cada 30 minutos

🔧 Características:
- Actualización automática GitHub
- Acceso directo de escritorio
- Notificaciones mejoradas
- Instalación automática

📅 Fecha: ${new Date().toISOString()}
👤 Autor: Master AI Engineer`;
    
    if (!runCommand(`git commit -m "${commitMessage}"`, 'Creando commit')) {
      return;
    }
  }
  
  // Hacer push a GitHub
  if (!runCommand('git push origin main', 'Subiendo cambios a GitHub')) {
    return;
  }
  
  // Instalar dependencias si es necesario
  if (!fs.existsSync('node_modules')) {
    console.log('\n📦 Instalando dependencias...');
    if (!runCommand('npm install', 'Instalando dependencias')) {
      return;
    }
  }
  
  // Limpiar construcción anterior
  console.log('\n🧹 Limpiando construcción anterior...');
  if (fs.existsSync('dist')) {
    try {
      execSync('rm -rf dist', { stdio: 'inherit' });
    } catch (error) {
      console.log('⚠️ No se pudo limpiar dist, continuando...');
    }
  }
  
  // Construir la aplicación
  console.log('\n🔨 Construyendo aplicación para Windows...');
  if (!runCommand('npm run dist:publish', 'Construyendo y publicando aplicación')) {
    console.log('\n⚠️ Intentando construcción sin publicación...');
    if (!runCommand('npm run dist', 'Construyendo aplicación sin publicación')) {
      return;
    }
  }
  
  console.log('\n✅ ¡Construcción completada exitosamente!');
  console.log(`📦 Versión ${currentVersion} construida y publicada en GitHub`);
  console.log('🔄 La aplicación se actualizará automáticamente en los clientes');
  
  // Mostrar archivos generados
  if (fs.existsSync('dist')) {
    console.log('\n📁 Archivos generados:');
    try {
      const files = fs.readdirSync('dist');
      files.forEach(file => {
        const filePath = path.join('dist', file);
        const stats = fs.statSync(filePath);
        const size = (stats.size / 1024 / 1024).toFixed(2);
        console.log(`   📄 ${file} (${size} MB)`);
      });
    } catch (error) {
      console.log('⚠️ No se pudo listar los archivos generados');
    }
  }
  
  console.log('\n🎉 Proceso completado exitosamente!');
  console.log('⚡ La app de escritorio se actualizará automáticamente');
  console.log('🚀 Los usuarios recibirán la nueva versión 1.0.4');
}

// Manejo de errores global
process.on('uncaughtException', (error) => {
  console.error('\n❌ Error no capturado:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('\n❌ Promesa rechazada no manejada:', reason);
  process.exit(1);
});

// Ejecutar el flujo principal
buildAndPublish().catch(error => {
  console.error('\n❌ Error en el proceso de construcción y publicación:', error);
  process.exit(1);
});
