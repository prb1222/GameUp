window.GameUp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new GameUp.Routers.Router({$rootEl: $('div#content')});
    Backbone.history.start();
  }
};
