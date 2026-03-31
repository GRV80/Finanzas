/**
 * Master AI Engineer - Script de Acceso Directo Automático v1.0.4
 * Crea automáticamente el acceso directo en el escritorio
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Creando acceso directo automático - Master AI Engineer v1.0.4');

// Función para crear acceso directo
function createDesktopShortcut() {
  try {
    // Ruta del escritorio
    const desktopPath = path.join(require('os').homedir(), 'Desktop');
    
    // Ruta del ejecutable
    const executablePath = path.join(__dirname, 'dist', 'win-unpacked', 'App Gastos Pro.exe');
    
    // Ruta del acceso directo
    const shortcutPath = path.join(desktopPath, 'App Gastos Pro v1.0.4.lnk');
    
    // Crear acceso directo usando PowerShell
    const powershellScript = `
      $WshShell = New-Object -comObject WScript.Shell
      $Shortcut = $WshShell.CreateShortcut("${shortcutPath}")
      $Shortcut.TargetPath = "${executablePath}"
      $Shortcut.WorkingDirectory = "${path.dirname(executablePath)}"
      $Shortcut.Description = "App Gastos Pro v1.0.4 - Master AI Engineer"
      $Shortcut.IconLocation = "${executablePath}, 0"
      $Shortcut.Save()
    `;
    
    execSync(`powershell -Command "${powershellScript}"`, { stdio: 'inherit' });
    
    console.log('✅ Acceso directo creado exitosamente:');
    console.log(`   📂 Escritorio: ${shortcutPath}`);
    console.log(`   🎯 Ejecutable: ${executablePath}`);
    
    return true;
  } catch (error) {
    console.error('❌ Error creando acceso directo:', error.message);
    return false;
  }
}

// Verificar si el ejecutable existe
const executablePath = path.join(__dirname, 'dist', 'win-unpacked', 'App Gastos Pro.exe');
if (!fs.existsSync(executablePath)) {
  console.log('❌ No se encontró el ejecutable de la aplicación');
  console.log('📂 Ruta esperada:', executablePath);
  console.log('💡 Primero ejecuta: npm run dist');
  process.exit(1);
}

// Crear el acceso directo
if (createDesktopShortcut()) {
  console.log('\n🎉 Acceso directo creado exitosamente!');
  console.log('🚀 La app está lista para usar desde el escritorio');
  console.log('⚡ Se actualizará automáticamente a nuevas versiones');
  console.log('📦 Versión: 1.0.4 - Master AI Engineer');
} else {
  console.log('\n❌ No se pudo crear el acceso directo');
  process.exit(1);
}
