$( function() {
    var _btapp = null;
    
    var AppView = Backbone.View.extend({
        className: 'main',
        initialize: function() {
            this.template = _.template($('#media_container_template').html());
            
            _btapp.on('add:torrent', function(torrents) {
                torrents.each(function(torrent) {
                    alert(torrent.get('properties').get('name'));
                    torrent.remove();
                });
            });
            
            _btapp.live('add', function(add) {
                add.torrent("magnet:?xt=urn:btih:c5652490cd27672acb22bf36b953a85a13574bd1&dn=22+Jump+Street+%282014%29+720p+BrRip+x264+-+YIFY&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337");
            });
            
            _btapp.live('torrent * file * properties streaming_url', function(streaming_url, properties) {
                //_btapp.get('torrent').get(properties.get('hash')).open_containing();
                //alert('trying to get streamingurl');
                alert(streaming_url);
            });
        },
        render: function() {
            var test = _V_("main_player");
            this.$el.html(this.template({}));
            return this;
        }
    });
    
    if(_btapp){
        _btapp.disconnect();
        _btapp = null;
    }
    
    _btapp = new Btapp;
        
    _btapp.connect({
        product: "Torque"
    });
    
    var appView = new AppView({model:_btapp});
    
});
