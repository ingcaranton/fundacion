//Create and save a record in the DB
module.exports.create = function(req, res, done) {
    if (req.body.nombreEnlace){
        var nombreEnlace = req.body.nombreEnlace.toLowerCase(); 
    }
    process.nextTick(function() {
      db.pagina.findOne({ "nombreEnlace" :  nombreEnlace }, function(err, pagina) {
        if (err)
          return done(err);
        if (pagina) {
          return done(new Error("Page is not created"), false, req.flash('message', 'That page link is already taken.'));
        }else {
          var newPagina = new db.pagina();
            newPagina.nombreEnlace = nombreEnlace;
            newPagina.titulo = req.body.titulo;
            newPagina.descripcion = req.body.descripcion;
            newPagina.contenido =req.body.contenido;
            if(req.body.publicar){
              newPagina.publicar = true;
            }else{
              newPagina.publicar = false;
            }
          newPagina.save(function(errSave, paginaSave){
            if(errSave){
              return done(errSave);          
            }else{
              return done(null, req.flash('message', 'page save'));
            }
          });
        }
      });
    });
}