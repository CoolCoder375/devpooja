# Google Apps Script - Auto-Save Products from Admin Panel

This Google Apps Script enables the admin panel to automatically save, edit, and delete products directly in your Google Sheet.

## Setup Instructions

### Step 1: Open Your Google Sheet

1. Go to your Google Sheet: https://docs.google.com/spreadsheets/d/1A4s3oVEamoZJxE-lDl9mDuT2iZhrQTueWu2VtrWwro8/edit
2. Click **Extensions** → **Apps Script**

### Step 2: Add the Script Code

1. Delete any existing code in the script editor
2. Copy and paste the code from `scripts/Code.gs` (see below)
3. Click **Save** (💾 icon) and name it "Product Manager"

### Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure settings:
   - **Description:** "Product API for Admin Panel"
   - **Execute as:** Me (your email)
   - **Who has access:** Anyone
5. Click **Deploy**
6. **IMPORTANT:** Copy the **Web app URL** (looks like: `https://script.google.com/macros/s/AKfycby.../exec`)
7. Click **Done**

### Step 4: Authorize the Script

1. First time deploying, Google will ask for permissions
2. Click **Review permissions**
3. Choose your Google account
4. Click **Advanced** → **Go to Product Manager (unsafe)**
5. Click **Allow**

### Step 5: Update Admin Panel

1. Open `js/config.js`
2. Add the Apps Script URL:
```javascript
const SHEETS_CONFIG = {
    apiKey: 'AIzaSyDfsTaZyVzk2uu3sQeEPFhSca0Wk3adJKY',
    spreadsheetId: '1A4s3oVEamoZJxE-lDl9mDuT2iZhrQTueWu2VtrWwro8',
    range: 'Products!A2:H',
    appsScriptUrl: 'YOUR_WEB_APP_URL_HERE'  // Paste the URL from Step 3
};
```

### Step 6: Test the Integration

1. Open your admin panel
2. Add a new product
3. Check your Google Sheet - the product should appear automatically!

## How It Works

```
Admin Panel → POST request → Apps Script → Google Sheets
     ↓
  ImgBB API
     ↓
  Image URL
```

1. Admin fills product form and uploads image
2. Image uploads to ImgBB, returns URL
3. Product data (with image URL) POSTs to Apps Script
4. Apps Script writes to Google Sheet
5. Success message shown in admin panel
6. Products page refreshes to show new product

## API Endpoints

### Add Product
```
POST https://script.google.com/macros/s/.../exec
{
  "action": "add",
  "data": {
    "name": "Product Name",
    "category": "incense",
    "price": 299,
    "quantity": 50,
    "image": "https://i.ibb.co/...",
    "description": "Product description",
    "features": ["Feature 1", "Feature 2"]
  }
}
```

### Update Product
```
POST https://script.google.com/macros/s/.../exec
{
  "action": "update",
  "id": 1234567890,
  "data": {
    "name": "Updated Name",
    "price": 399,
    ...
  }
}
```

### Delete Product
```
POST https://script.google.com/macros/s/.../exec
{
  "action": "delete",
  "id": 1234567890
}
```

## Troubleshooting

### Error: "Script function not found"
- Make sure you deployed as **Web app**, not **API executable**
- Redeploy with correct settings

### Error: "Authorization required"
- Complete Step 4 (Authorization) properly
- Make sure "Who has access" is set to "Anyone"

### Products not saving
- Check browser console for errors (F12)
- Verify Apps Script URL in config.js is correct
- Check Apps Script execution logs (View → Executions)

### Error: "The caller does not have permission"
- In Apps Script deployment settings, set "Execute as: Me"
- Ensure sheet is owned by the same account

## Security Notes

⚠️ **Important:**
- The Apps Script URL is public but can only write to YOUR specific sheet
- Only people with admin login can use the admin panel
- Consider adding additional validation in Apps Script if needed

## Script Code

Save this as `Code.gs` in your Apps Script project:

```javascript
// See scripts/Code.gs file for the complete code
```

## Testing Checklist

- [ ] Apps Script deployed successfully
- [ ] Web app URL copied to config.js
- [ ] Authorization completed
- [ ] Add product works
- [ ] Edit product works
- [ ] Delete product works
- [ ] Products show on frontend immediately
- [ ] Images display correctly

## Next Steps

Once this is working:
1. Test all CRUD operations thoroughly
2. Deploy to GitHub Pages
3. Share admin panel with team
4. Monitor for any issues

---

**Status:** Ready to implement
**Time to setup:** 10-15 minutes
**Difficulty:** Easy (copy-paste)
