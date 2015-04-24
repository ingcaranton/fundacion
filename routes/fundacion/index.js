var express = require('express');
var app = module.exports = express();
var Buffer= require('Buffer');
var nodemailer = require('nodemailer');
var crudColaboradores = require('./../colaboradores/crud');

app.set('views', __dirname + '/views');

app.use(function(req, res, next){
  db.menu.find().exec(function(errorMenu, menus){
    res.locals.user = req.session.user,
    res.locals.menus = menus;
    res.locals.message = req.flash('message'),
    next();
  });
});

app.route('/')
.get(function(req, res){
  db.pagina.find({publicar:true,categoria:{$ne:"sinCategoria"}}, 'descripcion nombreEnlace fechaCreacion categoria linkImagen titulo').sort('-fechaCreacion').limit(8).exec(function(error, ultimasEntradas){
    db.pagina.aggregate({$match: {publicar:true} },{$sort: {_id:1}},{$group: {_id: "$categoria", 
      descripcion: {$last: "$descripcion" },
      nombreEnlace: {$last: "$nombreEnlace" },
      fechaCreacion: {$last: "$fechaCreacion" },
      categoria: {$last: "$categoria" },
      linkImagen: {$last: "$linkImagen" },
      titulo: {$last: "$titulo" }
    }},
        function(error, ultimasEntradasPrimarias){
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
  db.pagina.find({publicar:true}, 'nombreEnlace titulo descripcion fechaCreacion linkImagen categoria').exec(function(error, paginas){
    db.menu.find().exec(function(errorMenu, menus){
      res.render('todocontenido', {
        paginas: paginas,
        title : 'Conexion bienestar'
      });
    });
  });
});

app.route('/hacerdonacion')
.get(function(req, res){
  var datosDonacion=req.session.datosDonacion;
  req.session.datosDonacion=null;
  var datosEncryptados;
  if(datosDonacion && datosDonacion.dinero){

    //espacio al final de cada String
      var dineroDonado=datosDonacion.cantidad+".00"
      var comercio = "4";

    var exec = require('child_process').exec;
    var command = 'php -f encrypt.php '+dineroDonado;
    console.log(command);
    
    exec(command,
      function (error, stdout, stderr) {
        // nodejs error
        if (error !== null) {
          console.log('exec error: ' + error);
        }
        else {
          var resultado = stdout.replace(" ","");
          datosEncryptados={};
          datosEncryptados.comercio=comercio;
          datosEncryptados.json= resultado;
          datosEncryptados.comercio=new Buffer(datosEncryptados.comercio).toString('base64');
          }
      res.render('hacerdonacion',{
        message : req.flash('message'),
        title : 'Conexión Bienestar',
        datosEncryptados: datosEncryptados,
        datosDonacion: datosDonacion
      });
    });
  }else{
        res.render('hacerdonacion',{
        title : 'Conexión Bienestar',
        datosDonacion: datosDonacion
      });
  }
})
.post(function(req, res){
  console.log(req.body);
  crudColaboradores.create(req, res, function(err, colaborador, flash){
    req.session.datosDonacion=req.body;
    res.redirect('/hacerdonacion');
  });
});

app.route('/estrellas')
.get(function(req, res){
  res.render('estrellas',{
    title : 'Conexión Bienestar'
  });
});

app.route('/respuestaAddCelColombia')
.post(function(req,res){
  console.log(req.body);
  req.flash('message', 'Donacion exitosa');
  res.redirect('/');
});

app.route('/contacto')
.get(function(req, res){
  res.render('contacto',{
    title : 'Conexión Bienestar'
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
  db.pagina.findOne({ nombreEnlace: req.params.pagina }, function(error, pagina){
    db.menu.find().exec(function(errorMenu, menus){
      if(pagina){
        res.render('pagina', {
          pagina: pagina,
          title : 'Conexión Bienestar'
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
