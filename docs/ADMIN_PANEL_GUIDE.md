# DevPooja Admin Panel Guide

## Overview

The Admin Panel is a complete e-commerce management system for managing your DevPooja website. It includes product management, customer tracking, and order management - all in one place.

## Access the Admin Panel

**URL:** `https://coolcoder375.github.io/devpooja/pages/admin.html`

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

⚠️ **IMPORTANT:** Change the default password in `js/admin.js` before deploying!

## Features

### 📊 Dashboard
- View total products, customers, and orders at a glance
- Track pending orders
- See recent order activity
- Real-time statistics

### 📦 Product Management
- **Add Products** - Create new products with image upload
- **Edit Products** - Update existing product details
- **Delete Products** - Remove products from catalog
- **Image Upload** - Direct upload to ImgBB with preview
- **Bulk View** - See all products in a table

### 👥 Customer Management
- View all registered customers
- Track customer orders
- Monitor customer activity

### 🛒 Order Management
- View all orders
- Track order status (pending, completed, etc.)
- View order details
- Update order status

### ⚙️ Settings
- Configure ImgBB API key for image uploads
- Manage system settings

## Setup Instructions

### Step 1: Get ImgBB API Key

1. Go to [https://api.imgbb.com/](https://api.imgbb.com/)
2. Click "Get API Key"
3. Sign up (free)
4. Copy your API key

### Step 2: Configure Admin Panel

1. Open admin panel: `/pages/admin.html`
2. Login with default credentials
3. Go to **Settings** tab
4. Paste your ImgBB API key
5. Click **Save Settings**

### Step 3: Change Default Password

1. Open `js/admin.js`
2. Find line: `const ADMIN_PASSWORD = 'admin123';`
3. Change to a secure password
4. Save and push to GitHub

## How to Use

### Adding a New Product

1. Login to admin panel
2. Click **Products** tab
3. Click **+ Add New Product** button
4. Fill in product details:
   - Product Name
   - Category
   - Price (₹)
   - Quantity (stock)
   - Description
   - Features (pipe-separated: `Feature1|Feature2|Feature3`)
5. Click the image upload area
6. Select product image (max 10MB)
7. Click **Save Product**

**Note:** Currently products are displayed from Google Sheets. The add/edit functionality will update the sheet once Google Sheets API write access is implemented.

### Editing a Product

1. Go to **Products** tab
2. Find the product in the table
3. Click **Edit** button
4. Update the fields you want to change
5. Upload new image if needed
6. Click **Save Product**

### Deleting a Product

1. Go to **Products** tab
2. Find the product
3. Click **Delete** button
4. Confirm deletion

## Current Status

### ✅ Completed Features

- ✅ Admin panel with login authentication
- ✅ Responsive dashboard with statistics
- ✅ Product listing from Google Sheets
- ✅ Product add/edit forms
- ✅ Image upload to ImgBB
- ✅ Image preview
- ✅ Customer management interface
- ✅ Order management interface
- ✅ Settings page
- ✅ Beautiful UI with gradients and animations

### 🚧 In Progress Features

- 🔄 Google Sheets API integration for adding/editing products
- 🔄 Customer registration system on website
- 🔄 Order placement integration with cart
- 🔄 Email notifications
- 🔄 Advanced order filtering

## Next Steps

### 1. Integrate Google Sheets Write API

To enable adding/editing products directly from admin panel:

1. Enable Google Sheets API write access
2. Update `admin.js` to use Sheets API
3. Implement append/update functions

### 2. Add Customer Registration

Create customer registration functionality on the website:

- Add registration form
- Store customer data in Google Sheets (Customers tab)
- Send welcome email

### 3. Integrate Order System

Connect the shopping cart with order management:

- Capture order data when user clicks WhatsApp checkout
- Save order to Google Sheets (Orders tab)
- Show orders in admin panel

## File Structure

```
devpooja/
├── pages/
│   └── admin.html          # Admin panel HTML
├── css/
│   └── admin.css           # Admin panel styles
├── js/
│   └── admin.js            # Admin panel logic
└── docs/
    └── ADMIN_PANEL_GUIDE.md # This guide
```

## Security Considerations

### Authentication

Currently uses simple username/password stored in JavaScript. For production:

**Recommended Improvements:**
1. Use environment variables for credentials
2. Implement session management
3. Add password hashing
4. Use OAuth or JWT tokens
5. Enable 2FA

### API Keys

- ImgBB API key stored in localStorage (browser)
- Safe for client-side use (read-only access to upload)
- Set usage quotas in ImgBB dashboard

### Data Protection

- Admin panel requires login
- Session expires on logout
- No sensitive data exposed in frontend

## Troubleshooting

### Products Not Loading

**Issue:** Products table shows loading spinner
**Solution:**
- Check if Google Sheets API is configured in `config.js`
- Verify spreadsheet ID is correct
- Check browser console for errors

### Image Upload Fails

**Issue:** "Failed to upload image" error
**Solution:**
- Verify ImgBB API key is configured in Settings
- Check image size (max 10MB)
- Check image format (JPG, PNG, GIF only)
- Check internet connection

### Can't Login

**Issue:** "Invalid credentials" error
**Solution:**
- Check username and password in `js/admin.js`
- Clear browser cache
- Check browser console for errors

### Products Don't Save to Sheet

**Issue:** Product saves but doesn't appear in Google Sheet
**Solution:**
- Google Sheets write API not yet implemented
- Currently need to manually add to sheet
- Coming in next update!

## Keyboard Shortcuts

- **Esc** - Close product form
- **Ctrl+S** - Save product (when form is open)
- **Tab** - Navigate through tabs (after clicking one)

## Mobile Support

The admin panel is fully responsive and works on:
- ✅ Desktop (1920x1080 and up)
- ✅ Laptop (1366x768)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x667 and up)

## Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ Internet Explorer (not supported)

## FAQ

**Q: Can I have multiple admin users?**
A: Not yet. Currently single admin only. Multi-user support coming soon.

**Q: How do I export data?**
A: Data is in Google Sheets - you can export from there to CSV/Excel.

**Q: Can I customize the admin panel?**
A: Yes! Edit `css/admin.css` for styling and `js/admin.js` for functionality.

**Q: Is this secure for production?**
A: Basic security is implemented. For production, consider:
- Using backend authentication
- Adding HTTPS (GitHub Pages has this)
- Implementing proper session management
- Adding audit logs

## Support

For issues or questions:
1. Check this guide
2. Check browser console for errors
3. Review `js/admin.js` comments
4. Create an issue on GitHub

## Changelog

### v1.0.0 - Initial Release
- Admin panel with login
- Product management UI
- Dashboard with statistics
- Customer and order interfaces
- ImgBB image upload integration
- Settings page

### Coming in v1.1.0
- Google Sheets write API integration
- Customer registration system
- Order tracking integration
- Email notifications
- Advanced filtering and search

---

**Built with ❤️ for DevPooja E-Commerce**
