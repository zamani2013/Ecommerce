module.exports = {
    Authentication: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error', 'Please login to review');
        res.redirect('/login');
    }
}