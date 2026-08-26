@echo off
chcp 65001 >nul
cd /d "%~dp0"

set "PYTHON_EXE=C:\Users\dell\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"

echo.
echo 正在启动个人 IP 网站预览...
echo 这次使用无缓存预览服务，会自动打开最新页面。
echo.
echo 请保持这个窗口打开。关闭窗口后，本地预览服务也会停止。
echo.

if exist "%PYTHON_EXE%" (
  "%PYTHON_EXE%" "%~dp0preview-server.py"
) else (
  python "%~dp0preview-server.py"
)

echo.
echo 预览服务已停止。
pause
