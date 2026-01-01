# Razorpay Integration Guide - DevPooja

## ✅ Integration Complete!

Razorpay payment gateway has been successfully integrated into your DevPooja website.

---

## 🎯 Features Implemented

### 1. Payment Options Modal
- ✅ Beautiful modal with payment method selection
- ✅ Pay Online (Razorpay) - Cards, UPI, NetBanking, Wallets
- ✅ Cash on Delivery (WhatsApp) - Traditional WhatsApp checkout

### 2. Razorpay Checkout
- ✅ Complete Razorpay integration
- ✅ Supports all payment methods (Cards, UPI, NetBanking, Wallets)
- ✅ Beautiful checkout modal with business branding
- ✅ Secure payment processing
- ✅ Payment success/failure handling

### 3. Order Confirmation
- ✅ Automatic WhatsApp notification to business
- ✅ Payment ID included for paid orders
- ✅ Different messages for paid vs COD orders
- ✅ Success modal with order details

### 4. Smart Features
- ✅ Auto-detect if Razorpay key is configured
- ✅ Fallback to WhatsApp if Razorpay not configured
- ✅ Cart clears after successful payment
- ✅ Responsive design (mobile & desktop)

---

## 🔑 Setup Instructions

### Step 1: Create Razorpay Account

1. **Sign up at Razorpay:**
   - Go to: https://razorpay.com/
   - Click "Sign Up" (top right)
   - Enter business email and password
   - Verify email

2. **Complete Basic Info:**
   - Business Name: **DevPooja**
   - Business Type: **E-commerce**
   - Product Category: **Retail**

### Step 2: Get Test API Key (Start Testing Immediately)

1. **Login to Razorpay Dashboard:**
   - Go to: https://dashboard.razorpay.com/

2. **Enable Test Mode:**
   - Toggle "Test Mode" switch (top left corner) to **ON**

3. **Generate Test Keys:**
   - Go to: **Settings** → **API Keys**
   - Click **"Generate Test Key"**
   - You'll get two keys:
     - **Key ID:** `rzp_test_xxxxx` (public - safe to use in frontend)
     - **Key Secret:** `xxxxx` (private - NEVER share)

4. **Copy Test Key ID:**
   - Copy the **Key ID** (starts with `rzp_test_`)
   - Keep it ready for next step

### Step 3: Add Razorpay Key to Website

1. **Open config.js:**
   - File location: `js/config.js`

2. **Find this line:**
   ```javascript
   keyId: '',  // Add your Razorpay Key ID here
   ```

3. **Paste your Test Key ID:**
   ```javascript
   keyId: 'rzp_test_YOUR_KEY_ID_HERE',
   ```

4. **Save the file**

### Step 4: Deploy to GitHub

```bash
cd /home/atharva/projects/MCOC/pooja_demo/devpooja
git add .
git commit -m "Add Razorpay payment gateway integration"
git push
```

### Step 5: Test with Test Cards

1. **Open your website:**
   - https://coolcoder375.github.io/devpooja/

2. **Add products to cart**

3. **Click "Proceed to Checkout"**

4. **Select "Pay Online"**

5. **Use Test Cards:**

   **Successful Payment:**
   - Card Number: `4111 1111 1111 1111`
   - CVV: `123`
   - Expiry: `12/25`
   - Name: Any name

   **Test UPI:**
   - UPI ID: `success@razorpay`
   - PIN: Any 4 digits

   **Test NetBanking:**
   - Select any bank
   - Credentials auto-filled

6. **Verify Success:**
   - Success modal should appear
   - WhatsApp should open with order confirmation
   - Payment ID should be included

---

## 🚀 Going Live (After Testing)

### Step 1: Complete KYC

**Documents Required:**
1. PAN Card (business owner)
2. Aadhaar Card
3. Bank account details:
   - Account number
   - IFSC code
   - Cancelled cheque OR bank statement
4. Business proof (one of these):
   - GST Certificate
   - Shop & Establishment Certificate
   - Udyog Aadhaar
   - Partnership Deed
5. Business address proof:
   - Electricity bill
   - Rent agreement
   - Property tax receipt

**Submit KYC:**
1. Login to Razorpay Dashboard
2. Go to: **Settings** → **Account & Settings**
3. Click **"Complete KYC"**
4. Upload documents
5. Submit for review
6. Wait 1-2 business days for approval

### Step 2: Get Live API Keys

**After KYC Approval:**
1. Toggle **"Live Mode"** (top left) to **ON**
2. Go to: **Settings** → **API Keys**
3. Click **"Generate Live Key"**
4. Copy the **Live Key ID** (starts with `rzp_live_`)

### Step 3: Update Config with Live Key

1. Open `js/config.js`
2. Replace test key with live key:
   ```javascript
   keyId: 'rzp_live_YOUR_LIVE_KEY_HERE',
   ```
3. Save and push to GitHub

### Step 4: Test with Real Payment

1. Make a small test purchase (₹10)
2. Use your real card/UPI
3. Verify payment appears in Razorpay Dashboard
4. Verify WhatsApp notification received

### Step 5: Announce to Customers

You're now accepting live payments! 🎉

---

## 💰 Transaction Fees

- **Razorpay Fee:** 2% per transaction
- Example: Customer pays ₹1000 → You receive ₹980
- **Settlement:** Money reaches bank in 2 working days

---

## 🔒 Security

### What's Exposed (Safe)
- ✅ Razorpay Key ID (`rzp_test_xxx` or `rzp_live_xxx`)
  - This is meant to be public
  - Safe to commit to GitHub
  - Used in frontend

### What's Never Exposed (Critical)
- ❌ Razorpay Key Secret
  - NEVER put in frontend code
  - NEVER commit to GitHub
  - Only use in backend (if you add one later)

### Current Setup Security
- ✅ HTTPS enforced (GitHub Pages)
- ✅ No key secrets exposed
- ✅ Razorpay handles all payment processing
- ✅ No card details stored on your site
- ✅ PCI DSS compliant (Razorpay's responsibility)

---

## 📱 How It Works

### Customer Journey

1. **Add products to cart**
2. **Click "Proceed to Checkout"**
3. **Payment options modal appears:**
   - Option 1: Pay Online (Razorpay)
   - Option 2: Cash on Delivery (WhatsApp)
4. **If "Pay Online" selected:**
   - Razorpay checkout opens
   - Customer enters card/UPI details
   - Payment processed
   - Success modal shows payment ID
   - WhatsApp opens with order confirmation
   - Cart clears automatically
5. **If "Cash on Delivery" selected:**
   - WhatsApp opens with order details
   - Customer sends message
   - Traditional COD flow

### Business Owner Journey (After Payment)

1. **Razorpay Dashboard Notification:**
   - Login: https://dashboard.razorpay.com/
   - See payment immediately
   - View customer details

2. **WhatsApp Message:**
   - Automatic message sent to your number
   - Includes payment ID (for paid orders)
   - Includes order details
   - Clear indicator: PAID ONLINE vs COD

3. **Prepare Shipping:**
   - For paid orders: Payment already received
   - For COD: Confirm with customer first

4. **Settlement:**
   - Money auto-transferred to bank
   - T+2 days (2 working days)

---

## 🎨 Customization

### Change Theme Color

Edit `js/config.js`:
```javascript
themeColor: '#F37254',  // Change to your brand color
```

### Change Business Name/Logo

Edit `js/config.js`:
```javascript
businessName: 'DevPooja',  // Your business name
businessLogo: 'https://yoursite.com/logo.png',  // Your logo URL
```

### Disable Razorpay Temporarily

Edit `js/config.js`:
```javascript
features: {
    enableRazorpay: false,  // Set to false to disable
    enableWhatsAppCheckout: true
}
```

### Change WhatsApp Number

Edit `js/config.js`:
```javascript
whatsappNumber: '919067615208',  // Update this
```

---

## 🧪 Testing

### Test Cards

**Successful Payment:**
- **Card:** `4111 1111 1111 1111`
- **CVV:** `123`
- **Expiry:** `12/25`
- **Name:** Any name

**Failed Payment:**
- **Card:** `4000 0000 0000 0002`
- **CVV:** `123`
- **Expiry:** `12/25`

**Other Test Cards:**
- Mastercard: `5267 3181 8797 5449`
- Rupay: `6073 7491 8935 1234`

### Test UPI

- **UPI ID:** `success@razorpay`
- **PIN:** Any 4 digits

**Failed UPI:**
- **UPI ID:** `failure@razorpay`

### Test NetBanking

- Select any bank from dropdown
- Credentials will be auto-filled
- Click "Pay" to complete

---

## 📊 Viewing Payments

### Razorpay Dashboard

1. **Login:** https://dashboard.razorpay.com/
2. **View Payments:** Click "Payments" in sidebar
3. **Filter:**
   - By date range
   - By status (Success/Failed)
   - By payment method

### Payment Details

Each payment shows:
- Payment ID
- Customer details (if provided)
- Amount
- Payment method
- Order notes (cart items)
- Timestamp

### Download Reports

- Go to: **Reports** in sidebar
- Select date range
- Download Excel/CSV
- Use for accounting

---

## 💡 Tips & Best Practices

### For Testing
1. ✅ Test all payment methods (Card, UPI, NetBanking)
2. ✅ Test on mobile devices
3. ✅ Test payment failure scenarios
4. ✅ Verify WhatsApp messages received
5. ✅ Check Razorpay Dashboard shows payment

### For Production
1. ✅ Always verify payment ID in Dashboard before shipping
2. ✅ Save payment IDs for order tracking
3. ✅ Check Dashboard daily for settlements
4. ✅ Keep backup of transaction reports
5. ✅ Respond to failed payment customer queries

### For Refunds
1. Login to Razorpay Dashboard
2. Find the payment
3. Click "Refund" button
4. Enter refund amount
5. Add reason
6. Confirm refund
7. Money returns to customer in 5-7 days

---

## 🐛 Troubleshooting

### Razorpay Checkout Doesn't Open

**Issue:** Clicking "Pay Online" does nothing

**Solutions:**
1. Check browser console (F12) for errors
2. Verify Razorpay script loaded:
   - Open DevTools → Network tab
   - Search for "checkout.razorpay.com"
3. Verify Key ID is added in config.js
4. Clear browser cache and reload

### "Razorpay is not loaded" Error

**Issue:** Error message appears when clicking Pay Online

**Solutions:**
1. Check internet connection
2. Verify Razorpay script tag in HTML:
   ```html
   <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
   ```
3. Check if script is blocked by ad blocker
4. Try different browser

### Payment Success but No WhatsApp Message

**Issue:** Payment completed but WhatsApp didn't open

**Possible Reasons:**
1. Pop-up blocker prevented WhatsApp window
   - Allow pop-ups for your site
2. WhatsApp not installed on mobile
   - Opens WhatsApp Web instead
3. Browser blocked the redirect
   - Check browser settings

**Solution:**
- Payment is still successful in Razorpay
- Manually check Dashboard for payment details
- Contact customer for delivery address

### Test Mode Payments Not Showing

**Issue:** Made test payment but not in Dashboard

**Solution:**
1. Make sure "Test Mode" is enabled (toggle top left)
2. Test payments are separate from Live payments
3. Switch to Test Mode to see test payments

---

## 🚨 Common Issues

### Issue 1: Key ID Not Configured

**Symptom:** Only "Cash on Delivery" option shows

**Reason:** Razorpay Key ID not added to config.js

**Fix:**
```javascript
// In js/config.js
keyId: 'rzp_test_YOUR_KEY_HERE',  // Make sure this is filled
```

### Issue 2: Payment Modal Styling Issues

**Symptom:** Modal looks broken or unstyled

**Reason:** CSS not loaded properly

**Fix:**
1. Verify cart.css is loaded
2. Check browser console for CSS errors
3. Hard refresh (Ctrl+Shift+R)

### Issue 3: Amount Shows as ₹0

**Symptom:** Razorpay checkout shows ₹0

**Reason:** Cart total calculation issue

**Fix:**
1. Check products have valid prices
2. Verify cart.getTotal() returns number
3. Check browser console for errors

---

## 📞 Support

### Razorpay Support
- **Email:** support@razorpay.com
- **Phone:** +91-80-61813000
- **Live Chat:** Available in Dashboard
- **Docs:** https://razorpay.com/docs/

### Developer Support (Me!)
- For implementation issues
- For customization requests
- For debugging help

---

## 📈 Next Steps

### Short Term (Next Week)
1. ✅ Create Razorpay account
2. ✅ Add test key to config
3. ✅ Test with test cards
4. ✅ Submit KYC documents

### Medium Term (2-4 Weeks)
1. ✅ Get KYC approved
2. ✅ Switch to live keys
3. ✅ Start accepting real payments
4. ✅ Train team on Dashboard usage

### Long Term (Future)
1. Add admin panel orders section
2. Integrate automatic order tracking
3. Add email notifications
4. Generate invoices automatically
5. Add backend for automation

---

## ✅ Checklist

**Pre-Launch:**
- [ ] Razorpay account created
- [ ] Test key added to config.js
- [ ] Tested with test cards successfully
- [ ] Tested on mobile devices
- [ ] WhatsApp notifications working
- [ ] KYC documents submitted
- [ ] KYC approved

**Go Live:**
- [ ] Live key generated
- [ ] Live key added to config.js
- [ ] Tested with real payment (small amount)
- [ ] Verified payment in Dashboard
- [ ] Announced to customers

**Post-Launch:**
- [ ] Check Dashboard daily
- [ ] Process orders promptly
- [ ] Maintain payment records
- [ ] Handle refunds if needed

---

**Status:** ✅ Implementation Complete
**Next:** Add Razorpay Test Key ID to config.js
**Time Required:** 5 minutes
**Ready to Test!** 🚀
