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
          massage : req.flash('message'),
          administrador : req.session.admin,
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
          massage : req.flash('message'),
          administrador : req.session.admin,
          paginas: paginas,
          title : "Administrar menu",
          menus : menus
    });
    });
  });
});
