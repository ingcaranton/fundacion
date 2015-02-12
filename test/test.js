var chai = require("chai");
var expect = chai.expect;
var request = require('request');


describe("rutas", function() {
	describe("GET", function() {
		describe('/index', function(){
				it('error', function(done){
			      	request.get('http://localhost:3000',function (error, response, body) {
			      		expect(response.statusCode).to.be.below(400);
			      		done();
			      	});
			    });
		});
	});
});