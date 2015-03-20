module.exports.create = function(req, res, done) {
    if (req.body.nickName)
        var nickName = req.body.nickName.toLowerCase(); 
        db.user.findOne({ "nickName" :  nickName }, function(err, user) {
            if (err)
                return done(err);
            if (user) 
                return done(new Error("User not created"), false, req.flash('message', 'That nickName is already taken.'));
             else {

                var newUser= new db.user();
                    newUser.nombre = req.body.nombre;
                    newUser.nickName = nickName;
                    newUser.correo = req.body.correo;
                    newUser.contrasena = req.body.contrasena;
                    if(req.body.rol){
                      newUser.rol = req.body.rol;
                    }else{
                      newUser.rol = "usuario";
                    }
                newUser.save(function(error, user) {
                    if (error)
                        return done(error);          
                    if(user){
                        return done(null, user, req.flash('message', 'new user created'));   
                    }
                });
  
            }
        });
}
//solo valido para administrador  
module.exports.read = function(req, res, done) {
            db.user.find().exec(function (error, users) { 
                if (error){
                    return done(error);          
                }else{
                    return done(null, users);
                }
            });
}

module.exports.update = function (req, res, done) {
    var nickName=req.body.nickNameOriginal||req.session.user.nickName;
    var update= {};
    var newUser= new db.user();
        if(req.body.nombre)
            update.nombre = req.body.nombre;
        if(req.body.nickName)
            update.nickName = req.body.nickName.toLowerCase();
        if(req.body.contrasena)
            update.contrasena = req.body.contrasena;
        if(req.body.correo)
            update.correo = req.body.correo;
        if(req.body.rol)
            update.rol = req.body.rol;
        else
            newUser.rol = "usuario";

    db.user.findOneAndUpdate({ "nickName" : nickName},{$set:update},
        function(error, user){
            if (error)
                return done(error);          
            else{
                 return done(null, user, req.flash('message', 'user edited'));   
            }
        }
    );
    }

module.exports.deleter = function (req, res, done) {
    var nickName = req.params.nickName;
    db.user.findOneAndRemove({ "nickName" : nickName},
        function(error){
            if (error)
                return done(error);    
            else
                return done(null, req.flash('message', 'user delete'));            
      }
    );
  }