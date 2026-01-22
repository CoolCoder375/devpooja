# Google Reviews Carousel - Setup Guide

Display Google reviews on your website using Google Sheets (free, unlimited reviews, full control).

---

## Step 1: Create Reviews Sheet

In your Google Spreadsheet, create a new sheet named `Reviews` with these columns:

| Column | Field | Example |
|--------|-------|---------|
| A | id | 1 |
| B | reviewer_name | Priya Sharma |
| C | rating | 5 |
| D | review_text | Excellent quality incense sticks! Fast delivery. |
| E | date | 2024-01-15 |
| F | avatar_url | (optional) URL to profile image |
| G | active | TRUE |

---

## Step 2: Copy Reviews from Google Business

1. Go to [Google Business Profile](https://business.google.com/)
2. Click on **Reviews**
3. For each review, copy:
   - Reviewer name
   - Star rating (1-5)
   - Review text
   - Date
4. Paste into your Reviews sheet

---

## Step 3: Update Apps Script (Code.gs)

Add this function to your existing Apps Script:

```javascript
// Get Reviews
function getReviews() {
  const sheet = ss.getSheetByName('Reviews');
  if (!sheet) {
    return JSON.stringify({ success: false, error: 'Reviews sheet not found' });
  }

  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const reviews = [];

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    // Only include active reviews
    if (row[6] === true || row[6] === 'TRUE') {
      reviews.push({
        id: row[0],
        reviewer_name: row[1],
        rating: row[2],
        review_text: row[3],
        date: row[4],
        avatar_url: row[5] || ''
      });
    }
  }

  return JSON.stringify({ success: true, data: reviews });
}
```

Update the `doGet` function to handle reviews:

```javascript
function doGet(e) {
  const action = e.parameter.action;

  switch(action) {
    // ... existing cases ...
    case 'getReviews':
      return ContentService.createTextOutput(getReviews())
        .setMimeType(ContentService.MimeType.JSON);
  }
}
```

**Redeploy Apps Script** after changes.

---

## Step 4: Add Reviews Section to Homepage

Add this HTML to `index.html` (after hero or featured products):

```html
<!-- Google Reviews Section -->
<section class="reviews-section">
    <div class="container">
        <h2 class="section-title">What Our Customers Say</h2>
        <div class="swiper reviews-swiper">
            <div class="swiper-wrapper" id="reviewsWrapper">
                <!-- Reviews loaded dynamically -->
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </div>
</section>
```

---

## Step 5: Add CSS (in index.css or common.css)

```css
/* Reviews Section */
.reviews-section {
    padding: 60px 0;
    background: #f8f9fa;
}

.reviews-swiper {
    padding: 20px 0 50px;
}

.review-card {
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    height: 100%;
    display: flex;
    flex-direction: column;
}

.review-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 15px;
}

.reviewer-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary-cyan), var(--primary-green));
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 18px;
}

.reviewer-avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
}

.reviewer-info h4 {
    margin: 0;
    font-size: 16px;
    color: #333;
}

.reviewer-info .date {
    font-size: 12px;
    color: #999;
}

.review-stars {
    color: #ffc107;
    font-size: 16px;
    margin-bottom: 12px;
}

.review-text {
    color: #555;
    font-size: 14px;
    line-height: 1.6;
    flex-grow: 1;
}

.google-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 15px;
    font-size: 12px;
    color: #999;
}

.google-badge img {
    height: 16px;
}
```

---

## Step 6: Add JavaScript (in index.js or separate file)

```javascript
// Load and display Google Reviews
async function loadGoogleReviews() {
    const wrapper = document.getElementById('reviewsWrapper');
    if (!wrapper) return;

    try {
        const response = await fetch(`${SHEETS_CONFIG.appsScriptUrl}?action=getReviews`);
        const result = await response.json();

        if (result.success && result.data.length > 0) {
            wrapper.innerHTML = result.data.map(review => renderReviewCard(review)).join('');

            // Initialize Swiper
            new Swiper('.reviews-swiper', {
                slidesPerView: 1,
                spaceBetween: 20,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                breakpoints: {
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }
            });
        }
    } catch (error) {
        console.error('Failed to load reviews:', error);
    }
}

function renderReviewCard(review) {
    const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    const initial = review.reviewer_name.charAt(0).toUpperCase();
    const avatarContent = review.avatar_url
        ? `<img src="${review.avatar_url}" alt="${review.reviewer_name}">`
        : initial;

    const formattedDate = new Date(review.date).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return `
        <div class="swiper-slide">
            <div class="review-card">
                <div class="review-header">
                    <div class="reviewer-avatar">${avatarContent}</div>
                    <div class="reviewer-info">
                        <h4>${review.reviewer_name}</h4>
                        <span class="date">${formattedDate}</span>
                    </div>
                </div>
                <div class="review-stars">${stars}</div>
                <p class="review-text">"${review.review_text}"</p>
                <div class="google-badge">
                    <img src="https://www.google.com/favicon.ico" alt="Google">
                    Posted on Google
                </div>
            </div>
        </div>
    `;
}

// Call on page load
document.addEventListener('DOMContentLoaded', loadGoogleReviews);
```

---

## Summary

| Component | File | Changes |
|-----------|------|---------|
| Database | Google Sheets | New "Reviews" sheet |
| Backend | Code.gs | Add `getReviews()` function |
| HTML | index.html | Add reviews section |
| CSS | index.css | Add review card styles |
| JS | index.js | Add fetch and render logic |

---

## Maintenance

- Add new reviews manually when they appear on Google
- Set `active` to FALSE to hide a review without deleting
- Reviews auto-rotate every 4 seconds
- Shows 1 card on mobile, 2 on tablet, 3 on desktop
