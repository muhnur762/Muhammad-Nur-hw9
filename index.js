const express = require('express')
const app = express()
const bodyParser =  require('body-parser')
const port = 3000

// mengirimkan data dari client ke server dengan json 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// reques koneksi 
const pool = require('./koneksi.js');
// reques router di movie.js
const movies = require('./routers/movies.js');
// reques router di users.js
const users = require('./routers/users.js');
// reques router di login.js
const login = require('./routers/login.js');
const register = require('./routers/register.js');

app.use(express.json())

app.use('/login' ,login);
app.use('/register' ,register);
// menggunakan router
app.use('/movies' ,movies);
// menggunakan router
app.use('/users' ,users);


// koneksi
pool.connect((err, res)=> {
    console.log(err);
    console.log('conected');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})