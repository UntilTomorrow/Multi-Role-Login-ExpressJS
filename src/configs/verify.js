module.exports = {
        isLogin(req, res, next){
            if(req.session.loggedin === true){
                next();
                return;
            } else {
                req.session.destroy(function(err){
                    res.redirect('/login')
                })
            }
        },
        isAdmin(req, res, next) {
            if (req.session.loggedin === true && req.session.user.role === 'admin') {
              next();
            } else {
              res.status(403).send('Forbidden');
            }
            console.log(req.session.user.role)
          }, 
            
        isLogout(req, res, next){
            if(req.session.loggedin !== true){
                next();
                return;
            }
            res.redirect('/')
        }
};