# Quick Start: Deploy Apps Script (5 Minutes)

This guide will help you deploy the Google Apps Script so your admin panel can automatically save products to Google Sheets.

## Step 1: Open Apps Script Editor

1. Go to your Google Sheet: https://docs.google.com/spreadsheets/d/1A4s3oVEamoZJxE-lDl9mDuT2iZhrQTueWu2VtrWwro8/edit
2. Click **Extensions** → **Apps Script**
3. A new tab will open with the script editor

## Step 2: Paste the Script Code

1. In the script editor, you'll see a file called `Code.gs`
2. **Delete all existing code** in `Code.gs`
3. Open the file `scripts/Code.gs` from your project
4. **Copy ALL the code** from `scripts/Code.gs`
5. **Paste it** into the Apps Script editor
6. Click the **💾 Save** icon (or Ctrl+S)
7. Name it: **Product Manager**

## Step 3: Deploy as Web App

1. Click the **Deploy** button (top right)
2. Select **New deployment**
3. Click the ⚙️ gear icon next to "Select type"
4. Choose **Web app**
5. Fill in the settings:
   - **Description:** Product API
   - **Execute as:** Me (your email address)
   - **Who has access:** Anyone
6. Click **Deploy**

## Step 4: Authorize the Script

⚠️ **IMPORTANT:** Google will ask for permissions

1. A popup will appear asking you to authorize
2. Click **Review permissions**
3. Select your Google account
4. You'll see a warning: "Google hasn't verified this app"
5. Click **Advanced**
6. Click **Go to Product Manager (unsafe)**
7. Click **Allow**

This is safe - you're authorizing YOUR OWN script to access YOUR OWN spreadsheet.

## Step 5: Copy the Web App URL

1. After deployment, you'll see a **Web app URL**
2. It looks like: `https://script.google.com/macros/s/AKfycby.../exec`
3. **Click the copy icon** 📋 to copy the URL
4. Click **Done**

## Step 6: Add URL to Config

1. Open `js/config.js` in your project
2. Find the line: `appsScriptUrl: ''`
3. Paste your URL inside the quotes:
   ```javascript
   appsScriptUrl: 'https://script.google.com/macros/s/AKfycby.../exec'
   ```
4. Save the file

## Step 7: Test It!

1. Commit and push your changes to GitHub
2. Open your admin panel: https://coolcoder375.github.io/devpooja/pages/admin.html
3. Login with admin/admin123
4. Click **Products** tab
5. Click **+ Add New Product**
6. Fill in the form and upload an image
7. Click **Save Product**
8. Check your Google Sheet - the product should appear! 🎉

## Verification

✅ **Success indicators:**
- "Product added successfully!" message appears
- New row appears in Google Sheet within 2-3 seconds
- Product appears on your website when you refresh

❌ **If it doesn't work:**
- Check browser console (F12) for errors
- Verify the Apps Script URL in config.js is correct
- Make sure you authorized the script (Step 4)
- Check Apps Script execution logs (View → Executions)

## Troubleshooting

### "Apps Script URL not configured"
- You didn't add the URL to config.js
- Add it and push to GitHub

### "Authorization required"
- You didn't complete Step 4
- Go back to Apps Script and re-deploy

### Products don't appear in sheet
- Wait 3-5 seconds and refresh the sheet
- Check Apps Script execution logs for errors
- Make sure "Who has access" is set to "Anyone"

## What Happens Now?

✅ **Add Product** → Automatically saves to Google Sheet
✅ **Edit Product** → Automatically updates Google Sheet
✅ **Delete Product** → Automatically removes from Google Sheet
✅ **Products** → Automatically appear on website

No more manual updates needed!

---

**Time to complete:** 5-10 minutes
**Difficulty:** Easy (copy-paste)
**Status:** Ready to deploy
