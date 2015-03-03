 // models/index.js
if (!global.hasOwnProperty('db')) {
 
  var mongoose = require('mongoose');
 
  console.log(process.env.NODE_ENV);

  if(process.env.NODE_ENV==="production"){
    mongoose.connect('mongodb://arley:arley@ds045521.mongolab.com:45521/fundacion');
  }
  if(process.env.NODE_ENV==="test"){
    mongoose.connect('mongodb://localhost/testFundacion');
  }
  if(process.env.NODE_ENV==="development"||process.env.NODE_ENV==null){
    mongoose.connect('mongodb://localhost/fundacion');
  }

  global.db = {
 
    mongoose: mongoose,
 
    //models
    pagina:require('./pagina')(mongoose),
    admin:require('./admin')(mongoose)
  };
}
 
module.exports = global.db;
