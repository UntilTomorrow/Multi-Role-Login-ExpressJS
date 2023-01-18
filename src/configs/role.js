module.exports ={
    checkRole(roles) {
        return (req, res, next) => {
            if(!req.session.loggedin) {
                res.redirect('/login');
            }
            else {
                let userRole = req.session.user.role;
                if(!roles.includes(userRole)){
                    res.status(403).send('Oh No')
                }
                else{
                    next();
                }
            }
        };
    }
};