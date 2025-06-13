#!/bin/bash

# Script to start Docker/Colima for Jenkins builds
echo "Checking Docker status..."

# Check if Docker is running
if docker info &> /dev/null; then
    echo "Docker is already running"
    docker version
    exit 0
fi

echo "Docker is not running. Checking for Colima..."

# Check if colima is available
if command -v colima &> /dev/null; then
    echo "Starting Colima..."
    colima start
    
    # Wait for Docker to be ready
    echo "Waiting for Docker to be ready..."
    sleep 10
    
    # Check if Docker is now running
    if docker info &> /dev/null; then
        echo "Docker is now running successfully"
        docker version
        exit 0
    else
        echo "Failed to start Docker with Colima"
        exit 1
    fi
else
    echo "Colima not found. Please install it with:"
    echo "brew install colima"
    echo "Then run: colima start"
    exit 1
fi 