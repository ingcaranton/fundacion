module.exports.isAuthenticated = function(req, res, next) {
  if (req.user)
        return next();

     req.flash('message', 'No estas autenticado.');
     res.redirect('/users');
}

module.exports.isAdmin = function(req, res, next) {

	if(req.user){
    	if (req.user.nickName=="admin"){
        	return next();
    	}
	}

     req.flash('message', 'No eres administrador.');
     res.redirect('/');
}