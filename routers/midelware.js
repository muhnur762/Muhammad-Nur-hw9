var express = require('express');
var router = express.Router();
var pool = require('../koneksi.js');
var jwt= require('jsonwebtoken');
const secretKey = '123456789'

router.use(authenticate);

router.post('/login',(req,res)=>{
    const { email, password } = req.body;
    pool.query(
        "SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, row) => {
            if (err) {
              return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
            }
        
            if (!row) {
              return res.status(401).json({ message: 'Username atau password salah' });
            }

                const token = jwt.sign({email}, secretKey )

                return res.status(200).json({
                    token
                })
        })
});

router.post('/register',(req,res)=>{
    const { email, password } = req.body;
    pool.query(
        "SELECT * FROM users WHERE email = ?", [email], (err, row) => {
            if (err) {
              return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
            }
        
            if (row) {
              return res.status(400).json({ message: 'Pengguna sudah terdaftar' });
            }

            pool.query ("INSERT INTO users (email, password) VALUES (?, ?)", [email, password], (err) => {
                if (err) {
                  return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
                }
          
                // Buat token JWT
                const token = jwt.sign({ email }, secretKey);
          
                res.status(200).json({ message: 'Registrasi berhasil', token });
              });
        });
});



router.use(logerMidelware)

function authenticate(req,res,next){
    const token = req.headers?.authorization?.split(' ')[1]

    if(!token){
        return res.status(401).json({
            message: 'Unauthenticate'
        })
    }

    jwt.verify(token, secretKey, (err, decode) => {
        if(err){
            return res.status(401).json({
                message: 'Unauthenticate'
            })
        }
        req.headers.user = decode
        next()
    })
}

function logerMidelware(req, res, next) {
    console.log('ini midelware');
    console.log(req.body, '<<< ini body')

    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            message : 'Email and Password Required'
        })
    }
    next()
}




module.exports = router;