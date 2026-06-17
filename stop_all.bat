@echo off
title Остановка проекта

echo Останавливаю процессы...
for %%p in (8001 5174 8000 5173 8081 19000 3000) do (
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":%%p "') do (
        taskkill /F /PID %%a >nul 2>&1
    )
)
echo Готово.
echo.
pause
