var app = require('../app');;
var chai = require("chai");
var chaiHttp = require('chai-http');
var assert = chai.assert;
var expect = chai.expect;

chai.use(chaiHttp);

// test Bd

describe("pages", function() {
  describe('when i visit the all pages', function(){
    it('shows the pages content', function(done){
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
      done();
      });
    });
  });
});