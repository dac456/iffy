var db = require('../db');

exports.create = function(req, res) {
	var username = req.body.username;
	var password = req.body.password;

	db.authenticateUser(username, password, function(userId) {
		req.session.userId = userId;
		
		if(req.session.userId != undefined) {
			res.redirect('/channel');
		}
		else{
			res.redirect('/login/err');
		}		
	});
};

exports.destroy = function(req, res) {
	req.session = null;
	res.redirect('/');
};

exports.restrictUser = function(req, res, next) {
	if(req.session.userId != undefined) {
		next();
	}
	else{
		res.redirect('/');
	}
};
