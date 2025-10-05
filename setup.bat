@echo off
echo.
echo ================================================
echo   Animated Resume Website - Next.js Setup
echo ================================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js 18.0 or higher from https://nodejs.org
    echo.
    pause
    exit /b 1
)

echo [1/4] Node.js detected: 
node --version

REM Check npm version
echo [2/4] npm detected:
npm --version

echo.
echo [3/4] Installing dependencies...
echo This may take a few minutes...
echo.

npm install

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to install dependencies!
    echo Please check your internet connection and try again.
    pause
    exit /b 1
)

echo.
echo ================================================
echo   Installation Complete!
echo ================================================
echo.
echo Next steps:
echo.
echo 1. Customize your resume data in: data\resume-data.ts
echo 2. Add your images to: public\images\
echo 3. Update colors in: styles\globals.css
echo 4. Start development server: npm run dev
echo.
echo To start the development server now, press any key...
pause >nul

echo.
echo Starting development server...
echo Open your browser to: http://localhost:3000
echo Press Ctrl+C to stop the server
echo.

npm run dev
