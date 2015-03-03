var app = require('../app');;
var chai = require("chai");
var chaiHttp = require('chai-http');
var assert = chai.assert;
var expect = chai.expect;

chai.use(chaiHttp);

//Clears the DB
db.pagina.remove({},function(errRemove){

//Fill the BD with a test record
  var newPagina = new db.pagina();
    newPagina.nombreEnlace = "test";
    newPagina.titulo = "Esto es un test";
    newPagina.descripcion = "Pagina de prueba";
    newPagina.contenido ="Aqui va el texto de la prueba";
  newPagina.save(function(errSave, paginaSave){
    if(paginaSave)
      console.log("Registro de prueba guardado");
    else
      console.log(errSave);
  });
});

//Begin testing
describe("pages", function() {
  describe('when I visit all pages loaded from the DB', function(){
    it('shows the page content', function(done){
      //Load all the pages of the DB
      db.pagina.find().exec(function(error, paginas){
        //Go through all the pages loaded
        paginas.forEach(function(pagina){
          chai.request(app)
          .get ("/"+pagina.nombreEnlace)
          //Compare the content loaded in the DB which shows rendered page
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
    it('shows the contentof the main page', function(done){
      db.pagina.find({}, "nombreEnlace titulo descripcion").exec(function(error, paginas){
          chai.request(app)
          .get ('/')
          .end(function(err, res){
            //Test who are all links to the pages of the DB
            paginas.forEach(function(pagina){
              expect(res.text).to.contain(pagina.nombreEnlace, "Error in links of index");
            });
          });
      });
      done();
    });
  });
});