const config = require('..//configs/database');

let mysql = require('mysql');
let pool  = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
  role(req, res) {
    const query1 ='SELECT * FROM login_user';
    const query2 = 'SELECT last_login FROM login_user '

    pool.getConnection(function(err, connection){
      connection.query(query1, (error, results1) => {
        if(error)
            throw error;
      
      connection.query(query2, (error, results2) => {
        if (error)
        throw error;
        
    // Pastikan pengguna sudah login
    if (req.session.loggedin !== true) {
      res.redirect('/login');
      return;
    }

    // Pastikan pengguna memiliki role "admin"
    if (req.session.user.role === 'admin') {
      // Jika pengguna adalah admin, lanjutkan eksekusi controller dan render halaman "role"
      res.render('role', {
        url: 'http://localhost:3000/',
        userName: req.session.username,
        user: req.session.user,
        data: results1,
        lastlogin: results2,

           });
          } else {
            // Jika pengguna bukan admin, beri respons dengan status 403 Forbidden
            res.status(403).send('Forbidden');
          }
        })
      })
    })
  }
  
};