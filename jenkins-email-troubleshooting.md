# Jenkins Email Notification Troubleshooting Guide

## Issue: Build Failure Emails Not Being Sent

### 1. Check Jenkins Email Configuration

#### Verify SMTP Settings in Jenkins:
1. Go to **Manage Jenkins** > **Configure System**
2. Find **Extended E-mail Notification** section
3. Verify these settings:
   - **SMTP server**: `smtp.gmail.com`
   - **Default user e-mail suffix**: `@gmail.com`
   - **SMTP Port**: `587`
   - **Use SMTP Authentication**: ✅ Checked
   - **User Name**: rahulm@york.ie
   - **Password**: lpya jgge imro csmf
   - **Use SSL**: ❌ Unchecked
   - **Use TLS**: ✅ Checked

#### Test Email Configuration:
1. In the same email configuration page, click **Test configuration by sending test e-mail**
2. Enter your email address and click **Test configuration**
3. Check if you receive the test email

### 2. Check Build Status

#### Verify Build Result:
- Go to your Jenkins job
- Check the build history
- Look at the build status (SUCCESS, FAILURE, UNSTABLE, ABORTED)
- The email will only be sent if the build status matches the post condition

#### Build Status Mapping:
- `success` post condition → Only triggers on SUCCESS builds
- `failure` post condition → Only triggers on FAILURE builds  
- `unstable` post condition → Only triggers on UNSTABLE builds

### 3. Check Jenkins Logs

#### View Build Console Output:
1. Go to your failed build
2. Click on **Console Output**
3. Look for these messages:
   - "Pipeline failed!"
   - "Sending failure email notification..."
   - Any email-related errors

#### Check Jenkins System Logs:
1. Go to **Manage Jenkins** > **System Log**
2. Look for email-related errors
3. Common errors:
   - SMTP authentication failed
   - Connection timeout
   - Invalid credentials

### 4. Gmail App Password Setup

#### If you haven't set up Gmail App Password:
1. Go to your Google Account settings
2. Navigate to **Security**
3. Enable **2-Step Verification** if not already enabled
4. Go to **App passwords**
5. Generate a new app password for "Mail"
6. Use this password in Jenkins SMTP configuration (not your regular Gmail password)

### 5. Common Issues and Solutions

#### Issue 1: "Authentication failed"
**Solution**: Use Gmail App Password instead of regular password

#### Issue 2: "Connection timeout"
**Solution**: 
- Check if port 587 is blocked by firewall
- Try using port 465 with SSL enabled
- Verify internet connectivity

#### Issue 3: "Build status not triggering email"
**Solution**: 
- Ensure the build actually failed (not just unstable)
- Check if the post condition matches the build status
- Verify the email address is correct

#### Issue 4: "Email sent but not received"
**Solution**:
- Check spam/junk folder
- Verify email address spelling
- Check Gmail filters

### 6. Debugging Steps

#### Step 1: Force a Build Failure
Add this to your Jenkinsfile to test email notifications:
```groovy
stage('Test Failure') {
    steps {
        script {
            error "This is a test failure to trigger email notification"
        }
    }
}
```

#### Step 2: Check Email Plugin
1. Go to **Manage Jenkins** > **Manage Plugins**
2. Verify **Email Extension Plugin** is installed and enabled
3. Check if there are any plugin updates available

#### Step 3: Verify Pipeline Syntax
1. Go to your job configuration
2. Click **Pipeline Syntax**
3. Verify the `emailext` step syntax is correct

### 7. Alternative Email Configuration

If the issue persists, try using the basic email plugin instead:

```groovy
post {
    failure {
        mail to: 'rahulm@york.ie',
             subject: "Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
             body: "Build failed. Check: ${env.BUILD_URL}"
    }
}
```

### 8. Contact Information

If you continue to have issues:
1. Check Jenkins community forums
2. Review the Email Extension Plugin documentation
3. Check your Jenkins version compatibility with the email plugin

### 9. Quick Checklist

- [ ] Gmail App Password is configured correctly
- [ ] SMTP settings are correct (smtp.gmail.com:587)
- [ ] TLS is enabled, SSL is disabled
- [ ] Email Extension Plugin is installed
- [ ] Build actually failed (not just unstable)
- [ ] Email address is correct
- [ ] Checked spam folder
- [ ] Jenkins logs show no email errors 