@echo off
start "Backend Server" cmd /k "node Backend\server.js"
start "Frontend Server" cmd /k "npm run dev"
echo Servers started...
