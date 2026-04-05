/**
 * Master AI Engineer - Script de Acceso Directo Corregido v1.0.4
 * Crea acceso directo visible y correctamente nombrado en el escritorio
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Creando acceso directo corregido - Master AI Engineer v1.0.4');

function createCorrectDesktopShortcut() {
  try {
    // Rutas
    const desktopPath = path.join(require('os').homedir(), 'Desktop');
    const executablePath = path.join(__dirname, 'dist', 'win-unpacked', 'App Gastos Pro.exe');
    
    // Eliminar accesos directos antiguos
    const oldShortcuts = [
      path.join(desktopPath, 'App Gastos Pro.lnk'),
      path.join(desktopPath, 'App Gastos Pro v1.0.4.lnk')
    ];
    
    oldShortcuts.forEach(shortcut => {
      if (fs.existsSync(shortcut)) {
        try {
          fs.unlinkSync(shortcut);
          console.log(`🗑️ Eliminado acceso directo antiguo: ${shortcut}`);
        } catch (error) {
          console.log(`⚠️ No se pudo eliminar ${shortcut}: ${error.message}`);
        }
      }
    });
    
    // Crear nuevo acceso directo con PowerShell
    const shortcutPath = path.join(desktopPath, 'App Gastos Pro v1.0.4.lnk');
    const powershellScript = `
      $WshShell = New-Object -comObject WScript.Shell
      $Shortcut = $WshShell.CreateShortcut("${shortcutPath}")
      $Shortcut.TargetPath = "${executablePath}"
      $Shortcut.WorkingDirectory = "${path.dirname(executablePath)}"
      $Shortcut.Description = "App Gastos Pro v1.0.4 - Master AI Engineer"
      $Shortcut.IconLocation = "${executablePath}, 0"
      $Shortcut.Save()
      
      Write-Host "✅ Acceso directo creado: $shortcutPath"
    `;
    
    console.log('🔧 Ejecutando PowerShell para crear acceso directo...');
    execSync(`powershell -Command "${powershellScript}"`, { 
      encoding: 'utf8',
      stdio: 'inherit'
    });
    
    // Verificar que se creó
    if (fs.existsSync(shortcutPath)) {
      console.log('✅ Acceso directo creado exitosamente:');
      console.log(`   📂 Escritorio: ${shortcutPath}`);
      console.log(`   🎯 Ejecutable: ${executablePath}`);
      
      // Obtener información del archivo
      const stats = fs.statSync(shortcutPath);
      console.log(`   📊 Tamaño: ${(stats.size / 1024).toFixed(2)} KB`);
      console.log(`   📅 Creado: ${stats.mtime.toLocaleString('es-ES')}`);
      
      return true;
    } else {
      console.log('❌ No se pudo crear el acceso directo');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Error creando acceso directo:', error.message);
    return false;
  }
}

// Verificar ejecutable
const executablePath = path.join(__dirname, 'dist', 'win-unpacked', 'App Gastos Pro.exe');
if (!fs.existsSync(executablePath)) {
  console.log('❌ No se encontró el ejecutable');
  console.log('📂 Ruta esperada:', executablePath);
  console.log('💡 Ejecuta primero: npm run dist');
  process.exit(1);
}

// Crear acceso directo
if (createCorrectDesktopShortcut()) {
  console.log('\n🎉 Acceso directo corregido creado exitosamente!');
  console.log('🚀 Busca "App Gastos Pro v1.0.4" en tu escritorio');
  console.log('⚡ Debería verse claramente ahora');
  console.log('📦 Versión: 1.0.4 - Master AI Engineer');
  
  // Listar archivos del escritorio
  try {
    const desktopFiles = fs.readdirSync(path.join(require('os').homedir(), 'Desktop'));
    const appShortcuts = desktopFiles.filter(file => file.includes('App Gastos'));
    console.log('\n📋 Accesos directos encontrados en escritorio:');
    appShortcuts.forEach(file => {
      console.log(`   📄 ${file}`);
    });
  } catch (error) {
    console.log('⚠️ No se pudo listar el escritorio');
  }
} else {
  console.log('\n❌ No se pudo crear el acceso directo corregido');
  process.exit(1);
}
