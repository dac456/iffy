var db = require('../db');

module.exports.createUser = function(req, res) {
    db.createUser(req.body.username, req.body.password);
    
    res.redirect('/');
};
