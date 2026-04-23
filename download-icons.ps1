# Script para descargar e instalar iconos automáticamente
# Autor: Cascade AI Assistant
# Versión: 1.0

Write-Host "=== DESCARGA E INSTALACIÓN DE ICONOS ===" -ForegroundColor Cyan

# Rutas
$ProjectPath = "c:\Users\Usuario\Desktop\APP AI\app-gastos"
$InstallPath = "C:\Users\Usuario\AppData\Local\Programs\App Gastos Pro\resources\img"
$ElectronPath = "$ProjectPath\electron\img"

# URLs de iconos (usando iconos populares y confiables)
$Icons = @{
    "home-icon.svg" = "https://cdn.jsdelivr.net/npm/heroicons@2.0.18/24/outline/home.svg"
    "settings-icon.svg" = "https://cdn.jsdelivr.net/npm/heroicons@2.0.18/24/outline/cog-6-tooth.svg"
    "refresh-icon.svg" = "https://cdn.jsdelivr.net/npm/heroicons@2.0.18/24/outline/arrow-path.svg"
    "config-icon.svg" = "https://cdn.jsdelivr.net/npm/heroicons@2.0.18/24/outline/adjustments-horizontal.svg"
}

Write-Host "Creando carpetas necesarias..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path $ProjectPath\img | Out-Null
New-Item -ItemType Directory -Force -Path $ElectronPath | Out-Null
New-Item -ItemType Directory -Force -Path $InstallPath | Out-Null

Write-Host "Descargando iconos desde web..." -ForegroundColor Yellow

foreach ($icon in $Icons.GetEnumerator()) {
    $fileName = $icon.Key
    $url = $icon.Value
    
    Write-Host "Descargando $fileName..." -ForegroundColor Green
    
    try {
        # Descargar icono
        Invoke-WebRequest -Uri $url -OutFile "$ProjectPath\img\$fileName" -ErrorAction Stop
        
        # Copiar a carpeta electron
        Copy-Item "$ProjectPath\img\$fileName" "$ElectronPath\$fileName" -Force
        
        # Copiar a app instalada
        Copy-Item "$ProjectPath\img\$fileName" "$InstallPath\$fileName" -Force
        
        Write-Host "✅ $fileName descargado e instalado" -ForegroundColor Green
    }
    catch {
        $errorMsg = $_.Exception.Message
        Write-Host "❌ Error descargando $fileName - $errorMsg" -ForegroundColor Red
        
        # Crear icono SVG básico como fallback
        $fallbackSvg = switch ($fileName) {
            "home-icon.svg" { '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>' }
            "settings-icon.svg" { '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.65-.07-.97l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.08-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.63c-.04.32-.07.64-.07.97 0 .33.03.65.07.97l-2.11 1.63c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.39 1.06.73 1.69.98l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.25 1.17-.59 1.69-.98l2.49 1c.22.08.49 0 .61-.22l2-3.46c.13-.22.07-.49.12-.64l-2.11-1.63c.04-.32.07-.64.07-.97 0-.33-.03-.65-.07-.97l2.11-1.63c.19-.15.24-.42-.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.08-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.63c-.04.32-.07.64-.07.97 0 .33.03.65.07.97l-2.11 1.63c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.39 1.06.73 1.69.98l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.25 1.17-.59 1.69-.98l2.49 1c.22.08.49 0 .61-.22l2-3.46c.13-.22.07-.49.12-.64l-2.11-1.63c.04-.32.07-.64.07-.97 0-.33-.03-.65-.07-.97l2.11-1.63c.19-.15.24-.42-.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.08-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.63c-.04.32-.07.64-.07.97 0 .33.03.65.07.97l-2.11 1.63c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.39 1.06.73 1.69.98l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.25 1.17-.59 1.69-.98l2.49 1c.22.08.49 0 .61-.22l2-3.46c.13-.22.07-.49.12-.64l-2.11-1.63z"/></svg>' }
            "refresh-icon.svg" { '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>' }
            "config-icon.svg" { '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.65-.07-.97l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.08-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.63c-.04.32-.07.64-.07.97 0 .33.03.65.07.97l-2.11 1.63c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.39 1.06.73 1.69.98l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.25 1.17-.59 1.69-.98l2.49 1c.22.08.49 0 .61-.22l2-3.46c.13-.22.07-.49.12-.64l-2.11-1.63c.04-.32.07-.64.07-.97 0-.33-.03-.65-.07-.97l2.11-1.63c.19-.15.24-.42-.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.08-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.63c-.04.32-.07.64-.07.97 0 .33.03.65.07.97l-2.11 1.63c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.39 1.06.73 1.69.98l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.25 1.17-.59 1.69-.98l2.49 1c.22.08.49 0 .61-.22l2-3.46c.13-.22.07-.49.12-.64l-2.11-1.63z"/></svg>' }
            default { '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>' }
        }
        
        Set-Content -Path "$ProjectPath\img\$fileName" -Value $fallbackSvg
        Copy-Item "$ProjectPath\img\$fileName" "$ElectronPath\$fileName" -Force
        Copy-Item "$ProjectPath\img\$fileName" "$InstallPath\$fileName" -Force
        
        Write-Host "⚠️ $fileName creado como fallback" -ForegroundColor Yellow
    }
}

Write-Host "Copiando otros archivos existentes..." -ForegroundColor Yellow

# Copiar CF-icon.svg y Rehacer.png si existen
if (Test-Path "$ProjectPath\img\CF-icon.svg") {
    Copy-Item "$ProjectPath\img\CF-icon.svg" "$ElectronPath\CF-icon.svg" -Force
    Copy-Item "$ProjectPath\img\CF-icon.svg" "$InstallPath\CF-icon.svg" -Force
    Write-Host "✅ CF-icon.svg copiado" -ForegroundColor Green
}

if (Test-Path "$ProjectPath\img\Rehacer.png") {
    Copy-Item "$ProjectPath\img\Rehacer.png" "$ElectronPath\Rehacer.png" -Force
    Copy-Item "$ProjectPath\img\Rehacer.png" "$InstallPath\Rehacer.png" -Force
    Write-Host "✅ Rehacer.png copiado" -ForegroundColor Green
}

Write-Host "Actualizando HTML con nuevas referencias..." -ForegroundColor Yellow

# Actualizar HTML para usar los nuevos iconos
$IndexPath = "$ProjectPath\index.html"
$ElectronIndexPath = "$ProjectPath\electron\index.html"

if (Test-Path $IndexPath) {
    $content = Get-Content $IndexPath -Raw
    
    # Reemplazar referencias de iconos
    $content = $content -replace 'src="img/home-icon\.svg"', 'src="img/home-icon.svg"'
    $content = $content -replace 'src="img/CF-icon\.svg"', 'src="img/CF-icon.svg"'
    $content = $content -replace 'src="img/Rehacer\.png"', 'src="img/Rehacer.png"'
    
    Set-Content -Path $IndexPath -Value $content
    Copy-Item $IndexPath $ElectronIndexPath -Force
    
    Write-Host "✅ HTML actualizado" -ForegroundColor Green
}

Write-Host "Reiniciando aplicación..." -ForegroundColor Yellow

# Cerrar procesos
Get-Process -Name "App Gastos Pro" -ErrorAction SilentlyContinue | Stop-Process -Force

# Esperar un momento
Start-Sleep -Seconds 2

# Iniciar aplicación
if (Test-Path "C:\Users\Usuario\Desktop\App Gastos Pro.lnk") {
    Start-Process "C:\Users\Usuario\Desktop\App Gastos Pro.lnk"
    Write-Host "✅ App Gastos Pro reiniciada" -ForegroundColor Green
}

Write-Host "=== INSTALACIÓN COMPLETADA ===" -ForegroundColor Cyan
Write-Host "Iconos instalados en:" -ForegroundColor White
Write-Host "  • Proyecto: $ProjectPath\img" -ForegroundColor Gray
Write-Host "  • Electron: $ElectronPath" -ForegroundColor Gray  
Write-Host "  • App instalada: $InstallPath" -ForegroundColor Gray
Write-Host ""
Write-Host "Presiona cualquier tecla para continuar..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
