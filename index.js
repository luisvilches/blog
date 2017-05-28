'use strict'
//modulos
const sempli = require('./sempli');
const cloudinary = require('cloudinary');
const routes = require('./routes/public');
const routesPrivate = require('./routes/private');

sempli.config();
sempli.public('/',routes);
sempli.private('/dashboard',routesPrivate);


// config cloudinary
cloudinary.config({ 
  cloud_name: 'dowhile', 
  api_key: '379999323567133', 
  api_secret: 'SJ_2PkWm2ISda-R2gDE5KdJR3J4' 
});