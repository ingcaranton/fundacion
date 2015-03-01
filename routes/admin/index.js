var express = require('express');
var app = module.exports = express();
var crudPagina = require("../pagina/crud");

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


app.route('/login')
.get(function(req, res){
  db.pagina.find({},"nombreEnlace titulo descripcion").exec(function(error, paginas){
    res.render('login', {
      administrador : req.session.admin,
      paginas: paginas
    });
  });
});

app.route('/login')
.post(function(req,res){
  if(req.body.usuario=='admin'){
    if(req.body.contrasena=='admin'){
      req.session.admin='admin';
      res.redirect("/");
    }else{
      res.redirect('/admin/login');
      req.flash('message', 'error with password');
    }
  }else{
      res.redirect('/admin/login');
      req.flash('message', 'error with nickname');
    }
});

app.route('/logout')
.get(function(req,res){
  delete req.session.admin;
  res.redirect('/');
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
        //Si no encuentra el registro, renderiza not found
        res.render('pagina', {
          error: "not found"
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