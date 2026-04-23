// Main JavaScript File for Fresh Herbal

// main.js - Tambahkan di bagian atas file atau di DOMContentLoaded

// Load products data terlebih dahulu
// Pastikan untuk memuat file products-data.js sebelum main.js

document.addEventListener('DOMContentLoaded', function() {
    // Load data produk dari productsDatabase jika ada
    if (typeof window.productsDatabase !== 'undefined') {
        window.productsData = window.productsDatabase;
    }
    
    // Initialize semua komponen
    initMobileMenu();
    initCart();
    loadFeaturedProducts();
    initForms();
    updateCartCount();
});

// Update fungsi loadFeaturedProducts untuk menggunakan slug
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featuredProducts');
    
    if (!featuredContainer) return;
    
    // Gunakan productsDatabase jika ada
    let products = window.productsDatabase || window.productsData || [];
    const featuredProducts = products.filter(product => product.featured).slice(0, 3);
    
    featuredContainer.innerHTML = featuredProducts.map(product => `
        <div class="product-card">
            <img src="${product.image_main || product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">Rp ${(product.price_discount || product.price).toLocaleString('id-ID')}</p>
                <div class="product-actions">
                    <button onclick="viewProductBySlug('${product.slug}')" class="btn btn-secondary">
                        <i class="fas fa-eye"></i> Detail
                    </button>
                    <button onclick="addToCartFromList(${product.id})" class="btn btn-primary">
                        <i class="fas fa-cart-plus"></i> Beli
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Fungsi view product menggunakan slug
function viewProductBySlug(slug) {
    window.location.href = `product-detail.html?name=${slug}`;
}

// Override viewProduct yang lama
window.viewProduct = function(productId) {
    // Cari produk berdasarkan id untuk mendapatkan slug
    let products = window.productsDatabase || window.productsData || [];
    const product = products.find(p => p.id === productId);
    if (product && product.slug) {
        viewProductBySlug(product.slug);
    } else {
        // Fallback ke cara lama
        window.location.href = `product-detail.html?kode-produk=${productId}`;
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initCart();
    loadFeaturedProducts();
    initForms();
    updateCartCount();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.main-nav');
    
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.main-nav') && !event.target.closest('.mobile-menu-btn')) {
                nav.classList.remove('active');
                menuBtn.querySelector('i').classList.remove('fa-times');
                menuBtn.querySelector('i').classList.add('fa-bars');
            }
        });
    }
}

// Cart Management
let cart = JSON.parse(localStorage.getItem('freshHerbalCart')) || [];

function initCart() {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('freshHerbalCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += product.quantity || 1;
    } else {
        cart.push({
            ...product,
            quantity: product.quantity || 1
        });
    }
    
    saveCart();
    updateCartCount();
    showNotification('Produk ditambahkan ke keranjang!', 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
}

function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

function saveCart() {
    localStorage.setItem('freshHerbalCart', JSON.stringify(cart));
}

// Make products available globally
window.productsData = [
    {
        id: 1,
        name: "Madu Alami Premium",
        category: "Bubuk",
        price: 85000,
        image: "https://imagizer.imageshack.com/img923/622/KjYf80.jpg",
        gallery: [
            "https://imagizer.imageshack.com/img922/637/s5du8W.png",
            "https://imagizer.imageshack.com/img922/9495/szR29F.jpg",
            "https://imagizer.imageshack.com/img923/7346/r50f6F.png",
            "https://imagizer.imageshack.com/img922/6064/NcUFXj.png"
        ],
        description: "<p><strong>Madu Alami Premium</strong> adalah madu murni yang dihasilkan oleh lebah dari nektar bunga-bunga pilihan. Madu ini diproses secara alami tanpa pemanasan berlebih untuk menjaga khasiat dan nutrisinya.</p><br><p><strong>Manfaat:</strong></p><ul><li>Meningkatkan sistem kekebalan tubuh</li><li>Membantu menyembuhkan luka dan infeksi</li><li>Menjaga kesehatan pencernaan</li><li>Sumber energi alami</li></ul><br><p><strong>Cara Konsumsi:</strong> 1-2 sendok makan per hari, dapat dicampur dengan air hangat atau teh.</p>",
        featured: true
    },
    {
        id: 2,
        name: "Black Garlic (Bawang Hitam)",
        category: "Rimpang",
        price: 120000,
        image: "https://imagizer.imageshack.com/img923/7346/r50f6F.png",
        gallery: [
            "https://imagizer.imageshack.com/img923/7346/r50f6F.png",
            "https://imagizer.imageshack.com/img922/9495/szR29F.jpg",
            "https://imagizer.imageshack.com/img922/637/s5du8W.png",
            "https://imagizer.imageshack.com/img922/6064/NcUFXj.png"
        ],
        description: "<p><strong>Black Garlic (Bawang Hitam)</strong> adalah bawang putih biasa yang difermentasi dalam suhu dan kelembaban terkontrol selama beberapa minggu. Proses fermentasi ini mengubah warna bawang putih menjadi hitam dan menghasilkan rasa yang manis, tekstur yang lembut, serta meningkatkan kandungan antioksidannya hingga 2x lipat.</p><br><p><strong>Manfaat:</strong></p><ul><li>Meningkatkan daya tahan tubuh</li><li>Menjaga kesehatan jantung dan pembuluh darah</li><li>Membantu mengontrol kadar kolesterol</li><li>Antioksidan tinggi untuk anti-penuaan</li><li>Membantu detoksifikasi tubuh</li></ul><br><p><strong>Cara Konsumsi:</strong> Dapat dikonsumsi langsung 1-2 siung per hari atau dicampur dalam masakan.</p>",
        featured: true
    },
    {
        id: 3,
        name: "Kunyit Bubuk Organik",
        category: "Bubuk",
        price: 45000,
        image: "https://imagizer.imageshack.com/img922/6064/NcUFXj.png",
        gallery: [
            "https://imagizer.imageshack.com/img922/6064/NcUFXj.png",
            "https://imagizer.imageshack.com/img922/9495/szR29F.jpg",
            "https://imagizer.imageshack.com/img923/7346/r50f6F.png",
            "https://imagizer.imageshack.com/img922/637/s5du8W.png"
        ],
        description: "<p><strong>Kunyit Bubuk Organik</strong> terbuat dari kunyit segar pilihan yang dikeringkan dan digiling halus tanpa bahan tambahan apapun. Kunyit dikenal sebagai rempah dengan segudang manfaat kesehatan.</p><br><p><strong>Manfaat:</strong></p><ul><li>Anti-inflamasi alami (mengurangi peradangan)</li><li>Membantu mengatasi gangguan pencernaan</li><li>Meningkatkan fungsi hati</li><li>Menjaga kesehatan kulit dan mencegah jerawat</li><li>Membantu meredakan nyeri haid</li></ul><br><p><strong>Cara Konsumsi:</strong> Seduh 1/2 sendok teh dengan air hangat, tambahkan madu untuk rasa yang lebih nikmat.</p>",
        featured: true
    },
    {
        id: 4,
        name: "Temulawak Segar",
        category: "Rimpang",
        price: 35000,
        image: "https://imagizer.imageshack.com/img922/3025/KTm2iB.png",
        gallery: [
            "https://imagizer.imageshack.com/img922/3025/KTm2iB.png",
            "https://imagizer.imageshack.com/img922/9495/szR29F.jpg",
            "https://imagizer.imageshack.com/img923/7346/r50f6F.png",
            "https://imagizer.imageshack.com/img922/6064/NcUFXj.png"
        ],
        description: "<p><strong>Temulawak Segar</strong> merupakan tanaman herbal asli Indonesia yang telah digunakan sejak zaman nenek moyang untuk menjaga kesehatan hati dan sistem pencernaan. Temulawak kami dipanen segar dari kebun organik.</p><br><p><strong>Manfaat:</strong></p><ul><li>Menjaga kesehatan hati (liver)</li><li>Meningkatkan nafsu makan</li><li>Membantu mengatasi gangguan pencernaan seperti maag</li><li>Mengurangi gejala rematik dan nyeri sendi</li><li>Membantu mengatasi masalah kulit</li></ul><br><p><strong>Cara Konsumsi:</strong> Dapat direbus untuk dibuat wedang atau dijadikan jamu tradisional. Iris tipis 2-3 cm, rebus dengan 2 gelas air hingga tersisa 1 gelas, tambahkan madu.</p>",
        featured: false
    }
];

// Load Featured Products
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featuredProducts');
    
    if (!featuredContainer) return;
    
    const featuredProducts = window.productsData.filter(product => product.featured).slice(0, 3);
    
    featuredContainer.innerHTML = featuredProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">Rp ${product.price.toLocaleString('id-ID')}</p>
                <div class="product-actions">
                    <button onclick="viewProduct(${product.id})" class="btn btn-secondary">
                        <i class="fas fa-eye"></i> Detail
                    </button>
                    <button onclick="addToCartFromList(${product.id})" class="btn btn-primary">
                        <i class="fas fa-cart-plus"></i> Beli
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// View Product Detail
function viewProduct(productId) {
    window.location.href = `product-detail.html?kode-produk=${productId}`;
}

// Add to Cart from Product List
function addToCartFromList(productId) {
    const product = window.productsData.find(p => p.id === productId);
    if (product) {
        addToCart(product);
    }
}

// Form Handling
function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                if (this.id === 'checkoutForm') {
                    processCheckout(this);
                } else {
                    this.submit();
                }
            }
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            showError(input, 'Field ini wajib diisi');
            isValid = false;
        } else {
            clearError(input);
            
            // Email validation
            if (input.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    showError(input, 'Format email tidak valid');
                    isValid = false;
                }
            }
            
            // Phone validation
            if (input.name === 'phone') {
                const phoneRegex = /^[0-9]{10,13}$/;
                if (!phoneRegex.test(input.value)) {
                    showError(input, 'Nomor telepon harus 10-13 digit angka');
                    isValid = false;
                }
            }
        }
    });
    
    return isValid;
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    let errorElement = formGroup.querySelector('.error-message');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    input.classList.add('error');
}

function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    input.classList.remove('error');
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        border-radius: 4px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS animation for notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .error {
        border-color: #f44336 !important;
    }
    
    .error-message {
        color: #f44336;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }
`;
document.head.appendChild(style);

// Export functions for use in other files
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.viewProduct = viewProduct;
window.showNotification = showNotification;
window.validateForm = validateForm;

// Add to cart function (for use throughout the site)
function addToCart(product) {
    // Get current cart
    let cart = JSON.parse(localStorage.getItem('freshHerbalCart')) || [];
    
    // Check if product already exists
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += product.quantity || 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: product.quantity || 1
        });
    }
    
    // Save to localStorage
    localStorage.setItem('freshHerbalCart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show notification
    showNotification(`${product.name} ditambahkan ke keranjang!`, 'success');
    
    // If we're on cart page, refresh cart display
    if (window.location.pathname.includes('cart.html')) {
        window.location.reload();
    }
}

// Update cart count function
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('freshHerbalCart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Update all cart count elements
    document.querySelectorAll('.cart-count').forEach(element => {
        element.textContent = totalItems;
        element.style.display = totalItems > 0 ? 'inline-block' : 'none';
    });
}

// Get cart total function
function getCartTotal() {
    const cart = JSON.parse(localStorage.getItem('freshHerbalCart')) || [];
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal >= 200000 ? 0 : 15000;
    return {
        subtotal: subtotal,
        shipping: shipping,
        total: subtotal + shipping
    };
}
