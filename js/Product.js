// product.js
let currentProductImages = [];
let currentModalIndex = 0;

document.addEventListener('DOMContentLoaded', async function() {
    if (window.location.pathname.includes('product-detail.html')) {
        // Load data dulu
        if (typeof loadProductsFromFirebase === 'function' && !window.productsLoaded) {
            await loadProductsFromFirebase();
        }
        loadProductDetailBySlug();
    }
});

async function loadProductDetailBySlug() {
    const urlParams = new URLSearchParams(window.location.search);
    const productSlug = urlParams.get('name');
    
    if (!productSlug) {
        console.error('No product slug provided');
        showNotification('Produk tidak ditemukan', 'error');
        setTimeout(() => {
            window.location.href = 'catalog.html';
        }, 2000);
        return;
    }
    
    // Pastikan data sudah load
    if (!window.productsLoaded && typeof loadProductsFromFirebase === 'function') {
        await loadProductsFromFirebase();
    }
    
    let product = null;
    if (window.productsDatabase && window.productsDatabase.length > 0) {
        product = window.productsDatabase.find(p => p.slug === productSlug);
    }
    
    if (product) {
        renderProductDetail(product);
        window.currentProductDetail = product;
    } else {
        console.error('Product not found:', productSlug);
        showNotification('Produk tidak ditemukan', 'error');
        setTimeout(() => {
            window.location.href = 'catalog.html';
        }, 2000);
    }
}

function renderProductDetail(product) {
    document.title = `${product.name} - Fresh Herbal`;
    
    // Set gambar utama
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = product.image_main || product.image || '';
        mainImage.alt = product.name;
    }
    
    // Set nama produk
    const productName = document.getElementById('productName');
    if (productName) productName.textContent = product.name;
    
    // Set harga
    const productPrice = document.getElementById('productPrice');
    if (productPrice) {
        if (product.price_discount && product.price_discount < product.price) {
            productPrice.innerHTML = `
                <span style="text-decoration: line-through; color: #999; font-size: 1rem;">Rp ${product.price.toLocaleString('id-ID')}</span><br>
                <span style="color: #e44d26; font-size: 1.8rem; font-weight: bold;">Rp ${product.price_discount.toLocaleString('id-ID')}</span>
                <span style="background: #e44d26; color: white; padding: 4px 8px; border-radius: 20px; font-size: 0.8rem; margin-left: 10px;">
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
        descElement.innerHTML = product.description_full || `<p>${product.description_short || ''}</p>`;
    }
    
    // Set kategori
    const categoryElement = document.getElementById('productCategory');
    if (categoryElement) categoryElement.textContent = product.category || 'Herbal';
    
    // Set stok
    const stockElement = document.getElementById('productStock');
    if (stockElement) {
        if (product.stock > 0) {
            stockElement.innerHTML = `<span style="color: #4caf50;">Tersedia (${product.stock} item)</span>`;
        } else {
            stockElement.innerHTML = '<span style="color: #f44336;">Stok Habis</span>';
        }
    }
    
    // Setup gallery
    setupProductGallery(product);
    setupModal();
}

function setupProductGallery(product) {
    const galleryContainer = document.getElementById('galleryContainer');
    const galleryImages = product.gallery && product.gallery.length > 0 
        ? product.gallery 
        : [product.image_main || product.image];
    
    window.currentProductImages = galleryImages;
    
    if (galleryContainer && galleryImages.length > 0) {
        galleryContainer.innerHTML = galleryImages.map((img, index) => `
            <img src="${img}" 
                 alt="${product.name}" 
                 class="gallery-thumb ${index === 0 ? 'active' : ''}" 
                 data-fullimg="${img}"
                 data-index="${index}"
                 style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; cursor: pointer; border: 2px solid ${index === 0 ? '#6baf3c' : '#ddd'}; margin-right: 8px;">
        `).join('');
        
        // Event listener untuk thumbnail
        document.querySelectorAll('.gallery-thumb').forEach(thumb => {
            thumb.removeEventListener('click', handleThumbClick);
            thumb.addEventListener('click', handleThumbClick);
        });
    }
}

function handleThumbClick(e) {
    e.stopPropagation();
    const thumb = this;
    const newImageSrc = thumb.getAttribute('data-fullimg');
    const mainImage = document.getElementById('mainImage');
    const index = parseInt(thumb.getAttribute('data-index'));
    
    if (mainImage && newImageSrc) {
        mainImage.src = newImageSrc;
        window.currentModalIndex = index;
    }
    
    // Update active class
    document.querySelectorAll('.gallery-thumb').forEach(t => {
        t.classList.remove('active');
        t.style.borderColor = '#ddd';
    });
    thumb.classList.add('active');
    thumb.style.borderColor = '#6baf3c';
}

function setupModal() {
    const modal = document.getElementById('imageModal');
    const mainImage = document.getElementById('mainImage');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    
    if (!modal || !mainImage) return;
    
    // Klik gambar utama -> buka modal
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
    
    // Klik di luar modal
    modal.onclick = function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    };
}

function navigateModalImage(direction) {
    const modalImg = document.getElementById('modalImage');
    const thumbs = document.querySelectorAll('.gallery-thumb');
    
    if (!modalImg || thumbs.length === 0) return;
    
    let newIndex = (window.currentModalIndex || 0) + direction;
    
    if (newIndex < 0) newIndex = thumbs.length - 1;
    if (newIndex >= thumbs.length) newIndex = 0;
    
    window.currentModalIndex = newIndex;
    const newSrc = thumbs[newIndex].getAttribute('data-fullimg');
    
    if (newSrc) {
        modalImg.src = newSrc;
        // Update main image juga
        const mainImage = document.getElementById('mainImage');
        if (mainImage) mainImage.src = newSrc;
        
        // Update active thumb
        document.querySelectorAll('.gallery-thumb').forEach((t, i) => {
            if (i === newIndex) {
                t.classList.add('active');
                t.style.borderColor = '#6baf3c';
            } else {
                t.classList.remove('active');
                t.style.borderColor = '#ddd';
            }
        });
    }
}

function buyNow() {
    const product = window.currentProductDetail;
    
    if (product && product.orderonline_url) {
        window.location.href = product.orderonline_url;
    } else if (product) {
        // Default ke WhatsApp
        const message = `Halo Fresh Herbal, saya ingin membeli ${product.name}`;
        window.location.href = `https://wa.me/6285649589679?text=${encodeURIComponent(message)}`;
    } else {
        alert('URL pemesanan tidak tersedia');
    }
}

function showNotification(message, type = 'success') {
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

// Export ke global
window.buyNow = buyNow;
window.navigateModalImage = navigateModalImage;
window.showNotification = showNotification;
