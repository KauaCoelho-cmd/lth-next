@echo off
chcp 65001 >nul
title Hunter X — Instalador

color 0A
cls
echo.
echo  ██╗  ██╗██╗   ██╗███╗   ██╗████████╗███████╗██████╗     ██╗  ██╗
echo  ██║  ██║██║   ██║████╗  ██║╚══██╔══╝██╔════╝██╔══██╗    ╚██╗██╔╝
echo  ███████║██║   ██║██╔██╗ ██║   ██║   █████╗  ██████╔╝     ╚███╔╝
echo  ██╔══██║██║   ██║██║╚██╗██║   ██║   ██╔══╝  ██╔══██╗     ██╔██╗
echo  ██║  ██║╚██████╔╝██║ ╚████║   ██║   ███████╗██║  ██║    ██╔╝ ██╗
echo  ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝    ╚═╝  ╚═╝
echo.
echo  ================================================================
echo   Instalador Automatico v1.0  ^|  hunterx.site
echo  ================================================================
echo.

:: Verifica PowerShell
powershell -Command "exit" >nul 2>&1
if errorlevel 1 (
    echo  [ERRO] PowerShell nao encontrado. Instale o Windows 10 ou superior.
    pause
    exit /b 1
)

set "INSTALL_DIR=%LOCALAPPDATA%\HunterX"
set "ZIP_URL=https://hunterx.site/hunter-x.zip"
set "ZIP_FILE=%TEMP%\hunter-x.zip"

echo  [1/4] Baixando Hunter X...
powershell -Command "try { Invoke-WebRequest -Uri '%ZIP_URL%' -OutFile '%ZIP_FILE%' -UseBasicParsing; Write-Host '  OK' } catch { Write-Host '  ERRO: ' $_.Exception.Message; exit 1 }"
if errorlevel 1 (
    echo.
    echo  [ERRO] Falha ao baixar. Verifique sua conexao com a internet.
    pause
    exit /b 1
)

echo  [2/4] Extraindo arquivos...
if exist "%INSTALL_DIR%" rd /s /q "%INSTALL_DIR%" >nul 2>&1
powershell -Command "Expand-Archive -Path '%ZIP_FILE%' -DestinationPath '%INSTALL_DIR%' -Force"
del "%ZIP_FILE%" >nul 2>&1

:: Acha a pasta da extensao (pode estar em subpasta)
set "EXT_DIR=%INSTALL_DIR%"
for /d %%D in ("%INSTALL_DIR%\*") do (
    if exist "%%D\manifest.json" set "EXT_DIR=%%D"
)
if exist "%INSTALL_DIR%\manifest.json" set "EXT_DIR=%INSTALL_DIR%"

echo  [3/4] Procurando Chrome...

set "CHROME="
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" set "CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" set "CHROME=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
if exist "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" set "CHROME=%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"

:: Tenta Brave
if "%CHROME%"=="" (
    if exist "%ProgramFiles%\BraveSoftware\Brave-Browser\Application\brave.exe" set "CHROME=%ProgramFiles%\BraveSoftware\Brave-Browser\Application\brave.exe"
)

if "%CHROME%"=="" (
    echo.
    echo  [AVISO] Chrome nao encontrado automaticamente.
    echo  Abra manualmente: chrome://extensions
    echo  Ative "Modo Desenvolvedor" e clique "Carregar sem compactacao"
    echo  Selecione a pasta: %EXT_DIR%
    echo.
    explorer "%EXT_DIR%"
    pause
    exit /b 0
)

echo  [4/4] Abrindo Chrome com Hunter X...
start "" "%CHROME%" --load-extension="%EXT_DIR%"

echo.
echo  ================================================================
color 0B
echo   Hunter X instalado com sucesso!
echo.
echo   Acesse a Biblioteca de Anuncios do Meta e clique no
echo   icone do Hunter X na barra de extensoes do Chrome.
echo.
echo   hunterx.site
echo  ================================================================
echo.
timeout /t 5 >nul
exit /b 0
