/**
 * Google Sheets API Configuration for DevPooja
 *
 * IMPORTANT: Replace the placeholder values with your actual credentials
 * See config.example.js for detailed setup instructions
 */

const SHEETS_CONFIG = {
    // Your Google API Key (for reading products)
    apiKey: 'AIzaSyDfsTaZyVzk2uu3sQeEPFhSca0Wk3adJKY',

    // Your Google Spreadsheet ID
    spreadsheetId: '1A4s3oVEamoZJxE-lDl9mDuT2iZhrQTueWu2VtrWwro8',

    // Data range (Sheet name and columns)
    range: 'Products!A2:H',

    // Apps Script Web App URL (for writing products from admin panel)
    // IMPORTANT: Deploy your Apps Script first, then paste the URL here
    // See docs/GOOGLE_SHEETS_APPS_SCRIPT.md for setup instructions
    appsScriptUrl: 'https://script.google.com/macros/s/AKfycbzy-c5y2lO1w-88kkuHSpUXegXDLLPTrG0rfP2ec6LtSKTkRdoj3SfYHuLZrdP8FtOu/exec'  // Example: 'https://script.google.com/macros/s/AKfycby.../exec'
};
