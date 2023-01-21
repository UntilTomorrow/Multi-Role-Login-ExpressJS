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
        let email = req.body.email;
        let password = req.body.pass;
        if (email && password ) {
            pool.getConnection(function(err, connection){
                if (err) throw err;
                connection.query(
                    `SELECT * FROM login_user WHERE user_email = ? AND user_password = SHA2(?,512)`
                    , [email, password], function (error, results) {
                        if (error) throw error;
                        if (results.length > 0) {
                            let sql = 'INSERT INTO loglogin set user_email = ?, login_time = ?';
                            let values = [email, new Date()];
                            connection.query (sql, values, function(){
                            })
                            req.session.longgedin = true;
                            req.session.user = {
                                        role: results[0].user_role
                            };
                            req.session.userid = results[0].user_id;
                            req.session.userid = results[0].user_name;
                            res.redirect('/')
                        } else {
                            req.flash('color','danger');
                            req.flash('status', 'Ooops...');
                            req.flash('message', 'Akun Tidak Ditemukan...');
                            req.redirect('/login');
                        }
                    });
                    connection.release();
            })
        }  else {
            res.redirect('/login');
            res.end();
        }

    },
    logout(req,res){
        req.session.destroy((err) => {
            if(err) {
                return console.log(err);
            }
            res.clearCookie('secretname');
            res.redirect('/login');
        });
    },
}