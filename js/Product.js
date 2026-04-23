// product.js - Update untuk menggunakan slug dari URL

// Pastikan productsDatabase sudah di-load sebelumnya
// Jika menggunakan file terpisah, pastikan untuk memuat products-data.js terlebih dahulu

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('product-detail.html')) {
        loadProductDetailBySlug();
        setupModal();  // ✅ Ganti dengan setupModal
    }
    
    if (window.location.pathname.includes('catalog.html')) {
        if (typeof loadCatalogProducts === 'function') {
            loadCatalogProducts();
        }
        setupCatalogFilters();
    }
});

// Fungsi utama untuk load product detail berdasarkan slug dari URL
function loadProductDetailBySlug() {
    // Ambil parameter 'name' dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const productSlug = urlParams.get('name');
    
    if (!productSlug) {
        // Jika tidak ada slug, redirect ke catalog
        console.error('No product slug provided');
        window.location.href = 'catalog.html';
        return;
    }
    
    // Cari produk berdasarkan slug
    let product = null;
    
    // Cek apakah data produk tersedia dari window.productsDatabase
    if (typeof window.productsDatabase !== 'undefined') {
        product = window.productsDatabase.find(p => p.slug === productSlug);
    } 
    // Fallback ke window.productsData jika ada
    else if (typeof window.productsData !== 'undefined') {
        // Jika productsData masih menggunakan id, konversi ke slug search
        product = window.productsData.find(p => 
            p.slug === productSlug || 
            p.name.toLowerCase().replace(/\s+/g, '-') === productSlug
        );
    }
    
    if (product) {
        renderProductDetail(product);
        
        // Update meta tags untuk SEO (opsional)
        updateMetaTags(product);
        
        // Simpan produk saat ini untuk digunakan fungsi lain
        window.currentProductDetail = product;
    } else {
        // Produk tidak ditemukan
        console.error('Product not found:', productSlug);
        showNotification('Produk tidak ditemukan', 'error');
        
        // Redirect ke catalog setelah 2 detik
        setTimeout(() => {
            window.location.href = 'catalog.html';
        }, 2000);
    }
}

// Render product detail ke HTML
function renderProductDetail(product) {
    // Update judul halaman
    document.title = `${product.name} - Fresh Herbal`;
    
    // Set gambar utama
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = product.image_main || product.image;
        mainImage.alt = product.name;
    }
    
    // Set nama produk
    const productName = document.getElementById('productName');
    if (productName) productName.textContent = product.name;
    
    // Set harga (dengan diskon jika ada)
    const productPrice = document.getElementById('productPrice');
    if (productPrice) {
        if (product.price_discount) {
            productPrice.innerHTML = `
                <span class="original-price" style="text-decoration: line-through; color: #999; font-size: 1rem;">Rp ${product.price.toLocaleString('id-ID')}</span><br>
                <span class="discount-price" style="color: #e44d26; font-size: 1.8rem; font-weight: bold;">Rp ${product.price_discount.toLocaleString('id-ID')}</span>
                <span class="discount-badge" style="background: #e44d26; color: white; padding: 4px 8px; border-radius: 20px; font-size: 0.8rem; margin-left: 10px;">
                    Hemat ${Math.round((1 - product.price_discount/product.price) * 100)}%
                </span>
            `;
        } else {
            productPrice.innerHTML = `Rp ${product.price.toLocaleString('id-ID')}`;
        }
    }
    
    // Set deskripsi
    const descElement = document.getElementById('productDescription');
    if (descElement) {
        descElement.innerHTML = product.description_full || `<p>${product.description_short}</p>`;
    }
    
    // Set kategori
    const categoryElement = document.getElementById('productCategory');
    if (categoryElement) categoryElement.textContent = product.category;
    
    // Set stok
    const stockElement = document.getElementById('productStock');
    if (stockElement) {
        if (product.stock > 0) {
            stockElement.innerHTML = `<span style="color: #4caf50;">Tersedia (${product.stock} item)</span>`;
        } else {
            stockElement.innerHTML = '<span style="color: #f44336;">Stok Habis</span>';
            // Disable tombol beli jika stok habis
            const buyButton = document.querySelector('.btn-primary');
            if (buyButton) {
                buyButton.disabled = true;
                buyButton.style.opacity = '0.5';
                buyButton.style.cursor = 'not-allowed';
            }
        }
    }
    
    // Tampilkan informasi tambahan (opsional)
    renderAdditionalInfo(product);
    
    // Setup gallery images
    setupProductGallery(product);
}

// Render informasi tambahan produk
function renderAdditionalInfo(product) {
    // Buat container untuk informasi tambahan jika belum ada
    let infoContainer = document.querySelector('.product-additional-info');
    if (!infoContainer) {
        const productInfoDiv = document.querySelector('.product-info');
        if (productInfoDiv) {
            const productActions = document.querySelector('.product-actions');
            if (productActions) {
                infoContainer = document.createElement('div');
                infoContainer.className = 'product-additional-info';
                infoContainer.style.marginTop = '2rem';
                infoContainer.style.paddingTop = '1rem';
                infoContainer.style.borderTop = '1px solid #eee';
                productActions.insertAdjacentElement('afterend', infoContainer);
            }
        }
    }
    
    if (infoContainer) {
        infoContainer.innerHTML = `
            <div class="info-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem;">
                ${product.weight ? `
                <div class="info-item">
                    <i class="fas fa-weight-hanging" style="color: #6baf3c;"></i>
                    <strong>Berat:</strong> ${product.weight}
                </div>
                ` : ''}
                ${product.origin ? `
                <div class="info-item">
                    <i class="fas fa-map-marker-alt" style="color: #6baf3c;"></i>
                    <strong>Asal:</strong> ${product.origin}
                </div>
                ` : ''}
                ${product.sku ? `
                <div class="info-item">
                    <i class="fas fa-barcode" style="color: #6baf3c;"></i>
                    <strong>SKU:</strong> ${product.sku}
                </div>
                ` : ''}
                ${product.rating ? `
                <div class="info-item">
                    <i class="fas fa-star" style="color: #ffc107;"></i>
                    <strong>Rating:</strong> ${product.rating} / 5.0
                </div>
                ` : ''}
            </div>
            
            ${product.ingredients ? `
            <div class="ingredients-section" style="margin-top: 1.5rem;">
                <h4 style="color: #2d5016; margin-bottom: 0.5rem;">
                    <i class="fas fa-leaf"></i> Komposisi:
                </h4>
                <p>${product.ingredients}</p>
            </div>
            ` : ''}
            
            ${product.how_to_use ? `
            <div class="how-to-use-section" style="margin-top: 1.5rem;">
                <h4 style="color: #2d5016; margin-bottom: 0.5rem;">
                    <i class="fas fa-mortar-pestle"></i> Cara Penggunaan:
                </h4>
                <p>${product.how_to_use}</p>
            </div>
            ` : ''}
            
            ${product.storage ? `
            <div class="storage-section" style="margin-top: 1.5rem;">
                <h4 style="color: #2d5016; margin-bottom: 0.5rem;">
                    <i class="fas fa-box"></i> Cara Penyimpanan:
                </h4>
                <p>${product.storage}</p>
            </div>
            ` : ''}
            
            ${product.certificate ? `
            <div class="certificate-section" style="margin-top: 1.5rem; padding: 1rem; background: #f5f5f5; border-radius: 8px;">
                <i class="fas fa-certificate" style="color: #6baf3c;"></i>
                <strong>Sertifikasi:</strong> ${product.certificate}
            </div>
            ` : ''}
        `;
    }
}

// LINE 128-160 - KODE BARU (DIPERBAIKI)
function setupProductGallery(product) {
    const galleryContainer = document.getElementById('galleryContainer');
    const galleryImages = product.gallery || [product.image_main || product.image];
    
    if (galleryContainer && galleryImages.length > 0) {
        galleryContainer.innerHTML = galleryImages.map((img, index) => `
            <img src="${img}" 
                 alt="${product.name} - Gambar ${index + 1}" 
                 class="gallery-thumb ${index === 0 ? 'active' : ''}" 
                 data-fullimg="${img}"
                 data-index="${index}">
        `).join('');
        
        // Simpan untuk navigasi modal
        window.currentProductImages = galleryImages;
        
        // ========== PERBAIKAN: Event listener untuk thumbnail ==========
        // Hapus onclick dari HTML, gunakan event listener JavaScript
        document.querySelectorAll('.gallery-thumb').forEach(thumb => {
            thumb.removeEventListener('click', handleThumbClick);
            thumb.addEventListener('click', handleThumbClick);
        });
    }
}

// Fungsi untuk handle klik thumbnail (GANTI GAMBAR UTAMA, BUKAN POPUP)
function handleThumbClick(e) {
    e.stopPropagation();
    const thumb = this;
    const newImageSrc = thumb.getAttribute('data-fullimg');
    const mainImage = document.getElementById('mainImage');
    
    if (mainImage && newImageSrc) {
        mainImage.src = newImageSrc;
    }
    
    // Update active class
    document.querySelectorAll('.gallery-thumb').forEach(t => {
        t.classList.remove('active');
    });
    thumb.classList.add('active');
}

// Fungsi untuk setup modal (ZOOM gambar)
function setupModal() {
    const modal = document.getElementById('imageModal');
    const mainImage = document.getElementById('mainImage');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    
    if (!modal || !mainImage) return;
    
    // Hapus onclick dari HTML mainImage jika ada
    mainImage.removeAttribute('onclick');
    
    // Klik gambar utama -> buka modal (ZOOM)
    mainImage.onclick = function() {
        modal.style.display = 'flex';
        if (modalImg) {
            modalImg.src = mainImage.src;
        }
        document.body.style.overflow = 'hidden';
        
        // Cari index gambar saat ini
        const thumbs = document.querySelectorAll('.gallery-thumb');
        for (let i = 0; i < thumbs.length; i++) {
            if (thumbs[i].getAttribute('data-fullimg') === mainImage.src) {
                window.currentModalIndex = i;
                break;
            }
        }
    };
    
    // Tombol close
    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        };
    }
    
    // Tombol prev
    if (prevBtn) {
        prevBtn.onclick = function(e) {
            e.stopPropagation();
            navigateModalImage(-1);
        };
    }
    
    // Tombol next
    if (nextBtn) {
        nextBtn.onclick = function(e) {
            e.stopPropagation();
            navigateModalImage(1);
        };
    }
    
    // Klik di luar modal -> tutup
    modal.onclick = function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    };
    
    // Keyboard navigation
    document.removeEventListener('keydown', handleModalKeydown);
    document.addEventListener('keydown', handleModalKeydown);
}

// Navigasi gambar dalam modal
let currentModalIndex = 0;

function navigateModalImage(direction) {
    const modalImg = document.getElementById('modalImage');
    const thumbs = document.querySelectorAll('.gallery-thumb');
    
    if (!modalImg || thumbs.length === 0) return;
    
    currentModalIndex += direction;
    
    if (currentModalIndex < 0) {
        currentModalIndex = thumbs.length - 1;
    } else if (currentModalIndex >= thumbs.length) {
        currentModalIndex = 0;
    }
    
    const newSrc = thumbs[currentModalIndex].getAttribute('data-fullimg');
    if (newSrc) {
        modalImg.src = newSrc;
    }
}

// Keyboard handler untuk modal
function handleModalKeydown(e) {
    const modal = document.getElementById('imageModal');
    if (modal && modal.style.display === 'flex') {
        if (e.key === 'Escape') {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        } else if (e.key === 'ArrowLeft') {
            navigateModalImage(-1);
        } else if (e.key === 'ArrowRight') {
            navigateModalImage(1);
        }
    }
}

// Update meta tags untuk SEO
function updateMetaTags(product) {
    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
    }
    metaDesc.content = product.meta_description || product.description_short;
    
    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = `${product.name}, herbal, ${product.category}, kesehatan alami, fresh herbal`;
    
    // Update og:tags
    updateOrCreateMetaTag('property', 'og:title', product.name);
    updateOrCreateMetaTag('property', 'og:description', product.meta_description || product.description_short);
    updateOrCreateMetaTag('property', 'og:image', product.image_main || product.image);
    updateOrCreateMetaTag('property', 'og:url', window.location.href);
}

function updateOrCreateMetaTag(attr, attrValue, content) {
    let meta = document.querySelector(`meta[${attr}="${attrValue}"]`);
    if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, attrValue);
        document.head.appendChild(meta);
    }
    meta.content = content;
}

// Fungsi untuk menambah ke keranjang dari product detail
function addToCartFromDetail() {
    const product = window.currentProductDetail;
    const quantity = parseInt(document.getElementById('quantity')?.value || 1);
    
    if (product && product.stock > 0) {
        const cartProduct = {
            id: product.id,
            name: product.name,
            price: product.price_discount || product.price,
            image: product.image_main || product.image,
            slug: product.slug,
            quantity: quantity
        };
        
        // Gunakan fungsi global addToCart
        if (typeof window.addToCart === 'function') {
            window.addToCart(cartProduct);
        } else {
            // Fallback ke localStorage
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
            
            showNotification(`${product.name} ditambahkan ke keranjang!`, 'success');
        }
    } else if (product && product.stock === 0) {
        showNotification('Maaf, stok produk ini sedang habis', 'error');
    }
}

// Helper untuk show notification jika belum ada
function showNotification(message, type = 'success') {
    // Cek apakah fungsi global sudah ada
    if (typeof window.showNotification === 'function') {
        window.showNotification(message, type);
        return;
    }
    
    // Buat notification sederhana
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="background: none; border: none; color: white; cursor: pointer;">&times;</button>
    `;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 1000;
        display: flex;
        gap: 10px;
        align-items: center;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// Export fungsi ke global
window.loadProductDetailBySlug = loadProductDetailBySlug;
window.addToCartFromDetail = addToCartFromDetail;
window.renderProductDetail = renderProductDetail;

// Helper function untuk buat link produk dengan slug
function getProductUrl(productSlug) {
    return `product-detail.html?name=${productSlug}`;
}

// Function untuk generate semua link produk (digunakan di catalog atau sitemap)
function generateProductLinks() {
    if (typeof window.productsDatabase !== 'undefined') {
        return window.productsDatabase.map(product => ({
            name: product.name,
            url: getProductUrl(product.slug),
            slug: product.slug
        }));
    }
    return [];
}
