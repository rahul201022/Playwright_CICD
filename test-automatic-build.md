# Test Automatic Build

This file was created to test the automatic Jenkins build trigger.

The Jenkinsfile is configured to poll for changes every 5 minutes.
When this file is committed and pushed, Jenkins should automatically detect the change and start a new build within 5 minutes.

## How it works:
1. Jenkins polls the Git repository every 5 minutes
2. When it detects new commits, it automatically triggers a build
3. No webhook needed - works with localhost Jenkins

## Test Steps:
1. Commit this file
2. Push to GitHub
3. Wait up to 5 minutes
4. Check Jenkins for automatic build 