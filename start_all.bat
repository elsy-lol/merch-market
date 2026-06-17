@echo off
title Запуск проекта — Sticker Merch + Street Player
cd /d "%~dp0"

echo ===== Запуск всех сервисов =====
echo.

:: Kill old processes
for %%p in (8001 5174 8081 19000) do (
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":%%p "') do (
        taskkill /F /PID %%a >nul 2>&1
    )
)

:: Start Backend
echo  [1/3] Backend   http://localhost:8001
start "Backend" cmd /c "run_backend.bat"
timeout /t 2 /nobreak >nul

:: Start Frontend
echo  [2/3] Frontend  http://localhost:5174
start "Frontend" cmd /c "run_frontend.bat"
timeout /t 2 /nobreak >nul

:: Start Mobile
echo  [3/3] Mobile    http://localhost:8081
start "Mobile" cmd /c "run_mobile.bat"

echo.
echo Каждый сервис в отдельном окне.
echo Закрывайте окна или закройте это окно и запустите: stop_all.bat
echo.
