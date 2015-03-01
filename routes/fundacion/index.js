var express = require('express');
var app = module.exports = express();

app.set('views', __dirname + '/views');

app.route('/')
.get(function(req, res){
  db.pagina.find({},"nombreEnlace titulo descripcion").exec(function(error, paginas){
    res.render('index', {
      administrador : req.session.admin,
      paginas: paginas
    });
  });
});

app.route('/:pagina')
.get(function(req, res) {
  //Busca la pagina que se esta pidiendo en la BD, si la encuentra renderiza la informacion que tenga
  db.pagina.find().exec(function(error, paginas){
    db.pagina.findOne({ nombreEnlace: req.params.pagina }, function(error, pagina){
      if(pagina){
        res.render('pagina', { 
          administrador : req.session.admin,
          pagina: pagina,
          paginas: paginas
  		  });
  	   }else{
        //Si no encuentra el registro, renderiza not found
        res.render('pagina', {
          pagina: {titulo:"not found"}
        });
       }
    });
  });
});