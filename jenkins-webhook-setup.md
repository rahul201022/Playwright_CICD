# Jenkins Automatic Build Setup Guide

## Overview
Set up Jenkins to automatically trigger builds when new changes are pushed to your Git repository.

## Option 1: GitHub Webhook (Recommended)

### Step 1: Configure Jenkins Job for Webhook

1. **Go to your Jenkins job**: `Playwright_CICD`
2. **Click "Configure"**
3. **In the "Build Triggers" section**, check:
   - ✅ **"GitHub hook trigger for GITScm polling"**
4. **Save the configuration**

### Step 2: Configure GitHub Webhook

1. **Go to your GitHub repository**: `https://github.com/rahul201022/Playwright_CICD`
2. **Click "Settings"** tab
3. **Click "Webhooks"** in the left sidebar
4. **Click "Add webhook"**
5. **Configure the webhook**:
   - **Payload URL**: `http://localhost:8080/github-webhook/`
   - **Content type**: `application/json`
   - **Secret**: (leave empty for now)
   - **Which events**: Select "Just the push event"
6. **Click "Add webhook"**

### Step 3: Configure Jenkins for GitHub Integration

1. **In Jenkins**, go to **Manage Jenkins** > **Configure System**
2. **Find "GitHub" section**
3. **Add GitHub Server**:
   - **Name**: `GitHub`
   - **API URL**: `https://api.github.com`
   - **Credentials**: Add your GitHub credentials (if needed)
4. **Save**

## Option 2: Polling SCM (Alternative)

If webhook doesn't work, use polling:

### Step 1: Configure Polling

1. **Go to your Jenkins job**: `Playwright_CICD`
2. **Click "Configure"**
3. **In the "Build Triggers" section**, check:
   - ✅ **"Poll SCM"**
   - **Schedule**: `H/5 * * * *` (checks every 5 minutes)
4. **Save the configuration**

### Polling Schedule Examples:
- `H/5 * * * *` - Every 5 minutes
- `H/2 * * * *` - Every 2 minutes
- `H/1 * * * *` - Every minute
- `*/15 * * * *` - Every 15 minutes

## Option 3: GitHub Plugin (Most Comprehensive)

### Step 1: Install GitHub Plugin

1. **Go to Manage Jenkins** > **Manage Plugins**
2. **Available** tab
3. **Search for "GitHub Integration"**
4. **Install without restart**

### Step 2: Configure GitHub Integration

1. **Go to Manage Jenkins** > **Configure System**
2. **Find "GitHub" section**
3. **Add GitHub Server**:
   - **Name**: `GitHub`
   - **API URL**: `https://api.github.com`
   - **Credentials**: Add GitHub credentials
4. **Save**

### Step 3: Configure Job

1. **Go to your job configuration**
2. **In "Build Triggers"**, check:
   - ✅ **"GitHub hook trigger for GITScm polling"**
3. **Save**

## Testing the Setup

### Test Webhook:
1. **Make a small change** to your repository
2. **Commit and push** the changes
3. **Check Jenkins** - a new build should start automatically
4. **Check GitHub webhook** - go to Settings > Webhooks and see delivery status

### Test Polling:
1. **Make a small change** to your repository
2. **Commit and push** the changes
3. **Wait for the polling interval** (e.g., 5 minutes)
4. **Check Jenkins** - a new build should start

## Troubleshooting

### Webhook Issues:
1. **Check webhook delivery** in GitHub Settings > Webhooks
2. **Verify Jenkins URL** is accessible from GitHub
3. **Check Jenkins logs** for webhook errors
4. **Ensure Jenkins is running** and accessible

### Polling Issues:
1. **Check polling schedule** syntax
2. **Verify repository access** from Jenkins
3. **Check SCM polling logs** in Jenkins

### Common Problems:
1. **Jenkins not accessible**: Make sure Jenkins is running on `localhost:8080`
2. **Webhook not delivered**: Check if GitHub can reach your Jenkins instance
3. **Authentication issues**: Ensure Jenkins has access to your repository

## Advanced Configuration

### Branch-Specific Triggers:
```groovy
// In Jenkinsfile, add branch-specific logic
pipeline {
    agent any
    
    triggers {
        pollSCM('H/5 * * * *')
    }
    
    stages {
        stage('Check Branch') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'main') {
                        echo "Building main branch"
                    } else {
                        echo "Skipping non-main branch: ${env.BRANCH_NAME}"
                        currentBuild.result = 'ABORTED'
                    }
                }
            }
        }
        // ... rest of your stages
    }
}
```

### Conditional Builds:
```groovy
// Only build on specific file changes
pipeline {
    agent any
    
    triggers {
        pollSCM('H/5 * * * *')
    }
    
    stages {
        stage('Check Changes') {
            steps {
                script {
                    def changes = sh(script: 'git diff --name-only HEAD~1', returnStdout: true).trim()
                    if (!changes.contains('Jenkinsfile') && !changes.contains('tests/')) {
                        echo "No relevant changes, skipping build"
                        currentBuild.result = 'ABORTED'
                    }
                }
            }
        }
        // ... rest of your stages
    }
}
```

## Security Considerations

### For Production:
1. **Use HTTPS** for Jenkins
2. **Add webhook secrets** for security
3. **Restrict webhook access** to specific IPs
4. **Use GitHub tokens** instead of passwords

### Webhook Secret Setup:
1. **Generate a secret** (random string)
2. **Add it to GitHub webhook** configuration
3. **Configure Jenkins** to validate the secret

## Quick Setup Checklist

- [ ] Install GitHub Integration plugin
- [ ] Configure GitHub webhook in repository
- [ ] Enable webhook trigger in Jenkins job
- [ ] Test with a small code change
- [ ] Verify automatic build triggers
- [ ] Check email notifications work

## Next Steps

1. **Choose your preferred method** (webhook recommended)
2. **Follow the setup steps** above
3. **Test with a small change** to your repository
4. **Monitor the first few automatic builds**
5. **Adjust polling schedule** if needed 