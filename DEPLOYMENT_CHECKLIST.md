# 🚀 Deployment Checklist: Test → Main Project

Complete guide to deploy all changes from test project to main (live) project.

---

## 📊 Summary of Changes

**Total Files Modified:** 11 core files
**New Files Created:** 2 files
**Documentation:** 1 new guide

**Features Added:**
1. ✅ Quantity selector on products page
2. ✅ Featured products checkbox in admin
3. ✅ Social media links in footer
4. ✅ Save settings loader in admin
5. ✅ Mobile quantity selector fix
6. ✅ Google Analytics 4 (GA4) integration
7. ✅ Admin order WhatsApp fix (customer number)
8. ✅ Admin panel mobile scrolling fix

---

## 🔴 CRITICAL: Files That MUST Be Updated

### 1. JavaScript Files (Core Functionality)

#### ✅ `js/products.js` - HIGH PRIORITY
**Changes:**
- Added `renderFeaturedProductCard()` function (no quantity selector)
- Updated `parseSheetData()` to parse 9th column (featured field)
- Updated `incrementQty()`, `decrementQty()`, `addToCartWithQty()` to handle mobile/desktop views

**Action:** MUST COPY (overwrites existing)

---

#### ✅ `js/admin.js` - HIGH PRIORITY
**Changes:**
- Updated `saveSettings()` with loading indicator
- Updated `saveProduct()` to save featured field
- Updated `editProduct()` to load featured checkbox
- Updated `loadProducts()` table to show Featured column
- Fixed `viewOrder()` WhatsApp link to use customer's phone number

**Action:** MUST COPY (overwrites existing)

---

#### ✅ `js/cart.js` - HIGH PRIORITY
**Changes:**
- Updated `addItem(product, quantity = 1)` to accept quantity parameter
- Updated `removeItem()` with GA4 tracking
- Updated `payWithWhatsApp()` with GA4 tracking

**Action:** MUST COPY (overwrites existing)

---

#### 🆕 `js/analytics.js` - NEW FILE
**Purpose:** Google Analytics 4 tracking
**Features:**
- Auto-initializes GA4
- Tracks e-commerce events (add to cart, checkout, purchase)
- Tracks custom events (social clicks, filters, etc.)

**Action:** MUST COPY (new file)

---

#### ⚠️ `js/config.js` - MANUAL UPDATE REQUIRED
**Changes:**
- Line 16: Updated range from `'Products!A2:H'` to `'Products!A2:I'`
- Line 45: WhatsApp number (you'll update manually)
- Line 55-67: Added GA4_CONFIG section

**Action:** MANUAL UPDATE (don't overwrite - merge changes)

**What to update:**
```javascript
// Change this line:
range: 'Products!A2:H',
// To:
range: 'Products!A2:I',

// Update WhatsApp number:
whatsappNumber: '917057307300',  // Your number

// Add GA4 config (copy lines 55-67):
const GA4_CONFIG = {
    measurementId: 'G-XXXXXXXXXX',  // Your GA4 ID
    enabled: true,
    debug: false
};
```

---

### 2. HTML Files

#### ✅ `index.html` - HIGH PRIORITY
**Changes:**
- Line 372-373: Added analytics.js script
- Line 470-475: Updated featured products filtering logic
- Line 357-362: Added social media footer section
- Line 479-525: Added `loadSocialLinks()` function

**Action:** MUST COPY (overwrites existing)

---

#### ✅ `pages/admin.html` - HIGH PRIORITY
**Changes:**
- Line 138-143: Added featured checkbox in product form
- Line 225-228, 253-256: Added spinner to save settings buttons
- Line 231-257: Added social media link inputs

**Action:** MUST COPY (overwrites existing)

---

#### ✅ `pages/products.html` - HIGH PRIORITY
**Changes:**
- Line 210-214: Added quantity selector to desktop product cards
- Line 232-236: Added quantity selector to mobile product cards (with `qty-mobile-` prefix)

**Action:** MUST COPY (overwrites existing)

---

### 3. CSS Files

#### ✅ `css/common.css` - HIGH PRIORITY
**Changes:**
- Line 304-361: Added quantity selector styles
- Line 251-303: Added social media footer styles

**Action:** MUST COPY (overwrites existing)

---

#### ✅ `css/admin.css` - MEDIUM PRIORITY
**Changes:**
- Line 372: Added `min-width: 600px` to tables
- Line 645-747: Added mobile scroll support and responsive improvements

**Action:** MUST COPY (overwrites existing)

---

### 4. Google Apps Script

#### ✅ `scripts/Code.gs` - HIGH PRIORITY
**Changes:**
- Line 19: Added `FEATURED: 8` to COLUMNS mapping
- Line 111: Added `productData.featured || false` to newRow in addProduct()
- Line 167: Added `productData.featured || false` to updatedRow in updateProduct()
- Line 275: Update hardcoded spreadsheet ID (if using separate test sheet)

**Action:** COPY TO GOOGLE APPS SCRIPT (manual)

---

### 5. Documentation (Optional)

#### 🆕 `docs/GA4_SETUP_GUIDE.md` - NEW FILE
**Purpose:** Complete GA4 setup guide
**Action:** OPTIONAL (helpful for reference)

---

## 📦 Quick Copy Commands

### Option 1: Copy Individual Files (Safest)

```bash
# Navigate to main project
cd /home/atharva/projects/MCOC/pooja

# Create backup first!
cp -r . ../pooja_backup_$(date +%Y%m%d_%H%M%S)

# Copy JavaScript files
cp ../pooja_demo/devpooja/js/products.js ./js/products.js
cp ../pooja_demo/devpooja/js/admin.js ./js/admin.js
cp ../pooja_demo/devpooja/js/cart.js ./js/cart.js
cp ../pooja_demo/devpooja/js/analytics.js ./js/analytics.js

# Copy HTML files
cp ../pooja_demo/devpooja/index.html ./index.html
cp ../pooja_demo/devpooja/pages/admin.html ./pages/admin.html
cp ../pooja_demo/devpooja/pages/products.html ./pages/products.html

# Copy CSS files
cp ../pooja_demo/devpooja/css/common.css ./css/common.css
cp ../pooja_demo/devpooja/css/admin.css ./css/admin.css

# Copy documentation (optional)
cp ../pooja_demo/devpooja/docs/GA4_SETUP_GUIDE.md ./docs/GA4_SETUP_GUIDE.md

# DON'T copy config.js - update manually!
```

---

### Option 2: Automated Script

Create a deployment script:

```bash
#!/bin/bash
# deploy.sh

echo "🚀 Deploying changes to main project..."

# Set paths
TEST_PATH="/home/atharva/projects/MCOC/pooja_demo/devpooja"
MAIN_PATH="/home/atharva/projects/MCOC/pooja"

# Backup
echo "📦 Creating backup..."
cp -r $MAIN_PATH "${MAIN_PATH}_backup_$(date +%Y%m%d_%H%M%S)"

# Copy files
echo "📁 Copying JavaScript files..."
cp $TEST_PATH/js/products.js $MAIN_PATH/js/
cp $TEST_PATH/js/admin.js $MAIN_PATH/js/
cp $TEST_PATH/js/cart.js $MAIN_PATH/js/
cp $TEST_PATH/js/analytics.js $MAIN_PATH/js/

echo "📄 Copying HTML files..."
cp $TEST_PATH/index.html $MAIN_PATH/
cp $TEST_PATH/pages/admin.html $MAIN_PATH/pages/
cp $TEST_PATH/pages/products.html $MAIN_PATH/pages/

echo "🎨 Copying CSS files..."
cp $TEST_PATH/css/common.css $MAIN_PATH/css/
cp $TEST_PATH/css/admin.css $MAIN_PATH/css/

echo "📚 Copying documentation..."
mkdir -p $MAIN_PATH/docs
cp $TEST_PATH/docs/GA4_SETUP_GUIDE.md $MAIN_PATH/docs/

echo "✅ Deployment complete!"
echo ""
echo "⚠️  MANUAL STEPS REQUIRED:"
echo "1. Update js/config.js manually (range and GA4 config)"
echo "2. Update Google Apps Script (Code.gs)"
echo "3. Add 'featured' column to Google Sheets (Column I)"
echo "4. Deploy new Apps Script version"
echo "5. Test on local before pushing to GitHub"
```

Save this as `deploy.sh` and run:
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## ⚠️ MANUAL STEPS (Critical!)

### Step 1: Update config.js

**File:** `js/config.js`

**DO NOT copy this file directly!** Instead, manually update:

1. Open `pooja/js/config.js`
2. Update line ~16:
   ```javascript
   range: 'Products!A2:I',  // Changed from A2:H
   ```
3. Update line ~45:
   ```javascript
   whatsappNumber: '917057307300',  // Your business number
   ```
4. Add GA4 config (after line ~52):
   ```javascript
   // Google Analytics 4 Configuration
   const GA4_CONFIG = {
       measurementId: 'G-XXXXXXXXXX',  // Your GA4 Measurement ID
       enabled: true,
       debug: false
   };
   ```

---

### Step 2: Update Google Sheets

1. **Open your MAIN (live) Google Sheet**
2. **Add column I header:**
   - Cell I1: `featured`
3. **For existing products:**
   - Add `TRUE` or `FALSE` in column I
   - TRUE = shows on homepage
   - FALSE = doesn't show on homepage

**Your columns should now be:**
```
A: id
B: name
C: category
D: price
E: image
F: description
G: features
H: quantity
I: featured  ← NEW
```

---

### Step 3: Update Google Apps Script

1. **Open your MAIN Google Sheet**
2. **Extensions** → **Apps Script**
3. **Replace Code.gs** with updated version from `scripts/Code.gs`
4. **Update line 275** (spreadsheet ID):
   ```javascript
   const ss = SpreadsheetApp.openById('YOUR_MAIN_SPREADSHEET_ID');
   ```
5. **Save** (Ctrl+S)
6. **Deploy new version:**
   - Deploy → Manage deployments
   - Click pencil icon on current deployment
   - Version → New version
   - Deploy
7. **Copy new deployment URL** (if it changes)
8. **Update config.js** with new URL (if changed)

---

## ✅ Pre-Deployment Testing Checklist

Before pushing to GitHub:

### Local Testing:

- [ ] Open `index.html` - Does it load?
- [ ] Check browser console - Any errors?
- [ ] Click "Products" - Do products load?
- [ ] Try quantity selector - Does +/- work?
- [ ] Add to cart - Does it work?
- [ ] Open cart - Are items there?
- [ ] Try WhatsApp checkout - Opens WhatsApp?
- [ ] Open admin panel - Loads correctly?
- [ ] Login to admin - Works?
- [ ] Check products table - Shows "Featured" column?
- [ ] Try editing product - Featured checkbox shows?
- [ ] Save product - No errors?
- [ ] Check Orders tab - Opens correctly?
- [ ] Mobile test - Tables scroll horizontally?

### Admin Testing:

- [ ] Edit existing product
- [ ] Check/uncheck "Featured"
- [ ] Save product
- [ ] Check Google Sheet - Featured column updated?
- [ ] Go to homepage - Featured products show correctly?
- [ ] Open Settings tab
- [ ] Add social media links
- [ ] Click "Save Settings" - Loader appears?
- [ ] Check footer - Social icons appear?

### GA4 Testing (After setup):

- [ ] Add GA4 Measurement ID to config.js
- [ ] Enable debug mode
- [ ] Open browser console
- [ ] See "✅ GA4 Initialized" message?
- [ ] Add product to cart
- [ ] Check console - See "📊 GA4 Event: add_to_cart"?
- [ ] Go to GA4 Real-Time report
- [ ] See yourself as active user?

---

## 🔄 Git Deployment Steps

### 1. Commit Changes to Test Project

```bash
cd /home/atharva/projects/MCOC/pooja_demo/devpooja

git add .
git commit -m "Add quantity selector, featured products, GA4, and mobile fixes"
git push origin main
```

---

### 2. Deploy to Main Project

```bash
cd /home/atharva/projects/MCOC/pooja

# Pull latest changes first
git pull origin main

# Copy files (use deploy.sh or manual commands above)

# Add all changes
git add .

# Commit with descriptive message
git commit -m "Update: Add quantity selector, featured products, social links, GA4, mobile fixes

Features:
- Quantity selector on product cards (desktop & mobile)
- Featured products checkbox in admin panel
- Social media links in footer
- Save settings loader indicator
- Google Analytics 4 integration
- Fixed admin order WhatsApp to customer number
- Fixed mobile table scrolling in admin panel

Technical changes:
- Updated Google Sheets range to A2:I (added featured column)
- Added analytics.js for GA4 tracking
- Updated products.js, admin.js, cart.js
- Enhanced mobile responsiveness
"

# Push to GitHub
git push origin main
```

---

### 3. Verify GitHub Pages Deployment

1. **Wait 2-3 minutes** for GitHub Pages to rebuild
2. **Open:** https://thedevpooja.com
3. **Hard refresh:** Ctrl+Shift+R (to clear cache)
4. **Test all features** from checklist above

---

## 🐛 Troubleshooting Common Issues

### Issue 1: Products Not Loading

**Symptoms:** Blank products page, console error about column I

**Fix:**
1. Check Google Sheets has column I (featured)
2. Check config.js range is `A2:I` (not `A2:H`)
3. Clear cache: `localStorage.removeItem('devpooja_products_cache')`

---

### Issue 2: Featured Products Not Showing

**Symptoms:** Homepage shows all products or none

**Fix:**
1. Check Google Sheet column I has TRUE/FALSE values
2. Clear cache and refresh
3. Check console for errors

---

### Issue 3: Quantity Selector Not Working on Mobile

**Symptoms:** +/- buttons don't update number on mobile

**Fix:**
1. Verify products.html was copied correctly
2. Check for duplicate IDs in console
3. Test in incognito mode

---

### Issue 4: Admin WhatsApp Still Goes to Wrong Number

**Symptoms:** "Contact Customer" opens business number

**Fix:**
1. Verify admin.js line 661 was updated
2. Check order has phone number in data
3. Hard refresh admin page (Ctrl+Shift+R)

---

### Issue 5: GA4 Not Tracking

**Symptoms:** No events in GA4 Real-Time report

**Fix:**
1. Check GA4_CONFIG.measurementId is correct (not G-XXXXXXXXXX)
2. Check GA4_CONFIG.enabled is true
3. Check analytics.js is loaded (see Network tab)
4. Disable ad blockers
5. Test in incognito mode

---

## 📋 Final Checklist

### Before Going Live:

- [ ] Backed up main project
- [ ] Copied all 11 files
- [ ] Updated config.js manually
- [ ] Added featured column to Google Sheets
- [ ] Updated Google Apps Script
- [ ] Deployed new Apps Script version
- [ ] Updated WhatsApp number in config
- [ ] Added GA4 Measurement ID
- [ ] Tested locally - all features work
- [ ] Committed to git
- [ ] Pushed to GitHub
- [ ] Verified deployment on live site
- [ ] Tested on mobile device
- [ ] Checked GA4 Real-Time report

### After Going Live:

- [ ] Test complete user journey (browse → add to cart → checkout)
- [ ] Test admin panel on mobile
- [ ] Verify featured products show correctly
- [ ] Check social media links in footer
- [ ] Monitor GA4 for first few hours
- [ ] Document any issues
- [ ] Create backup of working version

---

## 📞 Client Handoff Checklist

### What to Give Client:

1. **Access credentials:**
   - [ ] Admin panel username/password
   - [ ] Google Sheets access
   - [ ] GA4 account access (add as admin)

2. **Documentation:**
   - [ ] How to add/edit products
   - [ ] How to mark products as featured
   - [ ] How to update social media links
   - [ ] How to read GA4 reports
   - [ ] How to process WhatsApp orders

3. **Training session:**
   - [ ] Show how to login to admin
   - [ ] Demonstrate adding a product
   - [ ] Show how to mark featured products
   - [ ] Explain order management
   - [ ] Walk through GA4 dashboard

4. **Support:**
   - [ ] Define support period (3 months recommended)
   - [ ] Provide contact method (WhatsApp/email)
   - [ ] Set expectations for response time

---

## 🎯 Summary

**Files to Copy:** 11 files
**Manual Updates:** 2 files (config.js, Code.gs)
**Google Sheets:** Add column I (featured)
**Estimated Time:** 30-45 minutes
**Difficulty:** Medium (requires attention to detail)

**Most Important:**
1. ✅ Don't forget to update config.js manually
2. ✅ Add featured column to Google Sheets
3. ✅ Update Apps Script and redeploy
4. ✅ Test everything before going live
5. ✅ Create backup first!

---

**Good luck with your deployment! 🚀**

If you run into any issues, refer to the troubleshooting section or check browser console for errors.
