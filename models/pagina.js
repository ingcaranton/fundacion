module.exports = function(mongoose){
	var Schema = mongoose.Schema;
	var paginaSchema = new Schema({
		nombreEnlace : String,
		titulo : String,
		descripcion : String,
		contenido : String,
		publicar : Boolean,
		fechaCreacion : String
	});
	return mongoose.model('pagina', paginaSchema);
}
