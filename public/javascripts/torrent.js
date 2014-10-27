$( function() {
    var _btapp = null;
    
    var AppView = Backbone.View.extend({
        className: 'main',
        initialize: function() {
            this.template = _.template($('#media_container_template').html());
            
            _btapp.live('add', function(add) {
                add.torrent({
                    url: this.model.get('hash'),
                    priority: Btapp.TORRENT.PRIORITY.METADATA_ONLY
                });
                
                _btapp.live('torrent * properties', function(properties) {
                    var hash = properties.get('hash');

                    _btapp.live('torrent '+hash+' file *', function(file) {
                        var vid = file.get('name');
                        var ext = vid.substr(vid.lastIndexOf('.') + 1);
                        
                        if(ext.toUpperCase() !== "MP4") {
                            file.get('properties').save({
                                priority: 0
                            });
                        }
                        else {
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
    
    var hash = window.location.hash.substring(1);
    
    if(_btapp){
        _btapp.disconnect();
        _btapp = null;
    }
    
    _btapp = new Btapp;
        
    _btapp.connect({
        product: "Torque"
    });
    
    var model = new Backbone.Model({
        hash: hash
    });
    
    var appView = new AppView({model:model});
    $('body').append(appView.render().el);
    
});
