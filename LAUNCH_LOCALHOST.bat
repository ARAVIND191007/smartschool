@echo off
title Launch Smart School Localhost
echo ==========================================
echo   Opening Smart School on http://localhost:3000
echo ==========================================
echo.

set PATH=C:\Program Files\nodejs;%PATH%
cd /d "C:\Users\aravi\.gemini\antigravity\scratch\smart-school"

start http://localhost:3000

echo Server check...
curl -s http://localhost:3000 >nul
if %errorlevel% neq 0 (
    echo Server is starting, please wait a moment...
    call npm run dev
) else (
    echo Server is already active and running!
)

pause
