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
  var usuario=req.body.usuario.toLowerCase();
  db.admin.findOne(function(errorUser, pagina){
    if(pagina){
      if(pagina.contrasena==req.body.contrasena){
        req.session.admin=pagina.nombre;
        res.redirect("/");
      }else{
        req.flash('message', 'error with contrasena');
        res.redirect('/admin/login');
      }
    }else{
      req.flash('message', 'error with nickname');
      res.redirect('/admin/login');
    }
  });
});

app.route('/logout')
.get(function(req,res){
  delete req.session.admin;
  res.redirect('/');
});