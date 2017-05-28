const sempli = require('../sempli')
const NodeMailer = require('nodemailer');
const User = require('.././models/user')

// Function to show all Users
exports.users = (req,res) => {
    User.find((err,response) =>{
		if (err) {
			sempli.response(res,500,{
				estado: 'error',
				error: err,
				message: 'sin resultados'
			})
		} else {
			sempli.response(res,200,{
				estado: 'success',
				message: 'registros encontrados con exito',
				data: response
			})
		}
	});
}

// Function create User
exports.createuser = (req,res) => {

	let usuario = new User({
        name: req.fields.name,
		mail: req.fields.mail,
		username: req.fields.username,
		phone: req.fields.phone,
		password: req.fields.password,
		admin: req.fields.admin,
		date: new Date()
    })

	usuario.save((err,response) => {
		if (err) {
			sempli.response(res,500,{
				estado: 'error',
				error: err,
				message: 'no se pudo crear el usuario, intentelo mas tarde'
			})
		} else {
			sempli.response(res,200,{
				estado: 'success',
				message: 'usuario creado con exito',
				data: response
			})
		}
	})
}

// Function to find by id User
exports.userid = (req,res) => {
	User.findById({_id: req.params.id},(err,response) => {
		if (err) {
			sempli.response(res,500,{
				estado: 'error',
				error: err,
				message: 'sin resultados'
			})
		} else {
			sempli.response(res,200,{
				estado: 'success',
				message: 'registros encontrados con exito',
				data: response
			})
		}
	})

}


// function findOne
exports.one = (req,res) => {
	User.findOne({mail:req.fields.name},(err,response) => {
		if (err) {
			sempli.response(res,500,{
				estado: 'error',
				error: err,
				message: 'sin resultados'
			})
		} else {
			sempli.response(res,200,{
				estado: 'success',
				message: 'registros encontrados con exito',
				data: response
			})
		}
	})
}

// function delete
exports.delete = (req,res) => {
	User.remove({_id: req.params.id}, (err,response) => {
		if (err) {
			sempli.response(res,500,{
				estado: 'error',
				error: err,
				message: 'imposible eliminar'
			})
		} else {
			sempli.response(res,200,{
				estado: 'success',
				message: 'usuario eliminado con exito',
				data: response
			})
		}
	})
}

//function update
exports.update = (req,res) => {

	let data = new User({
		_id: req.params.id,
		name: req.fields.name,
		username: req.fields.username,
		phone: req.fields.phone,
		password: req.fields.password,
		admin: req.fields.admin,
		date: new Date()
	});

	User.update({_id: id},data,(err,response) =>{
		if (err) {
			sempli.response(res,500,{
				estado: 'error',
				error: err,
				message: 'imposible actualizar'
			})
		} else {
			sempli.response(res,200,{
				estado: 'success',
				message: 'usuario actualizado con exito',
				data: response
			})
		}
	})
}

