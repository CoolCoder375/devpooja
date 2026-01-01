# Apps Script Debugging Guide

## 🐛 "No logs available" - What to Check

### Issue: Execution shows "No logs available for this execution"

This can happen because:
1. ✅ Script executed successfully but logs are delayed (Google's issue)
2. ❌ Script failed before reaching any Logger.log() calls
3. ❌ Script didn't execute at all

---

## ✅ Step-by-Step Debugging

### Step 1: Check if Script Actually Ran

**Look at the execution:**
- **Status:** Completed ✅ or Failed ❌?
- **Duration:** How long did it take?
- **Function:** What function was called?

**If Status = Completed:**
- Script ran successfully
- Logs might just be delayed
- **Check Google Sheet for Orders tab!**

**If Status = Failed:**
- Script had an error
- Need to add error handling

### Step 2: Add Enhanced Logging

**Replace the `addOrder` function with this version (better logging):**

```javascript
/**
 * Add a new order to the Orders sheet (Enhanced with logging)
 */
function addOrder(orderData) {
  console.log('=== addOrder START ===');
  console.log('Order Data received:', JSON.stringify(orderData));

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    console.log('Spreadsheet accessed:', ss.getName());

    let sheet = ss.getSheetByName('Orders');
    console.log('Orders sheet exists?', sheet !== null);

    // Create Orders sheet if it doesn't exist
    if (!sheet) {
      console.log('Creating new Orders sheet...');
      sheet = ss.insertSheet('Orders');
      console.log('Orders sheet created!');

      // Add headers
      sheet.appendRow([
        'Order ID',
        'Date',
        'Customer Name',
        'Phone',
        'Email',
        'Address',
        'Items',
        'Total',
        'Payment Method',
        'Payment ID',
        'Status'
      ]);
      console.log('Headers added');
    }

    // Prepare order items string
    console.log('Processing items...');
    const itemsStr = orderData.items.map(item =>
      `${item.name} (${item.quantity}x₹${item.price})`
    ).join(' | ');
    console.log('Items string:', itemsStr);

    // Create new row
    const newRow = [
      orderData.orderId,
      new Date(orderData.timestamp),
      orderData.customer.name,
      orderData.customer.phone,
      orderData.customer.email || '',
      orderData.deliveryAddress,
      itemsStr,
      orderData.total,
      orderData.paymentMethod,
      orderData.paymentId || '',
      orderData.status
    ];
    console.log('New row prepared, appending...');

    // Append row to sheet
    sheet.appendRow(newRow);
    console.log('Row appended successfully!');

    console.log('=== addOrder SUCCESS ===');

    return {
      message: 'Order added successfully',
      orderId: orderData.orderId
    };

  } catch (error) {
    console.error('=== addOrder ERROR ===');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    throw error;
  }
}
```

**Note:** Uses `console.log()` instead of `Logger.log()` - shows up faster!

### Step 3: Run Manual Test

**Add this test function:**

```javascript
function manualTestOrder() {
  console.log('Starting manual test...');

  const testOrder = {
    orderId: 'ORD-MANUAL-TEST-' + Date.now(),
    timestamp: new Date().toISOString(),
    customer: {
      name: 'Manual Test Customer',
      phone: '9876543210',
      email: 'test@manual.com'
    },
    deliveryAddress: 'Test Address, Test City, Test State - 123456',
    items: [
      {
        name: 'Test Product 1',
        quantity: 2,
        price: 299
      },
      {
        name: 'Test Product 2',
        quantity: 1,
        price: 499
      }
    ],
    total: 1097,
    paymentMethod: 'COD',
    paymentId: null,
    status: 'Pending'
  };

  console.log('Test order created:', testOrder);

  try {
    const result = addOrder(testOrder);
    console.log('Result:', result);
    console.log('✅ TEST PASSED - Check your Google Sheet for Orders tab!');
    return result;
  } catch (error) {
    console.error('❌ TEST FAILED');
    console.error(error);
    throw error;
  }
}
```

**How to run:**
1. Save the script (💾)
2. Select function: `manualTestOrder`
3. Click **Run** ▶️
4. **Check Google Sheet immediately!**

### Step 4: Check Console Logs

**In Apps Script:**
1. Click **View → Logs** (or Ctrl+Enter)
2. Should see detailed logs:
   ```
   Starting manual test...
   === addOrder START ===
   Spreadsheet accessed: Your Sheet Name
   Creating new Orders sheet...
   Orders sheet created!
   Headers added
   ...
   ✅ TEST PASSED
   ```

**Or in Executions:**
1. View → Executions
2. Click the latest execution
3. Click **Logs** tab (if available)

---

## 🎯 What Each Status Means

### "No logs available" + Status: Completed
**Meaning:**
- ✅ Script ran successfully
- ✅ Order probably saved
- ⚠️ Logs just delayed

**What to do:**
- Check Google Sheet for Orders tab
- Wait 1-2 minutes, refresh execution logs
- If Orders tab exists → It worked!

### "No logs available" + Status: Failed
**Meaning:**
- ❌ Script crashed before any logs
- ❌ Probably a syntax error

**What to do:**
- Click the failed execution
- Look for error message
- Common errors:
  - "ReferenceError: addOrder is not defined" → Function not in script
  - "TypeError: Cannot read property..." → Data structure issue

### No executions listed at all
**Meaning:**
- ❌ Script never ran
- ❌ Request didn't reach Apps Script

**What to do:**
- Check `js/config.js` has `appsScriptUrl`
- Verify Apps Script deployment URL
- Check browser console for errors

---

## 🔧 Common Issues & Fixes

### Issue 1: "Script function not found: doPost"

**Cause:** Apps Script not deployed as Web App

**Fix:**
1. Click **Deploy → Manage deployments**
2. Verify deployment type is "Web app"
3. Re-deploy if needed

### Issue 2: Orders tab created but empty

**Cause:** Headers added but data row failed

**Fix:**
- Check execution logs for error after "Headers added"
- Likely data format issue

### Issue 3: Multiple Orders tabs created

**Cause:** Tab name mismatch (case sensitive)

**Fix:**
```javascript
// Make sure it's exactly "Orders" (capital O)
let sheet = ss.getSheetByName('Orders');
```

---

## 📊 Expected Results

### After Running manualTestOrder():

**In Google Sheet:**
- ✅ New tab: "Orders"
- ✅ Header row: Order ID | Date | Customer Name | ...
- ✅ Data row: ORD-MANUAL-TEST-... | Today's date | Manual Test Customer | ...

**In Apps Script Logs:**
```
Starting manual test...
=== addOrder START ===
Spreadsheet accessed: [Your Sheet Name]
Orders sheet exists? false
Creating new Orders sheet...
Orders sheet created!
Headers added
Processing items...
Items string: Test Product 1 (2x₹299) | Test Product 2 (1x₹499)
New row prepared, appending...
Row appended successfully!
=== addOrder SUCCESS ===
✅ TEST PASSED - Check your Google Sheet for Orders tab!
```

**In Executions:**
- Function: manualTestOrder
- Status: Completed ✅
- Duration: ~2-5 seconds

---

## 🚨 If Still No Logs After Manual Test

Try this alternative logging approach:

```javascript
function debugTest() {
  // This ALWAYS works
  SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName('Products')
    .getRange('A1')
    .setValue('DEBUG: Script is running at ' + new Date());

  // Now try order creation
  manualTestOrder();
}
```

**What this does:**
- Writes to cell A1 in Products sheet
- Proves script is actually running
- If you see the timestamp → Script works
- If not → Deployment issue

---

## ✅ Quick Checklist

Before moving forward, verify:

- [ ] Apps Script has `addOrder()` function (line 255+)
- [ ] Function uses `console.log()` not just `Logger.log()`
- [ ] `manualTestOrder()` function added
- [ ] Ran `manualTestOrder()` successfully
- [ ] Orders tab appeared in Google Sheet
- [ ] At least one test row in Orders tab
- [ ] Execution shows "Completed"

**Once manual test works, we can test from website!**
