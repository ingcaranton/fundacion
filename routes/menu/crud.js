//Create and save a record in the DB
module.exports.create = function(req, res, done) {
  	var newMenu = new db.menu();
  	newMenu.titulo=req.body.tituloMenu;
  	newMenu.submenus=[];
   		for(var i=0;i<req.body.tituloSubmenu.length;i++){
   			newMenu.submenus.push({titulo:req.body.tituloSubmenu[i],url:req.body.urlSubmenu[i]});
   }
    newMenu.save(function(errSave, MenuSave){
                if(errSave)
                  return done(errSave);          
                else
                  return done(null, req.flash('message', 'menu save'));          
              });
}
module.exports.read = function(req, res, done) {
 
}
module.exports.deleter = function(req, res, done) {
  db.menu.findOneAndRemove({ "titulo" : req.params.menu},
    function(error){
      if (error)
          return done(error);          
      else
        return done(null, req.flash('message', 'menu delete'));
    }
  );
}
module.exports.update = function(req, res, done) {
   var update= {};
   update.titulo=req.body.tituloMenu;
   update.submenus=[];
   for(var i=0;i<req.body.tituloSubmenu.length;i++){
   		update.submenus.push({titulo:req.body.tituloSubmenu[i],url:req.body.urlSubmenu[i]});
   }
    db.menu.findOneAndUpdate({ "titulo" : req.body.tituloMenuOriginal},{$set:update},
              function(error){
                if (error)
                  return done(error);          
                else
                  return done(null, false, req.flash('message', 'menu edited'));
              }
            );
}