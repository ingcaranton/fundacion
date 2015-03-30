var express = require('express');
var app = module.exports = express();

app.set('views', __dirname + '/views');

app.use(function(req, res, next){
  db.pagina.find({publicar:true}).exec(function(error, paginas){
    db.menu.find().exec(function(errorMenu, menus){
      res.locals.paginas = paginas;
      res.locals.user = req.session.user,
      res.locals.menus = menus;
      res.locals.message = req.flash('message'),
      next();
    });
  });
});

app.route('/')
.get(function(req, res){
  db.pagina.find({publicar:true}).sort('-fechaCreacion').limit(5).exec(function(error, ultimasEntradas){
    db.pagina.aggregate({$sort: {_id:1}},{$group: {_id: "$categoria", 
      descripcion: {$last: "$descripcion" },
      nombreEnlace: {$last: "$nombreEnlace" },
      fechaCreacion: {$last: "$fechaCreacion" },
      linkImagen: {$last: "$linkImagen" },
      titulo: {$last: "$titulo" }}},
        function(error, ultimasEntradasPrimarias){
          console.log(ultimasEntradasPrimarias);
          res.render('index', {
            title : 'Conexion bienestar',
            ultimasEntradas:ultimasEntradas,
            ultimasEntradasPrimarias:ultimasEntradasPrimarias
          });
    });
  });
});

app.route('/todocontenido')
.get(function(req, res){
  db.pagina.find({publicar:true}).exec(function(error, paginas){
    db.menu.find().exec(function(errorMenu, menus){
      res.render('todocontenido', {
        message : req.flash('message'),
        user : req.session.user,
        paginas: paginas,
        title : 'Conexion bienestar',
        menus : menus
      });
    });
  });
});

app.route('/:pagina')
.get(function(req, res) {
  db.pagina.find({publicar:true}).exec(function(error, paginas){
    db.pagina.findOne({ nombreEnlace: req.params.pagina }, function(error, pagina){
      db.menu.find().exec(function(errorMenu, menus){
        if(pagina){
          res.render('pagina', {
            message : req.flash('message'),
            user : req.session.user,
            pagina: pagina,
            paginas: paginas,
            title : pagina.titulo,
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
});