var app = require('../app');;
var chai = require("chai");
var chaiHttp = require('chai-http');
var assert = chai.assert;
var expect = chai.expect;

chai.use(chaiHttp);

describe("admin pages", function() {
  describe('content admin in index', function(){
    it('link a edit page in index', function(done){
      chai.request(app)
      .get ('/')
      .end(function(err, res){
        expect(res.text).to.contain('href="/edit/"', 'Error in the link edit');
        done();
      });  
    });
  });
});

describe("pages", function() {
  describe('when i visit the all pages', function(){
    it('shows the page content', function(done){
      db.pagina.find().exec(function(error, paginas){
        paginas.forEach(function(pagina){
          chai.request(app)
          .get (pagina.nombreEnlace)
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
    it('show the index content', function(done){
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