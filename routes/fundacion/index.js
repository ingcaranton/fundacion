var express = require('express');
var app = module.exports = express();
var Buffer= require('Buffer');
var crypto = require('crypto');

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

app.route('/hacerdonacion')
.get(function(req, res){
  res.render('hacerdonacion',{
    message : req.flash('message'),
    title : 'Donar'
  });
});

app.route('/donar')
.get(function(req, res) {
  var form={};
  form.comercio="1";
  form.json2="MbgxlL0HYcKOx/3Ypdgo2xmmE7VxNlAe2mimlJV4DRNgXX99d3HAz2/YuRaaMMbKlcMiwGw6MbZxNUJyrx8rpRDqC9EKLWGJISdxCK5HHDsex9o3MH+CiuKEKclWY8LSbgX3h/gZ3IADvPmwAw/jJMAPdttqMrzXer5pnsxcVqyQihiz+k63Xq/T/oOK3PtOcykhw3sBVfygSHPhHH206pqP54Yw5Eomj/uEtnHRTrlZcpy99BrX/sk/3HRWC4t9JiScTqqd5ZdTiSdsEW2eMBphggraXruaNHYStguICNNhbQvKbpFRzO6KloHnvHlZnk9OsH9Gz8y52wM9mmds+Abyc7fUx1xzo7Sh4GfzCcoLjVjiwvGmWCU1WwEAqVI53gPwpIUwxfP8FfbcBKuBneyMiBan2vbc5MsLIHOwoIN5iODSwAWZ80ucFJhPbFe4P2qjLv7NBax1oXMQpJSjYUglrALTA7HYUZLRMmpP8jY/FEKKwfb9Qw==";
  form.json=JSON.stringify({"json":{"idComercio":1,"idTipoTransaccion":1,"pagos":1,"idProducto":"1001","idConcepto":"prueba Transaccion",
  "concepto":"prueba Transaccion","valor":2320.00,"impuesto":16,"valorImpuesto":320,"moneda":"COP","secureCode":"ed81fadcaf",
  "certificado":"DXqxJP8vnxhfdJKbmMtwUw==","urlComercio":"http://192.155.93.202/phoneapp/post.php" ,
  "urlConfirmacion":"https://mysterious-ridge-6587.herokuapp.com/donar"}}) ;

  var b = new Buffer(form.json2, 'base64')
  var s = b.toString();
  console.log(s); 

  var cipher = crypto.createCipher('des3','DC101AB52CF894CEE52F61731643B94F');
  var crypted = cipher.update(form.json,'ascii','ascii');
  form.json=new Buffer(crypted).toString('base64');

  form.comercio=new Buffer(form.comercio).toString('base64');
  res.render('donar',{
    form : form
  });
})
.post(function(req, res) {
  res.send(req.body+"si llego");
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
