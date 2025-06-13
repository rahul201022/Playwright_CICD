# Jenkins Email Setup Guide

## Current Issue: Email Connection Error

The error "Connection error sending email, retrying once more in 10 seconds..." indicates that Jenkins cannot connect to the SMTP server. This is because the email configuration still has placeholder values.

## Step-by-Step Email Configuration

### 1. Access Jenkins Email Configuration

1. Go to **Manage Jenkins** > **Configure System**
2. Scroll down to find **Extended E-mail Notification** section
3. If you don't see this section, install the **Email Extension Plugin** first

### 2. Configure SMTP Settings

#### Option A: Using Gmail SMTP (Recommended)
```
SMTP server: smtp.gmail.com
Default user e-mail suffix: @gmail.com
SMTP Port: 587
Use SMTP Authentication: ✅ Checked
User Name: your-gmail@gmail.com
Password: your-gmail-app-password
Use SSL: ❌ Unchecked
Use TLS: ✅ Checked
```

#### Option B: Using York.ie SMTP (if available)
```
SMTP server: smtp.york.ie (or your organization's SMTP server)
Default user e-mail suffix: @york.ie
SMTP Port: 587 (or 465 for SSL)
Use SMTP Authentication: ✅ Checked
User Name: rahulm@york.ie
Password: your-york-password
Use SSL: ❌ Unchecked (or ✅ if using port 465)
Use TLS: ✅ Checked
```

### 3. Gmail App Password Setup

If using Gmail SMTP:

1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to **Security**
3. Enable **2-Step Verification** if not already enabled
4. Go to **App passwords**
5. Select "Mail" as the app and "Other" as the device
6. Generate the app password
7. Use this password in Jenkins (NOT your regular Gmail password)

### 4. Test Email Configuration

1. In the same email configuration page, click **Test configuration by sending test e-mail**
2. Enter your email address: `rahulm@york.ie`
3. Click **Test configuration**
4. Check if you receive the test email

### 5. Alternative Email Configuration

If you continue to have issues, try these alternative settings:

#### Option 1: Gmail with SSL
```
SMTP server: smtp.gmail.com
SMTP Port: 465
Use SSL: ✅ Checked
Use TLS: ❌ Unchecked
```

#### Option 2: Basic Email Plugin
If the Extended Email Plugin continues to fail, try using the basic email plugin:

```groovy
post {
    failure {
        mail to: 'rahulm@york.ie',
             subject: "Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
             body: "Build failed. Check: ${env.BUILD_URL}"
    }
}
```

### 6. Troubleshooting Email Issues

#### Common Error Messages and Solutions:

1. **"Connection error sending email"**
   - Check SMTP server address and port
   - Verify internet connectivity
   - Check firewall settings

2. **"Authentication failed"**
   - Use App Password for Gmail (not regular password)
   - Verify username and password
   - Check if 2FA is enabled for Gmail

3. **"Connection timeout"**
   - Try different SMTP ports (587, 465, 25)
   - Check if your network blocks SMTP traffic
   - Try using a different SMTP server

### 7. Current Configuration Issues

Your current `jenkins-email-config.xml` has these problems:
- `smtpUsername` is set to `your-email@gmail.com` (placeholder)
- `smtpPassword` is set to `your-app-password` (placeholder)
- You're trying to send to `rahulm@york.ie` but using Gmail SMTP

### 8. Recommended Fix

Since you're sending to `rahulm@york.ie`, you have two options:

#### Option A: Use York.ie SMTP (if available)
1. Contact your IT department for York.ie SMTP settings
2. Update Jenkins with the correct SMTP server details

#### Option B: Use Gmail SMTP with your Gmail account
1. Update the SMTP username to your actual Gmail address
2. Generate and use a Gmail App Password
3. Keep sending to `rahulm@york.ie` (this will work)

### 9. Quick Test

To test if email is working after configuration:

1. Update the email settings in Jenkins
2. Test the configuration using the "Test configuration" button
3. If test email works, run your Jenkins build
4. Check if you receive the failure notification

### 10. Manual Email Configuration Update

If you need to manually update the configuration file, replace these lines in `jenkins-email-config.xml`:

```xml
<smtpUsername>your-actual-gmail@gmail.com</smtpUsername>
<smtpPassword>your-actual-app-password</smtpPassword>
```

Remember to restart Jenkins after making configuration file changes.

## Prerequisites
1. Jenkins server running
2. Gmail account (or other SMTP provider)
3. App password for Gmail (if using 2FA)

## Step 1: Install Email Extension Plugin

1. Go to Jenkins Dashboard
2. Navigate to **Manage Jenkins** > **Manage Plugins**
3. Go to **Available** tab
4. Search for "Email Extension Plugin"
5. Check the box and click **Install without restart**

## Step 2: Configure SMTP Settings

1. Go to **Manage Jenkins** > **Configure System**
2. Scroll down to **Extended E-mail Notification** section
3. Configure the following settings:

### Gmail Configuration (Fixed SSL/TLS Settings):
- **SMTP server**: `smtp.gmail.com`
- **Default user e-mail suffix**: `@gmail.com`
- **SMTP Port**: `587`
- **Use SMTP Authentication**: ✅ Checked
- **User Name**: `your-email@gmail.com`
- **Password**: `your-app-password` (not your regular Gmail password)
- **Use SSL**: ❌ **UNCHECKED** (Important!)
- **Use TLS**: ✅ **CHECKED** (Important!)
- **Charset**: `UTF-8`
- **Default Content Type**: `text/html`

### Alternative Gmail Configuration (Port 465):
If port 587 doesn't work, try:
- **SMTP server**: `smtp.gmail.com`
- **SMTP Port**: `465`
- **Use SSL**: ✅ **CHECKED**
- **Use TLS**: ❌ **UNCHECKED**

### For Gmail App Password:
1. Go to your Google Account settings
2. Navigate to **Security**
3. Enable **2-Step Verification** if not already enabled
4. Go to **App passwords**
5. Generate a new app password for "Mail"
6. Use this password in Jenkins (not your regular Gmail password)

## Step 3: Test Email Configuration

1. In the **Extended E-mail Notification** section, click **Test configuration by sending test e-mail**
2. Enter your email address: `rahulm@york.ie`
3. Click **Test configuration**
4. Check your email for the test message

## Step 4: Configure Default Recipients

1. In the same section, set **Default Recipients** to: `rahulm@york.ie`
2. Set **Default Subject** to: `Build Status: $PROJECT_NAME - Build #$BUILD_NUMBER - $BUILD_STATUS`
3. Set **Default Content** to:
```
Type: $BUILD_STATUS
Build URL: $BUILD_URL
Project: $PROJECT_NAME
Build Number: $BUILD_NUMBER
Build Log: $BUILD_URLconsole
Changes: $CHANGES
Failed Tests: $FAILED_TESTS
```

## Step 5: Save Configuration

1. Click **Save** at the bottom of the page
2. Restart Jenkins if prompted

## Step 6: Verify Pipeline Configuration

The Jenkinsfile is already configured with email notifications for:
- ✅ **Success**: Green email with build details and test report link
- ❌ **Failure**: Red email with build details and error information
- ⚠️ **Unstable**: Yellow email for partial failures

## Email Templates Used

### Success Email:
- Subject: "✅ Build Success: [Project] - Build #[Number]"
- Includes: Project name, build number, build URL, test report link

### Failure Email:
- Subject: "❌ Build Failed: [Project] - Build #[Number]"
- Includes: Project name, build number, build URL, error details

### Unstable Email:
- Subject: "⚠️ Build Unstable: [Project] - Build #[Number]"
- Includes: Project name, build number, build URL, warning details

## Troubleshooting

### Common Issues:

1. **SSL Exception "Unsupported or unrecognized SSL message"**:
   - ✅ **SOLUTION**: Use TLS instead of SSL
   - Set **Use SSL**: ❌ Unchecked
   - Set **Use TLS**: ✅ Checked
   - Port: `587`

2. **Authentication Failed**:
   - Make sure you're using an App Password, not your regular Gmail password
   - Enable 2-Step Verification in your Google Account

3. **Connection Timeout**:
   - Check your internet connection
   - Verify SMTP settings (smtp.gmail.com:587)
   - Try port 465 with SSL if 587 doesn't work

4. **Emails not received**:
   - Check spam folder
   - Verify email address is correct
   - Test configuration first

5. **Plugin not found**:
   - Restart Jenkins after installing the plugin
   - Check if plugin is properly installed

## Alternative SMTP Providers

### Outlook/Hotmail:
- SMTP Server: `smtp-mail.outlook.com`
- Port: `587`
- Use TLS: ✅ Checked
- Use SSL: ❌ Unchecked

### Yahoo:
- SMTP Server: `smtp.mail.yahoo.com`
- Port: `587`
- Use TLS: ✅ Checked
- Use SSL: ❌ Unchecked

### Custom SMTP:
- Use your organization's SMTP server
- Contact your IT department for settings

## Security Notes

1. **Never use your regular Gmail password**
2. **Use App Passwords for Gmail**
3. **Keep your Jenkins server secure**
4. **Consider using environment variables for sensitive data**

## Next Steps

1. Run a test build to verify email notifications work
2. Customize email templates as needed
3. Add more recipients if required
4. Set up different notification rules for different projects

## Quick Fix for SSL Error

If you're still getting SSL errors, try this exact configuration:

```
SMTP Server: smtp.gmail.com
Port: 587
Use SMTP Authentication: ✅
Username: your-email@gmail.com
Password: your-app-password
Use SSL: ❌ (Unchecked)
Use TLS: ✅ (Checked)
```

This should resolve the "Unsupported or unrecognized SSL message" error. 