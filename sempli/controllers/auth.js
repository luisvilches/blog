const app = require('../../sempli');
const User = require('../../models/user')


exports.auth =  (req, res) => {
 //find the user
 User.findOne({mail: req.fields.mail},(err, user) => {
    if (err) throw err;

    if (!user) {
        res.json({ success: false, message: 'Autenticacion fallida, el usuario no existe' });
    } else if (user) {

        // check if password matches
        if (user.password != req.fields.password) {

            res.json({ success: false, message: 'Authentication failed. Wrong password.' });

        } else {
            // return the information including token as JSON
            res.json({
                success: true,
                message: 'Enjoy your token!',
                token: app.createTokens(user),
                user: user
            });
        }
    }
 });
};