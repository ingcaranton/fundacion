 // models/index.js
if (!global.hasOwnProperty('db')) {
 
  var mongoose = require('mongoose');
 
  var dbName;
//  if(process.env.ENV === 'test')
//    dbName = 'test_fundacion';
//  else
//    dbName = 'fundacion';
var dbName='testFundacion'; 
  // the application is executed on the local machine ...
  mongoose.connect('mongodb://localhost/' + dbName);
 
 
  global.db = {
 
    mongoose: mongoose,
 
    //models
     pagina:require('./pagina')(mongoose)
    
    // agregar más modelos aquí en caso de haberlos
  };
}
 
module.exports = global.db;
