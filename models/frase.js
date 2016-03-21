module.exports = function(mongoose){

var Schema = mongoose.Schema;
var fraseSchema = new Schema({
	texto : String
});
return mongoose.model('frase', fraseSchema);
}