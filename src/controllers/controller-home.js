module.exports = { 
    home(req,res){
        res.render('home', {
            url: 'http//localhost:3000/',
            userName: req.session.username
        })
    }
}