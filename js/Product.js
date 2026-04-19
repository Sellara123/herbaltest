// Product Detail JavaScript

// Data gambar untuk setiap produk (SUB FOTO yang berbeda per produk)
const productGalleryData = {
    1: {
        main: 'https://imagizer.imageshack.com/img923/622/KjYf80.jpg',
        gallery: [
            'https://imagizer.imageshack.com/img922/637/s5du8W.png',      // Foto utama Madu
            'https://imagizer.imageshack.com/img922/9495/szR29F.jpg',      // Sub foto Madu 1
            'https://imagizer.imageshack.com/img923/7346/r50f6F.png',      // Sub foto Madu 2
            'https://imagizer.imageshack.com/img922/6064/NcUFXj.png'       // Sub foto Madu 3
        ],
        description: '<p><strong>Madu Alami Premium</strong> adalah madu murni yang dihasilkan oleh lebah dari nektar bunga-bunga pilihan. Madu ini diproses secara alami tanpa pemanasan berlebih untuk menjaga khasiat dan nutrisinya.</p><br><p><strong>Manfaat:</strong></p><ul><li>Meningkatkan sistem kekebalan tubuh</li><li>Membantu menyembuhkan luka dan infeksi</li><li>Menjaga kesehatan pencernaan</li><li>Sumber energi alami</li></ul><br><p><strong>Cara Konsumsi:</strong> 1-2 sendok makan per hari, dapat dicampur dengan air hangat atau teh.</p>'
    },
    2: {
        main: 'https://imagizer.imageshack.com/img923/7346/r50f6F.png',
        gallery: [
            'https://imagizer.imageshack.com/img923/7346/r50f6F.png',      // Foto utama Bawang Hitam
            'https://imagizer.imageshack.com/img922/9495/szR29F.jpg',      // Sub foto Bawang Hitam 1
            'https://imagizer.imageshack.com/img922/637/s5du8W.png',       // Sub foto Bawang Hitam 2
            'https://imagizer.imageshack.com/img922/6064/NcUFXj.png'       // Sub foto Bawang Hitam 3
        ],
        description: '<p><strong>Black Garlic (Bawang Hitam)</strong> adalah bawang putih biasa yang difermentasi dalam suhu dan kelembaban terkontrol selama beberapa minggu. Proses fermentasi ini mengubah warna bawang putih menjadi hitam dan menghasilkan rasa yang manis, tekstur yang lembut, serta meningkatkan kandungan antioksidannya hingga 2x lipat.</p><br><p><strong>Manfaat:</strong></p><ul><li>Meningkatkan daya tahan tubuh</li><li>Menjaga kesehatan jantung dan pembuluh darah</li><li>Membantu mengontrol kadar kolesterol</li><li>Antioksidan tinggi untuk anti-penuaan</li><li>Membantu detoksifikasi tubuh</li></ul><br><p><strong>Cara Konsumsi:</strong> Dapat dikonsumsi langsung 1-2 siung per hari atau dicampur dalam masakan.</p>'
    },
    3: {
        main: 'https://imagizer.imageshack.com/img922/6064/NcUFXj.png',
        gallery: [
            'https://imagizer.imageshack.com/img922/6064/NcUFXj.png',      // Foto utama Kunyit
            'https://imagizer.imageshack.com/img922/9495/szR29F.jpg',      // Sub foto Kunyit 1
            'https://imagizer.imageshack.com/img923/7346/r50f6F.png',      // Sub foto Kunyit 2
            'https://imagizer.imageshack.com/img922/637/s5du8W.png'        // Sub foto Kunyit 3
        ],
        description: '<p><strong>Kunyit Bubuk Organik</strong> terbuat dari kunyit segar pilihan yang dikeringkan dan digiling halus tanpa bahan tambahan apapun. Kunyit dikenal sebagai rempah dengan segudang manfaat kesehatan.</p><br><p><strong>Manfaat:</strong></p><ul><li>Anti-inflamasi alami (mengurangi peradangan)</li><li>Membantu mengatasi gangguan pencernaan</li><li>Meningkatkan fungsi hati</li><li>Menjaga kesehatan kulit dan mencegah jerawat</li><li>Membantu meredakan nyeri haid</li></ul><br><p><strong>Cara Konsumsi:</strong> Seduh 1/2 sendok teh dengan air hangat, tambahkan madu untuk rasa yang lebih nikmat.</p>'
    },
    4: {
        main: 'https://imagizer.imageshack.com/img922/3025/KTm2iB.png',
        gallery: [
            'https://imagizer.imageshack.com/img922/3025/KTm2iB.png',      // Foto utama Temulawak
            'https://imagizer.imageshack.com/img922/9495/szR29F.jpg',      // Sub foto Temulawak 1
            'https://imagizer.imageshack.com/img923/7346/r50f6F.png',      // Sub foto Temulawak 2
            'https://imagizer.imageshack.com/img922/6064/NcUFXj.png'       // Sub foto Temulawak 3
        ],
        description: '<p><strong>Temulawak Segar</strong> merupakan tanaman herbal asli Indonesia yang telah digunakan sejak zaman nenek moyang untuk menjaga kesehatan hati dan sistem pencernaan. Temulawak kami dipanen segar dari kebun organik.</p><br><p><strong>Manfaat:</strong></p><ul><li>Menjaga kesehatan hati (liver)</li><li>Meningkatkan nafsu makan</li><li>Membantu mengatasi gangguan pencernaan seperti maag</li><li>Mengurangi gejala rematik dan nyeri sendi</li><li>Membantu mengatasi masalah kulit</li></ul><br><p><strong>Cara Konsumsi:</strong> Dapat direbus untuk dibuat wedang atau dijadikan jamu tradisional. Iris tipis 2-3 cm, rebus dengan 2 gelas air hingga tersisa 1 gelas, tambahkan madu.</p>'
    }
};

// Variabel untuk tracking modal
let currentModalIndex = 0;
let currentProductImages = [];

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on product detail page
    if (window.location.pathname.includes('product-detail.html')) {
        loadProductDetail();
        setupModalEvents();
    }
    
    // Check if we're on catalog page
    if (window.location.pathname.includes('catalog.html')) {
        loadCatalogProducts();
        setupCatalogFilters();
    }
});

function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('kode-produk'));
    
    // Cari produk dari data utama (window.productsData atau products)
    let product = null;
    if (typeof window.productsData !== 'undefined') {
        product = window.productsData.find(p => p.id === productId);
    } else if (typeof products !== 'undefined') {
        product = products.find(p => p.id === productId);
    }
    
    if (product) {
        // Ambil data gallery spesifik untuk produk ini
        const galleryData = productGalleryData[productId] || {
            main: product.image,
            gallery: [product.image, product.image, product.image, product.image],
            description: `<p>${product.description}</p>`
        };
        
        // Update info produk
        document.getElementById('productName').textContent = product.name;
        document.getElementById('productPrice').innerHTML = `Rp ${product.price.toLocaleString('id-ID')}`;
        document.getElementById('productCategory').textContent = product.category || 'Herbal';
        
        // Set gambar utama
        const mainImage = document.getElementById('mainImage');
        if (mainImage) {
            mainImage.src = galleryData.main;
            mainImage.alt = product.name;
        }
        
        // Simpan gallery images untuk navigasi modal
        currentProductImages = galleryData.gallery;
        
        // Buat thumbnail gallery
        const galleryContainer = document.getElementById('galleryContainer');
        if (galleryContainer) {
            galleryContainer.innerHTML = galleryData.gallery.map((img, index) => `
                <img src="${img}" 
                     alt="${product.name} - Gambar ${index + 1}" 
                     class="gallery-thumb ${index === 0 ? 'active' : ''}" 
                     onclick="changeMainImage(this)"
                     data-fullimg="${img}">
            `).join('');
        }
        
        // Set deskripsi dengan HTML formatting
        const descElement = document.getElementById('productDescription');
        if (descElement) {
            descElement.innerHTML = galleryData.description;
        }
        
        // Set stok
        const stockElement = document.getElementById('productStock');
        if (stockElement) {
            stockElement.textContent = 'Tersedia';
        }
        
        // Simpan produk saat ini untuk keranjang
        window.currentProductDetail = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
        };
    } else {
        // Produk tidak ditemukan
        window.location.href = 'catalog.html';
    }
}

function changeQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    let quantity = parseInt(quantityInput.value);
    quantity += change;
    
    if (quantity < 1) quantity = 1;
    quantityInput.value = quantity;
}

function changeMainImage(element) {
    const mainImage = document.getElementById('mainImage');
    const imageSrc = element.getAttribute('data-fullimg') || element.src;
    
    if (mainImage && imageSrc) {
        mainImage.src = imageSrc;
    }
    
    // Update active thumbnail
    document.querySelectorAll('.gallery-thumb').forEach(thumb => {
        thumb.classList.remove('active');
    });
    element.classList.add('active');
}

function addToCartFromDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('kode-produk'));
    const quantity = parseInt(document.getElementById('quantity').value);
    
    // Cari produk dari data utama
    let product = null;
    if (typeof window.productsData !== 'undefined') {
        product = window.productsData.find(p => p.id === productId);
    } else if (typeof products !== 'undefined') {
        product = products.find(p => p.id === productId);
    }
    
    if (product) {
        const cartProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        };
        
        // Gunakan fungsi addToCart dari main.js
        if (typeof window.addToCart === 'function') {
            window.addToCart(cartProduct);
        } else {
            // Fallback jika fungsi tidak tersedia
            let cart = JSON.parse(localStorage.getItem('freshHerbalCart')) || [];
            const existingItem = cart.find(item => item.id === product.id);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push(cartProduct);
            }
            
            localStorage.setItem('freshHerbalCart', JSON.stringify(cart));
            
            if (typeof window.updateCartCount === 'function') {
                window.updateCartCount();
            }
            
            if (typeof window.showNotification === 'function') {
                window.showNotification(`${product.name} ditambahkan ke keranjang!`, 'success');
            } else {
                alert(`${product.name} ditambahkan ke keranjang!`);
            }
        }
    }
}

// ========== FUNGSI MODAL ZOOM GAMBAR ==========

function setupModalEvents() {
    // Close modal when clicking the close button
    const modalClose = document.querySelector('.modal-close');
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside the image
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Keyboard navigation for modal
    document.addEventListener('keydown', function(e) {
        const modal = document.getElementById('imageModal');
        if (modal && modal.style.display === 'flex') {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowLeft') {
                navigateModal(-1);
            } else if (e.key === 'ArrowRight') {
                navigateModal(1);
            }
        }
    });
}

function openModal() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const currentMainImage = document.getElementById('mainImage').src;
    
    // Find index of current image in gallery
    currentModalIndex = currentProductImages.findIndex(img => img === currentMainImage);
    if (currentModalIndex === -1) currentModalIndex = 0;
    
    if (modal && modalImg) {
        modal.style.display = 'flex';
        modalImg.src = currentProductImages[currentModalIndex];
        
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function navigateModal(direction) {
    currentModalIndex += direction;
    
    if (currentModalIndex < 0) {
        currentModalIndex = currentProductImages.length - 1;
    } else if (currentModalIndex >= currentProductImages.length) {
        currentModalIndex = 0;
    }
    
    const modalImg = document.getElementById('modalImage');
    if (modalImg) {
        modalImg.src = currentProductImages[currentModalIndex];
    }
}

// Expose functions to global scope
window.changeQuantity = changeQuantity;
window.changeMainImage = changeMainImage;
window.addToCartFromDetail = addToCartFromDetail;
window.openModal = openModal;
window.closeModal = closeModal;
window.navigateModal = navigateModal;

// Catalog Page Functions
function loadCatalogProducts(filteredProducts = null) {
    const container = document.getElementById('productsContainer');
    
    if (!container) return;
    
    // Ambil data produk dari window atau global
    let productsData = null;
    if (typeof window.productsData !== 'undefined') {
        productsData = window.productsData;
    } else if (typeof products !== 'undefined') {
        productsData = products;
    }
    
    if (!productsData) return;
    
    const productsToShow = filteredProducts || productsData;
    
    container.innerHTML = productsToShow.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-category">${product.category || 'Herbal'}</p>
                <p class="product-price">Rp ${product.price.toLocaleString('id-ID')}</p>
                <div class="product-actions">
                    <button onclick="viewProduct(${product.id})" class="btn btn-secondary">
                        <i class="fas fa-eye"></i> Detail
                    </button>
                    <button onclick="addToCartById(${product.id})" class="btn btn-primary">
                        <i class="fas fa-cart-plus"></i> Beli
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function addToCartById(productId) {
    let productsData = null;
    if (typeof window.productsData !== 'undefined') {
        productsData = window.productsData;
    } else if (typeof products !== 'undefined') {
        productsData = products;
    }
    
    const product = productsData?.find(p => p.id === productId);
    if (product && typeof window.addToCart === 'function') {
        window.addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
}

function setupCatalogFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const searchInput = document.getElementById('searchInput');
    const sortFilter = document.getElementById('sortFilter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', filterProducts);
    }
}

function filterProducts() {
    let productsData = null;
    if (typeof window.productsData !== 'undefined') {
        productsData = window.productsData;
    } else if (typeof products !== 'undefined') {
        productsData = products;
    }
    
    if (!productsData) return;
    
    const category = document.getElementById('categoryFilter')?.value || '';
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const sortBy = document.getElementById('sortFilter')?.value || 'name';
    
    let filtered = [...productsData];
    
    // Filter by category
    if (category) {
        filtered = filtered.filter(product => product.category === category);
    }
    
    // Filter by search term
    if (searchTerm) {
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            (product.description && product.description.toLowerCase().includes(searchTerm))
        );
    }
    
    // Sort products
    filtered.sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            default:
                return 0;
        }
    });
    
    loadCatalogProducts(filtered);
}

function viewProduct(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

// Expose catalog functions
window.viewProduct = viewProduct;
window.addToCartById = addToCartById;
