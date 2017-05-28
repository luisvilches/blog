const express = require('express');
const mongoose = require('mongoose');
const body = require('body-parser')
const cors = require('cors');
const path = require('path');
const jwt = require('jwt-simple');
const moment = require('moment');
const auth = require('./middlewares/auth');
const config = require('../config');
const formidable = require('express-formidable');
const mongooseFieldEncryption = require('mongoose-field-encryption').fieldEncryption;



let app = express();

var uploads = () => {
    return app.use(formidable({
        encoding: 'utf-8',
        uploadDir: config.static.uploads,
        keepExtensions: true,
        multiples: true
    }))
}

var headers = (args) => {
    return app.use(cors(args));
};
var use = (arg) => {
    return app.use(arg);
};
var middlewares = (req, res, next) => {
    
    //functions for middleware

    next();
}

var apps = () => {
    return app.use(middlewares);
}
var server = () => {
    var puerto = process.env.PORT || config.server.port;
    return app.listen(puerto, err => {
        if(err){
            console.log(err)
        }else{
            console.log('Sempli server running....in port ' + puerto)
        }
    })
};

var dbConnect = () => {
    return mongoose.connect(config.database.connection, err => {
        if (err) {console.log(err);}
        else{ console.log(`Sempli connection database success...ok`)}
    }) 
};
var static = () => {
    return app.use(express.static(path.join(__dirname,config.static.dir)))
}

var method = () => {
    return app.use(methodOverride('_method'))
}

function parser(){
    uploads();
    //bodyParser();
    //bodyParserJson();
    //bodyParserUrl();
}

var sempli = {

    config: function(){
        server();
        dbConnect();
        headers();
        static();
        parser();
        apps();
    },

    use: function(arg){
        return app.use(arg);
    },

    private: function(r,f){
        return app.use(r, auth.ensureAuthenticated, f);
    },

    public: function(r,f){
         return app.use(r, f);
    },

    createTokens: function(user){
        let payload = {
            sub: user._id,
            iat: moment().unix(),
            exp: moment().add(14, 'days').unix(),
            username: user.name,
        };

        return jwt.encode(payload,config.TOKEN_SECRET);
    },
    response: function(res,s,obj){
        return res.status(s).json(obj);
    },
    encript: function(schema,arr){
        return schema.plugin(mongooseFieldEncryption, {fields: arr, secret: config.TOKEN_SECRET});
    },
    decripter: function(encrypted){
        return mongooseFieldEncryption.decrypt(encrypted,config.TOKEN_SECRET); // decrypted = 'some text'
    },
    schema: mongoose.Schema,
    models: function(name,model){
        return mongoose.model(name,model);
    },
    router: function(){
        return express.Router();
    }
}


module.exports = sempli;

