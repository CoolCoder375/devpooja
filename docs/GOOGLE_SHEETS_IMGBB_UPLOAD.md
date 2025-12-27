# Google Sheets Image Upload Script - ImgBB Version

This script adds an image upload button to your Google Sheet using ImgBB for reliable image hosting (no 403 errors!).

## Setup Instructions

### Step 1: Get ImgBB API Key (Free, 2 minutes)

1. Go to [ImgBB API](https://api.imgbb.com/)
2. Click **"Get API Key"**
3. Sign up with email (or use Google/Facebook)
4. Copy your API key (looks like: `a1b2c3d4e5f6g7h8i9j0`)
5. Keep it handy!

### Step 2: Open Apps Script

1. Open your Google Sheet
2. Click **Extensions** → **Apps Script**
3. Delete any existing code

### Step 3: Paste This Code

Copy and paste this entire script:

```javascript
// ========================================
// DevPooja Product Image Upload Script
// Using ImgBB API (Free, Reliable)
// ========================================

// IMPORTANT: Add your ImgBB API key here
const IMGBB_API_KEY = 'YOUR_IMGBB_API_KEY_HERE';

/**
 * Creates custom menu when spreadsheet opens
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('DevPooja')
    .addItem('📸 Upload Product Image', 'showUploadDialog')
    .addSeparator()
    .addItem('❓ Help', 'showHelp')
    .addItem('⚙️ Configure API Key', 'showApiKeyDialog')
    .addToUi();
}

/**
 * Shows API key configuration dialog
 */
function showApiKeyDialog() {
  const ui = SpreadsheetApp.getUi();
  const result = ui.prompt(
    'Configure ImgBB API Key',
    'Enter your ImgBB API key:\\n(Get it from: https://api.imgbb.com/)',
    ui.ButtonSet.OK_CANCEL
  );

  if (result.getSelectedButton() == ui.Button.OK) {
    const apiKey = result.getResponseText().trim();
    if (apiKey) {
      // Store in script properties
      PropertiesService.getScriptProperties().setProperty('IMGBB_API_KEY', apiKey);
      ui.alert('✅ API Key saved successfully!');
    }
  }
}

/**
 * Gets API key from script properties or constant
 */
function getApiKey() {
  let apiKey = PropertiesService.getScriptProperties().getProperty('IMGBB_API_KEY');
  if (!apiKey || apiKey === 'YOUR_IMGBB_API_KEY_HERE') {
    apiKey = IMGBB_API_KEY;
  }
  return apiKey;
}

/**
 * Shows the upload dialog
 */
function showUploadDialog() {
  const apiKey = getApiKey();

  if (!apiKey || apiKey === 'YOUR_IMGBB_API_KEY_HERE') {
    const ui = SpreadsheetApp.getUi();
    ui.alert(
      'API Key Required',
      'Please configure your ImgBB API key first.\\n\\n' +
      'Go to: DevPooja menu → Configure API Key\\n\\n' +
      'Get your free API key from: https://api.imgbb.com/',
      ui.ButtonSet.OK
    );
    return;
  }

  const html = HtmlService.createHtmlOutputFromFile('UploadDialog')
    .setWidth(500)
    .setHeight(450)
    .setTitle('Upload Product Image');
  SpreadsheetApp.getUi().showModalDialog(html, 'Upload Product Image');
}

/**
 * Shows help dialog
 */
function showHelp() {
  const ui = SpreadsheetApp.getUi();
  ui.alert(
    'How to Upload Images',
    '1. Get ImgBB API key from https://api.imgbb.com/\\n' +
    '2. Configure API key: DevPooja menu → Configure API Key\\n' +
    '3. Click a cell in the "image" column (Column E)\\n' +
    '4. Go to DevPooja menu → Upload Product Image\\n' +
    '5. Select an image file from your computer\\n' +
    '6. Wait for upload (2-5 seconds)\\n' +
    '7. Direct URL will be inserted automatically!\\n\\n' +
    'Supported formats: JPG, PNG, GIF, BMP\\n' +
    'Max size: 32MB (free tier)',
    ui.ButtonSet.OK
  );
}

/**
 * Uploads image to ImgBB and returns the direct URL
 */
function uploadToImgBB(base64Data, fileName) {
  try {
    const apiKey = getApiKey();

    if (!apiKey || apiKey === 'YOUR_IMGBB_API_KEY_HERE') {
      throw new Error('API key not configured');
    }

    // ImgBB API endpoint
    const url = 'https://api.imgbb.com/1/upload';

    // Remove data URL prefix if present
    const base64Clean = base64Data.replace(/^data:image\/\w+;base64,/, '');

    // Prepare form data
    const formData = {
      key: apiKey,
      image: base64Clean,
      name: fileName.replace(/\.[^/.]+$/, '') // Remove extension
    };

    // Make API request
    const options = {
      method: 'post',
      payload: formData,
      muteHttpExceptions: true
    };

    const response = UrlFetchApp.fetch(url, options);
    const result = JSON.parse(response.getContentText());

    if (result.success) {
      const imageUrl = result.data.url;

      // Insert URL into active cell
      const sheet = SpreadsheetApp.getActiveSheet();
      const activeCell = sheet.getActiveCell();
      activeCell.setValue(imageUrl);

      return {
        success: true,
        url: imageUrl,
        message: 'Image uploaded successfully!',
        deleteUrl: result.data.delete_url
      };
    } else {
      throw new Error(result.error.message || 'Upload failed');
    }

  } catch (error) {
    Logger.log('Upload error: ' + error.toString());
    return {
      success: false,
      message: 'Upload failed: ' + error.toString()
    };
  }
}

/**
 * Returns the API key to the client (for display only)
 */
function getApiKeyForDisplay() {
  const apiKey = getApiKey();
  if (!apiKey || apiKey === 'YOUR_IMGBB_API_KEY_HERE') {
    return null;
  }
  // Show only first and last 4 characters
  return apiKey.substring(0, 4) + '••••' + apiKey.substring(apiKey.length - 4);
}
```

### Step 4: Create the Upload Dialog HTML

1. In Apps Script editor, click **+** next to "Files"
2. Select **HTML**
3. Name it: `UploadDialog`
4. Delete default content
5. Paste this HTML:

```html
<!DOCTYPE html>
<html>
<head>
  <base target="_top">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      margin: 0;
    }

    .upload-container {
      background: white;
      padding: 30px;
      border-radius: 16px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    }

    h2 {
      color: #333;
      margin-top: 0;
      text-align: center;
      font-size: 24px;
    }

    .upload-area {
      border: 3px dashed #667eea;
      border-radius: 12px;
      padding: 40px 20px;
      margin: 20px 0;
      background: #f8f9ff;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .upload-area:hover {
      border-color: #764ba2;
      background: #f0f1ff;
      transform: translateY(-2px);
    }

    .upload-area.dragging {
      border-color: #764ba2;
      background: #e8e9ff;
      border-width: 4px;
    }

    #fileInput {
      display: none;
    }

    .btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 14px 32px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      margin: 10px 5px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
    }

    .btn:active {
      transform: translateY(0);
    }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    .btn-secondary {
      background: #6c757d;
      box-shadow: 0 4px 15px rgba(108, 117, 125, 0.4);
    }

    #status {
      margin-top: 20px;
      padding: 16px;
      border-radius: 8px;
      display: none;
      animation: slideIn 0.3s ease;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .success {
      background: #d4edda;
      color: #155724;
      border: 2px solid #28a745;
    }

    .error {
      background: #f8d7da;
      color: #721c24;
      border: 2px solid #dc3545;
    }

    .info {
      background: #d1ecf1;
      color: #0c5460;
      border: 2px solid #17a2b8;
    }

    .spinner {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #667eea;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin: 20px auto;
      display: none;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .file-info {
      color: #666;
      margin: 15px 0;
      font-size: 14px;
      text-align: center;
      padding: 10px;
      background: #f8f9fa;
      border-radius: 6px;
    }

    .icon {
      font-size: 64px;
      margin-bottom: 10px;
    }

    .upload-text {
      color: #333;
      margin: 10px 0;
    }

    .upload-hint {
      color: #6c757d;
      font-size: 14px;
      margin: 5px 0;
    }

    .upload-limit {
      color: #999;
      font-size: 12px;
      margin-top: 10px;
    }

    .button-group {
      text-align: center;
      margin-top: 20px;
    }

    .powered-by {
      text-align: center;
      margin-top: 20px;
      color: #999;
      font-size: 12px;
    }

    .powered-by a {
      color: #667eea;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="upload-container">
    <h2>📸 Upload Product Image</h2>

    <div class="upload-area" id="uploadArea" onclick="document.getElementById('fileInput').click()">
      <div class="icon">🖼️</div>
      <p class="upload-text"><strong>Click to select image</strong></p>
      <p class="upload-hint">or drag and drop here</p>
      <p class="upload-limit">Supported: JPG, PNG, GIF, BMP (Max 32MB)</p>
    </div>

    <input type="file" id="fileInput" accept="image/*" onchange="handleFileSelect(event)">

    <div class="file-info" id="fileInfo" style="display: none;"></div>

    <div class="spinner" id="spinner"></div>

    <div id="status"></div>

    <div class="button-group">
      <button class="btn" onclick="document.getElementById('fileInput').click()">
        📁 Select Image
      </button>
      <button class="btn btn-secondary" onclick="google.script.host.close()">
        ✖️ Close
      </button>
    </div>

    <div class="powered-by">
      Powered by <a href="https://imgbb.com" target="_blank">ImgBB</a>
    </div>
  </div>

  <script>
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const fileInfo = document.getElementById('fileInfo');
    const status = document.getElementById('status');
    const spinner = document.getElementById('spinner');

    // Drag and drop handlers
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('dragging');
    });

    uploadArea.addEventListener('dragleave', () => {
      uploadArea.classList.remove('dragging');
    });

    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('dragging');
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        processFile(file);
      } else {
        showStatus('❌ Please drop an image file', 'error');
      }
    });

    function handleFileSelect(event) {
      const file = event.target.files[0];
      if (file) {
        processFile(file);
      }
    }

    function processFile(file) {
      // Validate file
      if (!file.type.startsWith('image/')) {
        showStatus('❌ Please select an image file (JPG, PNG, GIF, or BMP)', 'error');
        return;
      }

      if (file.size > 32 * 1024 * 1024) {
        showStatus('❌ File too large. Maximum size is 32MB', 'error');
        return;
      }

      // Show file info
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      fileInfo.textContent = `📄 Selected: ${file.name} (${sizeInMB} MB)`;
      fileInfo.style.display = 'block';

      // Read file as base64
      const reader = new FileReader();
      reader.onload = function(e) {
        uploadFile(e.target.result, file.name);
      };
      reader.readAsDataURL(file);
    }

    function uploadFile(dataUrl, fileName) {
      // Show loading
      spinner.style.display = 'block';
      showStatus('⏳ Uploading image to ImgBB...', 'info');

      // Call server-side function
      google.script.run
        .withSuccessHandler(onUploadSuccess)
        .withFailureHandler(onUploadFailure)
        .uploadToImgBB(dataUrl, fileName);
    }

    function onUploadSuccess(result) {
      spinner.style.display = 'none';

      if (result.success) {
        showStatus(
          `✅ ${result.message}<br><br>` +
          `🔗 URL inserted into selected cell!<br>` +
          `<small style="color: #666; word-break: break-all;">${result.url}</small>`,
          'success'
        );
        fileInfo.style.display = 'none';

        // Auto-close after 3 seconds
        setTimeout(() => {
          google.script.host.close();
        }, 3000);
      } else {
        showStatus(`❌ ${result.message}`, 'error');
      }
    }

    function onUploadFailure(error) {
      spinner.style.display = 'none';
      showStatus(`❌ Upload failed: ${error.message}`, 'error');
    }

    function showStatus(message, type) {
      status.innerHTML = message;
      status.className = type;
      status.style.display = 'block';
    }
  </script>
</body>
</html>
```

### Step 5: Configure API Key

1. **Save** the script (💾 icon)
2. Name it: "DevPooja ImgBB Upload"
3. Click **Run** → Select `onOpen`
4. **Authorize** the script when prompted
5. Close Apps Script
6. **Refresh your Google Sheet**
7. You'll see **"DevPooja"** menu appear
8. Click **DevPooja** → **Configure API Key**
9. Paste your ImgBB API key
10. Click **OK**

## How to Use

1. Click a cell in **Column E** (image column)
2. Click **DevPooja** → **Upload Product Image**
3. Select or drag image
4. Wait 2-5 seconds
5. **Direct URL inserted!** ✅

## Why ImgBB is Better

✅ **No 403 errors** - Works perfectly for embedding
✅ **Fast** - Global CDN
✅ **Free** - 32MB per image, unlimited storage
✅ **Reliable** - 99.9% uptime
✅ **Direct links** - No permission issues

## Troubleshooting

**API Key error:**
- Make sure you got the key from https://api.imgbb.com/
- Copy the entire key (no spaces)

**Upload fails:**
- Check internet connection
- Try smaller image
- Check file format (JPG, PNG, GIF, BMP only)

**URL not inserting:**
- Make sure a cell is selected first
- Check Apps Script execution log

## Free Tier Limits

- ✅ 32MB max file size
- ✅ Unlimited storage
- ✅ No bandwidth limits
- ✅ No expiration
