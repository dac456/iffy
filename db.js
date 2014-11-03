var mysql = require('mysql');
var easyPbkdf2 = require("easy-pbkdf2")();

var pool = undefined;

module.exports.use = function(name) {
    if(process.env.NODE_ENV !== 'development') {
        pool = mysql.createPool({
            host: 'localhost',
            user: 'iffy',
            password: 'Iffytest5+',
            database: name
        });
    }
    else{
        pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '***REMOVED***',
            database: name
        });        
    }
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

module.exports.authenticateUser = function(username, password, callback) {
	pool.getConnection(function(err, connection) {
		connection.query('SELECT * FROM users WHERE username = '+connection.escape(username), function(err, rows, fields) {
			if(rows.length == 1) {
				var user = rows[0];
				
                easyPbkdf2.verify(user.salt, user.hash, password, function(err, valid) {
                    if(valid) {
                        return callback(user.id);
                    }
                    else {
                        return callback(undefined);
                    }
                });
			}
			else {
				return callback(undefined);
			}
		});
		
		connection.release();
	});
};

module.exports.createUser = function(username, password, callback) {
    pool.getConnection(function(err, connection) {
        var salt = easyPbkdf2.generateSalt();
        easyPbkdf2.secureHash(password, salt, function(err, hash, origSalt){
            connection.query('INSERT INTO users (username, hash, salt) VALUES('+connection.escape(username)+','+connection.escape(hash)+','+connection.escape(origSalt)+')', function(err, rows, fields){
                //TODO: check errors
            });
            
            connection.release();
        });
    });
};
