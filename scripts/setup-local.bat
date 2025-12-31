@echo off
REM =============================================================================
REM Thorpe IQ Test - Local Development Setup for Windows
REM =============================================================================
REM Run this after cloning the repository from GitHub
REM 
REM Prerequisites:
REM - Git installed and repository cloned
REM - Node.js and npm installed
REM
REM Usage: Double-click this file or run from command prompt
REM =============================================================================

echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║           Thorpe IQ Test - Local Development Setup            ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.

REM Check for Node.js
echo Checking prerequisites...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed.
    echo Please download and install from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo [OK] Node.js %NODE_VERSION% found

where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: npm is not installed.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo [OK] npm %NPM_VERSION% found
echo.

REM Install dependencies
echo Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║                    Setup Complete!                             ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.
echo You can now:
echo   1. Run 'npm run dev' to start the development server
echo   2. Run 'build-android.bat' to build for Android
echo.
echo To connect to GitHub:
echo   - This is done through Lovable's web interface
echo   - Go to your project in Lovable
echo   - Click GitHub - Connect to GitHub
echo.
pause
