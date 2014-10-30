var https = require('https');
var db = require('../db');

exports.index = function(req, res){
    https.get("https://yts.re/api/list.json", function(res) {
        res.on('data', function(data) {
            var obj = JSON.parse(data);
            console.log(obj);
        });
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
    });
};

exports.bt = function(req, res){
    res.render('bt');
};
