const sempli = require('../sempli')
let Schema = sempli.schema;

let post = new Schema({
	title: String,
	titleUrl:String,
	cover: String,
	content: String,
	categoria: String,
	img: String,
	date: Date
})

sempli.encript(post,[]);
module.exports = sempli.models('post',post);
