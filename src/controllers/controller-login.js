const config = require('../configs/database');

let mysql   = require('mysql');
let pool    = mysql.createPool(config);

pool.on('error', (err)=> {
    console.error(err);
});

module.exports ={
    login(req,res){
        res.render("login", {
            url : 'http://localhost:3000/',
            colorFlash: req.flash('color'),
            statusFlash: req.flash('status'),
            pesanFlash: req.flash('message'),
        });
    },

    loginAuth(req,res){

        
    }

}