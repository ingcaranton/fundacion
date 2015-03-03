var app = require('../app');;
var chai = require("chai");
var chaiHttp = require('chai-http');
var assert = chai.assert;
var expect = chai.expect;

chai.use(chaiHttp);

//borra la BD
db.pagina.remove({},function(errRemove){

//Llena la BD con un ejemplo
  var newPagina = new db.pagina();
    newPagina.nombreEnlace = "test";
    newPagina.titulo = "Esto es un test";
    newPagina.descripcion = "Pagina de prueba";
    newPagina.elementos.push({elemento:"Aqui va el texto de la prueba"});
  newPagina.save(function(errSave, paginaSave){
    if(paginaSave)
      console.log("Registro de prueba guardado");
    else
      console.log(errSave);
  });
});

//empiezan las pruebas
describe("admin pages", function() {
  describe('content admin in index', function(){
    it('link a edit page in index', function(done){
        chai.request(app)
        .get ('/')
        .end(function(err, res){
          expect(res.text).to.contain('href="/admin/"', 'Error in the link edit');
        });  
      done();
    });
  });
});

describe("pages", function() {
  describe('when i visit the all pages', function(){
    it('shows the page content', function(done){
      db.pagina.find().exec(function(error, paginas){
        paginas.forEach(function(pagina){
          chai.request(app)
          .get ("/"+pagina.nombreEnlace)
          .end(function(err, res){
            expect(res.text).to.contain(pagina.titulo, "Error in title of "+pagina.nombreEnlace);
            pagina.elementos.forEach(function(elemento){
              expect(res.text).to.contain(elemento.elemento, "Error in content of "+pagina.nombreEnlace);
            });
          });
        });
      });
      done();  
    });
    it('shows the index content', function(done){
      db.pagina.find().exec(function(error, paginas){
          chai.request(app)
          .get ('/')
          .end(function(err, res){
            paginas.forEach(function(pagina){
              expect(res.text).to.contain(pagina.nombreEnlace, "Error in links of index");
            });
          });
      });
      done();
    });
  });
});