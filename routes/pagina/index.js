var express = require('express');
var app = module.exports = express();
var crudPagina = require("./crud");

var multipart = require('connect-multiparty');

app.set('views', __dirname + '/views');

app.route('/nueva')
.get(function(req, res){
  db.pagina.find({publicar:true},"nombreEnlace titulo descripcion").exec(function(error, paginas){
    res.render('nueva', {
      massage : req.flash('message'),
      administrador : req.session.admin,
      paginas: paginas,
      title : "Nueva pagina"
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
          massage : req.flash('message'),
          administrador : req.session.admin,
          pagina: pagina,
          paginas:paginas,
          title : "Editar "+req.params.pagina
        });
      }else{
        //Can not find the record, renders not found
          res.render('../../../views/error', {
            error: {stack:"not found"}
          });
       }
    });
  });
});

app.route('/guardar')
  .post(multipart(),function(req,res){
    crudPagina.create(req, res, function(err, pagina, flash){
      if(err){
        console.log(err);
        res.redirect("/admin/error");
      }else{
        res.redirect("/admin/paginas");
      }
  });
});

app.route('/publicar')
  .post(multipart(),function(req,res){
    req.body.publicar=true;
    crudPagina.create(req, res, function(err, pagina, flash){
      if(err){
        console.log(err);
        res.redirect("/admin/error");
      }else{
        res.redirect("/admin/paginas");
      }
  });
});

app.route('/borrar/:pagina')
  .get(function(req,res){
    crudPagina.deleter(req, res, function(err, pagina, flash){
      if(err){
        res.redirect("/admin/error");
      }else{
        res.redirect("/admin/paginas");
      }
  });
});

app.route('/actualizar/guardar')
  .post(multipart(), function(req,res){
    crudPagina.update(req, res, function(err, pagina, flash){
      if(err){
        console.log(err);
        res.redirect("/admin/error");
      }else{
        res.redirect("/admin/paginas");
      }
  });
});

app.route('/actualizar/publicar')
  .post(multipart(), function(req,res){
    req.body.publicar=true;
    crudPagina.update(req, res, function(err, pagina, flash){
      if(err){
        console.log(err);
        res.redirect("/admin/error");
      }else{
        res.redirect("/admin/paginas");
      }
  });
});

app.route('/cambiarEstado/:pagina')
.get(function(req,res){
    crudPagina.updateEstado(req, res, function(err, pagina, flash){
      if(err){
        res.redirect("/admin/error");
      }else{
        res.redirect("/admin/paginas");
      }
  });
});
