
// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
/*
module.exports = mongoose.model('vuelo', {
	//_id: {type: mongoose.Schema.Types.ObjectId, required: false},
	//_id: Number,
    nombres: {nombre:String, apellido: String},
    edad: Number,
    ciudad: String,
    fechan: {type: Date, default: Date.Now},
    intereses: Array
});
*/


module.exports = mongoose.model('vuelo', {
	_id : Number , 
	aerolina: String , 
	ciudad_origen: String,
	ciudad_destino: String, 
	fechsalida: Date , //  Date , 

	fechllegada: Date //Date
});