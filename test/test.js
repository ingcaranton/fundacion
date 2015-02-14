var app = require('../app');;
var chai = require("chai");
var chaiHttp = require('chai-http');
var assert = chai.assert;
var expect = chai.expect;

chai.use(chaiHttp);


describe("about", function() {
		describe('when i visit the about page', function(){
				it('shows the about content', function(){
			      	chai.request(app)
  						.get ('/about')
  						.end(function(err, res){
  							expect(res.text).to.contain('Quienes somos');
  							expect(res.text).to.contain("LA FUNDACIÓN CONEXIÓN");
  						});
			    });
		});
});