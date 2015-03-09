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
      res.render('index', {
        administrador : req.session.admin,
        paginas: paginas,
        pagsAdmin: pagsAdmin
      });
    });
  });
});


app.route('/editarmenu')
.get(function(req, res){
  db.pagina.find({publicar:true},"nombreEnlace titulo descripcion").exec(function(error, paginas){
    res.render('editarMenu', {
      administrador : req.session.admin,
      paginas: paginas
    });
  });
});
