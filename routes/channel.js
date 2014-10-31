var https = require('https');

exports.yts = function(req, res) {
    var entries = [];
    https.get("https://yts.re/api/list.json?limit=50&set="+req.params.page+"&sort=alphabet&order=asc", function(yts_res) {
        var data = '';

        yts_res.on('data', function (chunk){
            data += chunk;
        });

        yts_res.on('end',function(){
            var obj = JSON.parse(data);
            for(var i = 0; i < 50; i++) {
                if(obj['MovieList'][i]['Quality'] === req.params.quality) {
                    entries.push({
                        title: obj['MovieList'][i]['MovieTitle'],
                        maglink: obj['MovieList'][i]['TorrentMagnetUrl'],
                        image: obj['MovieList'][i]['CoverImage']
                    });
                }
            }
            
            var _1080p = true;
            if(req.params.quality === '720p') {
                _1080p = false;
            }
            
            var prevPage = parseInt(req.params.page) - 1;
            if(prevPage == 0) {
                prevPage = 1;
            }
            
            var nextPage = parseInt(req.params.page) + 1;

            res.render('layouts/default', { 
                title: 'Iffy',
                entries: entries,
                _1080p: _1080p,
                prevPage: prevPage,
                nextPage: nextPage,
                partials: {
                    content: 'yts'
                } 
            });
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });    
};

exports.ytsQuality = function(req, res) {
    res.redirect('/channel/yts/'+req.body.quality+'/1');
};
