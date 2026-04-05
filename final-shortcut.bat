@echo off
echo 🎯 SOLUCIÓN FINAL - Acceso Directo Visible v1.0.4
echo.

REM Limpiar pantalla
cls

echo 🔍 Estado actual del escritorio:
echo 📂 Escritorio: %USERPROFILE%\Desktop
echo.

REM Listar todos los archivos que contienen "App Gastos"
echo 📋 Buscando accesos directos en escritorio...
dir "%USERPROFILE%\Desktop\*App Gastos*" /b 2>nul

if errorlevel 1 (
    echo ❌ No se encontraron accesos directos
    echo.
    echo 🔄 Creando acceso directo final...
    
    REM Crear acceso directo final con método alternativo
    set SHORTCUT=%USERPROFILE%\Desktop\App Gastos Pro v1.0.4.lnk
    set EXECUTABLE=%~dp0dist\win-unpacked\App Gastos Pro.exe
    
    echo 📄 Creando: %SHORTCUT%
    echo 🎯 Destino: %EXECUTABLE%
    
    REM Usar PowerShell como último método
    powershell -Command "$WshShell = New-Object -comObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut('%SHORTCUT%'); $Shortcut.TargetPath = '%EXECUTABLE%'; $Shortcut.WorkingDirectory = '%~dp0dist\win-unpacked'; $Shortcut.Description = 'App Gastos Pro v1.0.4 - Master AI Engineer'; $Shortcut.IconLocation = '%EXECUTABLE%', 0; $Shortcut.Save()"
    
    if exist "%SHORTCUT%" (
        echo ✅ Acceso directo creado exitosamente!
    ) else (
        echo ❌ No se pudo crear
        echo 💡 Creando manualmente...
        
        REM Crear manualmente
        echo Set oWS = WScript.CreateObject("WScript.Shell") > "%TEMP%\shortcut.vbs"
        echo sLinkFile = "%SHORTCUT%" >> "%TEMP%\shortcut.vbs"
        echo Set oLink = oWS.CreateShortcut(sLinkFile) >> "%TEMP%\shortcut.vbs"
        echo oLink.TargetPath = "%EXECUTABLE%" >> "%TEMP%\shortcut.vbs"
        echo oLink.WorkingDirectory = "%~dp0dist\win-unpacked" >> "%TEMP%\shortcut.vbs"
        echo oLink.Description = "App Gastos Pro v1.0.4 - Master AI Engineer" >> "%TEMP%\shortcut.vbs"
        echo oLink.Save >> "%TEMP%\shortcut.vbs"
        cscript //nologo "%TEMP%\shortcut.vbs"
        del "%TEMP%\shortcut.vbs"
    )
) else (
    echo ✅ Accesos directos encontrados!
)

echo.
echo 🔍 Verificación final:
if exist "%USERPROFILE%\Desktop\App Gastos Pro v1.0.4.lnk" (
    echo ✅ Acceso directo encontrado: App Gastos Pro v1.0.4.lnk
    
    for %%F in ("%USERPROFILE%\Desktop\App Gastos Pro v1.0.4.lnk") do (
        echo 📊 Tamaño: %%~zF bytes
        echo 📅 Creado: %%~tF
    )
    
    echo.
    echo 🎉 ¡LISTO PARA USAR!
    echo 🚀 Busca "App Gastos Pro v1.0.4" en tu escritorio
    echo ⚡ Haz doble clic para iniciar la aplicación
    echo 🔄 Se actualizará automáticamente
) else (
    echo ❌ Aún no se encuentra el acceso directo
    echo 💡 Intenta estos pasos:
    echo    1. Refresca tu escritorio (F5)
    echo    2. Busca "App Gastos Pro v1.0.4.lnk"
    echo    3. Si no aparece, reinicia tu computadora
    echo    4. Ejecuta manualmente: %~dp0dist\win-unpacked\App Gastos Pro.exe
)

echo.
echo 📦 Versión: 1.0.4 - Master AI Engineer
echo 🔄 Actualización automática: Activada
echo 📅 Fecha: %date% %time%
echo.

REM Abrir el escritorio
echo 📂 Abriendo tu escritorio...
explorer "%USERPROFILE%\Desktop"

pause
