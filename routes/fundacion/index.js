var express = require('express');
var app = module.exports = express();

app.set('views', __dirname + '/views');

app.route('/')
.get(function(req, res){
  db.pagina.find({publicar:true}).exec(function(error, paginas){
    res.render('index', {
      massage : req.flash('message'),
      administrador : req.session.admin,
      paginas: paginas,
      title : 'Conexion bienestar'
    });
  });
});

app.route('/:pagina')
.get(function(req, res) {
  db.pagina.find({publicar:true}).exec(function(error, paginas){
    db.pagina.findOne({ nombreEnlace: req.params.pagina }, function(error, pagina){
      if(pagina){
        res.render('pagina', {
          massage : req.flash('message'),
          administrador : req.session.admin,
          pagina: pagina,
          paginas: paginas,
          title : paginas.titulo
  		  });
  	   }else{
        //Can not find the record, renders not found
          res.render('../../../views/error', {
            error: {stack:"not found"}
          });
       }
    });
  });
});