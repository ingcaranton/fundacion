//Create and save a record in the DB
module.exports.create = function(req, res, done) {
  var fs = require('fs');
  db.pagina.findOne({ "nombreEnlace" :  req.body.nombreEnlace }, function(err, pagina) {
    if (err)
      return done(err);
    if (pagina) {
      return done(new Error("Page is not created"), false, req.flash('message', 'That page link is already taken.'));
    }else {
      var date = new Date()
      var dateFormateada = pad(date.getDay())+"/"+pad(date.getMonth())+"/"+date.getFullYear()+" "+pad(date.getHours())+":"+pad(date.getMinutes());
      var newPagina = new db.pagina();
        newPagina.nombreEnlace = req.body.nombreEnlace;
        newPagina.titulo = req.body.titulo;
        newPagina.descripcion = req.body.descripcion;
        newPagina.contenido =req.body.contenido;
        newPagina.fechaCreacion = dateFormateada;
        newPagina.creador = req.session.admin;
        newPagina.categoria =req.body.categoria;
        console.log(req.files);
        console.log(req.body);
        if(req.files.image.name){
          fs.readFile(req.files.image.path, function (err, data) {
          var imageName = req.files.image.name
          var newPath ='./public/imagesUploads/'+ imageName;
            fs.writeFile(newPath, data, function (err) {
              newPagina.linkImagen='/imagesUploads/'+imageName;
                if(req.body.publicar)
                  newPagina.publicar = true;
                else
                  newPagina.publicar = false;               
              newPagina.save(function(errSave, paginaSave){
                if(errSave)
                  return done(errSave);          
                else
                  return done(null, req.flash('message', 'page save'));          
              });
            });
          });
        }else{
          if(req.body.publicar)
            newPagina.publicar = true;
          else
            newPagina.publicar = false;
          newPagina.save(function(errSave, paginaSave){
          if(errSave)
            return done(errSave);          
          else
            return done(null, req.flash('message', 'page save'));
          });
        }
    }
  });
}
module.exports.read = function(req, res, done) {
  db.pagina.findOne({ "nombreEnlace" : req.params.pagina }, function(error, pagina){
          if (error){
              return done(error);          
          }else{
              return done(null, pagina);
          }
      });
}
module.exports.deleter = function(req, res, done) {
  db.pagina.findOneAndRemove({ "nombreEnlace" : req.params.pagina},
    function(error){
      if (error)
          return done(error);          
      else
        return done(null, req.flash('message', 'page delete'));
    }
  );
}
module.exports.update = function(req, res, done) {
  var nombreEnlace=req.body.nombreEnlaceOriginal;
  
  var update= {};
      update.nombreEnlace = req.body.nombreEnlace;
      update.titulo = req.body.titulo;
      update.descripcion = req.body.descripcion;
      update.contenido =req.body.contenido;
      if(req.body.publicar){
        update.publicar = true;
      }else{
        update.publicar = false;
      }
  db.pagina.findOneAndUpdate({ "nombreEnlace" : nombreEnlace},{$set:update},
      function(error){
          if (error)
            return done(error);          
          else
            return done(null, false, req.flash('message', 'page edited'));
      }
  );
}
module.exports.updateEstado = function(req, res, done) {
  db.pagina.findOne({ "nombreEnlace" : req.params.pagina }, function(error, pagina){
    if (error)
      return done(error);          
    else{
      var estado=pagina.publicar;
        db.pagina.findOneAndUpdate({ "nombreEnlace" : req.params.pagina },{$set:{publicar:!estado}},
          function(error){
            if (error)
              return done(error);          
            else
              return done(null, false, req.flash('message', 'page edited'));
           }
        );
    }
  });
}

function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}