module.exports = function(mongoose){

var Schema = mongoose.Schema;
var menuSchema = new Schema({
	titulo : String,
    submenus : [{
					titulo : String,
					url : String
		}]
});
return mongoose.model('menu', menuSchema);