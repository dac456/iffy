
exports.index = function(req, res){
  res.render('layouts/default', { 
      title: 'Iffy',
      partials: {
          content: 'index'
      } 
    });
};

exports.bt = function(req, res){
    res.render('bt');
};
