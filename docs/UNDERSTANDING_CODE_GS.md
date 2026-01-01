# Understanding Code.gs - Complete Explanation

## 📚 How Code.gs Works (Step by Step)

### 1. Entry Point: `doPost(e)`

When checkout page sends a POST request, this function runs first:

```javascript
function doPost(e) {
  try {
    // e.postData.contents has the JSON data sent from website
    const requestData = JSON.parse(e.postData.contents);
    const action = requestData.action; // 'add', 'update', 'delete', 'addOrder'

    Logger.log('Received request - Action: ' + action);
```

**What it does:**
- Receives POST request from website
- Parses JSON data
- Logs the action to execution log
- Routes to appropriate function

### 2. Routing: `switch(action)`

```javascript
    switch(action) {
      case 'add':
        result = addProduct(requestData.data);
        break;
      case 'update':
        result = updateProduct(requestData.id, requestData.data);
        break;
      case 'delete':
        result = deleteProduct(requestData.id);
        break;
      case 'addOrder':  // ← This is for orders!
        result = addOrder(requestData.data);
        break;
```

**What it does:**
- If action = 'add' → Calls `addProduct()`
- If action = 'update' → Calls `updateProduct()`
- If action = 'delete' → Calls `deleteProduct()`
- If action = 'addOrder' → Calls `addOrder()` ← **For checkout!**

### 3. Order Creation: `addOrder(orderData)`

```javascript
function addOrder(orderData) {
  // Step 1: Get the spreadsheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Step 2: Try to find 'Orders' sheet
  let sheet = ss.getSheetByName('Orders');

  // Step 3: If Orders sheet doesn't exist, CREATE IT!
  if (!sheet) {
    sheet = ss.insertSheet('Orders');  // Creates new tab

    // Add header row
    sheet.appendRow([
      'Order ID', 'Date', 'Customer Name', 'Phone',
      'Email', 'Address', 'Items', 'Total',
      'Payment Method', 'Payment ID', 'Status'
    ]);
  }
```

**What it does:**
1. Opens your Google Spreadsheet
2. Looks for a sheet named "Orders"
3. If not found → **Creates it automatically**
4. Adds header row with column names

```javascript
  // Step 4: Prepare order items as a string
  // Example: "Incense Sticks (2x₹299) | Brass Diya (1x₹499)"
  const itemsStr = orderData.items.map(item =>
    `${item.name} (${item.quantity}x₹${item.price})`
  ).join(' | ');
```

**What it does:**
- Converts array of items into a single string
- Format: "Product Name (Quantity x Price) | Next Product..."

```javascript
  // Step 5: Create new row with all order data
  const newRow = [
    orderData.orderId,           // ORD-1704197234567
    new Date(orderData.timestamp), // 02/01/2024 14:30:45
    orderData.customer.name,     // Rajesh Kumar
    orderData.customer.phone,    // 9876543210
    orderData.customer.email || '', // rajesh@example.com
    orderData.deliveryAddress,   // Full address string
    itemsStr,                    // Items list
    orderData.total,             // 1097
    orderData.paymentMethod,     // Online or COD
    orderData.paymentId || '',   // pay_ABC123 (if paid)
    orderData.status             // Paid or Pending
  ];

  // Step 6: Add the row to sheet
  sheet.appendRow(newRow);

  Logger.log('Order added successfully - Order ID: ' + orderData.orderId);
```

**What it does:**
- Creates array with all order details
- Appends it as a new row in Orders sheet
- Logs success message

---

## 🔍 Why Orders Tab Might Not Be Created

### Issue 1: Apps Script Not Updated/Redeployed

**Problem:** You updated Code.gs but didn't redeploy

**Solution:**

1. **Open Apps Script:**
   - Go to your Google Sheet
   - Extensions → Apps Script

2. **Check if `addOrder` function exists:**
   - Scroll down in Code.gs
   - Look for `function addOrder(orderData)`
   - If not there → Paste the updated code

3. **No need to redeploy!**
   - Just click **Save** (💾)
   - The deployment URL stays the same
   - Changes take effect immediately

### Issue 2: POST Request Not Reaching Script

**Problem:** Website can't send data to Apps Script

**Check:**

```javascript
// In js/checkout.js, this should be present:
async saveOrderToSheets(order) {
    if (typeof SHEETS_CONFIG === 'undefined' || !SHEETS_CONFIG.appsScriptUrl) {
        console.log('Apps Script not configured, skipping order save');
        return;  // ← Exits here if no URL!
    }
```

**Verify:**
1. Open `js/config.js`
2. Check if `appsScriptUrl` has your URL:
   ```javascript
   appsScriptUrl: 'https://script.google.com/macros/s/AKfycbzy.../exec'
   ```
3. If empty → Order won't be saved

### Issue 3: Request Failing (no-cors issue)

**Problem:** Using `mode: 'no-cors'` in checkout.js

```javascript
const response = await fetch(SHEETS_CONFIG.appsScriptUrl, {
    method: 'POST',
    mode: 'no-cors',  // ← This prevents reading response!
```

**What this means:**
- Request is sent to Apps Script
- Apps Script executes and creates order
- But website **can't read the response**
- We don't know if it succeeded or failed

**How to check if it worked:**

1. **Open Apps Script Execution Logs:**
   - Go to Apps Script editor
   - Click **View** → **Executions**
   - See if `doPost` ran recently
   - Check for errors

2. **Look at Logger output:**
   - In execution, click the execution
   - See logs like:
     ```
     Received request - Action: addOrder
     Order added successfully - Order ID: ORD-123...
     ```

---

## 🧪 Testing - What SHOULD Happen

### COD Flow (Step by Step):

**1. Customer fills form and clicks "Place Order"**

**2. checkout.js executes:**
```javascript
async processCODOrder() {
    // Creates order object
    const order = this.createOrderObject(null);

    // Tries to save to Google Sheets
    await this.saveOrderToSheets(order);

    // Opens WhatsApp
    this.sendWhatsAppNotification(order);

    // Shows success modal
    this.showOrderSuccess(order);

    // Clears cart
    localStorage.removeItem('devpooja_cart');
}
```

**3. saveOrderToSheets() sends POST:**
```javascript
fetch(SHEETS_CONFIG.appsScriptUrl, {
    method: 'POST',
    body: JSON.stringify({
        action: 'addOrder',  // ← This triggers addOrder() in Code.gs
        data: order          // ← Full order object
    })
})
```

**4. Apps Script receives and processes:**
```
doPost() receives request
  ↓
Parses JSON, sees action = 'addOrder'
  ↓
Calls addOrder(order)
  ↓
Checks if Orders sheet exists
  ↓
If not, creates it with headers
  ↓
Adds order as new row
  ↓
Returns success
```

**5. What you should see:**

**In Google Sheets:**
- New tab "Orders" (if first order)
- New row with order details

**In WhatsApp:**
- Message opens automatically

**On Website:**
- Success modal appears
- Cart clears

---

## 🐛 Debugging Steps

### Step 1: Check Apps Script Deployment

1. **Open Google Sheet**
2. **Extensions → Apps Script**
3. **Click Deploy → Manage deployments**
4. **Copy the Web app URL**
5. **Compare with `js/config.js`**
   - Should match exactly

### Step 2: Test Apps Script Manually

1. **In Apps Script, add test function:**

```javascript
function testAddOrder() {
  const testOrder = {
    orderId: 'ORD-TEST-123',
    timestamp: new Date().toISOString(),
    customer: {
      name: 'Test Customer',
      phone: '9876543210',
      email: 'test@example.com'
    },
    deliveryAddress: '123 Test Street, Test City, Test State - 123456',
    items: [
      { name: 'Test Product', quantity: 2, price: 299 }
    ],
    total: 598,
    paymentMethod: 'COD',
    paymentId: null,
    status: 'Pending'
  };

  const result = addOrder(testOrder);
  Logger.log(result);
}
```

2. **Save and run `testAddOrder`**
3. **Check if Orders tab is created**
4. **If yes → Apps Script works!**
5. **If no → Check error in execution log**

### Step 3: Check Browser Console

1. **Open checkout page**
2. **Press F12 (Developer Tools)**
3. **Go to Console tab**
4. **Place a test order**
5. **Look for messages:**
   - "Apps Script not configured" → URL missing
   - "Saving to Google Sheets..." → Request sent
   - Errors → Something failed

### Step 4: Check Apps Script Executions

1. **Go to Apps Script editor**
2. **Click View → Executions**
3. **Look for recent executions**
4. **Click on one to see:**
   - What action was called
   - If it succeeded
   - Any errors
   - Logger output

---

## ❓ Your Questions Answered

### Q1: After going to WhatsApp, should order be added to sheet?

**Answer:** YES! Here's the exact flow:

```
Customer clicks "Place Order"
  ↓
checkout.js calls saveOrderToSheets() FIRST
  ↓
POST request sent to Apps Script
  ↓
Apps Script creates/updates Orders tab
  ↓
THEN WhatsApp opens
  ↓
THEN success modal shows
```

**So the order is saved BEFORE WhatsApp opens!**

### Q2: Should it be reflected in admin panel?

**Answer:** NOT YET! Here's why:

**Current Status:**
- ✅ Order IS saved to Google Sheets
- ✅ You can see it in the "Orders" tab
- ❌ Admin panel doesn't have Orders section yet

**What we need to do:**
- Add "Orders" section to admin panel
- Read orders from Google Sheets
- Display them in a table
- Similar to Products section

**This is Phase 2** - We focused on checkout first!

---

## 🔧 Quick Fix Checklist

**If Orders tab is not being created, check:**

- [ ] Code.gs has `addOrder()` function (line 255+)
- [ ] Apps Script is saved (click Save button)
- [ ] `js/config.js` has `appsScriptUrl` filled
- [ ] Apps Script URL is correct
- [ ] Test with `testAddOrder()` function
- [ ] Check Apps Script execution logs
- [ ] Check browser console for errors

**Most likely issue:** Apps Script URL not configured in config.js

**Quick test:**
```javascript
// In browser console on checkout page
console.log(SHEETS_CONFIG.appsScriptUrl);
// Should show: https://script.google.com/macros/s/AKfycbzy.../exec
// If shows empty or undefined → That's the problem!
```

---

## 📝 Summary

**How it works:**
1. Customer places order → checkout.js sends POST to Apps Script
2. Apps Script's `doPost()` receives request
3. Routes to `addOrder()` based on action
4. `addOrder()` creates Orders tab if needed
5. Adds order as new row
6. Returns success (but we can't read it due to no-cors)

**Why you might not see Orders tab:**
1. Apps Script URL not in config.js (most likely!)
2. Apps Script not updated with new code
3. POST request failing (check execution logs)

**To verify it's working:**
- Check Apps Script → View → Executions
- Look for successful `doPost` calls
- See "Order added successfully" in logs

Want me to help you debug why the Orders tab isn't being created? Share:
1. Does `js/config.js` have the `appsScriptUrl`?
2. Did you update Code.gs in Apps Script?
3. Any errors in browser console when placing order?
