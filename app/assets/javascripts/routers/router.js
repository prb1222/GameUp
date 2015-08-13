GameUp.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.currentUser = options.currentUser;
    this.eventsCollection = new GameUp.Collections.Events();
    this.eventsCollection.fetch();
  },

  routes: {
    "": "groupsIndex",
    "groups": "groupsIndex",
    "groups/:id": "groupShow",
    "events": "eventsIndex",
    "events/:id": "eventShow"
  },

  groupsIndex: function () {
    GameUp.groups.fetch();
    var view = new GameUp.Views.GroupsIndex({collection: GameUp.groups});
    this.swapView(view)
  },

  groupShow: function(id) {
    var group = GameUp.groups.getOrFetch(id);
    var view = new GameUp.Views.GroupShow({model: group});
    this.swapView(view);
  },

  eventsIndex: function () {
    var view = new GameUp.Views.EventsIndex({collection: this.eventsCollection});
    this.swapView(view);
  },

  eventShow: function(id) {
    var group = this.eventsCollection.getOrFetch(id).group();
    var view = new GameUp.Views.GroupShow({model: group,
                                           startPage: "eventShow",
                                           eventId: id});
    this.swapView(view);
  },

  swapView: function(view) {
    this._view && this._view.remove();
    this._view = view;
    this.$rootEl.html(view.$el)
    view.render();
  }
})
