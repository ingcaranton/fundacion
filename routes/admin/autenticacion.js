var express = require('express');
var app = module.exports = express();

app.set('views', __dirname + '/views');

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