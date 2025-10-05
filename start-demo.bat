@echo off
echo.
echo ========================================
echo   Animated Resume Website - Local Demo
echo ========================================
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Starting local server with Python...
    echo Open your browser and go to: http://localhost:8000
    echo Press Ctrl+C to stop the server
    echo.
    python -m http.server 8000
    goto :end
)

REM Check if Node.js is available
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo Python not found. Checking for Node.js...
    
    REM Check if http-server is installed
    http-server --version >nul 2>&1
    if %errorlevel% == 0 (
        echo Starting local server with http-server...
        echo Open your browser and go to: http://localhost:8080
        echo Press Ctrl+C to stop the server
        echo.
        http-server -p 8080
        goto :end
    ) else (
        echo Installing http-server globally...
        npm install -g http-server
        if %errorlevel% == 0 (
            echo Starting local server with http-server...
            echo Open your browser and go to: http://localhost:8080
            echo Press Ctrl+C to stop the server
            echo.
            http-server -p 8080
            goto :end
        )
    )
)

REM Check if PHP is available
php --version >nul 2>&1
if %errorlevel% == 0 (
    echo Starting local server with PHP...
    echo Open your browser and go to: http://localhost:8000
    echo Press Ctrl+C to stop the server
    echo.
    php -S localhost:8000
    goto :end
)

REM If no server is available
echo.
echo ERROR: No suitable server found!
echo.
echo Please install one of the following:
echo   1. Python (recommended): https://python.org
echo   2. Node.js: https://nodejs.org
echo   3. PHP: https://php.net
echo.
echo Or use VS Code with Live Server extension:
echo   1. Install VS Code: https://code.visualstudio.com
echo   2. Install Live Server extension
echo   3. Right-click index.html and select "Open with Live Server"
echo.
echo Alternatively, you can deploy to:
echo   - GitHub Pages (free)
echo   - Netlify (free)
echo   - Vercel (free)
echo.

:end
pause