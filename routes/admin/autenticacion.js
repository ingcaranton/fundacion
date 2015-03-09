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

app.route('/login')
.post(function(req,res){
  var usuario=req.body.usuario.toLowerCase();
  db.admin.findOne(function(errorUser, user){
    if(user){
      if(user.contrasena==req.body.contrasena){
        req.session.admin=user.nombre;
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
  delete req.session.admin;
  res.redirect('/');
});