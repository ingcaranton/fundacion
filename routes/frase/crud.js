//Create and save a record in the DB
module.exports.create = function(req, res, done) {
    console.log(req.body);
  	var newFrase = new db.frase();
  	newFrase.texto=req.body.texto;
    newFrase.save(function(errSave, FraseSave){
      if(errSave)
        return done(errSave);          
      else
        return done(null, false, req.flash('message', 'frase save'));          
    });
}
module.exports.read = function(req, res, done) {
  db.frase.find().exec(function(error, frases){
    if (error)
      return done(error);          
    else
      return done(null, frases);     
  });
}
module.exports.deleter = function(req, res, done) {
  db.frase.findOneAndRemove({ "texto" : req.params.frase},
    function(error){
      if (error)
        return done(error);          
      else
        return done(null, false, req.flash('message', 'frase borrada'));
    }
  );
}
module.exports.update = function(req, res, done) {
  var update= {};
  update.texto=req.body.texto;
  db.frase.findOneAndUpdate({ "texto" : req.body.textoFraseOriginal},update,
      function(error){
        if (error)
          return done(error);        
        else
          return done(null, false, req.flash('message', 'frase editada'));
      }
    );
}