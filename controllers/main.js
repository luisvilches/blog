const sempli = require('../sempli')
const Post = require('.././models/post');
const cloudinary = require('cloudinary');

exports.index = (req,res,next) => {
	res.json({message: 'Hello Sempli!!'});
}