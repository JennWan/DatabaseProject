@echo off
cd %~dp0
echo Please enter the absolute path to the Oracle Instant Client directory:
set /p oraclePath=C:\Users\jenni\IdeaProjects\project_a8t6b_b7a5y_f9p0l\instantclient_19_20

:: Construct the local start script
(
echo @echo off
echo.
echo :: Change to the directory where the script is located
echo cd %%~dp0
echo.
echo :: Configure the oracle instant client env variable
echo set PATH=%%PATH%%;"%oraclePath%"
echo.
echo :: Start Node application
echo node server.js
echo.
echo exit /b 0
) > ..\..\local-start.cmd

echo --------------------------------------------------------------------------
echo Setup complete. Run 'local-start.cmd' in your project folder to start your Node.js application.
echo --------------------------------------------------------------------------
pause
