const Pool = require('pg').Pool;
const pool = new Pool({
    user : 'postgres',
    host : 'localhost',
    database : 'movies',
    password : 'muhammadnur7602',
    port : 5432,
})

module.exports = pool;