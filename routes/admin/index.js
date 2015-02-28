var express = require('express');
var app = module.exports = express();
var crudPagina = require("../pagina/crud");

app.set('views', __dirname + '/views');

app.route('/')
.get(function(req, res){
  db.pagina.find({},"nombreEnlace titulo descripcion").exec(function(error, paginas){
    res.render('index', {
      paginas: paginas
    });
  });
});

app.route('/:pagina')
.get(function(req, res) {
  //Busca la pagina que se esta pidiendo en la BD, si la encuentra renderiza la informacion que tenga
  db.pagina.find({},"nombreEnlace titulo").exec(function(error, paginas){
    db.pagina.findOne({ nombreEnlace: req.params.pagina }, function(error, pagina){
      if(pagina){
        res.render('pagina', { 
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
app.route('/edit/:pagina')
.get(function(req, res) {
  //Busca la pagina que se esta pidiendo en la BD, si la encuentra renderiza la informacion que tenga
  db.pagina.find({},"nombreEnlace titulo").exec(function(error, paginas){
    db.pagina.findOne({ nombreEnlace: req.params.pagina }, function(error, pagina){
      if(pagina){
        res.render('pagina', { 
          pagina: paginaContenido,
          paginas:paginas
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

app.route('/new')
  .post(function(req,res){
    crudPagina.create(req, res, function(err, pagina, flash){
      if(err){
        res.redirect("/admin/error");
       }else{
        res.redirect("/admin");
       }
  });
  });