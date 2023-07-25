const config = require('..//configs/database');

let mysql = require('mysql');
let pool  = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    role(req, res) {
      // Pastikan pengguna sudah login
      if (req.session.loggedin !== true) {
        res.redirect('/login');
        return;
      }
  
      // Pastikan pengguna memiliki role "admin"
      if (req.session.role === 'admin') {
        // Jika pengguna adalah admin, lanjutkan eksekusi controller dan render halaman "role"
        res.render('role', {
          url: 'http://localhost:3000/',
          userName: req.session.username,
          user: req.session.user,
        });
      } else {
        // Jika pengguna bukan admin, beri respons dengan status 403 Forbidden
        res.status(403).send('Forbidden');
      }
    }
  }