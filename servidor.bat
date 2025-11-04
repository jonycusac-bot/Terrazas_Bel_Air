@echo off
echo ========================================
echo    SERVIDOR LOCAL - TERRAZAS DE BEL AIR
echo ========================================
echo.
echo Iniciando servidor web local...
echo.

REM Intentar con Python 3
python -m http.server 8080 2>nul
if %errorlevel% neq 0 (
    REM Si falla, intentar con Python 2
    python -m SimpleHTTPServer 8080 2>nul
    if %errorlevel% neq 0 (
        echo ERROR: Python no encontrado
        echo.
        echo Instala Python desde: https://python.org
        echo O usa la Opcion B con Node.js
        pause
        exit /b 1
    )
)