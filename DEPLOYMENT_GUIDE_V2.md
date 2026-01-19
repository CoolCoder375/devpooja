# 🚀 Deployment Guide: Test → Main Project (Session 3)

Complete guide for deploying all features from sessions 2 & 3.

---

## 📊 Features Added

### Session 2:
1. **Inventory Management** - Auto quantity reduction, stock badges, cart validation
2. **Product Detail Page** - Image gallery (5 images), related products, responsive
3. **Razorpay Integration Fix** - Payment button bug fixed

### Session 3 (New):
4. **Pagination** - 10 products per page with navigation controls
5. **Desktop 3-Column Grid** - Portrait cards with left sidebar filters
6. **Hero Animation** - Flowing gradient animation on homepage
7. **Favicon** - Updated to logo.png across all pages
8. **CSS Fixes** - Removed swiper-wrapper margin issue

---

## 📁 FILES TO COPY (11 files)

### 🆕 NEW FILES (3)
```bash
pages/product-detail.html
js/product-detail.js
css/product-detail.css
```

### ✏️ MODIFIED FILES (8)

**CSS (3):**
```bash
css/common.css        → Removed swiper-wrapper margin
css/index.css         → Added flowing gradient animation
css/products.css      → 3-column grid, left sidebar, pagination styles
```

**HTML (5):**
```bash
index.html                  → Favicon update, gradient colors
pages/products.html         → Pagination, sidebar layout, 3-col grid
pages/product-detail.html   → Favicon update
pages/about.html            → Favicon update
pages/admin.html            → Favicon update
pages/checkout.html         → Favicon update
pages/contact.html          → Favicon update
```

**Note:** JS files (products.js, cart.js, admin.js, checkout.js) were updated in Session 2, no new changes in Session 3.

---

## ⚠️ MANUAL UPDATES

### 1. Google Sheets - Add Columns J-M (Session 2)
```
J: image2 (URL, optional)
K: image3 (URL, optional)
L: image4 (URL, optional)
M: image5 (URL, optional)
```

### 2. js/config.js - Update Range
**Line 17:**
```javascript
range: 'Products!A2:M',  // Was: 'Products!A2:I'
```

### 3. Apps Script - Update Code.gs (Session 2)
- Copy updated Code.gs from test project
- Redeploy with new version
- Key additions: IMAGE2-5 columns, reduceProductQuantity(), validateOrderQuantities()

---

## 📦 Quick Copy Commands

```bash
# Backup
cd /home/atharva/projects/MCOC/pooja
cp -r . ../pooja_backup_$(date +%Y%m%d_%H%M%S)

# Copy new files
cp ../pooja_demo/devpooja/pages/product-detail.html ./pages/
cp ../pooja_demo/devpooja/js/product-detail.js ./js/
cp ../pooja_demo/devpooja/css/product-detail.css ./css/

# Copy modified CSS
cp ../pooja_demo/devpooja/css/common.css ./css/
cp ../pooja_demo/devpooja/css/index.css ./css/
cp ../pooja_demo/devpooja/css/products.css ./css/

# Copy modified HTML
cp ../pooja_demo/devpooja/index.html ./
cp ../pooja_demo/devpooja/pages/products.html ./pages/
cp ../pooja_demo/devpooja/pages/product-detail.html ./pages/
cp ../pooja_demo/devpooja/pages/about.html ./pages/
cp ../pooja_demo/devpooja/pages/admin.html ./pages/
cp ../pooja_demo/devpooja/pages/checkout.html ./pages/
cp ../pooja_demo/devpooja/pages/contact.html ./pages/

# Manual: Update config.js range to A2:M
```

---

## 🧪 PRE-DEPLOYMENT TESTING

### Inventory (Session 2):
- [ ] Out of stock badge shows when quantity = 0
- [ ] Low stock badge shows when quantity ≤ 5
- [ ] Cart prevents adding out-of-stock items
- [ ] Quantity reduces after order

### PDP (Session 2):
- [ ] Click product image/title opens PDP
- [ ] Image gallery shows multiple images
- [ ] Related products display
- [ ] Add to cart works from PDP

### Pagination (Session 3):
- [ ] Shows 10 products per page
- [ ] Pagination controls appear
- [ ] Next/Previous buttons work
- [ ] Page numbers clickable

### Layout (Session 3):
- [ ] Desktop: Left sidebar with filters
- [ ] Desktop: 3-column product grid
- [ ] Filters work (single-select)
- [ ] Mobile: Keeps existing layout

### Animation (Session 3):
- [ ] Hero section has flowing gradient
- [ ] Animation is smooth (8s loop)

---

## 🚀 DEPLOYMENT STEPS

1. **Update Google Sheets** - Add columns J-M
2. **Update Apps Script** - Deploy new Code.gs version
3. **Backup main project**
4. **Copy 11 files** (3 new + 8 modified)
5. **Update config.js** - Change range to A2:M
6. **Clear cache** - `localStorage.removeItem('devpooja_products_cache')`
7. **Test locally** - All features from checklist
8. **Git commit & push**

---

## 🐛 TROUBLESHOOTING

**Pagination not showing:** Check products.css is copied, clear cache

**Layout broken on desktop:** Ensure products.css and products.html are updated

**Animation not working:** Verify index.css is copied, hard refresh (Ctrl+Shift+R)

**Products not loading:** Check config.js range is A2:M, verify columns J-M exist

---

## ✅ SUMMARY

**Total Files:** 11 (3 new, 8 modified)
**Manual Updates:** 3 (Sheets columns, config.js, Apps Script)
**Session 2 Features:** Inventory, PDP, Razorpay fix
**Session 3 Features:** Pagination, 3-col grid, sidebar, animation, favicon

**Est. Time:** 20-25 minutes

---

**Last Updated:** 2026-01-18
**Version:** 3.0
