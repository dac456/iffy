$( function() {
    var _btapp = null;
    
    if(_btapp){
        _btapp.disconnect();
        _btapp = null;
    }
    
    _btapp = new Btapp;
        
    _btapp.connect({
        product: "Torque"
    });
    
    _btapp.live('torrent *', function(torrent) {
        torrent.remove();
    }, this);    
    
});
