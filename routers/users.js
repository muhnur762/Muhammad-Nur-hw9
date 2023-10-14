var express = require('express');
var router = express.Router();

var pool = require('../koneksi.js');

// menampilakn seluruh users
router.get('/', function(req,res) {
    pool.query(
        `SELECT * FROM users ${req.query.limit ? 'LIMIT ' + req.query.limit : ''}`,
        (error, results) => {
            if (error) {
                throw error;
            }
            res.json(results.rows);
        }
    );
});

// mengambil user berdasar id
router.get('/:id', function(req,res) {
    pool.query(
        `SELECT * FROM users WHERE id = ${req.params.id}`,
        (error, results) => {
            if (error) {
                throw error;
            }
            res.json(results.rows);
        }
    );
});

router.post('/', function(req,res){
    if(!req.body.email || 
        !req.body.gender || 
        !req.body.password || 
        !req.body.role){

        res.status(400);
        res.json({message: "Bad Request"});
    }else{
    pool.query(
        `INSERT INTO users (id,email,gender,password,role) VALUES (${req.body.id},'${req.body.email}','${req.body.gender}','${req.body.password}','${req.body.role}')`,
        (error, results) => {
            if (error) {
                throw error;
            }
            res.json({message: "New User Created", location: "/user/" + req.body.id});
        }
    );
    }
});

router.put('/:id', function(req, res){
    if(!req.body.email || 
        !req.body.gender || 
        !req.body.password || 
        !req.body.role){

            res.status(400);
            res.json({message: "Bad Request"});
    
        }else{
            pool.query(
                `UPDATE users SET 
                email = '${req.body.email}',
                gender = '${req.body.gender}',
                password = '${req.body.password}',
                role = '${req.body.role}'`,
                (error, results) => {
                    if (error) {
                        throw error;
                    }
                    res.json({message: "User Id " + req.params.id + " updated"});
                }
            );
        }
});

router.delete('/:id', function(req,res) {
    pool.query(
        `DELETE FROM users WHERE id = ${req.params.id}`,
        (error, results) => {
            if (error) {
                throw error;
            }
            res.json({message: "User Id " + req.params.id + " deleted"});
        }
    );
});




module.exports = router;