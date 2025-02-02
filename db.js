const mysql = require('mysql2');

// Konfigurasi koneksi database
const connection = mysql.createConnection({
    host: 'localhost', // Ganti dengan host database Anda
    user: 'root',      // Ganti dengan username database Anda
    password: '',      // Ganti dengan password database Anda
    database: 'data_sensor' // Ganti dengan nama database Anda
});

// Tes koneksi
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports = connection;