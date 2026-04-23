// products-data.js
// Data produk lengkap dengan slug untuk URL

const productsDatabase = [
    {
        id: 1,
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
            "https://imagizer.imageshack.com/img923/7346/r50f6F.png",
            "https://imagizer.imageshack.com/img922/6064/NcUFXj.png"
        ],
        description_short: "Madu alami murni dari nektar bunga pilihan, diproses tanpa pemanasan berlebih.",
        description_full: "<p><strong>Madu Alami Premium</strong> adalah madu murni yang dihasilkan oleh lebah dari nektar bunga-bunga pilihan. Madu ini diproses secara alami tanpa pemanasan berlebih untuk menjaga khasiat dan nutrisinya.</p><br><p><strong>Manfaat:</strong></p><ul><li>Meningkatkan sistem kekebalan tubuh</li><li>Membantu menyembuhkan luka dan infeksi</li><li>Menjaga kesehatan pencernaan</li><li>Sumber energi alami</li></ul><br><p><strong>Cara Konsumsi:</strong> 1-2 sendok makan per hari, dapat dicampur dengan air hangat atau teh.</p>",
        ingredients: "100% Madu Murni dari lebah Apis Mellifera",
        how_to_use: "Konsumsi 1-2 sendok makan per hari, bisa langsung atau dicampur air hangat/teh.",
        storage: "Simpan di tempat sejuk dan kering, hindari paparan sinar matahari langsung.",
        weight: "250 gram",
        origin: "Indonesia - Jawa Timur",
        certificate: "BPOM TR#123456789",
        featured: true,
        best_seller: true,
        meta_title: "Madu Alami Premium - Fresh Herbal",
        meta_description: "Madu alami murni untuk kesehatan keluarga. Meningkatkan imunitas, sumber energi alami."
    },
    {
        id: 2,
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
            "https://imagizer.imageshack.com/img922/637/s5du8W.png",
            "https://imagizer.imageshack.com/img922/6064/NcUFXj.png"
        ],
        description_short: "Bawang putih fermentasi dengan antioksidan tinggi, rasa manis dan tekstur lembut.",
        description_full: "<p><strong>Black Garlic (Bawang Hitam)</strong> adalah bawang putih biasa yang difermentasi dalam suhu dan kelembaban terkontrol selama beberapa minggu. Proses fermentasi ini mengubah warna bawang putih menjadi hitam dan menghasilkan rasa yang manis, tekstur yang lembut, serta meningkatkan kandungan antioksidannya hingga 2x lipat.</p><br><p><strong>Manfaat:</strong></p><ul><li>Meningkatkan daya tahan tubuh</li><li>Menjaga kesehatan jantung dan pembuluh darah</li><li>Membantu mengontrol kadar kolesterol</li><li>Antioksidan tinggi untuk anti-penuaan</li><li>Membantu detoksifikasi tubuh</li></ul><br><p><strong>Cara Konsumsi:</strong> Dapat dikonsumsi langsung 1-2 siung per hari atau dicampur dalam masakan.</p>",
        ingredients: "Bawang putih fermentasi 100%",
        how_to_use: "Konsumsi 1-2 siung per hari, bisa langsung atau dicampur masakan.",
        storage: "Simpan di suhu ruang, hindari kelembaban berlebih.",
        weight: "100 gram",
        origin: "Indonesia - Jawa Timur",
        certificate: "BPOM TR#987654321",
        featured: true,
        best_seller: true,
        meta_title: "Black Garlic Bawang Hitam - Fresh Herbal",
        meta_description: "Bawang hitam fermentasi dengan antioksidan tinggi untuk kesehatan jantung dan imunitas."
    },
    {
        id: 3,
        name: "Kunyit Bubuk Organik",
        slug: "kunyit-bubuk",
        category: "Bubuk",
        price: 45000,
        price_discount: 39900,
        stock: 40,
        sku: "FRH-KUNYIT-003",
        rating: 4.7,
        image_main: "https://imagizer.imageshack.com/img922/6064/NcUFXj.png",
        gallery: [
            "https://imagizer.imageshack.com/img922/6064/NcUFXj.png",
            "https://imagizer.imageshack.com/img922/9495/szR29F.jpg",
            "https://imagizer.imageshack.com/img923/7346/r50f6F.png",
            "https://imagizer.imageshack.com/img922/637/s5du8W.png"
        ],
        description_short: "Kunyit bubuk organik, anti-inflamasi alami untuk kesehatan pencernaan.",
        description_full: "<p><strong>Kunyit Bubuk Organik</strong> terbuat dari kunyit segar pilihan yang dikeringkan dan digiling halus tanpa bahan tambahan apapun. Kunyit dikenal sebagai rempah dengan segudang manfaat kesehatan.</p><br><p><strong>Manfaat:</strong></p><ul><li>Anti-inflamasi alami (mengurangi peradangan)</li><li>Membantu mengatasi gangguan pencernaan</li><li>Meningkatkan fungsi hati</li><li>Menjaga kesehatan kulit dan mencegah jerawat</li><li>Membantu meredakan nyeri haid</li></ul><br><p><strong>Cara Konsumsi:</strong> Seduh 1/2 sendok teh dengan air hangat, tambahkan madu untuk rasa yang lebih nikmat.</p>",
        ingredients: "100% Kunyit organik tanpa pengawet",
        how_to_use: "Seduh 1/2 sdt dengan air hangat, bisa ditambah madu atau jahe.",
        storage: "Simpan di wadah kedap udara, tempat sejuk dan kering.",
        weight: "150 gram",
        origin: "Indonesia - Jawa Tengah",
        certificate: "Organik Certified",
        featured: true,
        best_seller: false,
        meta_title: "Kunyit Bubuk Organik - Fresh Herbal",
        meta_description: "Kunyit bubuk organik, anti-inflamasi alami untuk pencernaan dan kesehatan kulit."
    },
    {
        id: 4,
        name: "Temulawak Segar",
        slug: "temulawak-segar",
        category: "Rimpang",
        price: 35000,
        price_discount: null,
        stock: 30,
        sku: "FRH-TEMU-004",
        rating: 4.6,
        image_main: "https://imagizer.imageshack.com/img922/3025/KTm2iB.png",
        gallery: [
            "https://imagizer.imageshack.com/img922/3025/KTm2iB.png",
            "https://imagizer.imageshack.com/img922/9495/szR29F.jpg",
            "https://imagizer.imageshack.com/img923/7346/r50f6F.png",
            "https://imagizer.imageshack.com/img922/6064/NcUFXj.png"
        ],
        description_short: "Temulawak segar untuk kesehatan hati dan pencernaan.",
        description_full: "<p><strong>Temulawak Segar</strong> merupakan tanaman herbal asli Indonesia yang telah digunakan sejak zaman nenek moyang untuk menjaga kesehatan hati dan sistem pencernaan. Temulawak kami dipanen segar dari kebun organik.</p><br><p><strong>Manfaat:</strong></p><ul><li>Menjaga kesehatan hati (liver)</li><li>Meningkatkan nafsu makan</li><li>Membantu mengatasi gangguan pencernaan seperti maag</li><li>Mengurangi gejala rematik dan nyeri sendi</li><li>Membantu mengatasi masalah kulit</li></ul><br><p><strong>Cara Konsumsi:</strong> Dapat direbus untuk dibuat wedang atau dijadikan jamu tradisional. Iris tipis 2-3 cm, rebus dengan 2 gelas air hingga tersisa 1 gelas, tambahkan madu.</p>",
        ingredients: "Temulawak segar 100% (Curcuma xanthorrhiza)",
        how_to_use: "Iris 2-3 cm, rebus dengan 2 gelas air hingga tersisa 1 gelas, saring dan tambahkan madu.",
        storage: "Simpan di kulkas untuk kesegaran maksimal.",
        weight: "250 gram",
        origin: "Indonesia - Jawa Timur",
        certificate: "Produk Lokal Premium",
        featured: false,
        best_seller: false,
        meta_title: "Temulawak Segar - Fresh Herbal",
        meta_description: "Temulawak segar untuk kesehatan hati dan sistem pencernaan."
    },
    {
        id: 5,
        name: "Madu Bawang Hitam Tunggal",
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
            "https://imagizer.imageshack.com/img922/637/s5du8W.png",
            "https://imagizer.imageshack.com/img922/9495/szR29F.jpg"
        ],
        description_short: "Jahe merah instan, hangatkan tubuh dan tingkatkan imunitas.",
        description_full: "<p><strong>Jahe Merah Instan</strong> terbuat dari jahe merah pilihan dengan proses pengeringan modern untuk menjaga khasiat. Praktis dan mudah diseduh.</p><br><p><strong>Manfaat:</strong></p><ul><li>Menghangatkan tubuh</li><li>Meningkatkan sistem imun</li><li>Meredakan mual dan masuk angin</li><li>Melancarkan peredaran darah</li></ul>",
        ingredients: "Jahe merah, gula aren alami",
        how_to_use: "Seduh 1 sachet dengan 150ml air panas, aduk rata.",
        storage: "Simpan di tempat kering dan sejuk.",
        weight: "200 gram (10 sachet)",
        origin: "Indonesia - Jawa Barat",
        certificate: "BPOM TR#112233445",
        featured: true,
        best_seller: true,
        meta_title: "Jahe Merah Instan - Fresh Herbal",
        meta_description: "Jahe merah instan praktis untuk menghangatkan tubuh dan meningkatkan imunitas."
    },
    {
        id: 6,
        name: "Sari Kunyit Asam",
        slug: "sari-kunyit-asam",
        category: "Minuman",
        price: 48000,
        price_discount: null,
        stock: 35,
        sku: "FRH-KUNYITASAM-006",
        rating: 4.7,
        image_main: "https://imagizer.imageshack.com/img922/6064/NcUFXj.png",
        gallery: [
            "https://imagizer.imageshack.com/img922/6064/NcUFXj.png",
            "https://imagizer.imageshack.com/img922/9495/szR29F.jpg"
        ],
        description_short: "Sari kunyit asam, minuman tradisional untuk kesehatan wanita.",
        description_full: "<p><strong>Sari Kunyit Asam</strong> merupakan minuman herbal tradisional yang terkenal untuk melancarkan haid dan menjaga kesehatan reproduksi wanita. Dikemas praktis dalam bentuk serbuk instan.</p>",
        ingredients: "Kunyit, asam jawa, gula aren",
        how_to_use: "Seduh 1 sachet dengan 150ml air hangat, aduk rata.",
        storage: "Simpan di tempat kering dan sejuk.",
        weight: "180 gram (10 sachet)",
        origin: "Indonesia - Yogyakarta",
        certificate: "P-IRT #123456789",
        featured: false,
        best_seller: true,
        meta_title: "Sari Kunyit Asam - Fresh Herbal",
        meta_description: "Sari kunyit asam untuk kesehatan wanita, melancarkan haid dan menjaga vitalitas."
    }
];

// Fungsi untuk mendapatkan produk berdasarkan slug
function getProductBySlug(slug) {
    return productsDatabase.find(product => product.slug === slug) || null;
}

// Fungsi untuk mendapatkan semua produk
function getAllProducts() {
    return productsDatabase;
}

// Fungsi untuk mendapatkan produk berdasarkan kategori
function getProductsByCategory(category) {
    return productsDatabase.filter(product => product.category === category);
}

// Export untuk digunakan di file lain
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { productsDatabase, getProductBySlug, getAllProducts, getProductsByCategory };
}

// products-data.js - Baca data dari Firebase
// Data produk diambil langsung dari Firebase, tidak hardcode

let productsDatabase = [];
let productsLoaded = false;

// Fungsi untuk load produk dari Firebase
async function loadProductsFromFirebase() {
    return new Promise((resolve) => {
        const productsRef = firebase.database().ref('products');
        productsRef.once('value', (snapshot) => {
            const products = snapshot.val();
            productsDatabase = [];
            
            if (products) {
                Object.keys(products).forEach(key => {
                    const product = products[key];
                    product.id = key;
                    productsDatabase.push(product);
                });
            }
            
            productsLoaded = true;
            resolve(productsDatabase);
        });
    });
}

// Fungsi get produk by slug
function getProductBySlug(slug) {
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
