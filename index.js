const express = require('express');
const app = express();
const port = 3000;
const koneksi = require('./connection');
const response = require('./response'); // Import the helper

// Route 1: Get All Students
app.get('/', (req, res) => {
    const sql = 'SELECT * FROM mahasiswa';

    koneksi.query(sql, (err, results) => {
        if (err) {
            console.error('Error:', err.stack);
            // Send error using our response helper
            response(500, null, "Error fetching data", res);
            return;
        }
        
        // Send success using our response helper
        response(200, results, "List of all students", res);
    });
});

// Route 2: Get Student by NIM
app.get('/data', (req, res) => {
    // ✅ FIXED: Using '?' to prevent the "Unknown column" error
    const sql = 'SELECT nama_lengkap FROM mahasiswa WHERE nim = ?';
    
    // ✅ FIXED: Passing data in an array
    koneksi.query(sql, [req.query.nim], (err, results) => {
        if (err) {
            console.error('Error:', err.stack);
            response(500, null, "Error fetching data", res);
            return;
        }

        // Optional: Check if student exists
        if (results.length === 0) {
            response(404, null, "Student not found", res);
            return;
        }

        response(200, results, "Student data found", res);
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});