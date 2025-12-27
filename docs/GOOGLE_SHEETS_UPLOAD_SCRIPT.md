# Google Sheets Image Upload Script

This script adds an image upload button to your Google Sheet, allowing users to upload product images directly from the spreadsheet.

## Setup Instructions

### Step 1: Open Apps Script

1. Open your Google Sheet
2. Click **Extensions** → **Apps Script**
3. Delete any existing code in the editor

### Step 2: Paste the Code

Copy and paste this entire script:

```javascript
// ========================================
// DevPooja Product Image Upload Script
// ========================================

// Configuration
const FOLDER_NAME = 'DevPooja Product Images';

/**
 * Creates custom menu when spreadsheet opens
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('DevPooja')
    .addItem('Upload Product Image', 'showUploadDialog')
    .addSeparator()
    .addItem('Help', 'showHelp')
    .addToUi();
}

/**
 * Shows the upload dialog
 */
function showUploadDialog() {
  const html = HtmlService.createHtmlOutputFromFile('UploadDialog')
    .setWidth(500)
    .setHeight(400)
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
    '1. Click a cell in the "image" column (Column E)\\n' +
    '2. Go to DevPooja menu → Upload Product Image\\n' +
    '3. Select an image file from your computer\\n' +
    '4. Wait for upload to complete\\n' +
    '5. Direct URL will be inserted automatically!\\n\\n' +
    'Supported formats: JPG, PNG, GIF',
    ui.ButtonSet.OK
  );
}

/**
 * Gets or creates the product images folder in Google Drive
 */
function getOrCreateFolder() {
  const folders = DriveApp.getFoldersByName(FOLDER_NAME);

  if (folders.hasNext()) {
    return folders.next();
  } else {
    // Create folder and make it publicly accessible
    const folder = DriveApp.createFolder(FOLDER_NAME);
    folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return folder;
  }
}

/**
 * Uploads the image to Google Drive and returns the direct URL
 */
function uploadImage(base64Data, fileName, mimeType) {
  try {
    // Get or create the folder
    const folder = getOrCreateFolder();

    // Decode base64 and create blob
    const data = Utilities.base64Decode(base64Data);
    const blob = Utilities.newBlob(data, mimeType, fileName);

    // Upload file to folder
    const file = folder.createFile(blob);

    // Make file publicly accessible
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    // Get file ID
    const fileId = file.getId();

    // Create direct image URL
    const directUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;

    // Insert URL into active cell
    const sheet = SpreadsheetApp.getActiveSheet();
    const activeCell = sheet.getActiveCell();
    activeCell.setValue(directUrl);

    return {
      success: true,
      url: directUrl,
      message: 'Image uploaded successfully!'
    };

  } catch (error) {
    return {
      success: false,
      message: 'Upload failed: ' + error.toString()
    };
  }
}
```

### Step 3: Create the Upload Dialog HTML

1. In Apps Script editor, click **+** next to "Files"
2. Select **HTML**
3. Name it: `UploadDialog`
4. Delete the default content
5. Paste this HTML:

```html
<!DOCTYPE html>
<html>
<head>
  <base target="_top">
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      background: linear-gradient(135deg, #00bcd4, #4caf50);
      color: white;
    }

    .upload-container {
      background: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      text-align: center;
    }

    h2 {
      color: #333;
      margin-top: 0;
    }

    .upload-area {
      border: 3px dashed #00bcd4;
      border-radius: 8px;
      padding: 40px 20px;
      margin: 20px 0;
      background: #f5f5f5;
      cursor: pointer;
      transition: all 0.3s;
    }

    .upload-area:hover {
      border-color: #4caf50;
      background: #e8f5e9;
    }

    .upload-area.dragging {
      border-color: #4caf50;
      background: #c8e6c9;
    }

    #fileInput {
      display: none;
    }

    .btn {
      background: linear-gradient(135deg, #00bcd4, #4caf50);
      color: white;
      border: none;
      padding: 12px 30px;
      border-radius: 6px;
      font-size: 16px;
      cursor: pointer;
      margin: 10px 5px;
      transition: transform 0.2s;
    }

    .btn:hover {
      transform: translateY(-2px);
    }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    #status {
      margin-top: 20px;
      padding: 15px;
      border-radius: 6px;
      display: none;
    }

    .success {
      background: #c8e6c9;
      color: #2e7d32;
      border: 1px solid #4caf50;
    }

    .error {
      background: #ffcdd2;
      color: #c62828;
      border: 1px solid #f44336;
    }

    .info {
      background: #b3e5fc;
      color: #01579b;
      border: 1px solid #03a9f4;
    }

    .spinner {
      border: 3px solid #f3f3f3;
      border-top: 3px solid #00bcd4;
      border-radius: 50%;
      width: 30px;
      height: 30px;
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
      margin: 10px 0;
      font-size: 14px;
    }

    .icon {
      font-size: 48px;
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="upload-container">
    <h2>📸 Upload Product Image</h2>

    <div class="upload-area" id="uploadArea" onclick="document.getElementById('fileInput').click()">
      <div class="icon">📁</div>
      <p><strong>Click to select image</strong></p>
      <p style="color: #666; font-size: 14px;">or drag and drop here</p>
      <p style="color: #999; font-size: 12px;">Supported: JPG, PNG, GIF (Max 10MB)</p>
    </div>

    <input type="file" id="fileInput" accept="image/*" onchange="handleFileSelect(event)">

    <div class="file-info" id="fileInfo"></div>

    <div class="spinner" id="spinner"></div>

    <div id="status"></div>

    <button class="btn" onclick="document.getElementById('fileInput').click()">
      Select Image
    </button>
    <button class="btn" onclick="google.script.host.close()">
      Close
    </button>
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
        showStatus('Please drop an image file', 'error');
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
        showStatus('Please select an image file (JPG, PNG, or GIF)', 'error');
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        showStatus('File too large. Maximum size is 10MB', 'error');
        return;
      }

      // Show file info
      fileInfo.textContent = `Selected: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;

      // Read file as base64
      const reader = new FileReader();
      reader.onload = function(e) {
        uploadFile(e.target.result, file.name, file.type);
      };
      reader.readAsDataURL(file);
    }

    function uploadFile(dataUrl, fileName, mimeType) {
      // Show loading
      spinner.style.display = 'block';
      showStatus('Uploading image to Google Drive...', 'info');

      // Extract base64 data
      const base64Data = dataUrl.split(',')[1];

      // Call server-side function
      google.script.run
        .withSuccessHandler(onUploadSuccess)
        .withFailureHandler(onUploadFailure)
        .uploadImage(base64Data, fileName, mimeType);
    }

    function onUploadSuccess(result) {
      spinner.style.display = 'none';

      if (result.success) {
        showStatus(`✅ ${result.message}<br><br>URL inserted into selected cell!<br><small>${result.url}</small>`, 'success');
        fileInfo.textContent = '';

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

### Step 4: Save and Deploy

1. Click **💾 Save** icon
2. Name the project: "DevPooja Image Upload"
3. Click **Run** → Select `onOpen` function
4. Click **Run** (you'll need to authorize the script)
5. Grant permissions when prompted

### Step 5: Close and Reload Sheet

1. Close the Apps Script tab
2. **Refresh your Google Sheet**
3. You should see a new **"DevPooja"** menu in the menu bar!

## How to Use

### For Your Team:

1. **Open the Google Sheet**
2. **Click on a cell** in the "image" column (Column E)
3. **Click "DevPooja" menu** → **"Upload Product Image"**
4. **Select or drag image** file
5. **Wait for upload** (takes 2-5 seconds)
6. **URL automatically inserted** into the cell! ✅

## Features

✅ **Drag & Drop** - Drag images directly into upload dialog
✅ **Auto Upload to Google Drive** - Images stored in "DevPooja Product Images" folder
✅ **Direct URLs** - Gets direct image URL automatically
✅ **Auto Insert** - URL inserted into selected cell
✅ **File Validation** - Only allows image files, max 10MB
✅ **Beautiful UI** - User-friendly upload interface
✅ **Progress Indicator** - Shows upload status

## Troubleshooting

**Menu doesn't appear:**
- Refresh the sheet
- Make sure you authorized the script
- Run `onOpen` function manually in Apps Script

**Upload fails:**
- Check file size (must be < 10MB)
- Check file type (must be JPG, PNG, or GIF)
- Check internet connection

**URL doesn't insert:**
- Make sure a cell is selected before clicking upload
- Try clicking the cell again after upload

## Support

For issues, check:
1. Apps Script executions log (View → Executions)
2. Browser console (F12)
3. Script permissions (make sure all are granted)
