var express = require('express');
var app = module.exports = express();
var crudPagina = require("../pagina/crud");
var crudMenu = require("../menu/crud");
var crudUser = require("../user/crud");

app.set('views', __dirname + '/views');

app.route('/')
.get(function(req, res){
  db.pagina.find({},"nombreEnlace titulo descripcion").exec(function(error, paginas){
    crudMenu.read(req, res, function(err, menus, flash){
      res.render('index', {
        message : req.flash('message'),
        user : req.session.user,
        paginas: paginas,
        title : "Administrar paginas",
        menus : menus
      });
    });
  });
});

app.route('/editarpaginas')
.get(function(req, res){
  db.pagina.find({publicar:true},"nombreEnlace titulo descripcion").exec(function(error, paginas){
    db.pagina.find().exec(function(error, pagsAdmin){
      crudMenu.read(req, res, function(err, menus){
        res.render('editarPaginas', {
          message : req.flash('message'),
          user : req.session.user,
          paginas: paginas,
          pagsAdmin: pagsAdmin,
          title : "Administrar paginas",
          menus : menus
        });
      });  
    });
  });
});

app.route('/editarmenu')
.get(function(req, res){
  db.pagina.find({publicar:true},"nombreEnlace titulo descripcion").exec(function(error, paginas){
    crudMenu.read(req, res, function(err, menus){
          res.render('editarMenu', {
          message : req.flash('message'),
          user : req.session.user,
          paginas: paginas,
          title : "Administrar menu",
          menus : menus
    });
    });
  });
});

app.route('/editaruser')
.get(function(req, res){
  db.pagina.find({publicar:true},"nombreEnlace titulo descripcion").exec(function(error, paginas){
    crudUser.read(req, res, function(err, users){
      crudMenu.read(req, res, function(err, menus){
        res.render('editarUser', {
          message : req.flash('message'),
          user : req.session.user,
          users: users,
          paginas: paginas,
          title : "Administrar paginas",
          menus : menus
        });
      });  
    });
  });
});
