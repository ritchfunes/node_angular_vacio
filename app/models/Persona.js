// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Persona', {
	//_id: {type: mongoose.Schema.Types.ObjectId, required: false},
	//_id: Number,
  //  nombres: {nombre:String, apellido: String},
//  nombre:String , 
    edad: Number,
    ciudad: String,
  //  fechan: {type: Date, default: Date.Now},
 //   intereses: Array
});
