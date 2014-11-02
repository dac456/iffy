var https = require('https');
var eztv = require('eztv');

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
                quality: req.params.quality,
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

exports.ytsSearch = function(req, res) {
    var entries = [];
    var keywords = req.body.keywords.replace(' ', "%20");

    https.get("https://yts.re/api/list.json?keywords="+keywords, function(yts_res) {
        var data = '';

        yts_res.on('data', function (chunk){
            data += chunk;
        });

        yts_res.on('end',function(){
            var obj = JSON.parse(data);
            for(var i = 0; i < parseInt(obj['MovieCount']); i++) {
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
                quality: req.params.quality,
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

exports.eztv = function(req, res) {
    var entries = [];
    
    eztv.getShows({}, function(error, results) {
        for(var i = 0; i < results.length; i++) {
            var slug = results[i]['slug'];
            var imgName = slug.replace(/-/g, '_');
            var imgUrl = "http://ezimg.it/t/"+imgName+"/main.png"
            entries.push({
                title: results[i]['title'],
                slug: slug,
                image: imgUrl,
                showId: results[i]['id']
            });
        }
        
        res.render('layouts/default', { 
            title: 'Iffy',
            entries: entries,
            partials: {
                content: 'eztv'
            } 
        });        
    });
};

exports.eztvSearch = function(req, res) {
    var entries = [];
    
    eztv.getShows({query:req.body.keywords}, function(error, results) {
        for(var i = 0; i < results.length; i++) {
            var slug = results[i]['slug'];
            var imgName = slug.replace(/-/g, '_');
            var imgUrl = "http://ezimg.it/t/"+imgName+"/main.png"
            entries.push({
                title: results[i]['title'],
                slug: slug,
                image: imgUrl,
                showId: results[i]['id']
            });
        }
        
        res.render('layouts/default', { 
            title: 'Iffy',
            entries: entries,
            partials: {
                content: 'eztv'
            } 
        });        
    });    
};    

exports.eztvShow = function(req, res) {
    eztv.getShowEpisodes(req.params.showId, function(error, results) {
        var slug = req.params.slug;
        var imgName = slug.replace(/-/g, '_');
        var imgUrl = "http://ezimg.it/t/"+imgName+"/main.png"
            
        res.render('layouts/default', { 
            title: 'Iffy',
            showTitle: results['title'],
            image: imgUrl,
            episodes: results['episodes'],
            partials: {
                content: 'eztv_episodes'
            } 
        }); 
    });
};
