const config = require('..//configs/database');

let mysql = require('mysql');
let pool  = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

