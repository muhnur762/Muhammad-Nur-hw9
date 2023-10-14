var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
var pool = require('../koneksi.js');

const secretKey = '1234567'

router.post('/', function(req,res){
// const {email} = req.body
// const {password} = req.body
// const token = jwt.sign({email}, secretKey)

// return res.status(200).json({
//     token
// })
if(!req.body.email || !req.body.password){

    res.status(400);
    res.json({message: "Bad Request"});
}else{
pool.query(
    `SELECT * FROM users WHERE email = '${req.body.email}'`,
    (error, results) => {
        if (error) {
            throw error;
        }
        res.json({message: "email ada"});
    }
);
}
});




module.exports = router;