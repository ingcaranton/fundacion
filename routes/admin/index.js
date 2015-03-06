var express = require('express');
var app = module.exports = express();
var crudPagina = require("../pagina/crud");

//Rutas para la autenticacion
var autenticacion = require("./autenticacion");
app.use(autenticacion);

app.set('views', __dirname + '/views');

app.route('/')
.get(function(req, res){
  db.pagina.find({},"nombreEnlace titulo descripcion fechaCreacion").exec(function(error, paginas){
    res.render('index', {
      administrador : req.session.admin,
      paginas: paginas
    });
  });
});

app.route('/new')
.get(function(req, res){
  db.pagina.find({},"nombreEnlace titulo descripcion").exec(function(error, paginas){
    res.render('new', {
      administrador : req.session.admin,
      paginas: paginas
    });
  });
});

app.route('/:pagina')
.get(function(req, res) {
  //Search the page you're requesting in the DB, if found render the info you need
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

app.route('/edit/:pagina')
.get(function(req, res) {
  //Busca la pagina que se esta pidiendo en la BD, si la encuentra renderiza la informacion que tenga
  db.pagina.find({},"nombreEnlace titulo").exec(function(error, paginas){
    db.pagina.findOne({ nombreEnlace: req.params.pagina }, function(error, pagina){
      if(pagina){
        res.render('pagina', { 
          administrador : req.session.admin,
          pagina: pagina,
          paginas:paginas
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

app.route('/guardar')
  .post(function(req,res){
    crudPagina.create(req, res, function(err, pagina, flash){
      if(err){
        res.redirect("/admin/error");
       }else{
        res.redirect("/admin");
       }
  });
});

app.route('/publicar')
  .post(function(req,res){
    req.body.publicar=true;
    crudPagina.create(req, res, function(err, pagina, flash){
      if(err){
        res.redirect("/admin/error");
       }else{
        res.redirect("/admin");
       }
  });
});