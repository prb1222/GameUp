window.GameUp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(options) {
    GameUp.groups = new GameUp.Collections.Groups();
    GameUp.events = new GameUp.Collections.Events();
    var router = new GameUp.Routers.Router({$rootEl: $('div#content'),
                                            currentUser: options.currentUser});
    Backbone.history.start();
  }
};
