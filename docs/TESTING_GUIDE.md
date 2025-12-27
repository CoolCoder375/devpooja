# DevPooja Admin Panel - Testing Guide

## Overview

This guide will help you test the complete admin panel workflow from adding a product to seeing it on the website.

## Prerequisites

Before testing, make sure you have:
- ✅ ImgBB API key configured (or Cloudinary - recommended)
- ✅ Google Sheets with product data
- ✅ Admin panel accessible locally or on GitHub Pages
- ✅ Browser with developer tools (Chrome/Firefox)

---

## Test Environment Setup

### Local Testing
```bash
# Start local server (if using VS Code Live Server)
Right-click index.html → Open with Live Server

# Or use Python
python -m http.server 8000

# Access admin panel
http://127.0.0.1:5500/pages/admin.html
# or
http://localhost:8000/pages/admin.html
```

### Production Testing
```
https://coolcoder375.github.io/devpooja/pages/admin.html
```

---

## Complete Testing Workflow

### Phase 1: Admin Panel Access

#### Test 1.1: Login Page
1. Open admin panel URL
2. **Expected:** See login form with DevPooja branding
3. **Check:**
   - [ ] Login box displays correctly
   - [ ] Username and password fields visible
   - [ ] "Login" button present
   - [ ] Responsive on mobile

#### Test 1.2: Login Authentication
1. Enter wrong credentials
2. **Expected:** Error message "Invalid credentials"
3. Enter correct credentials (admin / admin123)
4. **Expected:** Redirect to dashboard
5. **Check:**
   - [ ] Error message shows for wrong password
   - [ ] Successful login redirects to dashboard
   - [ ] Session persists on page refresh

#### Test 1.3: Logout
1. Click "Logout" button
2. **Expected:** Return to login page
3. **Check:**
   - [ ] Logged out successfully
   - [ ] Cannot access admin without login

---

### Phase 2: Dashboard

#### Test 2.1: Statistics
1. Login and view dashboard
2. **Expected:** See 4 stat cards
3. **Check:**
   - [ ] Total Products shows correct count
   - [ ] Total Customers displays (0 for now)
   - [ ] Total Orders displays (0 for now)
   - [ ] Pending Orders displays (0 for now)

#### Test 2.2: Recent Orders
1. Scroll to "Recent Orders" section
2. **Expected:** Empty state message
3. **Check:**
   - [ ] Shows "No orders yet" message
   - [ ] Message is clear and centered

---

### Phase 3: Product Management

#### Test 3.1: View Products
1. Click "Products" tab
2. **Expected:** See table with existing products from Google Sheets
3. **Check:**
   - [ ] Products table loads
   - [ ] All columns visible (Image, Name, Category, Price, Stock, Actions)
   - [ ] Product images display correctly
   - [ ] Prices show with ₹ symbol
   - [ ] Stock quantities visible
   - [ ] Edit and Delete buttons present for each product

#### Test 3.2: Add New Product - Form Display
1. Click "+ Add New Product" button
2. **Expected:** Product form slides down
3. **Check:**
   - [ ] Form appears smoothly
   - [ ] All fields visible:
     - [ ] Product Name
     - [ ] Category dropdown
     - [ ] Price
     - [ ] Quantity
     - [ ] Description
     - [ ] Features
     - [ ] Image upload area
   - [ ] Save and Cancel buttons present

#### Test 3.3: Add New Product - Image Upload
1. Click image upload area
2. Select a product image (< 10MB, JPG/PNG)
3. **Expected:** Image preview appears
4. **Check:**
   - [ ] File picker opens
   - [ ] Selected image shows preview
   - [ ] Preview displays correctly
   - [ ] Image validates size (<= 10MB)

#### Test 3.4: Add New Product - Form Validation
1. Try to save without filling required fields
2. **Expected:** Browser validation prevents submit
3. **Check:**
   - [ ] Name field is required
   - [ ] Category field is required
   - [ ] Price field is required (number only)
   - [ ] Quantity field is required (number only)
   - [ ] Description field is required

#### Test 3.5: Add New Product - Complete Flow
1. Fill all fields:
   ```
   Name: Test Product
   Category: Incense & Dhoop
   Price: 299
   Quantity: 50
   Description: Test product description
   Features: Feature 1|Feature 2|Feature 3
   Image: Upload any product image
   ```
2. Click "Save Product"
3. **Expected:** Success message and form closes
4. **Check:**
   - [ ] Success message displays: "Product saved successfully!"
   - [ ] Form closes automatically
   - [ ] Products table refreshes

**⚠️ Current Limitation:**
- Product doesn't actually save to Google Sheets yet (Phase 2 - Firebase)
- You'll need to manually add to Google Sheet for now
- Console log shows product data

#### Test 3.6: Edit Product
1. Find any product in the table
2. Click "Edit" button
3. **Expected:** Form opens with product data pre-filled
4. **Check:**
   - [ ] Form displays with "Edit Product" title
   - [ ] All fields populated with existing data
   - [ ] Image preview shows current product image
   - [ ] Can modify any field
5. Change price to 349
6. Click "Save Product"
7. **Expected:** Success message

**⚠️ Current Limitation:**
- Changes don't persist to Google Sheets yet
- Manual update needed

#### Test 3.7: Delete Product
1. Click "Delete" button on any product
2. **Expected:** Confirmation dialog
3. **Check:**
   - [ ] Confirmation popup asks "Are you sure?"
   - [ ] Can cancel deletion
4. Confirm deletion
5. **Expected:** Success message
6. **Check:**
   - [ ] Success message displays
   - [ ] Product removed from table (temporarily)

**⚠️ Current Limitation:**
- Deletion doesn't persist to Google Sheets
- Refresh will restore product

---

### Phase 4: Image Upload Integration

#### Test 4.1: ImgBB Configuration
1. Go to "Settings" tab
2. Enter ImgBB API key
3. Click "Save Settings"
4. **Expected:** "Settings saved successfully!" alert
5. **Check:**
   - [ ] Settings save to localStorage
   - [ ] API key persists on page refresh

#### Test 4.2: Image Upload to ImgBB
1. Go back to "Products" tab
2. Click "+ Add New Product"
3. Upload an image
4. Fill other fields
5. Click "Save Product"
6. **Open browser console** (F12)
7. **Check console for:**
   - [ ] "Uploading image..." message
   - [ ] ImgBB API success response
   - [ ] Returned image URL
   - [ ] Product data with image URL

**Expected Console Output:**
```javascript
Uploading image...
Saving product to Google Sheets: {
  id: 1234567890,
  name: "Test Product",
  category: "incense",
  price: 299,
  quantity: 50,
  description: "Test product description",
  features: ["Feature 1", "Feature 2", "Feature 3"],
  image: "https://i.ibb.co/xxxxx/image.jpg"
}
```

---

### Phase 5: Integration with Frontend

#### Test 5.1: Manual Google Sheets Update
1. After "saving" a product in admin
2. Copy the product data from console
3. Open your Google Sheet
4. Add a new row with the product data:
   ```
   ID: (from console)
   Name: Test Product
   Category: incense
   Price: 299
   Image: (URL from console)
   Description: Test product description
   Features: Feature 1|Feature 2|Feature 3
   Quantity: 50
   ```
5. Save the sheet

#### Test 5.2: Clear Cache
1. Go to website homepage
2. Open browser console (F12)
3. Run:
   ```javascript
   localStorage.removeItem('devpooja_products_cache');
   location.reload();
   ```
4. **Expected:** Page reloads and fetches fresh data from Google Sheets

#### Test 5.3: Verify Product Display
1. Check homepage
2. **Expected:** New product appears in featured products carousel
3. **Check:**
   - [ ] Product visible on homepage
   - [ ] Product image loads correctly
   - [ ] Product name displays
   - [ ] Product price shows
   - [ ] "Add to Cart" button present

4. Go to Products page (`/pages/products.html`)
5. **Expected:** New product in products grid
6. **Check:**
   - [ ] Product visible in grid
   - [ ] Category filter works
   - [ ] Product details correct
   - [ ] Image loads

#### Test 5.4: Add to Cart
1. Click "Add to Cart" on new product
2. **Expected:** Cart notification
3. **Check:**
   - [ ] "Added to cart" toast notification
   - [ ] Cart badge updates
   - [ ] Cart sidebar shows product
4. Open cart sidebar
5. **Check:**
   - [ ] Product appears in cart
   - [ ] Correct name, price, image
   - [ ] Quantity controls work
   - [ ] Total price calculates correctly

---

### Phase 6: Customers Tab

#### Test 6.1: View Customers
1. Click "Customers" tab
2. **Expected:** Empty state
3. **Check:**
   - [ ] Shows "No customers yet" message
   - [ ] Message explains customers appear after registration

---

### Phase 7: Orders Tab

#### Test 7.1: View Orders
1. Click "Orders" tab
2. **Expected:** Empty state
3. **Check:**
   - [ ] Shows "No orders yet" message
   - [ ] Message explains orders appear after checkout

---

### Phase 8: Settings Tab

#### Test 8.1: Settings Page
1. Click "Settings" tab
2. **Expected:** Settings interface
3. **Check:**
   - [ ] API Configuration section visible
   - [ ] ImgBB API key field present
   - [ ] Save button present
4. Enter API key and save
5. Refresh page
6. **Check:**
   - [ ] API key persists (saved in localStorage)

---

## Browser Compatibility Testing

### Desktop Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Testing
- [ ] Chrome Mobile (Android)
- [ ] Safari Mobile (iOS)
- [ ] Responsive design (resize browser window)

**Check on mobile:**
- [ ] Login page responsive
- [ ] Dashboard cards stack vertically
- [ ] Tabs scrollable horizontally
- [ ] Forms adapt to mobile screen
- [ ] Tables scroll horizontally
- [ ] Buttons touch-friendly

---

## Performance Testing

### Page Load
1. Open admin panel
2. Check browser Network tab (F12 → Network)
3. **Check:**
   - [ ] Page loads in < 2 seconds
   - [ ] CSS loads properly
   - [ ] JavaScript loads without errors
   - [ ] No console errors

### Product Loading
1. Go to Products tab
2. **Check:**
   - [ ] Products load from Google Sheets
   - [ ] Loading spinner shows while fetching
   - [ ] Products display after fetch complete
   - [ ] No errors in console

---

## Error Handling Testing

### Test 9.1: No Internet Connection
1. Disconnect internet
2. Try to load admin panel
3. **Expected:** Error message or timeout
4. Reconnect internet
5. Refresh page
6. **Expected:** Works normally

### Test 9.2: Invalid API Key
1. Enter wrong ImgBB API key in Settings
2. Try to upload product image
3. **Expected:** Upload error message
4. **Check:**
   - [ ] Clear error message
   - [ ] Doesn't break page
   - [ ] Can retry with correct key

### Test 9.3: Large Image Upload
1. Try to upload > 10MB image
2. **Expected:** Error message "Image size must be less than 10MB"
3. **Check:**
   - [ ] Validation works
   - [ ] Upload rejected
   - [ ] Clear error message

### Test 9.4: Google Sheets Unavailable
1. Temporarily make Google Sheet private
2. Refresh website
3. **Expected:** Falls back to products.json
4. **Check:**
   - [ ] Console shows "Sheets API failed"
   - [ ] Console shows "Loaded from JSON fallback"
   - [ ] Products still display (from fallback)

---

## Security Testing

### Test 10.1: Session Management
1. Login to admin panel
2. Close browser
3. Open browser and go to admin URL
4. **Expected:** Login page (session expired)
5. **Check:**
   - [ ] Must login again after browser close
   - [ ] Session doesn't persist insecurely

### Test 10.2: URL Access
1. Try to access admin panel without logging in
2. **Expected:** Login page shows
3. **Check:**
   - [ ] Cannot access admin features without login
   - [ ] Redirects to login page

---

## Known Issues & Limitations

### Current Limitations (v1.0)
1. ❌ Products don't automatically save to Google Sheets
   - **Workaround:** Manually add to sheet after getting data from console
2. ❌ Edit/Delete don't persist
   - **Workaround:** Manually update Google Sheet
3. ❌ No customer database yet
4. ❌ No order tracking yet
5. ❌ Single admin user only

### Planned Fixes (Phase 2 - Firebase)
- ✅ Automatic product save/edit/delete
- ✅ Customer database
- ✅ Order tracking
- ✅ Multi-user admin access

---

## Testing Checklist Summary

### Critical Tests (Must Pass)
- [ ] Login works
- [ ] Dashboard displays
- [ ] Products load from Google Sheets
- [ ] Product form displays
- [ ] Image upload works
- [ ] Products show on frontend
- [ ] Cart functionality works
- [ ] Mobile responsive

### Nice to Have (Should Pass)
- [ ] All browsers work
- [ ] Error messages clear
- [ ] Loading states smooth
- [ ] Forms validate properly

---

## Reporting Issues

If you find bugs, note:
1. **What you did** (steps to reproduce)
2. **What you expected** (expected behavior)
3. **What happened** (actual behavior)
4. **Browser & device** (Chrome on Windows, etc.)
5. **Console errors** (F12 → Console → screenshot)

---

## Next Steps After Testing

Once testing is complete:
1. ✅ Document any issues found
2. ✅ Fix critical bugs
3. ✅ Deploy to GitHub Pages
4. ✅ Test on live URL
5. ✅ Share with team for feedback
6. ✅ Plan Phase 2 (Firebase migration)

---

**Testing Status:** Ready for testing
**Last Updated:** December 2025
**Version:** 1.0.0 (MVP)
