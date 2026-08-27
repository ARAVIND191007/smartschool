@echo off
title Smart School Management System (Offline App)
echo ====================================================================
echo   SMART SCHOOL MANAGEMENT PLATFORM -- OFFLINE EXECUTABLE LAUNCHER
echo ====================================================================
echo.
echo Launching Smart School Management Platform...
echo No internet connection required!
echo.

set PATH=C:\Program Files\nodejs;%PATH%
cd /d "%~dp0"

echo Opening browser at http://localhost:3000 ...
start http://localhost:3000

echo.
echo Server is running offline!
echo Keep this window open while using the application.
echo.
echo Press Ctrl+C in this window anytime to exit.
echo ====================================================================
echo.

if exist .next (
    call npm run start
) else (
    call npm run dev
)

pause
