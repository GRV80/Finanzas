@echo off
echo 🚀 Creando acceso directo - Master AI Engineer v1.0.4

REM Rutas
set DESKTOP=%USERPROFILE%\Desktop
set EXECUTABLE=%~dp0dist\win-unpacked\App Gastos Pro.exe
set SHORTCUT=%DESKTOP%\App Gastos Pro v1.0.4.lnk

echo 📂 Escritorio: %DESKTOP%
echo 🎯 Ejecutable: %EXECUTABLE%
echo 📄 Acceso directo: %SHORTCUT%

REM Eliminar accesos directos antiguos
if exist "%DESKTOP%\App Gastos Pro.lnk" (
    echo 🗑️ Eliminando acceso directo antiguo...
    del "%DESKTOP%\App Gastos Pro.lnk"
)

if exist "%DESKTOP%\App Gastos Pro v1.0.4.lnk" (
    echo 🗑️ Eliminando acceso directo duplicado...
    del "%DESKTOP%\App Gastos Pro v1.0.4.lnk"
)

REM Verificar que el ejecutable existe
if not exist "%EXECUTABLE%" (
    echo ❌ No se encuentra el ejecutable
    echo 📂 Ruta esperada: %EXECUTABLE%
    echo 💡 Ejecuta primero: npm run dist
    pause
    exit /b 1
)

REM Crear acceso directo usando VBScript
echo 🔧 Creando acceso directo con VBScript...

set VBSCRIPT=%TEMP%\CreateShortcut.vbs
echo Set WshShell = CreateObject("WScript.Shell") > "%VBSCRIPT%"
echo Set Shortcut = WshShell.CreateShortcut("%SHORTCUT%") >> "%VBSCRIPT%"
echo Shortcut.TargetPath = "%EXECUTABLE%" >> "%VBSCRIPT%"
echo Shortcut.WorkingDirectory = "%~dp0dist\win-unpacked" >> "%VBSCRIPT%"
echo Shortcut.Description = "App Gastos Pro v1.0.4 - Master AI Engineer" >> "%VBSCRIPT%"
echo Shortcut.IconLocation = "%EXECUTABLE%, 0" >> "%VBSCRIPT%"
echo Shortcut.Save >> "%VBSCRIPT%"

REM Ejecutar VBScript
cscript //nologo "%VBSCRIPT%"

REM Limpiar
del "%VBSCRIPT%"

REM Verificar que se creó
if exist "%SHORTCUT%" (
    echo.
    echo ✅ Acceso directo creado exitosamente!
    echo 📄 Ruta: %SHORTCUT%
    echo 🚀 Busca "App Gastos Pro v1.0.4" en tu escritorio
    echo ⚡ Debería verse claramente ahora
    
    REM Listar accesos directos en escritorio
    echo.
    echo 📋 Accesos directos encontrados:
    dir "%DESKTOP%\*App Gastos*.lnk" /b
    
    echo.
    echo 🎉 Proceso completado!
    echo 📦 Versión: 1.0.4 - Master AI Engineer
) else (
    echo.
    echo ❌ No se pudo crear el acceso directo
    echo 💡 Intenta crearlo manualmente
)

pause
