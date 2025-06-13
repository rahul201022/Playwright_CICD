#!/bin/bash

# Set up environment for Jenkins to use Docker with Colima
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
export DOCKER_HOST="unix:///Users/rahulm/.colima/default/docker.sock"

echo "Setting up Docker environment for Jenkins..."
echo "PATH: $PATH"
echo "DOCKER_HOST: $DOCKER_HOST"

# Check if Docker is available
if [ -f "/opt/homebrew/bin/docker" ]; then
    echo "✅ Docker found at /opt/homebrew/bin/docker"
    /opt/homebrew/bin/docker --version
    
    # Check if Docker is running
    if /opt/homebrew/bin/docker info &> /dev/null; then
        echo "✅ Docker is running"
        echo "Docker context:"
        /opt/homebrew/bin/docker context ls
        echo "Docker info:"
        /opt/homebrew/bin/docker info | head -10
    else
        echo "❌ Docker is not running"
        echo "Please start Colima with: colima start"
        exit 1
    fi
else
    echo "❌ Docker not found at /opt/homebrew/bin/docker"
    echo "Please install Docker CLI: brew install docker"
    exit 1
fi

echo "✅ Docker environment is ready for Jenkins!" 