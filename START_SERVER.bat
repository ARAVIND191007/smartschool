@echo off
title Smart School Management System Server
echo ========================================================
echo   Starting Smart School Management System (Network Mode)
echo ========================================================
echo.

set PATH=C:\Program Files\nodejs;%PATH%

cd /d "%~dp0"

echo [1/2] Checking dependencies...
if not exist node_modules (
    echo Installing dependencies, please wait...
    call npm install
)

echo.
echo [2/2] Launching Next.js server on 0.0.0.0:3000 ...
echo.
echo Access URL (Local Laptop): http://localhost:3000
echo Access URL (Other Devices/Laptops): http://10.182.72.242:3000
echo.
echo Press Ctrl+C anytime to stop the server.
echo ========================================================
echo.

call npm run dev

pause
