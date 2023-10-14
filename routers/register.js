var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
var pool = require('../koneksi.js');

const secretKey = '1234567'


router.post('/register', (req, res) => {
    const { email, password } = req.body;
    
    // Validasi data
    if (!email || !password) {
      return res.status(400).json({ message: 'email dan password diperlukan' });
    }
  
    // Cek apakah pengguna sudah terdaftar
    pool.query("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
        if (err) {
          return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
        }
    
        if (row) {
          return res.status(400).json({ message: 'Pengguna sudah terdaftar' });
        }
  
    // Simpan pengguna ke "database"
    pool.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, password], (err) => {
        if (err) {
          return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
        }
  
        // Buat token JWT
        const token = jwt.sign({ username }, secretKey);
  
        res.status(200).json({ message: 'Registrasi berhasil', token });
      });
  });
});



module.exports = router;