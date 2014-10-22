
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('layouts/default', { 
      title: 'Express',
      partials: {
          content: 'index'
      } 
    });
};

exports.bt = function(req, res){
    res.render('bt');
};
