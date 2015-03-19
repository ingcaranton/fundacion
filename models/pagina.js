module.exports = function(mongoose){
	var Schema = mongoose.Schema;
	var paginaSchema = new Schema({
		nombreEnlace : String,
		titulo : String,
		descripcion : String,
		contenido : String,
		publicar : Boolean,
		fechaCreacion : String,
		categoria : String,
		UserModificacion : String,
		linkImagen: String,
		soloRegistrados : Boolean
	});
	return mongoose.model('pagina', paginaSchema);
}
