const config = require('../configs/database');
let mysql = require('mysql');
let pool = mysql.createPool(config);

pool.on('error', (err)=> {
    console.error(err);
});

module.exports ={
    formRegister(req,res){
        res.render("register",{
            url : 'http://localhost:3000'
        });
    },
    saveRegister(req,res){
        console.log(req.body);
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.pass;
        let UID = req.body.UID;
        if (username && email && password && UID) {
            pool.getConnection(function(err, connection){
                if(err) throw err;
                connection.query(
                    `INSERT INTO login_user(user_name, user_email, user_password, UID) VALUES (?,?,SHA2(?,512),SHA2(?,512));`,
                    [username, email, password, UID], function (error, results) {
                    if(error) throw error;
                    req.flash('color', 'success');
                    req.flash('status', 'Yes..');
                    req.flash('message', 'Registrasi berhasil');
                    res.redirect('/login');
                });
            })
        }else {
            res.redirect('/login');
        }
    }

}