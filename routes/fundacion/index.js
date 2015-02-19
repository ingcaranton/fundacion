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

app.route('/:pagina')
.get(function(req, res) {
	db.pagina.findOne({ nombreEnlace:"/"+req.params.pagina }, function(error, pagina){
  		if(pagina){
        res.render('pagina', { 
          pagina: pagina
  		  });
  	   }else{
        res.render('pagina', {
          pagina: {titulo:"not found"}
        });
       }
    });
});