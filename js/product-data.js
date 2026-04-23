// products-data.js
let productsDatabase = [];
let productsLoaded = false;

// Data produk default (fallback jika Firebase kosong)
const defaultProducts = [
    {
        id: "default1",
        name: "Madu Alami Premium",
        slug: "madu-alami-premium",
        category: "Madu",
        price: 85000,
        price_discount: null,
        stock: 25,
        sku: "FRH-MADU-001",
        rating: 4.8,
        image_main: "https://imagizer.imageshack.com/img923/622/KjYf80.jpg",
        gallery: [
            "https://imagizer.imageshack.com/img923/622/KjYf80.jpg",
            "https://imagizer.imageshack.com/img922/637/s5du8W.png",
            "https://imagizer.imageshack.com/img922/9495/szR29F.jpg",
            "https://imagizer.imageshack.com/img923/7346/r50f6F.png"
        ],
        description_short: "Madu alami murni dari nektar bunga pilihan.",
        description_full: "<p><strong>Madu Alami Premium</strong> adalah madu murni yang diproses secara alami.</p><p><strong>Manfaat:</strong> Meningkatkan imunitas, energi alami.</p>",
        orderonline_url: "https://wa.me/6285649589679?text=Saya%20ingin%20membeli%20Madu%20Alami%20Premium",
        featured: true
    },
    {
        id: "default2",
        name: "Black Garlic (Bawang Hitam)",
        slug: "bawang-hitam",
        category: "Bawang Hitam",
        price: 120000,
        price_discount: 99000,
        stock: 15,
        sku: "FRH-BG-002",
        rating: 4.9,
        image_main: "https://imagizer.imageshack.com/img923/7346/r50f6F.png",
        gallery: [
            "https://imagizer.imageshack.com/img923/7346/r50f6F.png",
            "https://imagizer.imageshack.com/img922/9495/szR29F.jpg",
            "https://imagizer.imageshack.com/img922/637/s5du8W.png"
        ],
        description_short: "Bawang putih fermentasi dengan antioksidan tinggi.",
        description_full: "<p><strong>Black Garlic</strong> adalah bawang putih fermentasi dengan antioksidan 2x lipat.</p><p><strong>Manfaat:</strong> Jantung, imunitas, anti-penuaan.</p>",
        orderonline_url: "https://wa.me/6285649589679?text=Saya%20ingin%20membeli%20Black%20Garlic",
        featured: true
    },
    {
        id: "default3",
        name: "Jahe Merah Instan",
        slug: "jahe-merah-instan",
        category: "Minuman",
        price: 55000,
        price_discount: 49000,
        stock: 50,
        sku: "FRH-JAHE-005",
        rating: 4.8,
        image_main: "https://imagizer.imageshack.com/img923/622/KjYf80.jpg",
        gallery: [
            "https://imagizer.imageshack.com/img923/622/KjYf80.jpg",
            "https://imagizer.imageshack.com/img922/637/s5du8W.png"
        ],
        description_short: "Jahe merah instan, hangatkan tubuh.",
        description_full: "<p><strong>Jahe Merah Instan</strong> praktis dan mudah diseduh.</p><p><strong>Manfaat:</strong> Menghangatkan tubuh, meningkatkan imun.</p>",
        orderonline_url: "https://wa.me/6285649589679?text=Saya%20ingin%20membeli%20Jahe%20Merah%20Instan",
        featured: true
    }
];

// Fungsi untuk load produk dari Firebase
async function loadProductsFromFirebase() {
    return new Promise((resolve) => {
        // Cek apakah Firebase sudah diinisialisasi
        if (typeof firebase === 'undefined') {
            console.warn('Firebase tidak terdeteksi, menggunakan data default');
            productsDatabase = [...defaultProducts];
            productsLoaded = true;
            resolve(productsDatabase);
            return;
        }
        
        const productsRef = firebase.database().ref('products');
        
        productsRef.once('value', (snapshot) => {
            const products = snapshot.val();
            productsDatabase = [];
            
            if (products && Object.keys(products).length > 0) {
                Object.keys(products).forEach(key => {
                    const product = products[key];
                    product.firebaseId = key;
                    product.id = key;
                    productsDatabase.push(product);
                });
                console.log(`✅ Loaded ${productsDatabase.length} products from Firebase`);
            } else {
                console.log('⚠️ No products in Firebase, using default data');
                productsDatabase = [...defaultProducts];
            }
            
            productsLoaded = true;
            resolve(productsDatabase);
        }, (error) => {
            console.error('Error loading from Firebase:', error);
            productsDatabase = [...defaultProducts];
            productsLoaded = true;
            resolve(productsDatabase);
        });
    });
}

// Fungsi get produk by slug
function getProductBySlug(slug) {
    if (!productsDatabase || productsDatabase.length === 0) {
        return null;
    }
    return productsDatabase.find(product => product.slug === slug) || null;
}

// Fungsi get semua produk
function getAllProducts() {
    return productsDatabase;
}

// Export ke window
window.productsDatabase = productsDatabase;
window.getProductBySlug = getProductBySlug;
window.getAllProducts = getAllProducts;
window.loadProductsFromFirebase = loadProductsFromFirebase;
window.defaultProducts = defaultProducts;
