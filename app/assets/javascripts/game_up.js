window.GameUp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(options) {
    GameUp.groups = new GameUp.Collections.Groups();
    GameUp.events = new GameUp.Collections.Events();
    GameUp.currentUser = options.currentUser;
    var router = new GameUp.Routers.Router({$rootEl: $('div#content')});
    Backbone.history.start();
  }
};
