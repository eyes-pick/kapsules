@echo off
REM Build Kapsules Docker Images for Windows

echo 🐳 Building Kapsules Docker Images...

REM Build main application
echo 📦 Building main application...
docker build -t kapsules/app:latest -f Dockerfile .
if %ERRORLEVEL% neq 0 (
    echo ❌ Failed to build main application
    exit /b 1
)

REM Build template base image
echo 📦 Building template base image...
docker build -t kapsules/vite-template:latest -f templates/default/Dockerfile templates/default
if %ERRORLEVEL% neq 0 (
    echo ❌ Failed to build template base image
    exit /b 1
)

REM Build development image
echo 📦 Building development image...
docker build -t kapsules/app:dev -f Dockerfile.dev .
if %ERRORLEVEL% neq 0 (
    echo ❌ Failed to build development image
    exit /b 1
)

echo ✅ All images built successfully!

REM List built images
echo 📋 Built images:
docker images | findstr kapsules

echo 🚀 You can now run with:
echo   Production: docker-compose up
echo   Development: docker-compose -f docker-compose.dev.yml up
