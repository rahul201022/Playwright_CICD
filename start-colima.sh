#!/bin/bash

echo "Starting Colima container runtime..."
colima start

echo "Verifying Docker is working..."
if docker info &> /dev/null; then
    echo "✅ Docker is running successfully!"
    echo "Docker version: $(docker --version)"
    echo "Docker context: $(docker context ls | grep '*' | awk '{print $1}')"
else
    echo "❌ Docker is not working. Please check Colima status."
    exit 1
fi

echo "Ready to run Jenkins pipeline!" 