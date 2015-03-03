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
  db.pagina.find().exec(function(error, paginas){
    db.pagina.findOne({ nombreEnlace: req.params.pagina }, function(error, pagina){
      if(pagina){
        res.render('pagina', { 
          administrador : req.session.admin,
          pagina: pagina,
          paginas: paginas
  		  });
  	   }else{
        //Can not find the record, renders not found
          res.render('pagina', {
            error: "not found"
        });
       }
    });
  });
});