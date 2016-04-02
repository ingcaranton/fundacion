var express = require('express');
var app = module.exports = express();
var crudFrase = require("./crud");

app.set('views', __dirname + '/views');

app.route('/editar')
.post(function(req, res){
	crudFrase.update(req, res, function(err, frase, flash){
		  if(err){
       res.redirect("/admin/error");
      }else{
        res.redirect("/admin/editarFrase");
      }
	});
});

app.route('/nuevo')
.post(function(req, res){
	crudFrase.create(req, res, function(err, frase, flash){
		  if(err){
       res.redirect("/admin/error");
      }else{
        res.redirect("/admin/editarFrase");
      }
	});
});

app.route('/eliminar/:frase')
  .get(function(req,res){
    crudFrase.deleter(req, res, function(err, frase, flash){
      if(err){
        res.redirect("/admin/error");
      }else{
        res.redirect("/admin/editarFrase");
      }
  });
});