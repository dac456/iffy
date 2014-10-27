$( function() {
    var _btapp = null;
    
    var AppView = Backbone.View.extend({
        className: 'main',
        initialize: function() {
            this.template = _.template($('#media_container_template').html());
            
            /*_btapp.live('torrent *', function(torrent) {
                torrent.remove();
            }, this);*/
            
            _btapp.live('add', function(add) {
                add.torrent("magnet:?xt=urn:btih:299c8ab171f489ad9c0c481da0191f1d6970f98c&dn=Neighbors+%282014%29+720p+BrRip+x264+-+YIFY&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337");
                
                _btapp.live('torrent * properties', function(properties) {
                    var hash = properties.get('hash');

                    _btapp.live('torrent '+hash+' file *', function(file) {
                        var vid = file.get('name');
                        var ext = vid.substr(vid.lastIndexOf('.') + 1);
                        
                        if(ext == 'mp4') {
                            _btapp.live('torrent '+hash+' file '+vid+' properties streaming_url', this.ready, this);
                        }
                    }, this);
                }, this);   
                
            }, this);                         
        },
        render: function() {
            this.$el.html(this.template({})); 
            return this;
        },
        ready: function(url) { 
            var player = _V_("main_player");
            player.ready(_.bind(function() {
                player.src(url);
            }, this));
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
    
    var model = new Backbone.Model({
        hash: undefined
    });
    
    var appView = new AppView({model:model});
    $('body').append(appView.render().el);
    
});
