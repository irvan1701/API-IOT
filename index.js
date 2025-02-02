const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./db'); // Import koneksi database

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create (POST) - Menyimpan data sensor
app.post('/sensor', (req, res) => {
    const { temperature, humidity, latitude, longitude } = req.query;

    // Validasi input
    if (!temperature || !humidity || !latitude || !longitude) {
        return res.status(400).json({ message: 'Semua parameter (temperature, humidity, latitude, longitude) harus diisi!' });
    }

    const query = `
        INSERT INTO sensor_data (temperature, humidity, latitude, longitude)
        VALUES (?, ?, ?, ?)
    `;
    const values = [temperature, humidity, latitude, longitude];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Error saving data:', err);
            return res.status(500).json({ message: 'Gagal menyimpan data' });
        }
        res.status(201).json({ id: results.insertId, temperature, humidity, latitude, longitude });
    });
});

// Read All (GET) - Mengambil semua data sensor dan data terbaru
app.get('/sensor', (req, res) => {
    // Query untuk mengambil semua data
    const queryAll = 'SELECT * FROM sensor_data';

    // Query untuk mengambil data terbaru
    const queryLatest = 'SELECT * FROM sensor_data ORDER BY timestamp DESC LIMIT 1';

    // Eksekusi query untuk semua data
    connection.query(queryAll, (err, allData) => {
        if (err) {
            console.error('Error fetching all data:', err);
            return res.status(500).json({ message: 'Gagal mengambil semua data' });
        }

        // Eksekusi query untuk data terbaru
        connection.query(queryLatest, (err, latestData) => {
            if (err) {
                console.error('Error fetching latest data:', err);
                return res.status(500).json({ message: 'Gagal mengambil data terbaru' });
            }

            // Gabungkan response
            const response = {
                all_data: allData,
                latest_data: latestData.length > 0 ? latestData[0] : null
            };

            res.json(response);
        });
    });
});

// Read One (GET) - Mengambil data sensor berdasarkan ID
app.get('/sensor/:id', (req, res) => {
    const query = 'SELECT * FROM sensor_data WHERE id = ?';
    const id = req.params.id;

    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ message: 'Gagal mengambil data' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Data tidak ditemukan' });
        }
        res.json(results[0]);
    });
});

// Read Latest (GET) - Mengambil data terbaru
app.get('/sensor/latest', (req, res) => {
    const query = 'SELECT * FROM sensor_data ORDER BY timestamp DESC LIMIT 1';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching latest data:', err);
            return res.status(500).json({ message: 'Gagal mengambil data terbaru' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Tidak ada data tersedia' });
        }
        res.json(results[0]);
    });
});

// Update (PUT) - Memperbarui data sensor berdasarkan ID
app.put('/sensor/:id', (req, res) => {
    const { temperature, humidity, latitude, longitude } = req.query;
    const id = req.params.id;

    const query = `
        UPDATE sensor_data
        SET temperature = ?, humidity = ?, latitude = ?, longitude = ?
        WHERE id = ?
    `;
    const values = [temperature, humidity, latitude, longitude, id];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Error updating data:', err);
            return res.status(500).json({ message: 'Gagal memperbarui data' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Data tidak ditemukan' });
        }
        res.json({ id, temperature, humidity, latitude, longitude });
    });
});

// Delete (DELETE) - Menghapus data sensor berdasarkan ID
app.delete('/sensor/:id', (req, res) => {
    const query = 'DELETE FROM sensor_data WHERE id = ?';
    const id = req.params.id;

    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error deleting data:', err);
            return res.status(500).json({ message: 'Gagal menghapus data' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Data tidak ditemukan' });
        }
        res.status(204).send();
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});