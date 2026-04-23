// firebase-config.js
// Ganti dengan konfigurasi Firebase Anda sendiri

const firebaseConfig = {
    apiKey: "AIzaSyAWoUkWW4mn8r6mADaV5dhzNvKJ2A4PDVU",
    authDomain: "fresh-herbal-2024.firebaseapp.com",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "fresh-herbal-2024",
    storageBucket: "fresh-herbal-2024.firebasestorage.app",
    messagingSenderId: "767982509787",
    appId: "1:767982509787:web:6c16a655c1b4f6303c76fe"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Referensi ke node produk
const productsRef = database.ref('products');
