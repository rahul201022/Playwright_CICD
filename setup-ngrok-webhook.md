# Setting up ngrok for GitHub Webhooks

## Problem
GitHub webhooks require a publicly accessible URL. `localhost:8080` is not accessible from GitHub's servers.

## Solution: Use ngrok

### Step 1: Install ngrok

```bash
# Install ngrok using Homebrew
brew install ngrok

# Or download from https://ngrok.com/download
```

### Step 2: Sign up for ngrok (Free)

1. Go to https://ngrok.com/
2. Sign up for a free account
3. Get your authtoken from the dashboard

### Step 3: Configure ngrok

```bash
# Authenticate ngrok with your token
ngrok config add-authtoken YOUR_AUTH_TOKEN

# Start ngrok tunnel to Jenkins
ngrok http 8080
```

### Step 4: Update GitHub Webhook

1. **Copy the ngrok URL** (e.g., `https://abc123.ngrok.io`)
2. **Go to your GitHub repository**: https://github.com/rahul201022/Playwright_CICD
3. **Go to Settings > Webhooks**
4. **Update the webhook URL** to: `https://abc123.ngrok.io/github-webhook/`
5. **Save the webhook**

### Step 5: Test the Webhook

1. **Make a small change** to your repository
2. **Commit and push** the changes
3. **Check Jenkins** - a new build should start automatically

## Alternative Solution 2: Use Polling (Already Configured)

Since you already have polling configured in your Jenkinsfile, you can use that instead:

### Current Configuration
Your Jenkinsfile already has:
```groovy
triggers {
    pollSCM('H/5 * * * *')  // Poll every 5 minutes
}
```

### How Polling Works
- Jenkins automatically checks for changes every 5 minutes
- No need for public URL
- Works with localhost Jenkins

### Test Polling
1. **Make a small change** to your repository
2. **Commit and push** the changes
3. **Wait up to 5 minutes** for Jenkins to detect changes
4. **Check Jenkins** - a new build should start

## Alternative Solution 3: Use GitHub Actions (Modern Approach)

Instead of Jenkins webhooks, you could use GitHub Actions:

### Create .github/workflows/jenkins.yml
```yaml
name: Trigger Jenkins Build

on:
  push:
    branches: [ main ]

jobs:
  trigger-jenkins:
    runs-on: ubuntu-latest
    steps:
    - name: Trigger Jenkins Build
      run: |
        curl -X POST http://localhost:8080/job/Playwright_CICD/build \
          --user ${{ secrets.JENKINS_USER }}:${{ secrets.JENKINS_TOKEN }}
```

## Quick Fix: Use Polling for Now

Since you already have polling configured, you can:

1. **Remove the webhook** from GitHub (it's not working anyway)
2. **Rely on polling** - Jenkins will check every 5 minutes
3. **Test it** by making a small change and waiting up to 5 minutes

## Testing Your Current Setup

1. **Make a small change** to any file in your repository
2. **Commit and push**:
   ```bash
   git add .
   git commit -m "Test automatic build trigger"
   git push
   ```
3. **Wait up to 5 minutes**
4. **Check Jenkins** - a new build should start automatically

## Troubleshooting

### If polling doesn't work:
1. **Check Jenkins job configuration**:
   - Go to your job > Configure
   - Verify "Poll SCM" is checked
   - Check the schedule: `H/5 * * * *`

2. **Check Jenkins logs**:
   - Go to Manage Jenkins > System Log
   - Look for SCM polling messages

3. **Test manually**:
   - Go to your job
   - Click "Build Now" to ensure it works manually

### If ngrok doesn't work:
1. **Check ngrok is running**: `ngrok http 8080`
2. **Verify the URL** is accessible in browser
3. **Check ngrok logs** for any errors

## Recommendation

For your current setup, I recommend:
1. **Use polling** (already configured) - it's simpler and works with localhost
2. **Test it** with a small code change
3. **Consider ngrok** only if you need immediate triggers

The polling approach will work perfectly for your needs and doesn't require any additional setup! 