var express = require('express');
var app = module.exports = express();
var crudMenu = require("../menu/crud");

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

app.route('/signup')
.get(function(req, res){
  db.pagina.find({},"nombreEnlace titulo descripcion").exec(function(error, paginas){
    crudMenu.read(req, res, function(err, menus, flash){
      res.render('signup', {
        message : req.flash('message'),
        user : req.session.user,
        paginas: paginas,
        title : "Registrar",
        menus : menus
      });
    });
  });
});

app.route('/login')
.post(function(req,res){
  var usuario=req.body.usuario.toLowerCase();
  db.user.findOne({nickName:usuario},function(errorUser, user){
    if(user){
      if(user.contrasena==req.body.contrasena){
        req.session.user=user;
        res.redirect("/admin");
      }else{
        req.flash('message', 'error with contrasena');
        res.redirect('/admin');
      }
    }else{
      req.flash('message', 'error with nickname');
      res.redirect('/admin');
    }
  });
});

app.route('/logout')
.get(function(req,res){
  delete req.session.user;
  res.redirect('/');
});