var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

var pool = require('../koneksi.js');


const secretKey = '1234567'

// menampilakn seluruh movies
router.get('/', function(req,res) {
    pool.query(
        `SELECT * FROM movies ${req.query.limit ? 'LIMIT ' + req.query.limit : ''}`,
        (error, results) => {
            if (error) {
                throw error;
            }
            res.json(results.rows);
        }
    );
});

// mengambil movies berdasar id
router.get('/:id', function(req,res) {
    pool.query(
        `SELECT * FROM movies WHERE id = ${req.params.id}`,
        (error, results) => {
            if (error) {
                throw error;
            }
            res.json(results.rows);
        }
    );
});

router.post('/', function(req,res){
    if(!req.body.title || 
        !req.body.genres || 
        !req.body.year.toString().match(/^[0-9]{4}$/g)){

        res.status(400);
        res.json({message: "Bad Request"});
    }else{
    // var newId = movies[movies.length-1].id+1;
    pool.query(
        `INSERT INTO movies (id,title,genres,year) VALUES (${req.body.id},'${req.body.title}','${req.body.genres}',${req.body.year})`,
        (error, results) => {
            if (error) {
                throw error;
            }
            res.json({message: "New Movie Created", location: "/movies/" + req.body.id});
        }
    );
    }
});

router.put('/:id', function(req, res){
    if(!req.body.title || 
        !req.body.genres || 
        !req.body.year.toString().match(/^[0-9]{4}$/g)){

            res.status(400);
            res.json({message: "Bad Request"});
    
        }else{
            pool.query(
                `UPDATE movies SET 
                title = '${req.body.title}',
                genres = '${req.body.genres}',
                year = ${req.body.year}`,
                (error, results) => {
                    if (error) {
                        throw error;
                    }
                    res.json({message: "Movie Id " + req.params.id + " updated"});
                }
            );
        }
});

router.delete('/:id', function(req,res) {
    pool.query(
        `DELETE FROM movies WHERE id = ${req.params.id}`,
        (error, results) => {
            if (error) {
                throw error;
            }
            res.json({message: "Movie Id " + req.params.id + " deleted"});
        }
    );
});


router.post('/login',(req,res) => {
const {email} = req.body
const token = jwt.sign({email}, secretKey)

return res.status(200).json({
    token
})
})




module.exports = router;