const sempli = require('../sempli');
const Model = require('.././models/post');
const cloudinary = require ('cloudinary');


exports.find = (req,res,next) => {
    // escribe tu funcion para buscar los registros

	Model.find((err,response) => {
		if(err){
			sempli.response(res,500,{
				status: 'error',
				error:'error',
				message: err
			})
		}else{
			sempli.response(res,200,{
				status: 'success',
				message: 'Posts encontrados con exito',
				data: response
			})
		}
	})
}
exports.create = (req,res) => {
	// escribe tu funcion para crear registros
	cloudinary.uploader.upload(req.files.imagen.path, (result) => {
		var imagen = result.url;
		cloudinary.uploader.upload(req.files.cover.path, (result) => {
			let data = new Model({
				title: req.fields.title,
				titleUrl: req.fields.title.replace(/ /g,"-").toLowerCase(),
				content: req.fields.content,
				categoria: req.fields.categoria,
				img: imagen,
				cover:result.url,
				date: new Date()
			})

			data.save((err,response) => {
				if(err){
					sempli.response(res,500,{
						status: 'error',
						error:'error',
						message: err
					})
				}else{
					sempli.response(res,200,{
						status: 'success',
						message: 'Post creado con exito',
						data: response
					})
				}
			})
		})
	})
	
}
exports.update = (req,res) => {
	// escribe tu funcion para actualizar registros

	let data = new Model({
		_id: req.params.id,
		title: req.fields.title,
		content: req.fields.content,
		categoria: req.fields.categoria,
		date: new Date()
	})
	
	Model.update({_id: req.params.id},data,(err,response) => {
		if(err){
			sempli.response(res,500,{
				status: 'error',
				error:'error',
				message: err
			})
		}else{
			sempli.response(res,200,{
				status: 'success',
				message: 'Post actualizado con exito',
				data: response
			})
		}
	})
}
exports.delete = (req,res) => {
	// escribe tu funcion para eliminar registros
	Model.remove({_id: req.params.id},(err,response)=>{
		if(err){
			sempli.response(res,500,{
				status: 'error',
				error:'error',
				message: err
			})
		}else{
			sempli.response(res,200,{
				status: 'success',
				message: 'Post eliminado con exito',
				data: response
			})
		}
	})
}
exports.findOne = (req,res) => {
	// escribe tu funcion para buscar un registros
	Model.findOne({titleUrl: req.params.url},(err,response) => {
		if(err){
			sempli.response(res,500,{
				status: 'error',
				error:'error',
				message: err
			})
		}else{
			sempli.response(res,200,{
				status: 'success',
				message: 'Posts encontrados con exito',
				data: response
			})
		}
	})
}
exports.findById = (req,res) => {
	// escribe tu funcion para buscar un registros por id
}