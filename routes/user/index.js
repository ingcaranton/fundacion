var express = require('express');
var app = module.exports = express();
var crudUser = require("./crud");
var crudMenu = require("../menu/crud");
var nodemailer = require('nodemailer');

app.set('views', __dirname + '/views');

app.route('/signup')
.get(function(req, res){
  db.pagina.find({},"nombreEnlace titulo descripcion").exec(function(error, paginas){
    crudMenu.read(req, res, function(err, menus){
      res.render('signup', {
        message : req.flash('message'),
        user : req.session.user,
        paginas: paginas,
        title : "Registrar",
        menus : menus
      });
    });
  });
})
.post(function(req,res){
  var smtpTransport = nodemailer.createTransport("SMTP",{
      service: "Gmail",
    auth: {
      user: "fcbcontacto@gmail.com",
      pass: "fundacionconexionbienestar"
    }
  });
  var mailOptions = {
    from: "Fundacion Conexión Bienestar <fcbcontacto@gmail.com>", // sender address
    to: "<"+req.body.email+">", // list of receivers
    subject: "¡Bienvenido! "+req.body.nombre+" "+req.body.apellido, // Subject line
    text: "La Fundación Conexión Bienestar te da la bienvenida, nos complace que te hayas unido a nuestra comunidad, \n ¡GRACIAS POR APOYARNOS!"
  }
  smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
        req.flash('message', 'Error al enviar mensaje de bienvenida');
      }
  }); 
  crudUser.create(req, res, function(err, user, flash){
    if(err)
      res.redirect("/");
    if(user){
      req.session.user=user;
      res.redirect("/");
    }
  });
});

app.route('/login')
.post(function(req,res){
  var usuario=req.body.usuario.toLowerCase();
  db.user.findOne({nickName:usuario},function(errorUser, user){
    if(user){
      if(user.contrasena==req.body.contrasena){
        req.session.user=user;
        res.redirect("/");
      }else{
        req.flash('message', 'error with contrasena');
        res.redirect('/');
      }
    }else{
      req.flash('message', 'error with nickname');
      res.redirect('/');
    }
  });
});

app.route('/logout')
.get(function(req,res){
  delete req.session.user;
  res.redirect('/');
});