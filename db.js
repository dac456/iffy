var mysql = require('mysql');
var easyPbkdf2 = require("easy-pbkdf2")();

var pool = undefined;

module.exports.use = function(name) {
	pool = mysql.createPool({
		host: 'localhost',
		user: 'root',
		password: '***REMOVED***',
		database: name
	});
};

module.exports.getTpb = function(callback) {
	pool.getConnection(function(err, connection) {
		connection.query('SELECT * FROM tpb ORDER BY title ASC', function(err, rows, fields) {
			if(rows != 0) {
				return callback(rows);
			}
			else {
				return callback(undefined);
			}
		});
		
		connection.release();
	});
};
