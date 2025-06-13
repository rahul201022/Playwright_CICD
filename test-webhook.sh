#!/bin/bash

# Test script to verify webhook setup
echo "Testing Jenkins Webhook Setup"
echo "=============================="

# Check if Jenkins is running
echo "1. Checking if Jenkins is running..."
if curl -s http://localhost:8080 > /dev/null; then
    echo "✅ Jenkins is running on localhost:8080"
else
    echo "❌ Jenkins is not running on localhost:8080"
    echo "Please start Jenkins first"
    exit 1
fi

# Check if webhook endpoint is accessible
echo "2. Checking webhook endpoint..."
if curl -s http://localhost:8080/github-webhook/ > /dev/null; then
    echo "✅ Webhook endpoint is accessible"
else
    echo "❌ Webhook endpoint is not accessible"
    echo "Make sure GitHub Integration plugin is installed"
fi

# Check if job exists
echo "3. Checking if Playwright_CICD job exists..."
if curl -s http://localhost:8080/job/Playwright_CICD/ > /dev/null; then
    echo "✅ Playwright_CICD job exists"
else
    echo "❌ Playwright_CICD job not found"
fi

echo ""
echo "Next steps:"
echo "1. Go to your GitHub repository: https://github.com/rahul201022/Playwright_CICD"
echo "2. Go to Settings > Webhooks"
echo "3. Add webhook with URL: http://localhost:8080/github-webhook/"
echo "4. Test with a small commit and push"
echo ""
echo "Alternative: Use polling (already configured in Jenkinsfile)"
echo "The job will check for changes every 5 minutes automatically" 