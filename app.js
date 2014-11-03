
/**
 * Module dependencies.
 */

var express = require('express');
var index = require('./routes/index');
var session = require('./routes/session');
var admin = require('./routes/admin');
var channel = require('./routes/channel');
var db = require('./db')

var http = require('http');
var path = require('path');

var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');

var app = express();

// all environments
app.set('port', process.env.PORT || 28617);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(cookieSession({
	keys: ['key1', 'key2']
}));
app.use(express.static(path.join(__dirname, 'public')));

db.use('iffy')

// development only
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.get('/', index.index);
app.get('/bt', index.bt);

app.get('/channel', index.channel);
app.post('/channel/yts/quality', session.restrictUser, channel.ytsQuality);
app.post('/channel/yts/search/:quality', session.restrictUser, channel.ytsSearch);
app.get('/channel/yts/browse/:quality/:page', session.restrictUser, channel.yts);
app.get('/channel/yts/movie/:movieId', session.restrictUser, channel.ytsMovie);
app.get('/channel/eztv', session.restrictUser, channel.eztv);
app.get('/channel/eztv/:showId/:slug', session.restrictUser, channel.eztvShow);
app.post('/channel/eztv/search', session.restrictUser, channel.eztvSearch);

app.get('/login/err', index.loginError);

//app.post('/admin/user/create', admin.createUser);
app.post('/user/authenticate', session.create);
app.get('/user/logout', session.destroy);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
