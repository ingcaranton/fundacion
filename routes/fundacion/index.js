var express = require('express');
var app = module.exports = express();
var Buffer= require('Buffer');
var crypto = require('crypto');
var nodemailer = require('nodemailer');

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
  db.pagina.find({publicar:true}).sort('-fechaCreacion').limit(8).exec(function(error, ultimasEntradas){
    db.pagina.aggregate({$sort: {_id:1}},{$group: {_id: "$categoria", 
      descripcion: {$last: "$descripcion" },
      nombreEnlace: {$last: "$nombreEnlace" },
      fechaCreacion: {$last: "$fechaCreacion" },
      categoria: {$last: "$categoria" },
      linkImagen: {$last: "$linkImagen" },
      titulo: {$last: "$titulo" }
    }},
        function(error, ultimasEntradasPrimarias){
          console.log(ultimasEntradasPrimarias);
          res.render('index', {
            title : 'Conexión Bienestar',
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

app.route('/hacerdonacion')
.get(function(req, res){
  var form={};
  form.comercio="1";
  form.json="MbgxlL0HYcKOx/3Ypdgo2xmmE7VxNlAe2mimlJV4DRNgXX99d3HAz2/YuRaaMMbKlcMiwGw6MbZxNUJyrx8rpRDqC9EKLWGJISdxCK5HHDsex9o3MH+CiuKEKclWY8LSbgX3h/gZ3IADvPmwAw/jJMAPdttqMrzXer5pnsxcVqyQihiz+k63Xq/T/oOK3PtOcykhw3sBVfygSHPhHH206pqP54Yw5Eomj/uEtnHRTrlZcpy99BrX/sk/3HRWC4t9JiScTqqd5ZdTiSdsEW2eMBphggraXruaNHYStguICNNhbQvKbpFRzO6KloHnvHlZnk9OsH9Gz8y52wM9mmds+Abyc7fUx1xzo7Sh4GfzCcoLjVjiwvGmWCU1WwEAqVI53gPwpIUwxfP8FfbcBKuBneyMiBan2vbc5MsLIHOwoIN5iODSwAWZ80ucFJhPbFe4P2qjLv7NBax1oXMQpJSjYUglrALTA7HYUZLRMmpP8jY/FEKKwfb9Qw==";
  form.comercio=new Buffer(form.comercio).toString('base64');

  res.render('hacerdonacion',{
    message : req.flash('message'),
    title : 'Donar',
    form: form
  });
});

app.route('/contacto')
.get(function(req, res){
  res.render('contacto',{
    message : req.flash('message'),
    title : 'Contacto'
  });
});

app.route('/enviarContacto')
.post(function(req,res){
  var smtpTransport = nodemailer.createTransport("SMTP",{
      service: "Gmail",
    auth: {
      user: "fcbcontacto@gmail.com",
      pass: "fundacionconexionbienestar"
    }
  });
  var mailOptions = {
    from: "Correo Contacto <fcbcontacto@gmail.com>", // sender address
    to: "<info@conexionbienestar.com>", // list of receivers
    subject: "Solicitud de Contacto", // Subject line
    text: "Nombre: "+req.body.nombre+"\nApellido: "+req.body.apellido+"\nMail: "+req.body.email+
      "\nTelefono: "+req.body.telefono+"\nComentario: "+req.body.comentario
  }
  smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
        req.flash('message', 'Error al enviar correo vuelve a intentarlo por favor');
        res.redirect('/contacto');
      }else{
        req.flash('message', 'Mensaje enviado, gracias por contactarnos, espera nuestra respuesta');
        res.redirect('/');
      }
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
