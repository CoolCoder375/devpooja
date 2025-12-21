# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration for managing your DevPooja product catalog.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Get Google API Key](#step-1-get-google-api-key)
3. [Step 2: Create Your Google Sheet](#step-2-create-your-google-sheet)
4. [Step 3: Configure the Website](#step-3-configure-the-website)
5. [Step 4: Test the Integration](#step-4-test-the-integration)
6. [Managing Products](#managing-products)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- A Google account
- Basic knowledge of using Google Sheets
- Access to your website files

---

## Step 1: Get Google API Key

### 1.1 Access Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Sign in with your Google account

### 1.2 Create or Select a Project

1. Click on the project dropdown at the top of the page
2. Click **"New Project"**
3. Enter a project name (e.g., "DevPooja Website")
4. Click **"Create"**
5. Wait for the project to be created (this may take a few seconds)

### 1.3 Enable Google Sheets API

1. In the left sidebar, navigate to **"APIs & Services"** > **"Library"**
2. In the search box, type "Google Sheets API"
3. Click on **"Google Sheets API"** from the results
4. Click the **"Enable"** button
5. Wait for the API to be enabled

### 1.4 Create API Key

1. Go to **"APIs & Services"** > **"Credentials"**
2. Click **"Create Credentials"** at the top
3. Select **"API Key"** from the dropdown
4. Your API key will be created and displayed in a popup
5. **IMPORTANT:** Copy this key and save it somewhere safe

### 1.5 Restrict API Key (Security Best Practice)

1. In the API key popup, click **"Edit API key"** or click on the key name in the credentials list
2. Under **"API restrictions"**:
   - Select **"Restrict key"**
   - Check **only** "Google Sheets API"
3. Under **"Application restrictions"** (optional but recommended):
   - Select **"HTTP referrers (web sites)"**
   - Click **"Add an item"**
   - Enter your website domain (e.g., `yourdomain.com/*`)
   - If testing locally, also add: `localhost/*` and `127.0.0.1/*`
4. Click **"Save"**

**Your API Key is now ready to use!**

---

## Step 2: Create Your Google Sheet

### 2.1 Create a New Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click the **"+"** button to create a new spreadsheet
3. Name your spreadsheet (e.g., "DevPooja Products")

### 2.2 Set Up Column Headers

In **Row 1**, enter the following headers in order:

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| id | name | category | price | image | description | features | quantity |

**Column Definitions:**

- **id**: Unique number for each product (1, 2, 3, ...)
- **name**: Product name (e.g., "Sandalwood Incense Sticks")
- **category**: Category key - must be one of:
  - `incense`
  - `garlands`
  - `idols`
  - `diyas`
  - `pooja-items`
  - `coconuts`
- **price**: Product price (numbers only, no ₹ symbol)
- **image**: Full image URL (must be publicly accessible)
- **description**: Product description text
- **features**: Pipe-separated features (e.g., "100% Natural|Long burning|Export quality")
- **quantity**: Stock quantity (number)

### 2.3 Add Sample Product Data

Starting from **Row 2**, add your products. Here's an example:

| id | name | category | price | image | description | features | quantity |
|----|------|----------|-------|-------|-------------|----------|----------|
| 1 | Sandalwood Incense Sticks | incense | 199 | https://example.com/image1.jpg | Premium sandalwood incense... | 100% Natural\|Long burning\|Export quality | 100 |
| 2 | Fresh Marigold Garlands | garlands | 150 | https://example.com/image2.jpg | Fresh marigold flower garland... | Fresh flowers\|2 meter length | 75 |

**Important Notes:**

- Features must be separated by the **pipe character** `|` (not commas)
- Image URLs must be publicly accessible
- Don't use currency symbols in the price column
- Category names must exactly match the keys listed above (lowercase, with hyphens)

### 2.4 Add Data Validation (Optional but Recommended)

To prevent typos in the category column:

1. Select the entire **Category column** (column C, from C2 downwards)
2. Go to **Data** > **Data validation**
3. Under "Criteria", select **"List of items"**
4. Enter: `incense,garlands,idols,diyas,pooja-items,coconuts`
5. Check **"Show dropdown list in cell"**
6. Click **"Save"**

Now you'll have a dropdown for category selection!

### 2.5 Share Your Sheet

**CRITICAL STEP** - Your sheet must be publicly accessible:

1. Click the **"Share"** button in the top right
2. Under **"General access"**, click **"Restricted"**
3. Select **"Anyone with the link"**
4. Set permission to **"Viewer"** (read-only)
5. Click **"Done"**

### 2.6 Get Your Spreadsheet ID

1. Look at the URL of your Google Sheet:
   ```
   https://docs.google.com/spreadsheets/d/1ABC...XYZ123/edit
   ```
2. The Spreadsheet ID is the long string between `/d/` and `/edit`
   ```
   1ABC...XYZ123
   ```
3. Copy this ID - you'll need it in the next step

---

## Step 3: Configure the Website

### 3.1 Locate the Configuration File

In your website files, navigate to:
```
js/config.js
```

### 3.2 Update Configuration

Open `js/config.js` and replace the placeholder values:

```javascript
const SHEETS_CONFIG = {
    // Paste your API key from Step 1
    apiKey: 'AIzaSy..._YOUR_ACTUAL_KEY_HERE',

    // Paste your Spreadsheet ID from Step 2
    spreadsheetId: '1ABC..._YOUR_ACTUAL_ID_HERE',

    // Leave this as is (unless you changed the sheet structure)
    range: 'Products!A2:H'
};
```

### 3.3 Save the File

Save `js/config.js` with your actual credentials.

**SECURITY NOTE:** Never commit this file to a public repository! It's already in `.gitignore`.

---

## Step 4: Test the Integration

### 4.1 Open Your Website

1. Open your website in a web browser
2. Navigate to the homepage or products page

### 4.2 Check the Browser Console

1. Press **F12** to open Developer Tools
2. Go to the **"Console"** tab
3. Look for messages like:
   ```
   [DevPooja Products] Successfully loaded 6 products from Google Sheets
   ```

### 4.3 Verify Products Display

- Products should be visible on the homepage
- Products page should show all items
- Category filtering should work

### 4.4 Test the Fallback

To verify the fallback works:

1. Temporarily change the API key in `config.js` to something invalid
2. Refresh the page
3. Check console for:
   ```
   [DevPooja Products] Google Sheets API failed: API key invalid...
   [DevPooja Products] Successfully loaded 6 products from JSON fallback
   ```
4. Products should still display (from products.json)
5. Restore your correct API key

**If you see "Successfully loaded from Google Sheets" - You're all set!** 🎉

---

## Managing Products

### Adding a New Product

1. Open your Google Sheet
2. Add a new row with product details
3. Fill all columns (id, name, category, price, image, description, features, quantity)
4. Save (automatic in Google Sheets)
5. Wait up to 5 minutes for cache to expire
6. Refresh your website to see the new product

### Editing a Product

1. Find the product row in your Google Sheet
2. Edit any field
3. Changes will appear on website within 5 minutes (cache duration)

### Removing a Product

1. Delete the product row in your Google Sheet
2. Changes will appear on website within 5 minutes

### Bulk Updates

You can:
- Copy/paste multiple products from Excel or CSV
- Use Google Sheets formulas for calculations
- Import from other spreadsheets

---

## Troubleshooting

### Products Not Loading

**Symptom:** Blank product grid, console shows errors

**Possible Causes & Solutions:**

1. **API Key Issues**
   - Check if API key is correct in `config.js`
   - Verify Google Sheets API is enabled in Cloud Console
   - Check API key restrictions (should allow Sheets API)

2. **Spreadsheet Not Found (404)**
   - Verify Spreadsheet ID is correct
   - Ensure sheet is shared as "Anyone with the link can view"

3. **CORS Errors**
   - Check HTTP referrer restrictions in API key settings
   - Add your domain to allowed referrers

4. **Empty Response**
   - Make sure your sheet has data in rows (not just headers)
   - Verify sheet name is "Products" (or update `range` in config)

### Products Show from JSON Instead of Sheets

**Symptom:** Console shows "Loaded from JSON fallback"

This means Google Sheets API failed and fallback activated. Check:

1. API key is valid
2. Spreadsheet is publicly shared
3. No quota limits reached (check Cloud Console quotas)

### Old Products Still Showing

**Symptom:** Changes in Sheet not appearing on website

**Cause:** Browser cache (5-minute duration)

**Solutions:**

1. **Wait:** Changes appear automatically after 5 minutes
2. **Clear cache manually:**
   - Open browser console (F12)
   - Run: `localStorage.removeItem('devpooja_products_cache')`
   - Refresh page

### Features Not Displaying Correctly

**Symptom:** Features appear as one long string

**Cause:** Not using pipe separator

**Solution:** In Google Sheets, separate features with `|` character:
```
Correct: Feature 1|Feature 2|Feature 3
Wrong:   Feature 1, Feature 2, Feature 3
```

### Quota Exceeded Error

**Symptom:** Console shows "API quota exceeded"

**Cause:** Too many API requests

**Solution:**

- The 5-minute cache prevents this for normal usage
- Check Cloud Console for quota limits
- Quotas reset daily
- For high-traffic sites, consider increasing cache duration

### Images Not Displaying

**Possible Causes:**

1. **Image URLs are not publicly accessible**
   - Use image hosting services (Imgur, Cloudinary, etc.)
   - Or use Google Drive with public sharing

2. **Invalid URLs**
   - Verify URLs start with `http://` or `https://`
   - Test URL by opening in browser

**Google Drive Image URLs:**

If using Google Drive:

1. Upload image to Google Drive
2. Right-click > Share > "Anyone with the link"
3. Right-click > Get link
4. The link format is: `https://drive.google.com/file/d/FILE_ID/view`
5. Convert to direct link: `https://drive.google.com/uc?export=view&id=FILE_ID`
6. Use this converted URL in your sheet

---

## Advanced: Increase Cache Duration

To reduce API calls, you can increase the cache duration:

1. Open `js/products.js`
2. Find line: `const CACHE_DURATION = 5 * 60 * 1000;`
3. Change to desired duration:
   - 10 minutes: `10 * 60 * 1000`
   - 30 minutes: `30 * 60 * 1000`
   - 1 hour: `60 * 60 * 1000`

**Note:** Longer cache = fewer API calls but slower updates

---

## Support

If you encounter issues not covered in this guide:

1. Check browser console for detailed error messages
2. Verify all steps were followed correctly
3. Test with a fresh browser session (incognito mode)

---

## Summary Checklist

- [ ] Created Google Cloud project
- [ ] Enabled Google Sheets API
- [ ] Created and restricted API key
- [ ] Created Google Sheet with correct column headers
- [ ] Added product data to sheet
- [ ] Set sheet sharing to "Anyone with the link"
- [ ] Copied Spreadsheet ID
- [ ] Updated `js/config.js` with API key and Spreadsheet ID
- [ ] Tested website and saw "Successfully loaded from Google Sheets"
- [ ] Verified products display correctly
- [ ] Tested adding/editing products

**Congratulations! Your Google Sheets integration is complete!** 🎉

You can now manage your product catalog directly from Google Sheets without editing any code.
