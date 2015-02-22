var express = require('express');
var app = module.exports = express();

app.set('views', __dirname + '/views');

app.route('/')
.get(function(req, res){
  db.pagina.find().exec(function(error, paginas){
    res.render('index', {
      paginas: paginas
    });
  });
});