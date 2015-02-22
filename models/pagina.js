module.exports = function(mongoose){
	var Schema = mongoose.Schema;
	var paginaSchema = new Schema({
		nombreEnlace : String,
		titulo : String,
		descripcion : String,
		elementos : [{
			elemento : String,
			tipo : String
		}]
	});
	return mongoose.model('Pagina', paginaSchema);
}
