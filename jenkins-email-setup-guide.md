# Jenkins Email Notification Setup Guide

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