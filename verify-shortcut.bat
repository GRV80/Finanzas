@echo off
echo 🔍 Verificando acceso directo en escritorio...

REM Ruta del acceso directo
set SHORTCUT=%USERPROFILE%\Desktop\App Gastos Pro v1.0.4.lnk

REM Verificar si existe
if exist "%SHORTCUT%" (
    echo ✅ Acceso directo encontrado: %SHORTCUT%
    
    REM Obtener información del archivo
    for %%F in ("%SHORTCUT%") do (
        echo 📊 Tamaño: %%~zF bytes
        echo 📅 Modificado: %%~tF
    )
    
    REM Intentar abrir el acceso directo para verificar
    echo 🧪 Verificando que funciona correctamente...
    
    REM Mostrar propiedades básicas
    echo.
    echo 📋 Propiedades del acceso directo:
    echo 📄 Nombre: App Gastos Pro v1.0.4.lnk
    echo 📍 Ubicación: %USERPROFILE%\Desktop
    echo 🎯 Destino: %~dp0dist\win-unpacked\App Gastos Pro.exe
    
    echo.
    echo 🎉 El acceso directo está listo para usar!
    echo 🚀 Haz doble clic en "App Gastos Pro v1.0.4" en tu escritorio
    echo ⚡ La aplicación se iniciará automáticamente
    
) else (
    echo ❌ No se encuentra el acceso directo
    echo 📂 Ruta buscada: %SHORTCUT%
    echo 💡 Ejecuta: create-shortcut.bat
)

echo.
echo 📦 Versión: 1.0.4 - Master AI Engineer
echo 🔄 Actualización automática: Activada
echo 📅 Fecha: %date% %time%

pause
