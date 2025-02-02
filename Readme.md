# Dokumentasi API Node.js

## Pendahuluan
API ini digunakan untuk menyimpan, mengambil, memperbarui, dan menghapus data sensor yang terdiri dari temperatur, kelembaban, serta koordinat lokasi. API dibangun menggunakan Node.js dengan Express dan menggunakan MySQL sebagai database.

## URL Dasar
```
http://localhost:3000
```

## Endpoints

### 1. Menyimpan Data Sensor
**Endpoint:**
```
POST /sensor
```
**Deskripsi:**
Menyimpan data sensor baru ke database.

**Parameter Query:**
- `temperature` (wajib) - Nilai suhu
- `humidity` (wajib) - Nilai kelembaban
- `latitude` (wajib) - Koordinat lintang
- `longitude` (wajib) - Koordinat bujur

**Response Sukses:**
```json
{
  "id": 1,
  "temperature": "30.5",
  "humidity": "75",
  "latitude": "-6.200000",
  "longitude": "106.816666"
}
```

### 2. Mengambil Semua Data Sensor dan Data Terbaru
**Endpoint:**
```
GET /sensor
```
**Deskripsi:**
Mengambil semua data sensor yang tersimpan serta data sensor terbaru.

**Response Sukses:**
```json
{
  "all_data": [...],
  "latest_data": {
    "id": 5,
    "temperature": "32.1",
    "humidity": "70",
    "latitude": "-6.210000",
    "longitude": "106.820000",
    "timestamp": "2024-02-02 10:00:00"
  }
}
```

### 3. Mengambil Data Sensor Berdasarkan ID
**Endpoint:**
```
GET /sensor/:id
```
**Deskripsi:**
Mengambil data sensor berdasarkan ID tertentu.

**Response Sukses:**
```json
{
  "id": 3,
  "temperature": "28.9",
  "humidity": "80",
  "latitude": "-6.220000",
  "longitude": "106.830000",
  "timestamp": "2024-02-02 09:30:00"
}
```

### 4. Mengambil Data Sensor Terbaru
**Endpoint:**
```
GET /sensor/latest
```
**Deskripsi:**
Mengambil data sensor terbaru berdasarkan waktu.

**Response Sukses:**
```json
{
  "id": 6,
  "temperature": "33.0",
  "humidity": "65",
  "latitude": "-6.215000",
  "longitude": "106.825000",
  "timestamp": "2024-02-02 10:15:00"
}
```

### 5. Memperbarui Data Sensor Berdasarkan ID
**Endpoint:**
```
PUT /sensor/:id
```
**Deskripsi:**
Memperbarui data sensor yang sudah ada berdasarkan ID.

**Parameter Query:**
- `temperature` (wajib)
- `humidity` (wajib)
- `latitude` (wajib)
- `longitude` (wajib)

**Response Sukses:**
```json
{
  "id": 2,
  "temperature": "29.5",
  "humidity": "78",
  "latitude": "-6.230000",
  "longitude": "106.835000"
}
```

### 6. Menghapus Data Sensor Berdasarkan ID
**Endpoint:**
```
DELETE /sensor/:id
```
**Deskripsi:**
Menghapus data sensor berdasarkan ID tertentu.

**Response Sukses:**
```
Status: 204 No Content
```

## Kesimpulan
API ini memungkinkan pengguna untuk menyimpan, mengambil, memperbarui, dan menghapus data sensor dengan mudah menggunakan metode HTTP yang sesuai. Pastikan semua parameter yang diperlukan dikirim dengan benar untuk menghindari error dalam pengolahan data.

