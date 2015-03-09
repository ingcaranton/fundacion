var express = require('express');
var app = module.exports = express();
var crudPagina = require("./crud");

app.set('views', __dirname + '/views');

app.route('/nueva')
.get(function(req, res){
  db.pagina.find({publicar:true},"nombreEnlace titulo descripcion").exec(function(error, paginas){
    res.render('nueva', {
      administrador : req.session.admin,
      paginas: paginas
    });
  });
});


app.route('/editar/:pagina')
.get(function(req, res) {
  //Busca la pagina que se esta pidiendo en la BD, si la encuentra renderiza la informacion que tenga
  db.pagina.find({publicar:true},"nombreEnlace titulo").exec(function(error, paginas){
    crudPagina.read(req, res, function(err, pagina, flash){
      if(pagina){
        res.render('editar', { 
          administrador : req.session.admin,
          pagina: pagina,
          paginas:paginas,
          message: req.flash('message')
        });
      }else{
        //Can not find the record, renders not found
        res.render('pagina', {
          error: "not found"
        });
       }
    });
  });
});

app.route('/guardar')
  .post(function(req,res){
    crudPagina.create(req, res, function(err, pagina, flash){
      if(err){
        res.redirect("/admin/error");
      }else{
        res.redirect("/admin");
      }
  });
});

app.route('/publicar')
  .post(function(req,res){
    req.body.publicar=true;
    crudPagina.create(req, res, function(err, pagina, flash){
      if(err){
        res.redirect("/admin/error");
      }else{
        res.redirect("/admin");
      }
  });
});

app.route('/borrar/:pagina')
  .get(function(req,res){
    crudPagina.deleter(req, res, function(err, pagina, flash){
      if(err){
        res.redirect("/admin/error");
      }else{
        res.redirect("/admin");
      }
  });
});


app.route('/actualizar/guardar')
  .post(function(req,res){
    crudPagina.update(req, res, function(err, pagina, flash){
      if(err){
        res.redirect("/admin/error");
      }else{
        res.redirect("/admin");
      }
  });
});

app.route('/actualizar/publicar')
  .post(function(req,res){
    req.body.publicar=true;
    crudPagina.update(req, res, function(err, pagina, flash){
      if(err){
        res.redirect("/admin/error");
      }else{
        res.redirect("/admin");
      }
  });
});

app.route('/cambiarEstado/:pagina')
.get(function(req,res){
    crudPagina.updateEstado(req, res, function(err, pagina, flash){
      if(err){
        res.redirect("/admin/error");
      }else{
        res.redirect("/admin");
      }
  });
});
