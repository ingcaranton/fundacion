var express = require('express');
var app = module.exports = express();
var crudPagina = require("../pagina/crud");

//Rutas para la autenticacion
var autenticacion = require("./autenticacion");
app.use(autenticacion);

app.set('views', __dirname + '/views');

app.route('/paginas')
.get(function(req, res){
  db.pagina.find({publicar:true},"nombreEnlace titulo descripcion").exec(function(error, paginas){
    db.pagina.find().exec(function(error, pagsAdmin){
      db.menu.find().exec(function(errorMenu, menus){
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
    db.menu.find().exec(function(errorMenu, menus){
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
