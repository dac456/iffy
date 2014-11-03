var db = require('../db');

exports.index = function(req, res){
    /*var entries = [];
    https.get("https://yts.re/api/list.json?limit=50&sort=alphabet&order=asc", function(yts_res) {
        var data = '';

        yts_res.on('data', function (chunk){
            data += chunk;
        });

        yts_res.on('end',function(){
            var obj = JSON.parse(data);
            for(var i = 0; i < 50; i++) {
                if(obj['MovieList'][i]['Quality'] === '1080p') {
                    entries.push({
                        title: obj['MovieList'][i]['MovieTitle'],
                        maglink: obj['MovieList'][i]['TorrentMagnetUrl'],
                        image: obj['MovieList'][i]['CoverImage']
                    });
                }
            }

            res.render('layouts/default', { 
                title: 'Iffy',
                entries: entries,
                partials: {
                    content: 'index'
                } 
            });
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
    //TODO: this will eventually not be the index page
    var entries = [];
    db.getTpb(function(rows) {
        for(var i = 0; i < rows.length; i++) {
            entries.push({
                title: rows[i].title,
                maglink: rows[i].maglink,
                image: rows[i].image
            });
        }
            
        res.render('layouts/default', { 
            title: 'Iffy',
            entries: entries,
            partials: {
                content: 'index'
            } 
        });
    });*/
    var loggedIn = false;
    if(req.session.userId != undefined) {
        res.redirect('/channel');
    }     
    else {
        res.render('layouts/default', {
            title: 'Iffy',
            loggedIn: loggedIn,
            isError: false,
            partials: {
                content: 'index'
            }
        });
    }
};

exports.bt = function(req, res){
    res.render('bt');
};

exports.channel = function(req, res) {
    var loggedIn = false;
    if(req.session.userId != undefined) {
        loggedIn = true;
    }     
        
    res.render('layouts/default', {
        title: 'Iffy',
        loggedIn: loggedIn,
        partials: {
            content: 'channel_list'
        }
    });
};

exports.loginError = function(req, res) {
    var loggedIn = false;
    if(req.session.userId != undefined) {
        loggedIn = true;
    }     
        
    res.render('layouts/default', {
        title: 'Iffy',
        loggedIn: loggedIn,
        isError: true,
        partials: {
            content: 'index'
        }
    });
};
