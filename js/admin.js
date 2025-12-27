// DevPooja Admin Panel JavaScript

// Configuration
let IMGBB_API_KEY = localStorage.getItem('imgbb_api_key') || '';
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123'; // TODO: Change this!

// Get Apps Script URL from config
function getAppsScriptUrl() {
    if (typeof SHEETS_CONFIG === 'undefined' || !SHEETS_CONFIG.appsScriptUrl) {
        return null;
    }
    return SHEETS_CONFIG.appsScriptUrl;
}

// State
let currentProducts = [];
let currentCustomers = [];
let currentOrders = [];
let editingProductId = null;

// ==========================================
// LOGIN / LOGOUT
// ==========================================

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        sessionStorage.setItem('adminLoggedIn', 'true');
        loadDashboard();
    } else {
        document.getElementById('loginError').style.display = 'block';
    }
}

function logout() {
    document.getElementById('loginContainer').style.display = 'flex';
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('loginForm').reset();
    sessionStorage.removeItem('adminLoggedIn');
}

// Check if already logged in
window.addEventListener('load', function() {
    if (sessionStorage.getItem('adminLoggedIn') === 'true') {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        loadDashboard();
    }
});

// ==========================================
// TAB SWITCHING
// ==========================================

function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');

    // Load tab data
    if (tabName === 'dashboard') loadDashboard();
    else if (tabName === 'products') loadProducts();
    else if (tabName === 'customers') loadCustomers();
    else if (tabName === 'orders') loadOrders();
}

// ==========================================
// DASHBOARD
// ==========================================

function loadDashboard() {
    // Wait for products to load from Google Sheets
    if (typeof products === 'undefined' || products.length === 0) {
        setTimeout(loadDashboard, 500);
        return;
    }

    currentProducts = products;

    // Update statistics
    document.getElementById('totalProducts').textContent = currentProducts.length;
    document.getElementById('totalCustomers').textContent = currentCustomers.length;
    document.getElementById('totalOrders').textContent = currentOrders.length;
    document.getElementById('pendingOrders').textContent = currentOrders.filter(o => o.status === 'pending').length;

    loadRecentOrders();
}

function loadRecentOrders() {
    const container = document.getElementById('recentOrders');

    if (currentOrders.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📦</div>
                <p>No orders yet</p>
                <p style="color: #999; font-size: 14px; margin-top: 10px;">Orders will appear here when customers place orders</p>
            </div>
        `;
    } else {
        // TODO: Show recent 5 orders in a table
        const recentOrders = currentOrders.slice(0, 5);
        let html = '<table class="data-table"><thead><tr><th>Order ID</th><th>Customer</th><th>Date</th><th>Total</th><th>Status</th></tr></thead><tbody>';

        recentOrders.forEach(order => {
            html += `
                <tr>
                    <td>#${order.id}</td>
                    <td>${order.customerName}</td>
                    <td>${order.date}</td>
                    <td>₹${order.total}</td>
                    <td><span class="badge badge-${order.status}">${order.status}</span></td>
                </tr>
            `;
        });

        html += '</tbody></table>';
        container.innerHTML = html;
    }
}

// ==========================================
// PRODUCT MANAGEMENT
// ==========================================

function showProductForm() {
    document.getElementById('productForm').classList.add('active');
    document.getElementById('formTitle').textContent = 'Add New Product';
    document.getElementById('productDataForm').reset();
    document.getElementById('productId').value = '';
    document.getElementById('imagePreview').style.display = 'none';
    editingProductId = null;
}

function hideProductForm() {
    document.getElementById('productForm').classList.remove('active');
    editingProductId = null;
}

function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            alert('Image size must be less than 10MB');
            event.target.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('previewImg').src = e.target.result;
            document.getElementById('imagePreview').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

async function uploadImageToImgBB(file) {
    if (!IMGBB_API_KEY || IMGBB_API_KEY === '') {
        alert('Please configure ImgBB API key in Settings tab first!');
        return null;
    }

    const formData = new FormData();
    formData.append('key', IMGBB_API_KEY);
    formData.append('image', file);

    try {
        showLoading('Uploading image...');

        const response = await fetch('https://api.imgbb.com/1/upload', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        hideLoading();

        if (result.success) {
            return result.data.url;
        } else {
            throw new Error(result.error.message || 'Image upload failed');
        }
    } catch (error) {
        hideLoading();
        console.error('Image upload error:', error);
        alert('Failed to upload image: ' + error.message);
        return null;
    }
}

async function saveProduct(event) {
    event.preventDefault();

    try {
        const name = document.getElementById('productName').value;
        const category = document.getElementById('productCategory').value;
        const price = parseFloat(document.getElementById('productPrice').value);
        const quantity = parseInt(document.getElementById('productQuantity').value);
        const description = document.getElementById('productDescription').value;
        const featuresStr = document.getElementById('productFeatures').value;
        const features = featuresStr ? featuresStr.split('|').map(f => f.trim()).filter(f => f) : [];

        let imageUrl = document.getElementById('productImageUrl').value;

        // Upload new image if selected
        const imageFile = document.getElementById('productImage').files[0];
        if (imageFile) {
            imageUrl = await uploadImageToImgBB(imageFile);
            if (!imageUrl) return; // Upload failed
        }

        if (!imageUrl) {
            alert('Please upload a product image');
            return;
        }

        // Create product object
        const productData = {
            name,
            category,
            price,
            quantity,
            description,
            features,
            image: imageUrl
        };

        // Save to Google Sheets via Apps Script
        if (editingProductId) {
            // Update existing product
            await postToAppsScript('update', productData, editingProductId);
            showSuccessMessage('Product updated successfully!');
        } else {
            // Add new product
            await postToAppsScript('add', productData);
            showSuccessMessage('Product added successfully!');
        }

        hideProductForm();

        // Reload products after a short delay to allow Sheets to update
        setTimeout(() => {
            loadProducts();
        }, 1000);

    } catch (error) {
        console.error('Save product error:', error);
        showErrorMessage(error.message);
    }
}

function loadProducts() {
    const container = document.getElementById('productsTable');

    // Wait for products to load from Google Sheets
    if (typeof products === 'undefined') {
        setTimeout(loadProducts, 500);
        return;
    }

    currentProducts = products;

    if (currentProducts.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📦</div>
                <p>No products found</p>
                <button class="btn-add" onclick="showProductForm()" style="margin-top: 20px;">Add First Product</button>
            </div>
        `;
        return;
    }

    let html = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    `;

    currentProducts.forEach(product => {
        const categoryName = categories[product.category] || product.category;
        html += `
            <tr>
                <td><img src="${product.image}" class="product-image-thumb" alt="${product.name}" onerror="this.src='https://via.placeholder.com/50'"></td>
                <td>${product.name}</td>
                <td>${categoryName}</td>
                <td>₹${product.price}</td>
                <td>${product.quantity || 0}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-edit" onclick="editProduct(${product.id})">Edit</button>
                        <button class="btn-delete" onclick="deleteProduct(${product.id})">Delete</button>
                    </div>
                </td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    container.innerHTML = html;
}

function editProduct(id) {
    const product = currentProducts.find(p => p.id === id);
    if (!product) return;

    editingProductId = id;

    document.getElementById('productForm').classList.add('active');
    document.getElementById('formTitle').textContent = 'Edit Product';
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productQuantity').value = product.quantity || 0;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productFeatures').value = Array.isArray(product.features) ? product.features.join('|') : '';
    document.getElementById('productImageUrl').value = product.image;

    if (product.image) {
        document.getElementById('previewImg').src = product.image;
        document.getElementById('imagePreview').style.display = 'block';
    }

    // Scroll to form
    document.getElementById('productForm').scrollIntoView({ behavior: 'smooth' });
}

async function deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
        // Delete from Google Sheets via Apps Script
        await postToAppsScript('delete', null, id);

        showSuccessMessage('Product deleted successfully!');

        // Reload products after a short delay
        setTimeout(() => {
            loadProducts();
        }, 1000);

    } catch (error) {
        console.error('Delete product error:', error);
        showErrorMessage(error.message);
    }
}

// ==========================================
// CUSTOMER MANAGEMENT
// ==========================================

function loadCustomers() {
    const container = document.getElementById('customersTable');

    // TODO: Load from Google Sheets "Customers" tab
    if (currentCustomers.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">👥</div>
                <p>No customers yet</p>
                <p style="color: #999; font-size: 14px; margin-top: 10px;">Customers will appear here when they register on your website</p>
            </div>
        `;
    } else {
        // Show customers table
        let html = '<table class="data-table"><thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Joined</th><th>Orders</th></tr></thead><tbody>';

        currentCustomers.forEach(customer => {
            html += `
                <tr>
                    <td>${customer.name}</td>
                    <td>${customer.email}</td>
                    <td>${customer.phone}</td>
                    <td>${customer.joinDate}</td>
                    <td>${customer.orderCount || 0}</td>
                </tr>
            `;
        });

        html += '</tbody></table>';
        container.innerHTML = html;
    }
}

// ==========================================
// ORDER MANAGEMENT
// ==========================================

function loadOrders() {
    const container = document.getElementById('ordersTable');

    // TODO: Load from Google Sheets "Orders" tab
    if (currentOrders.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🛒</div>
                <p>No orders yet</p>
                <p style="color: #999; font-size: 14px; margin-top: 10px;">Orders will appear here when customers place orders</p>
            </div>
        `;
    } else {
        // Show orders table
        let html = '<table class="data-table"><thead><tr><th>Order ID</th><th>Customer</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th><th>Actions</th></tr></thead><tbody>';

        currentOrders.forEach(order => {
            html += `
                <tr>
                    <td>#${order.id}</td>
                    <td>${order.customerName}</td>
                    <td>${order.date}</td>
                    <td>${order.itemCount}</td>
                    <td>₹${order.total}</td>
                    <td><span class="badge badge-${order.status}">${order.status}</span></td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-view" onclick="viewOrder(${order.id})">View</button>
                        </div>
                    </td>
                </tr>
            `;
        });

        html += '</tbody></table>';
        container.innerHTML = html;
    }
}

function viewOrder(id) {
    // TODO: Show order details modal
    alert('Order details for #' + id);
}

// ==========================================
// SETTINGS
// ==========================================

function saveSettings() {
    const imgbbKey = document.getElementById('imgbbApiKey').value;

    if (imgbbKey) {
        IMGBB_API_KEY = imgbbKey;
        localStorage.setItem('imgbb_api_key', imgbbKey);
        alert('Settings saved successfully!');
    } else {
        alert('Please enter an ImgBB API key');
    }
}

// Load saved settings
window.addEventListener('load', function() {
    const savedKey = localStorage.getItem('imgbb_api_key');
    if (savedKey) {
        IMGBB_API_KEY = savedKey;
        const keyInput = document.getElementById('imgbbApiKey');
        if (keyInput) {
            keyInput.value = savedKey;
        }
    }
});

// ==========================================
// GOOGLE APPS SCRIPT API
// ==========================================

/**
 * Post data to Google Apps Script Web App
 * @param {string} action - 'add', 'update', or 'delete'
 * @param {object} data - Product data
 * @param {number} id - Product ID (for update/delete)
 * @returns {Promise<object>} - Response from Apps Script
 */
async function postToAppsScript(action, data, id = null) {
    const appsScriptUrl = getAppsScriptUrl();

    if (!appsScriptUrl || appsScriptUrl === '') {
        throw new Error('Apps Script URL not configured. Please add it to config.js');
    }

    const payload = {
        action: action,
        data: data,
        id: id
    };

    showLoading('Saving to Google Sheets...');

    try {
        const response = await fetch(appsScriptUrl, {
            method: 'POST',
            mode: 'no-cors', // Apps Script requires no-cors mode
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        // Note: no-cors mode doesn't allow reading the response
        // We assume success if no error is thrown
        hideLoading();

        // Clear cache so products reload from sheet
        localStorage.removeItem('devpooja_products_cache');

        return { success: true };

    } catch (error) {
        hideLoading();
        console.error('Apps Script error:', error);
        throw new Error('Failed to save to Google Sheets: ' + error.message);
    }
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function showSuccessMessage(message) {
    const successMsg = document.getElementById('productSuccess');
    if (successMsg) {
        successMsg.textContent = '✅ ' + message;
        successMsg.style.display = 'block';
        setTimeout(() => successMsg.style.display = 'none', 5000);
    }
}

function showErrorMessage(message) {
    const successMsg = document.getElementById('productSuccess');
    if (successMsg) {
        successMsg.textContent = '❌ ' + message;
        successMsg.style.display = 'block';
        successMsg.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)';
        setTimeout(() => {
            successMsg.style.display = 'none';
            successMsg.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }, 5000);
    }
}

function showLoading(message) {
    // TODO: Implement global loading indicator
    console.log('Loading:', message);
}

function hideLoading() {
    // TODO: Hide global loading indicator
}

// ==========================================
// INIT ON PRODUCTS LOADED
// ==========================================

document.addEventListener('productsLoaded', function() {
    currentProducts = products;
    console.log('[Admin] Products loaded:', currentProducts.length);
});

console.log('[Admin Panel] Initialized');
