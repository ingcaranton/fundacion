module.exports = function(mongoose){

var Schema = mongoose.Schema;
var menuSchema = new Schema({
	titulo : String,
	creador : String,
	fechaCreacion : String,
    submenus : [{
					titulo : String,
					url : String
		}]
});
return mongoose.model('menu', menuSchema);
}