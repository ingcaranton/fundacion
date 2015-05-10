//Create and save a record in the DB
module.exports.create = function(req, res, done) {
    console.log(req.body);
  	var newMenu = new db.menu();
  	newMenu.titulo=req.body.tituloMenu;
     newMenu.submenus=[];
   if(req.body.tituloSubmenu){
   	  for(var i=0;i<req.body.tituloSubmenu.length;i++){
        if(req.body.seleccionUrlSubmenu[i]==='on'){
          newMenu.submenus.push({titulo:req.body.tituloSubmenu[i],urlInterna:req.body.urlInternaSubmenu[i]});
        }else{
   			  newMenu.submenus.push({titulo:req.body.tituloSubmenu[i],urlExterna:req.body.urlExternaSubmenu[i]});
      }}
    }
    newMenu.fechaCreacion = dateFormateada();
    newMenu.UserModificacion = req.session.user.nickName;
    newMenu.save(function(errSave, MenuSave){
      if(errSave)
        return done(errSave);          
      else
        return done(null, false, req.flash('message', 'menu save'));          
    });
}
module.exports.read = function(req, res, done) {
  db.menu.find().exec(function(error, menus){
    if (error)
      return done(error);          
    else
      return done(null, menus);     
  });
}
module.exports.deleter = function(req, res, done) {
  db.menu.findOneAndRemove({ "titulo" : req.params.menu},
    function(error){
      if (error)
        return done(error);          
      else
        return done(null, false, req.flash('message', 'menu borrado'));
    }
  );
}
module.exports.update = function(req, res, done) {
  var update= {};
  update.titulo=req.body.tituloMenu;
  console.log(req.body);
  update.submenus=[];
  if(req.body.tituloSubmenu){
      for(var i=0;i<req.body.tituloSubmenu.length;i++){
        if(req.body.seleccionUrlSubmenu[i]==='on'){
          update.submenus.push({titulo:req.body.tituloSubmenu[i],urlInterna:req.body.urlInternaSubmenu[i]});
        }else{
        update.submenus.push({titulo:req.body.tituloSubmenu[i],urlExterna:req.body.urlExternaSubmenu[i]});
      }}
  }
  update.fechaCreacion = dateFormateada();
  update.UserModificacion = req.session.user.nickName;
    db.menu.findOneAndUpdate({ "titulo" : req.body.tituloMenuOriginal},update,
      function(error){
        if (error)
          return done(error);        
        else
          return done(null, false, req.flash('message', 'menu edited'));
      }
    );
}

function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}
function dateFormateada(){
  var date = new Date()
  return pad(date.getDay())+"/"+pad(date.getMonth())+"/"+date.getFullYear()+" "+pad(date.getHours())+":"+pad(date.getMinutes());
}