var express = require('express');
var app = module.exports = express();
var crudPagina = require("./crud");
var crudMenu = require("../menu/crud");

var multipart = require('connect-multiparty');

app.set('views', __dirname + '/views');

app.use(function(req, res, next){
  db.menu.find().exec(function(errorMenu, menus){
    res.locals.user = req.session.user,
    res.locals.menus = menus;
    res.locals.message = req.flash('message'),
    next();
  });
});

app.route('/nueva')
.get(function(req, res){
  crudMenu.read(req, res, function(err, menus){
    res.render('nueva', {
      message : req.flash('message'),
      user : req.session.user,
      title : "Nueva pagina",
      menus : menus
    });
  });
});

app.route('/editar/:pagina')
.get(function(req, res) {
  //Busca la pagina que se esta pidiendo en la BD, si la encuentra renderiza la informacion que tenga
    crudMenu.read(req, res, function(err, menus){
      crudPagina.read(req, res, function(err, pagina){
        if(pagina){
          res.render('editar', {
            message : req.flash('message'),
            user : req.session.user,
            pagina: pagina,
            title : "Editar "+req.params.pagina,
            menus : menus
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
        res.redirect("/admin/editarpaginas");
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
        res.redirect("/admin/editarpaginas");
      }
  });
});

app.route('/borrar/:pagina')
  .get(function(req,res){
    crudPagina.deleter(req, res, function(err, pagina, flash){
      if(err){
        res.redirect("/admin/error");
      }else{
        res.redirect("/admin/editarpaginas");
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
        res.redirect("/admin/editarpaginas");
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
        res.redirect("/admin/editarpaginas");
      }
  });
});

app.route('/cambiarEstado/:pagina')
.get(function(req,res){
    crudPagina.updateEstado(req, res, function(err, pagina, flash){
      if(err){
        res.redirect("/admin/error");
      }else{
        res.redirect("/admin/editarpaginas");
      }
  });
});

app.route('/buscar')
.post(function(req,res){
  db.pagina.find({publicar:true}).or([{contenido:new RegExp(req.body.busqueda, "i")},
    {titulo:new RegExp(req.body.busqueda, "i")}, {descripcion:new RegExp(req.body.busqueda, "i")}
    ]).exec(function(error, busqueda){
    res.send(busqueda);
  });
});
