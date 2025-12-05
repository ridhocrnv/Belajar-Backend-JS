const express = require('express');
const app = express();
const port = 3000;
const koneksi = require('./connection');

koneksi.query('SELECT * FROM mahasiswa', (err, results) => {
    if (err) {
        console.error('Error executing query:', err.stack);
        return;
    }

    console.log('Query results:', results);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});