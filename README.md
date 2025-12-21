# DevPooja - Hindu Worship Essentials E-commerce Website

A modern, responsive e-commerce website for DevPooja, a Maharashtra-based export company selling Hindu worship essentials including incense, garlands, idols, diyas, and pooja items.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Product Catalog**: Browse products with category filtering
- **Shopping Cart**: Full-featured cart with persistent storage
- **WhatsApp Integration**: Direct checkout via WhatsApp
- **Google Sheets Integration**: Manage products via spreadsheet (no coding required!)
- **Smart Caching**: 5-minute cache for optimal performance
- **Fallback System**: Automatic fallback to JSON if Google Sheets is unavailable

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Carousel**: Swiper.js
- **Data Source**: Google Sheets API (with JSON fallback)
- **Storage**: localStorage for cart and cache
- **Fonts**: Google Fonts (Crimson Text, Noto Sans Devanagari)

## Project Structure

```
devpooja/
├── index.html              # Homepage
├── pages/
│   ├── products.html       # Products listing page
│   ├── about.html          # About page
│   └── contact.html        # Contact page
├── css/
│   ├── common.css          # Shared styles
│   ├── index.css           # Homepage styles
│   ├── products.css        # Products page styles
│   ├── cart.css            # Shopping cart styles
│   ├── about.css           # About page styles
│   └── contact.css         # Contact page styles
├── js/
│   ├── config.js           # Google Sheets API configuration (not in repo)
│   ├── config.example.js   # Configuration template
│   ├── products.js         # Product data management
│   └── cart.js             # Shopping cart functionality
├── data/
│   └── products.json       # Static product data (fallback)
├── docs/
│   └── SETUP_GUIDE.md      # Google Sheets setup instructions
├── images/                 # Brand assets
├── product_images/         # Product photos
└── svg/                    # SVG icons
```

## Google Sheets Integration

### What is it?

This website uses Google Sheets as a content management system for products. Non-technical users can add, edit, and remove products directly in a spreadsheet without touching any code.

### Key Benefits

- ✅ No coding required for product management
- ✅ Familiar spreadsheet interface
- ✅ Real-time updates (within 5 minutes)
- ✅ Collaborative editing
- ✅ Version history and change tracking
- ✅ Automatic fallback to JSON if API fails

### How It Works

1. Products are stored in a Google Sheet
2. Website fetches data via Google Sheets API
3. Data is cached for 5 minutes for performance
4. If API fails, automatically falls back to `data/products.json`

### Quick Start

1. Follow the **[Setup Guide](docs/SETUP_GUIDE.md)** to configure Google Sheets
2. Create your Google Sheet with product data
3. Update `js/config.js` with your API key and Spreadsheet ID
4. That's it! Manage products directly in the spreadsheet

## Installation

### Prerequisites

- A web server (local or remote)
- Google account (for Sheets integration)
- Modern web browser

### Basic Setup (Using JSON Only)

If you want to use the static JSON file without Google Sheets:

1. Clone or download this repository
2. Edit `data/products.json` to add your products
3. Deploy to your web server
4. Open in browser

### Advanced Setup (With Google Sheets)

For dynamic product management via Google Sheets:

1. Clone or download this repository
2. Follow the **[Setup Guide](docs/SETUP_GUIDE.md)** for Google Sheets integration
3. Create `js/config.js` from `js/config.example.js`
4. Add your Google API key and Spreadsheet ID
5. Deploy to your web server
6. Manage products via Google Sheets

## Managing Products

### Via Google Sheets (Recommended)

See the **[Setup Guide](docs/SETUP_GUIDE.md)** for detailed instructions.

**Sheet Columns:**

| Column | Description | Example |
|--------|-------------|---------|
| id | Unique product ID | 1 |
| name | Product name | "Sandalwood Incense Sticks" |
| category | Category key | incense, garlands, idols, diyas, pooja-items, coconuts |
| price | Price (number only) | 199 |
| image | Full image URL | https://example.com/image.jpg |
| description | Product description | "Premium sandalwood..." |
| features | Pipe-separated features | "100% Natural\|Long burning\|Export quality" |
| quantity | Stock quantity | 100 |

### Via JSON File

Edit `data/products.json`:

```json
{
  "products": [
    {
      "id": 1,
      "name": "Product Name",
      "category": "category-key",
      "price": 199,
      "image": "https://...",
      "description": "Description here",
      "features": ["Feature 1", "Feature 2"],
      "quantity": 50
    }
  ],
  "categories": {
    "category-key": "Category Display Name"
  }
}
```

## Configuration

### Google Sheets Configuration

Create `js/config.js`:

```javascript
const SHEETS_CONFIG = {
    apiKey: 'YOUR_GOOGLE_API_KEY',
    spreadsheetId: 'YOUR_SPREADSHEET_ID',
    range: 'Products!A2:H'
};
```

See `js/config.example.js` for detailed documentation.

### Cache Duration

Default: 5 minutes

To change, edit `js/products.js`:

```javascript
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
```

## Features in Detail

### Shopping Cart

- Persistent storage using localStorage
- Add/remove items
- Update quantities
- View total price
- WhatsApp checkout integration

### Product Categories

- Incense & Dhoop
- Garlands & Flowers
- Idols & Statues
- Diyas & Lamps
- Pooja Items
- Coconuts & Fruits

### Responsive Design

- Mobile-first approach
- Hamburger menu for mobile
- Touch-friendly cart controls
- Optimized layouts for all screen sizes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Security Considerations

### API Key Protection

- `js/config.js` is in `.gitignore` (never committed)
- API key restrictions recommended in Google Cloud Console
- Read-only access to public spreadsheet

### Best Practices

1. Restrict API key to Google Sheets API only
2. Add HTTP referrer restrictions for your domain
3. Set usage quotas in Google Cloud Console
4. Keep sheet permissions to "Viewer" (read-only)

## Troubleshooting

### Products Not Loading

1. Check browser console for errors (F12)
2. Verify Google Sheets is publicly shared
3. Confirm API key is valid and has correct restrictions
4. Check if fallback to JSON is working

### Changes Not Appearing

- Wait up to 5 minutes for cache to expire
- Or manually clear cache in browser console:
  ```javascript
  localStorage.removeItem('devpooja_products_cache');
  ```

### More Help

See the **[Setup Guide](docs/SETUP_GUIDE.md)** for detailed troubleshooting.

## Development

### File Modifications

**To modify products:**
- Via Google Sheets (recommended)
- Or edit `data/products.json`

**To modify styles:**
- Edit CSS files in `css/` directory

**To modify functionality:**
- `js/products.js` - Product loading logic
- `js/cart.js` - Shopping cart functionality

### Adding New Pages

1. Create HTML file in `pages/` directory
2. Include common CSS: `../css/common.css`
3. Add navigation link in all pages
4. Use relative paths for assets (`../`)

## License

Proprietary - DevPooja Export Company

## Contact

For business inquiries:
- **Phone**: +91 9067615208
- **Email**: info@devpooja.com
- **Address**: Maharashtra, India

## Changelog

### v1.1.0 - Google Sheets Integration (Current)

- ✨ Added Google Sheets API integration
- ✨ Added product caching (5-minute TTL)
- ✨ Added automatic fallback to JSON
- ✨ Added quantity field to products
- ✨ Comprehensive setup documentation
- 🔧 Improved error handling and logging
- 🔧 Better code organization and documentation

### v1.0.0 - Initial Release

- 🎉 Homepage with hero section and featured products
- 🎉 Products page with category filtering
- 🎉 Shopping cart with WhatsApp integration
- 🎉 About and Contact pages
- 🎉 Responsive design for all devices
- 🎉 Static JSON product data

---

**Made with ❤️ for DevPooja Export Company**
