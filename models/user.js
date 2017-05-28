const sempli = require('../sempli')
let Schema = sempli.schema;

let User = new Schema({
	name: String,
	mail: String,
	phone: String,
	username: String,
	password:String,
	admin: Boolean,
	date: Date
})

sempli.encript(User,['password']);
module.exports = sempli.models('User',User);
