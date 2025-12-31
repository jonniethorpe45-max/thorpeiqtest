@echo off
REM =============================================================================
REM Thorpe IQ Test - Android Build Script for Play Store Submission
REM =============================================================================
REM This script automates the process of building the Android app
REM 
REM Prerequisites:
REM - Windows OS
REM - Node.js and npm installed
REM - Android Studio installed
REM - Git installed
REM
REM Usage: Double-click this file or run from command prompt
REM =============================================================================

echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║        Thorpe IQ Test - Android Build for Play Store          ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.

REM Check for Node.js
echo Checking prerequisites...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed. Please install it first.
    echo Visit: https://nodejs.org/
    pause
    exit /b 1
)

where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: npm is not installed. Please install Node.js which includes npm.
    pause
    exit /b 1
)

echo [OK] All prerequisites found
echo.

REM Step 1: Install dependencies
echo Step 1: Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

REM Step 2: Build the web app
echo.
echo Step 2: Building the web app...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to build the web app
    pause
    exit /b 1
)

REM Step 3: Add Android platform if not exists
echo.
echo Step 3: Setting up Android platform...
if not exist "android" (
    echo Adding Android platform...
    call npx cap add android
) else (
    echo Android platform already exists
)

REM Step 4: Update Android dependencies
echo.
echo Step 4: Updating Android dependencies...
call npx cap update android

REM Step 5: Sync the project
echo.
echo Step 5: Syncing Capacitor...
call npx cap sync android

REM Step 6: Open Android Studio
echo.
echo Step 6: Opening Android Studio...
echo.
echo ═══════════════════════════════════════════════════════════════
echo                  NEXT STEPS IN ANDROID STUDIO                  
echo ═══════════════════════════════════════════════════════════════
echo.
echo 1. Wait for Gradle sync to complete
echo 2. Go to Build - Generate Signed Bundle / APK
echo 3. Select 'Android App Bundle' for Play Store
echo 4. Create or select your keystore
echo 5. Choose 'release' build variant
echo 6. Upload the .aab file to Google Play Console
echo.
echo Opening Android Studio now...

call npx cap open android

echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║                  Build process complete!                       ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.
pause
